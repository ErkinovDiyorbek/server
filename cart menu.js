document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemCount = document.querySelector('.cart-icon span');
    const cartItemsList = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartIcon = document.querySelector('.cart-icon');
    const sidebar = document.getElementById('sidebar');
    const closeButton = document.querySelector('.sidebar-close');

    let cartItems = JSON.parse(localStorage.getItem('cart')) || []; // Eski haridlarni yuklash

    updateCartUI(); // Sahifa yuklanganda savatni ko‘rsatish

    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            const itemName = document.querySelectorAll('.card .card-title')[index].textContent;
            const itemPrice = parseFloat(document.querySelectorAll('.price')[index].textContent.replace(/\D/g, ''));

            const existingItem = cartItems.find(item => item.name === itemName);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            saveCart(); // Ma'lumotlarni localStorage'ga saqlash
            updateCartUI();
        });
    });

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems)); // Savatni brauzerda saqlash
    }

    function updateCartUI() {
        updateCartItemCount();
        updateCartItemList();
        updateCartTotal();
    }

    function updateCartItemCount() {
        cartItemCount.textContent = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateCartItemList() {
        cartItemsList.innerHTML = cartItems.length === 0 
            ? `<div>Savatchangiz bo‘sh!</div>` 
            : cartItems.map((item) => `
                <div class="cart-item">
                    <span>(${item.quantity}x) ${item.name}</span>
                    <span class="cart-item-price">${(item.price * item.quantity).toLocaleString()} so‘m
                    <button class="remove-item" data-name="${item.name}"><i class="fa-solid fa-times"></i></button></span>
                </div>
            `).join('');
    }

    function updateCartTotal() {
        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        cartTotal.textContent = `${totalAmount.toLocaleString()} so‘m`;
    }

    cartItemsList.addEventListener('click', (event) => {
        if (event.target.closest('.remove-item')) {
            const itemName = event.target.closest('.remove-item').dataset.name;
            removeItemFromCart(itemName);
        }
    });

    function removeItemFromCart(itemName) {
        cartItems = cartItems.filter(item => item.name !== itemName);
        saveCart(); // O‘zgartirilgan savatni saqlash
        updateCartUI();
    }

    cartIcon.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    closeButton.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });
});











