async function loadcategory() {
    const container = document.getElementById('category-container')
    try{
        const response = await fetch('/api/category/');
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const categores = await response.json();

        container.innerHTML = '';
        if (categores.length === 0){ // Corrected variable name from 'category' to 'categores'
            container.innerHTML = '<p class="text-center"> No Category Available at the moment.<p> ';
            return;
        }

        let allcategoryCard = '';
        categores .forEach(category => {
            const categoryCard = `
            <div class="col-md-2 categorycard">
                <div class="card">
                    <img src="${category.image || 'https://via.placeholder.com/300x200'}" class="card-img-top" alt="${category.name}">
                    <div class="card-body">
                        <h5>
                            <div class="card-title">${category.name}</div>
                        </h5>
                    </div>
                </div>
            </div>`;
            allcategoryCard += categoryCard;
        });
        container.innerHTML = allcategoryCard; // Assign all cards at once for better performance
    }catch(error){
        console.error("Error fetching products:", error);
        container.innerHTML = '<p class="text-center text-danger">Failed to load Category. Please try again later.</p>'
    }
}
loadcategory();