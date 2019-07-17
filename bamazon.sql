DROP DATABASE IF EXISTS bamazonDB;

CREATE database bamazonDB;

USE bamazonDB;

CREATE TABLE inStock (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10,2),
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

CREATE TABLE outStock (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100),
department_name VARCHAR(100),
price DECIMAL(10,2),
stock_quantity INTEGER NOT NULL,
PRIMARY KEY (item_id)
);

SELECT * FROM inStock;

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'