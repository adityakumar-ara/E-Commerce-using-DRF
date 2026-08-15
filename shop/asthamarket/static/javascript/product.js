// Jab page load ho, toh API se data fetch karo
async function loadProducts() {
    // Jahan products dikhane hain, us div ko select karo
    const container = document.getElementById('product-container');

    try {
        // API se products fetch karo (relative URL is better)
        const response = await fetch('/api/products/');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();

        container.innerHTML = ''; // Pehle se kuch ho toh hata do

        if (products.length === 0) {
            container.innerHTML = '<p class="text-center">No products available at the moment.</p>';
            return;
        }

        let allProductCards = '';
        // Har product ke liye ek HTML card banao
        products.forEach(product => {
            const productCard = `
                <div class="col-12 col-md-3 mb-4 product-card-column">
                    <div class="card h-100 product-card-reusable" >
                        <div class="product-card-img-container">
                            <img src="${product.image || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${product.name}">
                            <div class="product-card-actions">
                                <button type="button" class="btn btn-outline-light btn-sm btn-add-to-wishlist" data-product-id="${product.id}" title="Add to Wishlist" aria-label="Add ${product.name} to wishlist">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.9-8.6a5.5 5.5 0 0 0-.1-7.8Z"></path></svg>
                                </button>
                                <button type="button" class="btn btn-primary btn-sm btn-add-to-cart" data-product-id="${product.id}" title="Add to Cart" aria-label="Add ${product.name} to cart">
                                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h2l2.3 10.2a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.5L21 6H6.2M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text price">₹${product.price}</p>
                        </div>
                    </div>
                </div>            `;
            allProductCards += productCard;
        });
        // Saare cards ko ek saath container mein daal do (better performance)
        container.innerHTML = allProductCards;
    } catch (error) {
        console.error("Error fetching products:", error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load products. Please try again later.</p>';
    }
}


loadProducts();

function getCookie(name) {
    const cookie = document.cookie.split('; ').find(row => row.startsWith(`${name}=`));
    return cookie ? decodeURIComponent(cookie.split('=')[1]) : '';
}

document.getElementById('product-container').addEventListener('click', async (event) => {
    const wishlistButton = event.target.closest('.btn-add-to-wishlist');
    if (!wishlistButton) return;

    const originalLabel = wishlistButton.getAttribute('aria-label');
    wishlistButton.disabled = true;

    try {
        const response = await fetch('/api/wishlist/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken'),
            },
            credentials: 'same-origin',
            body: JSON.stringify({ product: wishlistButton.dataset.productId }),
        });

        if (response.status === 401 || response.status === 403) {
            window.location.href = '/login/';
            return;
        }

        const data = await response.json();
        if (!response.ok) throw new Error(data.detail || 'Unable to add product to wishlist.');

        wishlistButton.classList.remove('btn-outline-light');
        wishlistButton.classList.add('btn-danger');
        wishlistButton.setAttribute('aria-label', 'Added to wishlist');
        wishlistButton.title = data.message;
    } catch (error) {
        console.error('Wishlist error:', error);
        wishlistButton.setAttribute('aria-label', originalLabel);
        alert('Could not add this product to your wishlist. Please try again.');
    } finally {
        wishlistButton.disabled = false;
    }
});
