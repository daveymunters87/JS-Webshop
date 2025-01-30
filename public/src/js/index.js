document.addEventListener('DOMContentLoaded', () => {
    let products = JSON.parse(localStorage.getItem('products'));

    if (!products) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                products = data;
                localStorage.setItem('products', JSON.stringify(products));
                displayProducts(products);
            })
            .catch(error => console.error('Error loading products:', error));
    } else {
        displayProducts(products);
    }
    updateCartNotification(); 
});

function updateCartNotification() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartNotification = document.getElementById('cart-notification');

    if (cart.length > 0) {
        cartNotification.classList.remove('hidden');
    } else {
        cartNotification.classList.add('hidden');
    }
}

function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let products = JSON.parse(localStorage.getItem('products'));

    const product = products.find(p => p.id == productId);
    const existingProduct = cart.find(item => item.id == productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const newProduct = {
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            description: product.description,
            specs: product.specs,
            quantity: 1
        };
        cart.push(newProduct);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
    updateCartNotification(); 
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col items-center';

        productCard.innerHTML = `
            <div class="flex justify-center bg-gray-900 p-4 rounded-lg shadow-lg">
                <img src="${product.image}" alt="${product.name}" class="h-48 w-48 object-contain border border-gray-700 rounded-md">
            </div>
            <h2 class="text-xl font-semibold text-gray-100 mt-4 text-center">${product.name}</h2>
            <p class="text-lg text-gray-400 mt-2 text-center">€${product.price}</p>
            <a href="item.html?id=${product.id}" class="text-teal-400 hover:underline mt-2 text-sm">View Details</a>
            <button class="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-2 px-4 rounded-lg mt-4 transition-all duration-200 transform hover:scale-105" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        `;
        productList.appendChild(productCard);
    });
}

