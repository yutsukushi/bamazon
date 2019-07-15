var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({ //sets up connection to mysql database
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "password",
    database: "bamazonDB"
  });

  connection.connect(function(err) { //actually connects to the database
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    run();
  });

  function run() {
    connection.query("SELECT * FROM inStock", function(err, results) {
        if (err) throw err;
        // display in stock items. 
        // TODO: Include the ids, names, and prices of products for sale.
        console.log("Welcome to Bamazon!")
        console.log("Listed items are currently in stock!")
        for (var i = 0; i < results.length; i++) {
          console.log("-----------------------------------------------------")
          console.log("Product ID: " + results[i].item_id);
          console.log("Product name: " + results[i].product_name);
          console.log("Price: " + results[i].price);
        }

        productID();
    })
    }

  function productID() {
      
    inquirer
    // prompts user what product they would like to buy
    .prompt({
        name: "productID",
        type: "input",
        message: "What is the product you would like to buy? Please provide the product ID."
    })
    .then(function(answer) {
    // TODO: if product ID matches in stock item, run howMany() function
    if (answer.productID === "POST") {
        howMany();

    } else{
        connection.end();
    }
    });
    
  }  
//TODO:  function howMany() {
// //    * The second message should ask how many units of the product they would like to buy.

//     }

// function 
// 3) Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
        // Two separate tables, one available/unavailable.
    // function updateProduct() {
    //     console.log("Updating all song quantities...\n");
    //     var query = connection.query(
    //         "UPDATE songs SET ? WHERE ?",
    //         [
    //         {
    //             genre: "pop"
    //         },
    //         {
    //             genre: "rock"
    //         }
    //         ],
    //         function(err, res) {
    //         if (err) throw err;
    //         console.log(res.affectedRows + " products updated!\n");
    //         // Call deleteProduct AFTER the UPDATE completes
    //         deleteProduct();
    //         }
    //     );

//    * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

// 8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
//    * This means updating the SQL database to reflect the remaining quantity.
//    * Once the update goes through, show the customer the total cost of their purchase.
