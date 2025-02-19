// You need to implement the ShoppingCart constructor function and its prototype methods

function ShoppingCart() {
    // Initialize items property
    this.items = [];
}

// Define addItem method on ShoppingCart's prototype
ShoppingCart.prototype.addItem = function(price){
  this.items.push(price);
}
// Define getTotalPrice method on ShoppingCart's prototype
ShoppingCart.prototype.getTotalPrice = function(){
return this.items.reduce(function(acc, items){
return acc + items;
},0)
}

// Please don't remove the code below
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', (input) => {
  const { prices } = JSON.parse(input);
  const cart = new ShoppingCart();

  for (let price of prices) {
    cart.addItem(price);
  }

  process.stdout.write(JSON.stringify(cart.getTotalPrice()));
});
