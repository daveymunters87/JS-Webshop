let products = JSON.parse(localStorage.getItem('products')) || [];
const productForm = document.getElementById('product-form');
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

if (productId) {
    const product = products.find(p => p.id == productId);
    if (product) {
        document.getElementById('form-title').innerText = 'Edit Product';
        document.getElementById('product-id').value = product.id;
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('image').value = product.image;
        document.getElementById('description').value = product.description;
        document.getElementById('processor').value = product.specs.processor;
        document.getElementById('memory').value = product.specs.memory;
        document.getElementById('storage').value = product.specs.storage;
        document.getElementById('graphics').value = product.specs.graphics;
    } else {
        alert('Product not found');
    }
}

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

    const updatedProduct = {
        id: productId ? parseInt(productId) : products.length + 1,
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

    if (productId) {
        const index = products.findIndex(p => p.id == productId);
        products[index] = updatedProduct;
    } else {
        products.push(updatedProduct);
    }

    localStorage.setItem('products', JSON.stringify(products));
    alert(`Product ${productId ? 'updated' : 'added'} successfully!`);
    window.location.href = '../admin/index.html';
}); 