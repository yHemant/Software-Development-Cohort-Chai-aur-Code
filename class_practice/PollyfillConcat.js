if(!Array.prototype.myConcat){
    Array.prototype.myConcat= function(...args){
        const newArray = [];
        for(let i=0; i<this.length; i++){
            newArray.push(this[i])
        }

        for(let j=0; j<args.length; j++){
            if(Array.isArray(args[j])){
                for(let k=0; k<args[j].length; k++){
                    newArray.push(args[j][k])
                }
            }
            else{
                newArray.push(args[j])
            }
        }
        return newArray;
    }
}

const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [7, 8, 9, 10, 11, 12];
const arr3 = [3, 14, 15, 16, 17, 18];

console.log(arr1.myConcat(arr2, "hemant", arr3, 543));