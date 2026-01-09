document.addEventListener('DOMContentLoaded', function () {

    /* ================= TAB ================= */
    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(item.dataset.tab)?.classList.add('active');
        });
    });

    /* ================= QUANTITY ================= */
    const qtyInput = document.getElementById('quantity');

    window.increaseQty = function () {
        let current = parseInt(qtyInput.value) || 1;
        qtyInput.value = current + 1;
    };

    window.decreaseQty = function () {
        let current = parseInt(qtyInput.value) || 1;
        if (current > 1) qtyInput.value = current - 1;
    };

    /* ================= GALLERY ================= */
    const thumbItems = document.querySelectorAll('.thumb-item');
    const mainImage = document.getElementById('mainDisplay');
    let currentIndex = 0;

    function showImageByIndex(index) {
        if (!thumbItems.length) return;

        if (index < 0) index = thumbItems.length - 1;
        if (index >= thumbItems.length) index = 0;

        currentIndex = index;

        thumbItems.forEach(item => item.classList.remove('active'));
        thumbItems[currentIndex].classList.add('active');

        const img = thumbItems[currentIndex].querySelector('img');
        if (img && mainImage) mainImage.src = img.src;

        thumbItems[currentIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest'
        });
    }

    thumbItems.forEach((item, index) => {
        item.addEventListener('click', () => showImageByIndex(index));
    });

    document.querySelector('.thumb-prev')?.addEventListener('click', () => {
        showImageByIndex(currentIndex - 1);
    });

    document.querySelector('.thumb-next')?.addEventListener('click', () => {
        showImageByIndex(currentIndex + 1);
    });

    /* ================= MODAL ================= */
    const modal = document.getElementById("modalOverlay");

    window.moModal = () => modal && (modal.style.display = "flex");
    window.dongModal = () => modal && (modal.style.display = "none");

    window.addEventListener('click', e => {
        if (modal && e.target === modal) dongModal();
    });

    /* ================= ADD TO CART ================= */
    window.addToCartSimple = function (event) {
        const product = event.target.closest('.product-item');
        if (!product) return;
        const name = product.querySelector('h3')?.textContent || '';
        alert(`Đã thêm "${name}" vào giỏ hàng!`);
    };

    /* ================= COLOR SELECT ================= */
    const colorSwatches = document.querySelectorAll('.color-swatch');
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            colorSwatches.forEach(c => c.classList.remove('selected'));
            swatch.classList.add('selected');
        });
    });

    /* ================= SIZE SELECT ================= */
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(size => {
        size.addEventListener('click', () => {
            sizeOptions.forEach(s => s.classList.remove('selected'));
            size.classList.add('selected');
        });
    });

    /* ================= RESET OPTIONS ================= */
    const resetBtn = document.getElementById('resetOptions');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            sizeOptions.forEach(s => s.classList.remove('selected'));
            colorSwatches.forEach(c => c.classList.remove('selected'));
        });
    }
    // NÚT SCROLL TO TOP
    window.addEventListener('load', function() {
    const upBtn = document.querySelector('.icon.up');
    
    if (upBtn) {
        upBtn.addEventListener('click', function() {
            // Scroll to top với hiệu ứng smooth
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

    }});
});
