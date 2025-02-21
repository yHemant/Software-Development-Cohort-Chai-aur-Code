// You just need to implement the cleanObject function
function cleanObject(obj) {
    // Remove all properties with null or undefined values
    let obj1 = {};
    for(let key in obj){
      if(obj[key]!==null&&obj[key]!==undefined){
        obj1[key]=obj[key];
      }
    }
    return obj1;
  }
  
  // Please don't remove the code below
  const readline = require('readline');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  
  rl.on('line', (input) => {
    const { obj } = JSON.parse(input);
    const result = cleanObject(obj);
    process.stdout.write(JSON.stringify(result));
  });