let products = JSON.parse(localStorage.getItem('products')) || [];

const productForm = document.getElementById('product-form');

productForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const priceInput = document.getElementById('price').value;
    const price = parseFloat(priceInput.replace(',', '.'));

    if (price <= 0 || isNaN(price)) {
        alert('Please enter a valid price.');
        return;
    }

    const imageUrl = document.getElementById('image').value;
    const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg))$/i;

    if (!imageUrlPattern.test(imageUrl)) {
        alert('Please enter a valid image URL.');
        return;
    }

    const newProduct = {
        id: products.length + 1,
        name: document.getElementById('name').value,
        price: price.toFixed(2),
        image: document.getElementById('image').value,
        description: document.getElementById('description').value,
        specs: {
            processor: document.getElementById('processor').value,
            memory: document.getElementById('memory').value,
            storage: document.getElementById('storage').value,
            graphics: document.getElementById('graphics').value
        }
    };

    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    productForm.reset();
    alert('Product added successfully!');
    window.location.href = '../index.html';
});

