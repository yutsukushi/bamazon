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
  question(results);
})
}

function question(inventory) {
    inquirer
    // prompts user what product they would like to buy
    .prompt([{
      name: "productID",
      type: "input",
      message: "What is the product you would like to buy? (Please provide the product ID)"
    }])

    .then(function(answer) {
    // turn string into integer so it would match item_id
    var inputID = parseInt(answer.productID);
    var product = checkInventory(inputID, inventory);
    if (product) {
      promptForQuantity(product);
    }
    else {
      console.log("the item is not in the inventoty");
      run();
    }
    }
  )
}

function promptForQuantity(product){
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
      if (amount < product.stock_quantity){
        makePurchase(product, amount);
      }
      else {
        console.log("Insufficient quantity");
        run();
      }

  })

}

function makePurchase(product, amount){
  connection.query("UPDATE inStock SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [
    amount,
    product.item_id
  ], function(err, res) {
      var total = product.price * amount;
      console.log("Successfully made purchase. Your total is " + total + ".");
    }
  )
}

function checkInventory(id, inventory){
  for (var i=0; i<inventory.length; i++){
    if (id == inventory[i].item_id){
      return inventory[i];
    }
  }
  return null;
}
      
