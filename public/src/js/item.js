const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

let products = JSON.parse(localStorage.getItem('products'));

if (products) {
    const product = products.find(p => p.id == productId);
    displayProduct(product);
} else {
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            const product = products.find(p => p.id == productId);
            displayProduct(product);
        })
        .catch(error => console.error('Error loading product data:', error));
}

function displayProduct(product) {
    if (product) {
        document.getElementById('main-image').src = product.image;
        document.getElementById('item-title').innerText = product.name;
        document.getElementById('breadcrumb-item').innerText = product.name;

        document.getElementById('item-description').innerText = product.description;
        document.getElementById('item-price').innerHTML = `€${parseFloat(product.price).toFixed(2)}`;

        document.getElementById('item-processor').innerText = product.specs.processor;
        document.getElementById('item-memory').innerText = product.specs.memory;
        document.getElementById('item-storage').innerText = product.specs.storage;
        document.getElementById('item-graphics').innerText = product.specs.graphics;

        document.getElementById('add-to-cart').addEventListener('click', () => {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Item added to cart!');
            updateCartNotification();
        });
    } else {
        console.error('Product not found');
    }
}

function updateCartNotification() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartNotification = document.getElementById('cart-notification');
    const cartNotificationMobile = document.getElementById('cart-notification-mobile');

    if (cart.length > 0) {
        cartNotification.classList.remove('hidden');
        cartNotificationMobile.classList.remove('hidden');
    } else {
        cartNotification.classList.add('hidden');
        cartNotificationMobile.classList.add('hidden');
    }
}

updateCartNotification();
