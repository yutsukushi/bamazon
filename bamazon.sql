CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10,2),
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM products;