const itemName = document.querySelectorAll('.item-name');
const itemAmt = document.querySelectorAll('.item-amt');
const AddBtn = document.querySelectorAll('.add-btn');
const cartlist = document.getElementById('cart-list');


let cart = [];
AddBtn.forEach((element, index)=>{
    element.addEventListener('click',()=>{
            addToCart(itemName[index].innerText, parseFloat(itemAmt[index].innerText));
    })
})

function addToCart(iname, price){
    const existingIndex = cart.findIndex(element => element.name===iname);

    if(existingIndex<0){
        cart.push({name: iname, price: price, quantity: 1})
        console.log(cart)
        renderCart();
    }
    else{
        cart[existingIndex].quantity++;
        console.log(cart)
        renderCart();
    }
}

function renderCart(){
    if(cart.length==0){
        cartlist.innerHTML=`<h2>Cart is Empty</h2>`
    }else{
    cartlist.innerHTML=``;
    cart.forEach((element, index)=>{
        const listItem = document.createElement('li');
        listItem.classList.add('list-item');
        listItem.innerHTML = `
        <span class="liName">${element.name}</span>
        <span>${element.price} x ${element.quantity} = ${(element.price*element.quantity).toFixed(2)}</span>
        <button class="decrement">-</button>
        <span class="qnty">${element.quantity}</span>
        <button class="increment">+</button>
        <span>$<span class="liPrice">${element.price}</span></span>
        <button class="remove">Remove</button>
        
        `
        cartlist.appendChild(listItem);
    })
    const total = document.getElementById('total');
    const totalamt = cart.reduce(
        (acc, element)=>{
            acc = acc + (element.price * element.quantity)
            return acc},
    0)
    total.innerText = totalamt.toFixed(2);
}
}

cartlist.addEventListener('click',(event)=>{
    const target = event.target;
    const targetParent = target.parentElement;
    if(!targetParent) return;
    const name = targetParent.querySelector('.liName')?.innerText;
    const price = parseFloat(targetParent.querySelector('.liPrice')?.innerText);
    const existingIndex = cart.findIndex(element=> element.name===name);
    if(target.classList.contains('increment')){
        cart[existingIndex].quantity++;
        renderCart();
    }else if(target.classList.contains('decrement')){
        reduce(name, price, existingIndex);
    }else if(target.classList.contains('remove')){
        remove(name, price, existingIndex);
    }
})

function reduce(name, price, existingIndex){
    if(cart[existingIndex].quantity===1){
        cart.splice(existingIndex, 1);
        renderCart();
    } else{
        cart[existingIndex].quantity--;
        renderCart();
    }
}


function remove(name, price, existingIndex){
    cart.splice(existingIndex, 1);
    renderCart();
}

renderCart();
        