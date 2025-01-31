let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

displayCartItems(cartItems);

document.getElementById('checkout-btn').addEventListener('click', () => {
    cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    if (cartItems.length === 0) {
        alert('Your cart is empty');
        window.location.href = 'cart.html';
        return;
    } else {
        window.location.href = 'checkout.html';
    }
});

function displayCartItems(cartItems) {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let subtotal = 0;

    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex flex-col lg:flex-row items-center justify-between mb-4 p-4 bg-gray-700 rounded-lg shadow-lg space-y-4 lg:space-y-0 lg:space-x-4';

        const itemPrice = parseFloat(item.price);
        if (isNaN(itemPrice)) {
            console.error(`Price for item ${item.name} is not valid.`);
            return;
        }

        itemElement.innerHTML = `
            <div class="flex items-center flex-1 w-full sm:w-auto">
                <img src="${item.image}" alt="${item.name}" class="h-24 w-24 sm:h-32 sm:w-32 object-cover rounded-md border border-gray-600">
                <div class="ml-4">
                    <h2 class="text-lg sm:text-xl font-bold text-teal-400">${item.name}</h2>
                    <p class="text-base sm:text-lg text-gray-300">€${item.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-l-lg" onclick="decreaseQuantity(${index})">-</button>
                <p class="mx-2 text-base sm:text-lg text-white">${item.quantity}</p>
                <button class="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r-lg" onclick="increaseQuantity(${index})">+</button>
            </div>
            <div class="flex items-center space-x-4">
                <p class="text-lg sm:text-xl text-teal-400 font-bold">€${(item.price * item.quantity).toFixed(2)}</p>
                <button class="bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded-lg" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);

        subtotal += item.price * item.quantity;
    });

    document.getElementById('subtotal').innerText = `€${subtotal.toFixed(2)}`;

    let shippingCost = 8.00;

    if (subtotal > 75) {
        shippingCost = 0;
    }

    const total = subtotal + shippingCost;

    document.getElementById('total-price').innerText = `€${total.toFixed(2)}`;
    document.getElementById('shipping-cost').innerText = `Shipping: €${shippingCost.toFixed(2)}`;
}

function removeFromCart(index) {
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartItems.splice(index, 1);
console.log('Removed');
localStorage.setItem('cart', JSON.stringify(cartItems));
displayCartItems(cartItems);
}

function increaseQuantity(index) {
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
cartItems[index].quantity += 1;
localStorage.setItem('cart', JSON.stringify(cartItems));
displayCartItems(cartItems);
}

function decreaseQuantity(index) {
let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
if (cartItems[index].quantity > 1) {
    cartItems[index].quantity -= 1;
} else {
    cartItems.splice(index, 1);
}
localStorage.setItem('cart', JSON.stringify(cartItems));
displayCartItems(cartItems);
}

document.getElementById('clear-cart-btn').addEventListener('click', () => {
localStorage.removeItem('cart');
displayCartItems([]);
});
