document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const subtotalElement = document.getElementById('subtotal');
    const totalPriceElement = document.getElementById('total-price');
    const placeOrderButton = document.getElementById('place-order');

    let subtotal = 0;

    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'flex items-center justify-between mb-4 p-4 bg-gray-700 rounded-lg shadow-lg';
        itemElement.innerHTML = `
            <div class="flex items-center">
                <img src="${item.image}" alt="${item.name}" class="h-24 w-24 object-cover rounded-md border border-gray-600">
                <div class="ml-4">
                    <h2 class="text-xl font-bold text-teal-400">${item.name}</h2>
                    <p class="text-lg text-gray-300">€${item.price.toFixed(2)}</p>
                </div>
            </div>
            <p class="text-lg text-white">Quantity: ${item.quantity}</p>
        `;
        cartItemsContainer.appendChild(itemElement);
        subtotal += item.price * item.quantity;
    });

    subtotalElement.innerText = `€${subtotal.toFixed(2)}`;

    const shippingCostElement = document.getElementById('shippingCost');

    let shippingCost = 8;

    if (subtotal > 75) {
        shippingCost = 0;
    }

    shippingCostElement.innerText = `€${shippingCost.toFixed(2)}`;

    const total = subtotal + shippingCost;
    totalPriceElement.innerText = `€${total.toFixed(2)}`;

    placeOrderButton.addEventListener('click', () => {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;

        if (!firstname || !lastname || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }

        // Regex
        const nameRegex = /^[A-Za-z\s-]+$/;  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9\s-]+$/;   

        // Validate first name
        if (!nameRegex.test(firstname)) {
            alert('First name should only contain letters');
            return;
        }

        // Validate last name
        if (!nameRegex.test(lastname)) {
            alert('Last name should only contain letters');
            return;
        }

        // Validate email
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Validate phone number
        if (!phoneRegex.test(phone)) {
            alert('Phone number should only contain numbers');
            return;
        }

        const order = {
            items: cartItems,
            total: subtotal + shippingCost,
            date: new Date().toISOString(),
            email: email,
            firstName: firstname,
            lastName: lastname,
            phone: phone
        };

        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.push(order);
        localStorage.setItem('orders', JSON.stringify(orders));

        alert('Order placed successfully!');
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });
}); 