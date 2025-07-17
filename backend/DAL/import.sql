CREATE EXTENSION IF NOT EXISTS dblink;
SELECT dblink_connect('source_conn', '{{SOURCE_CONN}}');

insert into categories (id, name, description)
select id::uuid,
       name,
       null
from dblink('source_conn',
            'SELECT id, name from "Category"')
         AS source(id text, name text);

INSERT INTO products (id, name, price, is_available, image_name, amount, amount_unit,
                      description, category_id)
SELECT id,             -- cast id from text to uuid
       name,
       price::numeric, -- cast price from integer to numeric
       available,
       null,
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
    rec            RECORD;
    new_total_cost numeric;
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
            insert into orders (id, people_count, total_cost, email, phone_number, payment_method, status, created_at,
                                notes)
            values (rec."orderId",
                    rec."peopleNumber",
                    -1,
                    rec.email,
                    rec.phone,
                    'Cash',
                    'Completed',
                    rec."createdAt",
                    rec."notesForOrder");

            insert into addresses (id, city, district, street, home_number, apartment_number, floor, order_id)
            values (rec."addressId",
                    rec.city,
                    rec.district,
                    rec.street,
                    rec."homeNumber",
                    rec."apartmentNumber",
                    rec.floor,
                    rec."orderId");
        END LOOP;
END;
$$;

select import_users_from_orders();

insert into order_products (order_id, product_id, quantity)
select "orderId", "productId", quantity
from dblink('source_conn',
            'SELECT "orderId", "productId", quantity from "OrderProduct"')
         as source("orderId" uuid, "productId" uuid, quantity integer);

update orders
set total_cost = sub.new_total_cost
from (select o.id as order_id, COALESCE(sum(op.quantity * p.price), 0) as new_total_cost
      from orders o
               left join order_products op on o.id = op.order_id
               left join products p on op.product_id = p.id
      group by o.id) as sub
where orders.id = sub.order_id;

DO
$$
    DECLARE
        rec RECORD;
    BEGIN
        FOR rec IN
            SELECT id, image_name
            FROM (VALUES ('8254a2ae-13f5-4939-94e2-5f61883b7f00', '7ebc5de3-5fb9-4c44-a38c-7a9d4f3329de.png'),
                         ('156e7ac0-360a-4f0b-8a94-a4ab3cffe672', 'd268a2a9-93fb-45fd-89d8-c3024dc8acb3.png'),
                         ('41d99a7f-0b4c-467c-b5a1-55130fa97c2a', 'e524e43b-a6b5-4bfd-b1c7-ab6d826a1438.png'),
                         ('957c7ba0-71dd-45be-ae70-23eb30b80f1a', 'a3a835ae-fd0a-494c-97eb-d0382c52e2f6.png'),
                         ('6055d532-7655-405f-b367-e5cc52e2216d', 'a654c1c6-2cb8-4f7c-971e-b36274b04607.png'),
                         ('365d19eb-9758-4725-a787-527135855bdd', '53ae9088-6840-466c-91ae-c30a7b02c077.png'),
                         ('b3ad9726-0830-4d0c-8e1f-374da3b87dc0', '6a22b763-4008-4704-9933-ebceb6aeb55b.png'),
                         ('aa6d1269-cdd4-4d16-85e4-882ce38d6f75', 'b7c32230-3d89-453f-8285-cf323416f721.png'),
                         ('d5ec2035-c636-4fcb-bf71-ec9b87c2885f', '7409d848-8e66-4225-8396-e447ca799f1d.png'),
                         ('19caaa72-175a-4265-83b2-21e90c9982b5', '9b447c52-98e1-4a69-8835-12121c9279c4.png'),
                         ('705d0a77-c695-430e-8dcf-2b68f5854c53', '2743ba36-1fae-4e7a-b449-d28236c5b912.png'),
                         ('eb343ca4-27bf-4169-bfdf-643bcce1cc95', 'b55d996f-793f-4631-9a16-35212e2cdb3d.png'),
                         ('03c6e67d-ae62-4029-86ff-22e4d88227c1', '3a0b3790-a324-4a6a-9d1c-702be2d9dabe.jpeg'),
                         ('a652a552-0493-4044-bf33-a52b1fda38e1', 'b8c96307-a9fd-4258-9c0a-30031b9e7c10.jpeg'),
                         ('f0b281e4-3d75-438c-b7fe-b6905e9a8d47', '3073e0ed-49e7-439a-8e93-27ac43e76876.png') --
                 ) AS updates(id, image_name)
            LOOP
                UPDATE products
                SET image_name = rec.image_name
                WHERE id = rec.id::uuid;
            END LOOP;
    END;
$$;
