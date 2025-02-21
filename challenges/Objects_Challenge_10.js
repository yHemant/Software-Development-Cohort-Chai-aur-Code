// You just need to implement the getNestedValue function
function getNestedValue(obj, keyPath) {
    // Return the value from the nested object based on keyPath
    let path = keyPath.split('.');
    let obj2 = obj;
  
    for (let key of path){
      if(obj2[key]===undefined){
        return "Key not found"
      }
      obj2 = obj2[key];
    }
      return obj2;
  }
  
  // Please don't remove the code below
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.on('line', (input) => {
    const { obj, keyPath } = JSON.parse(input);
    const result = getNestedValue(obj, keyPath);
    process.stdout.write(JSON.stringify(result));
  });