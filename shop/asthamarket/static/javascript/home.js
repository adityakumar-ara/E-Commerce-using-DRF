// This script will fetch product data and render it on the home page.

document.addEventListener('DOMContentLoaded', function() {
    const productContainer = document.getElementById('product-container');

    // Function to fetch products from the API
    async function fetchProducts() {
        try {
            // The API endpoint for products is '/api/products/' as defined in asthamarket/urls.py
            const response = await fetch('api/products/');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const products = await response.json();
           
            renderProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
            productContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
        }
    }

    // Function to render products into the DOM
    function renderProducts(products) {
        if (products.length === 0) {
            productContainer.innerHTML = '<p>No products available at the moment.</p>';
            return;
        }

        productContainer.innerHTML = ''; // Clear existing content

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');

    
            productCard.innerHTML = `
                <img src="${product.image || 'https://via.placeholder.com/150'}" alt="${product.name}" style="max-width: 100%; height: auto; border-radius: 5px;">
                <h3>${product.name}</h3>
                <p class="category-badge">${product.category || 'Uncategorized'}</p>
                <p class="price">₹${product.price ? product.price : 'N/A'}</p>
                <button class="btn btn-primary">Add to Cart</button>
            `;
            productContainer.appendChild(productCard);
        });
    }

    // Fetch products when the page loads
    fetchProducts();
});