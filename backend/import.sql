CREATE EXTENSION dblink;
SELECT dblink_connect('source_conn', 'host=localhost dbname=sushizume');

INSERT INTO "Product" (name, price, available, visible, featured, "imageName", amount, "amountName", id, description)
SELECT name,
       price::numeric, -- cast price from integer to numeric
       available,
       visible,
       false,
       imagePath,
       amount::numeric,
       amountName,
       id::uuid,       -- cast id from text to uuid
       description
FROM dblink('source_conn',
            'SELECT name, price, available, visible, "imagePath", amount, "amountName", id, description FROM "Product"'
     ) AS source(
                 name text,
                 price integer,
                 available boolean,
                 visible boolean,
                 imagePath text,
                 amount numeric,
                 amountName text,
                 id text,
                 description text
    );

insert into "Category" (id, name, "orderIndex", description)
select id::uuid,
       name,
       1,
       null
from dblink('source_conn',
            'SELECT id, name from "Category"')
         AS source(id text, name text);

insert into "ProductCategory" ("productId", "categoryId")
select id::uuid, "categoryId"::uuid
from dblink('source_conn',
            'SELECT id, "categoryId" from "Product"')
         as source(id text, "categoryId" text);


CREATE OR REPLACE FUNCTION import_users_from_orders()
    RETURNS void
    LANGUAGE plpgsql
AS
$$
DECLARE
    rec         RECORD;
    new_user_id uuid;
BEGIN
    FOR rec IN
        SELECT *
        from dblink('source_conn',
                    'select o.id, "email", "phone", "peopleNumber", "paymentMethod", new, done, "createdAt", "notesForOrder", "addressId", a.city, a.district, a.street, a."homeNumber", a."apartamentNumber", a.floor from "Order" o join "Address" a on a.id = o."addressId"')
                 AS remote_orders(
                                  "orderId" uuid,
                                  email text,
                                  phone text,
                                  "peopleNumber" integer,
                                  "paymentMethod" text,
                                  new bool,
                                  done bool,
                                  "createdAt" timestamp with time zone,
                                  "notesForOrder" text,
                                  "addressId" uuid,
                                  city text,
                                  district text,
                                  street text,
                                  "homeNumber" text,
                                  "apartmentNumber" text,
                                  floor integer
                )
        LOOP
            new_user_id := gen_random_uuid();

            INSERT INTO "User" (id, email, phone, "passwordHash", "firstName", "lastName", "createdAt", role)
            values (new_user_id,
                    rec.email,
                    rec.phone,
                    NULL,
                    NULL,
                    NULL,
                    now(),
                    'Guest');

            insert into "Address" (id, city, district, street, "homeNumber", "apartmentNumber", floor, "userId")
            values (rec."addressId",
                    rec.city,
                    rec.district,
                    rec.street,
                    rec."homeNumber",
                    rec."apartmentNumber",
                    rec.floor,
                    new_user_id);

            insert into "Order" (id, "peopleCount", "paymentMethod", new, done, "createdAt", "notesForOrder",
                                 "addressId", "userId")
            values (rec."orderId",
                    rec."peopleNumber",
                    rec."paymentMethod",
                    rec.new,
                    rec.done,
                    rec."createdAt",
                    rec."notesForOrder",
                    rec."addressId",
                    new_user_id);
        END LOOP;
END;
$$;

select import_users_from_orders();

insert into "OrderProduct" ("orderId", "productId", quantity)
select "orderId", "productId", quantity
from dblink('source_conn',
            'SELECT "orderId", "productId", quantity from "OrderProduct"')
         as source("orderId" uuid, "productId" uuid, quantity integer);