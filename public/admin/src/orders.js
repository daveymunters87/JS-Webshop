document.addEventListener('DOMContentLoaded', () => {
    const ordersList = document.getElementById('orders-list');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    if (orders.length === 0) {
        ordersList.innerHTML = '<p>No orders found.</p>';
        return;
    }

    orders.forEach((order, index) => {
        const orderElement = document.createElement('div');
        orderElement.className = 'mb-4 p-4 bg-gray-700 rounded-lg shadow-lg';
        orderElement.innerHTML = `
            <h2 class="text-xl font-bold text-teal-400">Order #${index + 1}</h2>
            <p class="text-lg text-gray-300">Total: €${order.total.toFixed(2)}</p>
            <p class="text-gray-400">Date: ${new Date(order.date).toLocaleString()}</p>
            <h3 class="text-lg font-bold text-gray-200">Items:</h3>
            <ul class="text-white">
                ${order.items.map(item => `<li class="text-white">${item.name} (x${item.quantity}) - €${item.price.toFixed(2)}</li>`).join('')}
            </ul>
        `;
        ordersList.appendChild(orderElement);
    });
});