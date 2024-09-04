function addItemToCart(productId, quantity) {
    $.ajax({
        url: '/Cart/AddToCart',
        type: 'POST',
        data: { id: productId, quantity: quantity },
        success: function (result) {
            // Inject the updated cart HTML into the DOM
            $('#cartItems').html(result.cartItemsHtml);
            $('#cartTotal').text(result.cartTotal);

            // Optional: Show a confirmation message
            $('#cartConfirmation').text('Item added to cart!').fadeIn().delay(2000).fadeOut();
        },
        error: function () {
            console.error('Failed to add item to cart');
        }
    });
}


// Update cart total
function updateCartTotal() {
    let total = 0;
    const rows = document.querySelectorAll('#cartItems tr');
    rows.forEach(row => {
        const priceCell = row.querySelector('td:nth-child(3)');
        total += parseFloat(priceCell.textContent.replace('R ', ''));
    });
    const cartTotalElement = document.getElementById('cartTotal');
    if (cartTotalElement) {
        cartTotalElement.textContent = 'R ' + total.toFixed(2);
    } else {
        console.error('cartTotal element not found');
    }
}
