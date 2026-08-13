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
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <img src="${product.image || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">₹${product.price}</p>
                            <!-- TODO: Add to Cart functionality -->
                            <button onclick="addToCart(${product.id}, '${product.name}', ${product.price})" class="btn btn-primary">Add to Cart</button>
                        </div>
                    </div>
                </div>
            `;
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