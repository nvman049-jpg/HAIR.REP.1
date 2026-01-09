  // 1. HÀM XỬ LÝ ĐÓNG MỞ BỘ LỌC
    function app_toggleFilter(id, element) {
        var target = document.getElementById(id);
        var icon = element.querySelector('i');
        
        if (!target) return;

        // Nếu đang ẩn -> Hiện
        if (target.classList.contains('app-hidden-filter') || target.style.display === 'none') {
            target.classList.remove('app-hidden-filter');
            target.style.display = 'flex';
            if(icon) icon.className = "fa fa-chevron-up";
        } 
        // Nếu đang hiện -> Ẩn
        else {
            target.classList.add('app-hidden-filter');
            target.style.display = 'none';
            if(icon) icon.className = "fa fa-chevron-down";
        }
    }

    // 2. HÀM XEM THÊM (Sử dụng logic của wig-article)
    function app_toggleReadMore() {
        var article = document.getElementById('wigArticle');
        var btn = document.getElementById('read-more-btn');
        var overlay = document.querySelector('.gradient-overlay');

        if (!article) return;

        if (article.classList.contains('app-expanded')) {
            // Thu gọn
            article.classList.remove('app-expanded');
            btn.innerHTML = 'Xem thêm';
            if (overlay) overlay.style.opacity = '1';
        } else {
            // Mở rộng
            article.classList.add('app-expanded');
            btn.innerHTML = 'Thu gọn';
            if (overlay) overlay.style.opacity = '0';
        }
    }

    // 3. HÀM GỬI THÔNG TIN
    function app_guiThongTin(e) {
        e.preventDefault();
        alert("Đã nhận thông tin đặt lịch!");
    }

    // 4. LOGIC LỌC SẢN PHẨM (CHẠY KHI LOAD XONG)
    document.addEventListener("DOMContentLoaded", function() {
        var inputs = document.querySelectorAll('.sidebar input');
        
        // Hàm lọc chính
        function runFilter() {
            var products = document.querySelectorAll('.product-card');
            var countLabel = document.getElementById('product-count');
            
            // Thu thập dữ liệu
            var checkedStyles = Array.from(document.querySelectorAll('input[name="style"]:checked')).map(el => el.value);
            var checkedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(el => el.value);
            var checkedRatings = Array.from(document.querySelectorAll('input[name="rating"]:checked')).map(el => el.value);
            var priceRadio = document.querySelector('input[name="price"]:checked');
            
            var minP = 0, maxP = Infinity;
            if (priceRadio && priceRadio.value !== 'all') {
                var parts = priceRadio.value.split('-');
                if(parts.length > 1) {
                    minP = parseInt(parts[0]);
                    maxP = parseInt(parts[1]);
                }
            }

            var visibleCount = 0;

            // Lọc từng sản phẩm
            products.forEach(function(p) {
                var style = p.getAttribute('data-style');
                var color = p.getAttribute('data-color');
                var price = parseInt(p.getAttribute('data-price') || 0);
                var rating = Math.floor(parseFloat(p.getAttribute('data-rating') || 0)).toString();

                var pass = true;
                if (checkedStyles.length > 0 && !checkedStyles.includes(style)) pass = false;
                if (pass && (price < minP || price > maxP)) pass = false;
                if (pass && checkedColors.length > 0 && !checkedColors.includes(color)) pass = false;
                if (pass && checkedRatings.length > 0 && !checkedRatings.includes(rating)) pass = false;

                if (pass) {
                    p.classList.remove('app-hidden-product'); // Hiện lại
                    visibleCount++;
                } else {
                    p.classList.add('app-hidden-product'); // Ẩn đi
                }
            });
            
            if (countLabel) countLabel.innerText = visibleCount + " sản phẩm";
        }

        // Gắn sự kiện cho các input
        inputs.forEach(function(input) {
            input.addEventListener('change', runFilter);
        });

        // 5. Cập nhật icon giỏ hàng (Code cũ của bạn)
        let myCart = JSON.parse(localStorage.getItem('myCart')) || [];
        let totalQty = 0;
        myCart.forEach(item => { totalQty += parseInt(item.quantity); });
        const badges = document.querySelectorAll('.cart-count-badge');
        badges.forEach(badge => {
            badge.innerText = totalQty;
            if (totalQty > 0) {
                badge.style.opacity = '1';
                badge.style.visibility = 'visible';
            } else {
                badge.style.opacity = '0';
            }
        });
    });