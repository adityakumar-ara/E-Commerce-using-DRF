async function loadWishlist() {
    const container = document.getElementById('wishlist-container');

    try {
        const response = await fetch('/api/wishlist/', { credentials: 'same-origin' });
        if (!response.ok) throw new Error('Unable to load wishlist.');

        const items = await response.json();
        if (!items.length) {
            container.innerHTML = '<div class="col-12"><p class="wishlist-empty">Your wishlist is empty.</p></div>';
            return;
        }

        container.innerHTML = items.map(item => {
            const product = item.product_details;
            return `
                <div class="col-6 col-md-3">
                    <article class="wishlist-card h-100">
                        <img src="${product.image || 'https://via.placeholder.com/300x200'}" alt="${product.name}">
                        <div class="p-3">
                            <h2>${product.name}</h2>
                            <p>₹${product.price}</p>
                        </div>
                    </article>
                </div>`;
        }).join('');
    } catch (error) {
        console.error('Wishlist load error:', error);
        container.innerHTML = '<div class="col-12"><p class="text-danger">Unable to load your wishlist. Please try again.</p></div>';
    }
}

loadWishlist();
