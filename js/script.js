document.addEventListener('DOMContentLoaded', () => {
    const loadProductsBtn = document.getElementById('loadProductsBtn');
    const filterBtn = document.getElementById('filterBtn');
    const productsContainer = document.getElementById('products-container');
    const loading = document.getElementById('loading');
    
    let products = [];
  
    const fetchProducts = async () => {
      loading.style.display = 'block';  // Show loading message
      try {
        const response = await fetch('https://run.mocky.io/v3/92348b3d-54f7-4dc5-8688-ec7d855b6cce?mocky-delay=500ms');
        const data = await response.json();
        products = data.map(productData => {
          return {
            id: productData.product.id,
            name: productData.product.title,
            price: parseFloat(productData.product.variants[0].price).toFixed(2),
            image: productData.product.images[0].src,
            description: 'No description available for this product.'
          };
        });
        renderProducts(products);
      } catch (error) {
        alert('Error fetching products.');
      } finally {
        loading.style.display = 'none'; // Hide loading message
      }
    };
  
    const renderProducts = (products) => {
      productsContainer.innerHTML = ''; // Clear the container
      products.forEach((product, index) => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="product-details">
            <h3>${product.name}</h3>
            <div class="price">$${product.price}</div>
            <p>${product.description}</p>
          </div>
        `;
        productsContainer.appendChild(productDiv);
  
        // Add animation delay based on index to stagger animation
        setTimeout(() => {
          productDiv.style.opacity = '1';
          productDiv.style.transform = 'translateY(0)';
        }, index * 100);
      });
    };
  
    const sortByPrice = () => {
      const sortedProducts = [...products].sort((a, b) => a.price - b.price);
      renderProducts(sortedProducts);
    };
  
    loadProductsBtn.addEventListener('click', fetchProducts);
    filterBtn.addEventListener('click', sortByPrice);
  });
  