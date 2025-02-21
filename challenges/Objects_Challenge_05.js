// You just need to implement the countProperties function
function countProperties(user) {
    // Return the number of properties in user
    return Object.entries(user).length
  }
  
  // Please don't remove the code below
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.on('line', (input) => {
    const { user } = JSON.parse(input);
    const result = countProperties(user);
    process.stdout.write(JSON.stringify(result));
  });