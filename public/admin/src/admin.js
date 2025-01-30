let products = [];
let originalProducts = [];

const productList = document.getElementById('product-list');
const resetButton = document.getElementById('reset-button');

fetch('../products.json')
    .then(response => response.json())
    .then(data => {
        originalProducts = [...data];  
        products = JSON.parse(localStorage.getItem('products')) || [...data]; 
        renderProductList();
    });

function renderProductList() {
    productList.innerHTML = '';  

    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.className = 'bg-gray-700 p-4 mb-4 rounded-lg shadow-lg flex justify-between items-center';

        productItem.innerHTML = `
            <div>
                <h3 class="text-xl font-bold text-teal-400">${product.name}</h3>
                <p class="text-white">€${product.price}</p>
                <p class="text-gray-300">${product.description}</p>
            </div>
            <div class="flex space-x-2 ml-5">
                <a href="../admin/edit.html?id=${product.id}" class="edit-button flex-1 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded text-center">Edit</a>
                <button class="delete-button flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded text-center" data-index="${index}">Delete</button>
            </div>
        `;

        productList.appendChild(productItem);
    });

    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', deleteProduct);
    });
}

function deleteProduct(e) {
    const index = e.target.getAttribute('data-index');
    products.splice(index, 1);

    localStorage.setItem('products', JSON.stringify(products)); 
    renderProductList();
}

resetButton.addEventListener('click', function() {
    products = [...originalProducts];
    localStorage.setItem('products', JSON.stringify(products));  
    renderProductList();
});
