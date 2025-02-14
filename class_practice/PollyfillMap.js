if(!Array.prototype.myMap){
    Array.prototype.myMap= function(callbackfn){
        const populatedArray = [];
        for(let i=0; i<this.length; i++){
            populatedArray.push(callbackfn(this[i], i))
        }

        return populatedArray;
    }
}

const arr = [1, 2, 3, 4, 5];

console.log(arr.myMap((e) => e*2));