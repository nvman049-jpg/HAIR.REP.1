// ============================================
// PRODUCT LOADER - DYNAMIC CONTENT LOADING
// ============================================

(function() {
  'use strict';

  // Hàm lấy URL parameter
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Hàm format giá tiền
  function formatPrice(price) {
    return price + ' ₫';
  }

  // Hàm render rating stars
  function renderStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      starsHtml += '<i class="fa-solid fa-star"></i>';
    }
    
    if (hasHalfStar) {
      starsHtml += '<i class="fa-solid fa-star-half"></i>';
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      starsHtml += '<i class="fa-regular fa-star"></i>';
    }
    
    return starsHtml;
  }

  // Hàm load sản phẩm
  function loadProduct() {
    // Lấy product ID từ URL
    const productId = getUrlParameter('id');
    
    // Nếu không có ID, redirect về trang danh mục hoặc load sản phẩm mặc định
    if (!productId) {
      console.warn('No product ID found in URL. Loading default product...');
      window.location.href = 'danh_muc_phu_kien.html';
      return;
    }

    // Lấy thông tin sản phẩm từ database
    const product = PRODUCTS_DB[productId];
    
    // Nếu không tìm thấy sản phẩm, hiển thị thông báo lỗi
    if (!product) {
      console.error('Product not found:', productId);
      alert('Không tìm thấy sản phẩm. Bạn sẽ được chuyển về trang danh mục.');
      window.location.href = 'danh_muc_phu_kien.html';
      return;
    }

    // Render product content
    renderProductContent(product);
  }

  // Hàm render nội dung sản phẩm
  function renderProductContent(product) {
    // 1. Update page title
    document.title = product.name + ' - HAIR REP 1-1';
    
    // 2. Update breadcrumb
    const breadcrumbProduct = document.querySelector('.breadcrumb strong');
    if (breadcrumbProduct) {
      breadcrumbProduct.textContent = product.name;
    }

    // 3. Update main image và tags
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
      mainImage.src = product.images[0];
      mainImage.alt = product.name;
    }

    // Update product tag
    const productTag = document.querySelector('.product-tag');
    if (productTag && product.tag) {
      productTag.textContent = product.tag;
      productTag.className = 'product-tag ' + (product.tagType || '');
    } else if (productTag && !product.tag) {
      productTag.style.display = 'none';
    }

    // Update sold count
    const soldCount = document.querySelector('.sold-count');
    if (soldCount) {
      soldCount.textContent = 'Đã bán ' + product.soldCount;
    }

    // 4. Update thumbnail gallery (VERTICAL LAYOUT)
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    if (thumbnailContainer) {
      thumbnailContainer.innerHTML = '';
      product.images.forEach((img, index) => {
        const thumbDiv = document.createElement('div');
        thumbDiv.className = 'thumbnail' + (index === 0 ? ' active' : '');
        thumbDiv.setAttribute('data-image', img);
        
        const thumbImg = document.createElement('img');
        thumbImg.src = img;
        thumbImg.alt = 'Ảnh ' + (index + 1);
        
        thumbDiv.appendChild(thumbImg);
        thumbnailContainer.appendChild(thumbDiv);
      });
    }

    // 5. Update product info
    const productName = document.querySelector('.product-info h1');
    if (productName) {
      productName.textContent = product.name;
    }

    // Update rating
    const starsContainer = document.querySelector('.product-meta-row .stars');
    if (starsContainer) {
      starsContainer.innerHTML = renderStars(product.rating);
    }

    const ratingNumber = document.querySelector('.rating-number');
    if (ratingNumber) {
      ratingNumber.textContent = product.rating.toFixed(1);
    }

    // Update review count if needed (currently not in HTML meta row but kept for safety)
    const ratingText = document.querySelector('.rating-text');
    if (ratingText) {
      ratingText.textContent = '(' + product.reviewCount + ' đánh giá)';
    }

    // Update price
    const productPrice = document.querySelector('.product-price');
    if (productPrice) {
      productPrice.textContent = formatPrice(product.price);
    }

    // Update short description
    const shortDesc = document.querySelector('.short-description p');
    if (shortDesc) {
      shortDesc.textContent = product.shortDescription;
    }

    // 6. Update quick info
    const quickInfoContainer = document.querySelector('.quick-info');
    if (quickInfoContainer) {
      quickInfoContainer.innerHTML = '';
      product.quickInfo.forEach(info => {
        const infoDiv = document.createElement('div');
        infoDiv.className = 'info-item';
        infoDiv.innerHTML = `
          <i class="${info.icon}"></i>
          <strong>${info.label}</strong>
          <span>${info.value}</span>
        `;
        quickInfoContainer.appendChild(infoDiv);
      });
    }

    // 7. Update tab content - Description
    const descriptionTab = document.querySelector('#description .tab-description');
    if (descriptionTab && product.description) {
      descriptionTab.innerHTML = `
        <h3>${product.description.title}</h3>
        ${product.description.content}
      `;
    }

    // 8. Update tab content - Specifications
    const specificationsTab = document.querySelector('#specifications');
    if (specificationsTab && product.specifications) {
      let tableHtml = '<table class="specifications-table">';
      product.specifications.forEach(spec => {
        tableHtml += `
          <tr>
            <td>${spec.label}</td>
            <td>${spec.value}</td>
          </tr>
        `;
      });
      tableHtml += '</table>';
      specificationsTab.innerHTML = tableHtml;
    }

    // 9. Update tab content - Usage Instructions
    const usageTab = document.querySelector('#usage');
    if (usageTab && product.usageSteps) {
      let usageHtml = '<ol class="usage-steps">';
      product.usageSteps.forEach(step => {
        usageHtml += `
          <li>
            <strong>${step.title}</strong>
            ${step.content}
          </li>
        `;
      });
      usageHtml += '</ol>';
      usageTab.innerHTML = usageHtml;
    }

    // 10. Load related products (optional - nếu có section related products)
    loadRelatedProducts(product.relatedProducts);
  }

  // Hàm load sản phẩm liên quan
  function loadRelatedProducts(relatedIds) {
    // Tìm container của related products
    const relatedContainer = document.querySelector('.related-products .product-track, .related-products-grid');
    
    if (!relatedContainer || !relatedIds || relatedIds.length === 0) {
      return;
    }

    relatedContainer.innerHTML = '';
    
    relatedIds.forEach(productId => {
      const relatedProduct = PRODUCTS_DB[productId];
      if (!relatedProduct) return;

      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <div class="card-inner">
          <a href="chi_tiet_phu_kien.html?id=${relatedProduct.id}" class="img-wrapper">
            <img src="${relatedProduct.images[0]}" alt="${relatedProduct.name}" />
          </a>
          <div class="related-product-info">
            <div class="product-rating-row">
              <span class="product-rating-stars">${renderStars(relatedProduct.rating)}</span>
              <span class="rating-number">${relatedProduct.rating.toFixed(2)}</span>
            </div>
            <div class="sold-count-small">ĐÃ BÁN ${relatedProduct.soldCount}</div>
            <a href="chi_tiet_phu_kien.html?id=${relatedProduct.id}" class="product-title-link">
              <h3>${relatedProduct.name}</h3>
            </a>
            <div class="price">${formatPrice(relatedProduct.price)}</div>
            <div class="related-btn-stack">
              <a href="chi_tiet_phu_kien.html?id=${relatedProduct.id}" class="btn-buy-now-link">Bỏ vào giỏ hàng</a>
              <button class="btn-add-cart" onclick="alert('Đang chuyển đến trang đặt hàng...')">Đặt Mua Ngay</button>
            </div>
          </div>
        </div>
      `;
      
      relatedContainer.appendChild(productCard);
    });
  }

  // Initialize khi trang load xong
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadProduct);
  } else {
    loadProduct();
  }

  // Re-init thumbnail gallery click handlers sau khi render
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      const thumbnails = document.querySelectorAll('.thumbnail');
      const mainImage = document.getElementById('mainImage');
      
      thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
          // Remove active từ tất cả thumbnails
          thumbnails.forEach(t => t.classList.remove('active'));
          
          // Add active cho thumbnail được click
          this.classList.add('active');
          
          // Update main image
          const newImageSrc = this.getAttribute('data-image');
          if (mainImage) {
            mainImage.src = newImageSrc;
          }
        });
      });
    }, 100); // Delay nhỏ để đảm bảo DOM đã render xong
  });

})();
