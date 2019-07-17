var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

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
      console.log("Welcome to Bamazon!")
      console.log("Listed items are currently in stock.")
      console.table(results);
    
      question(results); //question prompt and feeds results from connection query.
})
}

function question(inventory) { //prompt user on what item they would like, then runs checkInventory();
    inquirer
    // prompts user what product they would like to buy
    .prompt([{
      name: "productID",
      type: "input",
      message: "What is the product you would like to buy? (Please provide the item ID)"
    }])

    .then(function(answer) {
    // turn string into integer so it would match item_id
    var inputID = parseInt(answer.productID);
    var product = checkInventory(inputID, inventory);
    if (product) {
      promptForQuantity(product);
    }
    else {
      console.log("The item is not in the inventory");
      run();
    }
    }
  )
}

function checkInventory(id, inventory){ //finds item_id and returns item row info.
  for (var i = 0; i < inventory.length; i++){
    if (id == inventory[i].item_id){
      return inventory[i];
    }
  }
  return null;
}

function promptForQuantity(product){ //prompts quantity check
  inquirer
  // prompts user what product they would like to buy
  .prompt([
  {
    name: "quantity",
    type: "input",
    message: "How many of this product would you like? (Enter a number quantity)"
  }
])

  .then(function(answer) {
      var amount = parseInt(answer.quantity);
      if (amount <= product.stock_quantity){
        makePurchase(product, amount);
      }
      else {
        console.log("Insufficient quantity to fulfill the order.");
        run();
      }

  })

}

function makePurchase(product, amount){ //taking the product and amount value and updating the stock quantity database.
  connection.query("UPDATE inStock SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [
    amount,
    product.item_id
  ], function(err, res) {
      var total = product.price * amount;
      console.log("Successfully made purchase. Your total is " + total + ".");
      // deleteProduct(product);
      inquirer
  // prompts user what product they would like to buy
        .prompt([
        {
          name: "shopAgain",
          type: "confirm",
          message: "Would you like to shop for something else?"
        }
      ]).then(function(answer){
        if (answer.shopAgain === true) { //if customer wants to shop again === true, runs program again
          run();
          // deleteProduct(product);
        } else {
          console.log("Thank you for doing business with us, have a good day!")
          connection.end();
        }
      })
    }
  )
}

// function deleteProduct(product) {
//   if (product.stock_quantity = 0) {
//     console.log("Deleting out of stock item...\n");
//     connection.query(
//       "DELETE FROM inStock WHERE ?",
//       [
//         stock_quantity = 0
//       ],
//       function(err, res) {
//         if (err) throw err;
//         console.log(res.affectedRows + " item deleted!\n");
//         question(inventory);
//       }
//     );
//   }
// }