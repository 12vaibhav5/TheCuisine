document.addEventListener('DOMContentLoaded', () => {
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const paymentModal = document.getElementById('payment-modal');
    const closeButtons = document.querySelectorAll('.close-button');
    const menuItems = document.querySelectorAll('.add-to-cart');
    const cartItemsList = document.getElementById('cart-items');
    const subtotalDisplay = document.getElementById('subtotal');
    const cgstDisplay = document.getElementById('cgst');
    const sgstDisplay = document.getElementById('sgst');
    const totalBillDisplay = document.getElementById('total-bill');
    const payButton = document.getElementById('pay-button');

    let cart = [];

    // Open Cart Modal
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'flex';
        updateCartDisplay();
    });

    // Close Modals
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'none';
        });
    });

    // Close modal on outside click
    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
    });

    // Add item to cart
    menuItems.forEach(button => {
        button.addEventListener('click', (event) => {
            const itemElement = event.target.closest('.menu-item');
            const itemName = itemElement.getAttribute('data-name');
            const itemPrice = parseFloat(itemElement.getAttribute('data-price'));
            
            const existingItem = cart.find(item => item.name === itemName);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ name: itemName, price: itemPrice, quantity: 1 });
            }

            updateCartButtonCount();
            alert(`${itemName} added to cart!`);
        });
    });

    // Update cart button count
    function updateCartButtonCount() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartButton.textContent = `Cart (${totalItems})`;
    }

    // Update Cart Display in Modal
    function updateCartDisplay() {
        cartItemsList.innerHTML = '';
        let subtotal = 0;

        if (cart.length === 0) {
            cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const li = document.createElement('li');
                li.innerHTML = `<span>${item.name} (${item.quantity})</span><span>₹${(item.price * item.quantity).toFixed(2)}</span>`;
                cartItemsList.appendChild(li);
                subtotal += item.price * item.quantity;
            });
        }

        const cgst = subtotal * 0.05;
        const sgst = subtotal * 0.05;
        const totalBill = subtotal + cgst + sgst;

        subtotalDisplay.textContent = subtotal.toFixed(2);
        cgstDisplay.textContent = cgst.toFixed(2);
        sgstDisplay.textContent = sgst.toFixed(2);
        totalBillDisplay.textContent = totalBill.toFixed(2);
    }

    // Open Payment Modal
    payButton.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.style.display = 'none';
            paymentModal.style.display = 'flex';
        } else {
            alert('Your cart is empty. Please add items to proceed.');
        }
    });
});