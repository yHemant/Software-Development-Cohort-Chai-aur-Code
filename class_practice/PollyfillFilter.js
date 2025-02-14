if(!Array.prototype.myFilter){
    Array.prototype.myFilter= function(callbackfn){
        const filteredArray = [];
        for(let i=0; i<this.length; i++){
            if(callbackfn(this[i], i)){
                filteredArray.push(this[i])
            }
        }
        return filteredArray;
    }
}

const arr= [1, 2, 3, 4, 5, 6, 7, 8, 9, 10,];
console.log(arr.myFilter((e, i)=>e+i<10));