if(!Array.prototype.myForEach){
    Array.prototype.myForEach= function(callbackfn){
        for(let i=0; i<this.length; i++){
            callbackfn(this[i], i);
        }
    }
}
const arr= [1, 2, 3, 4, 5];

arr.myForEach((value, index) => console.log(value));