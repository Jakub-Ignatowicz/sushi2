CREATE EXTENSION IF NOT EXISTS dblink;
SELECT dblink_connect('source_conn', '{{SOURCE_CONN}}');

insert into categories (id, name, description)
select id::uuid,
       name,
       null
from dblink('source_conn',
            'SELECT id, name from "Category"')
         AS source(id text, name text);

INSERT INTO products (id, name, price, is_available, is_visible, image_url, amount, amount_unit,
                      description, category_id)
SELECT id,       -- cast id from text to uuid
       name,
       price::numeric, -- cast price from integer to numeric
       available,
       visible,
       imagePath,
       amount,
       amountName,
       description,
			 categoryId
FROM dblink('source_conn',
            'SELECT name, price, available, visible, "imagePath", amount, "amountName", id, description, "categoryId" FROM "Product"'
     ) AS source(
                 name text,
                 price integer,
                 available boolean,
                 visible boolean,
                 imagePath text,
                 amount numeric,
                 amountName text,
                 id uuid,
                 description text,
								 categoryId uuid
    );

-- insert into product_categories (product_id, category_id)
-- select id::uuid,
--        "categoryId"::uuid
-- from dblink('source_conn',
--             'SELECT id, "categoryId" from "Product"')
--          as source(id text, "categoryId" text);


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

            INSERT INTO users (id, email, phone_number, type)
            values (new_user_id,
                    rec.email,
                    rec.phone,
                    'Guest');

            insert into addresses (id, city, district, street, home_number, apartment_number, floor, user_id)
            values (rec."addressId",
                    rec.city,
                    rec.district,
                    rec.street,
                    rec."homeNumber",
                    rec."apartmentNumber",
                    rec.floor,
                    new_user_id);

            insert into orders (id, people_count, payment_method, created_at, notes, address_id, user_id, status)
            values (rec."orderId",
                    rec."peopleNumber",
                    rec."paymentMethod",
                    rec."createdAt",
                    rec."notesForOrder",
                    rec."addressId",
                    new_user_id,
                    'Completed');
        END LOOP;
END;
$$;

select import_users_from_orders();

insert into order_products (order_id, product_id, quantity)
select "orderId", "productId", quantity
from dblink('source_conn',
            'SELECT "orderId", "productId", quantity from "OrderProduct"')
         as source("orderId" uuid, "productId" uuid, quantity integer);
