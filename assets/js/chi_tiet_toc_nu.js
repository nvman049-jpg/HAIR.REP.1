// Thêm vào file script.js
function addToCartSimple() {
    const productName = event.target.closest('.product-item').querySelector('h3').textContent;
    alert(`Đã thêm "${productName}" vào giỏ hàng!`);
}

// Thay đổi onclick trong HTML
// Thay: onclick="addToCart()" 
// Thành: onclick="addToCartSimple()"

        // Lấy thẻ Modal Quy trình
        var modal = document.getElementById("modalOverlay");

        // Hàm mở Modal
        function moModal() {
            modal.style.display = "flex";
        }

        // Hàm đóng Modal
        function dongModal() {
            modal.style.display = "none";
        }

        // Đóng khi bấm ra vùng đen bên ngoài
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        // Hàm giả lập gửi thông tin
        function guiThongTin(e) {
            e.preventDefault(); // Chặn tải lại trang
            alert("Đã nhận thông tin đặt lịch!");
            dongModal();
        }

    const tabItems = document.querySelectorAll('.tab-item');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabItems.forEach(item => {
        item.addEventListener('click', () => {
            tabItems.forEach(i => i.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            item.classList.add('active');
            document.getElementById(item.dataset.tab).classList.add('active');
        });
    });
// Chọn tùy chọn size/màu/đế tóc
document.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', function() {
        // Xóa selected khỏi tất cả các item cùng nhóm
        const parent = this.closest('.option-group');
        parent.querySelectorAll('.option-item').forEach(el => {
            el.classList.remove('selected');
        });
        // Thêm selected cho item được click
        this.classList.add('selected');
    });
});

// Chọn màu sắc
document.querySelectorAll('.color-circle').forEach(circle => {
    circle.addEventListener('click', function() {
        document.querySelectorAll('.color-circle').forEach(el => {
            el.classList.remove('selected');
        });
        this.classList.add('selected');
    });
});

// Tăng/giảm số lượng
const quantityInput = document.querySelector('.quantity-input');
document.querySelector('.quantity-control').addEventListener('click', function(e) {
    if (e.target.classList.contains('quantity-btn')) {
        let currentValue = parseInt(quantityInput.value) || 1;
        
        if (e.target.textContent === '+') {
            quantityInput.value = currentValue + 1;
        } else if (e.target.textContent === '-' && currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    }
});

// Validate số lượng
quantityInput.addEventListener('change', function() {
    let value = parseInt(this.value);
    if (isNaN(value) || value < 1) {
        this.value = 1;
    }
});

// GALLERY CHUYỂN ẢNH
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbs img');
    const mainImages = document.querySelectorAll('.main-image img');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    const totalImages = thumbnails.length;
    
    // Hàm chuyển ảnh
    function showImage(index) {
        // Cập nhật currentIndex
        currentIndex = index;
        
        // Cập nhật thumbnail
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active-thumb', i === currentIndex);
        });
        
        // Cập nhật ảnh chính
        mainImages.forEach((img, i) => {
            img.classList.toggle('active-image', i === currentIndex);
        });
        
        // Scroll thumbnail vào view nếu cần
        const activeThumb = thumbnails[currentIndex];
        activeThumb.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center'
        });
    }
    
    // Sự kiện click thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.addEventListener('click', function() {
            showImage(index);
        });
    });
    
    // Nút Previous
    prevBtn.addEventListener('click', function() {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) newIndex = totalImages - 1;
        showImage(newIndex);
    });
    
    // Nút Next
    nextBtn.addEventListener('click', function() {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalImages) newIndex = 0;
        showImage(newIndex);
    });
    
    // Tự động chuyển ảnh mỗi 5 giây (tùy chọn)
    let slideInterval = setInterval(() => {
        let newIndex = currentIndex + 1;
        if (newIndex >= totalImages) newIndex = 0;
        showImage(newIndex);
    }, 5000);
    
    // Dừng tự động chuyển khi hover
    const gallery = document.querySelector('.product-gallery');
    gallery.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    gallery.addEventListener('mouseleave', () => {
        slideInterval = setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= totalImages) newIndex = 0;
            showImage(newIndex);
        }, 5000);
    });
    
    // Chạm chuyển ảnh trên mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    gallery.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    gallery.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - next
                let newIndex = currentIndex + 1;
                if (newIndex >= totalImages) newIndex = 0;
                showImage(newIndex);
            } else {
                // Swipe right - previous
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = totalImages - 1;
                showImage(newIndex);
            }
        }
    }
});

// XỬ LÝ FORM ĐẶT LỊCH TƯ VẤN (GIỐNG HÌNH)
document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('simpleBookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Lấy giá trị form
            const nameInput = this.querySelector('input[type="text"]');
            const phoneInput = this.querySelector('input[type="tel"]');
            
            const name = nameInput.value.trim();
            const phone = phoneInput.value.trim();
            
            // Validate
            if (!name) {
                alert('Vui lòng nhập họ và tên');
                nameInput.focus();
                return;
            }
            
            if (!phone) {
                alert('Vui lòng nhập số điện thoại');
                phoneInput.focus();
                return;
            }
            
            if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(phone.replace(/\s/g, ''))) {
                alert('Vui lòng nhập số điện thoại hợp lệ (10 số, bắt đầu bằng 03, 05, 07, 08, 09)');
                phoneInput.focus();
                return;
            }
            
            // Hiệu ứng loading
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.querySelector('.btn-text').textContent;
            submitBtn.querySelector('.btn-text').textContent = 'Đang gửi...';
            submitBtn.disabled = true;
            
            // Giả lập gửi dữ liệu
            setTimeout(() => {
                // Thông báo thành công
                alert(`Cảm ơn ${name}! Chúng tôi đã nhận thông tin đặt lịch tư vấn. Sẽ liên hệ với bạn qua số ${phone} trong ít phút.`);
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.querySelector('.btn-text').textContent = originalText;
                submitBtn.disabled = false;
                
                // Log
                console.log('Đã đặt lịch tư vấn:', { name, phone });
                
            }, 1000);
        });
    }
    
    // Format số điện thoại
    const phoneInput = document.querySelector('input[type="tel"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = value;
                } else if (value.length <= 6) {
                    value = value.replace(/(\d{3})(\d+)/, '$1 $2');
                } else if (value.length <= 10) {
                    value = value.replace(/(\d{3})(\d{3})(\d+)/, '$1 $2 $3');
                } else {
                    value = value.substring(0, 10);
                    value = value.replace(/(\d{3})(\d{3})(\d{4})/, '$1 $2 $3');
                }
            }
            
            this.value = value;
        });
    }
    
    // Hotline click
    const hotlineBox = document.querySelector('.hotline-box');
    if (hotlineBox) {
        hotlineBox.addEventListener('click', function() {
            const phoneNumber = '0876165555';
            const confirmCall = confirm(`Bạn có muốn gọi đến hotline ${phoneNumber}?`);
            
            if (confirmCall) {
                window.location.href = `tel:${phoneNumber}`;
            }
        });
        
        // Hiệu ứng hover hotline
        hotlineBox.style.cursor = 'pointer';
        hotlineBox.style.transition = 'all 0.3s';
        
        hotlineBox.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f5f5f5';
            this.style.borderColor = '#000000';
            this.style.transform = 'translateY(-2px)';
        });
        
        hotlineBox.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.style.borderColor = '#eeeeee';
            this.style.transform = 'translateY(0)';
        });
    }

    const btnUp = document.querySelector('.icon.up');
    if (btnUp) {
        btnUp.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    } else {
        console.log('Không tìm thấy nút .icon.up');
    }
});