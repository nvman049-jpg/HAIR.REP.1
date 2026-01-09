document.addEventListener('DOMContentLoaded', () => {
    
    // === 1. LOGIC MODAL TÌM KIẾM (SEARCH) ===
    const searchModal = document.getElementById('modal-search');
    const searchBtn = document.getElementById('btn-search-trigger');
    const closeSearchBtns = document.querySelectorAll('.close-search'); // Nút X và nút Hủy

    // Mở modal tìm kiếm
    searchBtn.addEventListener('click', () => {
        searchModal.style.display = 'flex';
        // Tự động focus vào ô input
        searchModal.querySelector('input').focus();
    });

    // Đóng modal tìm kiếm (gán cho cả nút X và nút Hủy)
    closeSearchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            searchModal.style.display = 'none';
        });
    });

    // === 2. LOGIC MODAL TƯ VẤN (CONSULT) ===
    const consultModal = document.getElementById('modal-consult');
    const consultBtn = document.getElementById('btn-consult-trigger');
    const closeConsultBtn = document.querySelector('.close-consult');

    consultBtn.addEventListener('click', () => {
        consultModal.style.display = 'flex';
    });

    closeConsultBtn.addEventListener('click', () => {
        consultModal.style.display = 'none';
    });

    // === 3. ĐÓNG KHI CLICK RA NGOÀI (CHUNG) ===
    window.addEventListener('click', (e) => {
        if (e.target === searchModal) {
            searchModal.style.display = 'none';
        }
        if (e.target === consultModal) {
            consultModal.style.display = 'none';
        }
    });
});
/*Tiếp phần banner --------------------------------------*/
document.addEventListener('DOMContentLoaded', function() {
    // Tự động kiểm tra video có phát không (một số trình duyệt chặn autoplay)
    const video = document.querySelector('.bg-video');
    if (video) {
        video.play().catch(() => {
            console.log("Trình duyệt yêu cầu tương tác để phát video");
        });
    }
});
/*Phần đặt lịch ngay */
document.addEventListener('DOMContentLoaded'), function() {
    const bookingForm = document.querySelector('.booking-form');

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn trang web tải lại khi gửi form
            
            const name = document.getElementById('fullname').value;
            const phone = document.getElementById('phone').value;

            // Bạn có thể thay đoạn này bằng việc gửi dữ liệu về email hoặc server
            alert(`Cảm ơn ${name}! HAIR REP 1-1 sẽ liên hệ với bạn qua số ${phone} ngay.`);
            
            bookingForm.reset(); // Xóa trắng form sau khi gửi
        });
    } }







// State lưu trữ vị trí trang hiện tại của từng tab
let slideState = { 
    'toc-nam': 0, 
    'toc-nu': 0, 
    'phu-kien': 0, 
    'cham-soc': 0 
};

// Hàm chuyển Tab
function openTab(evt, tabId) {
    // 1. Ẩn tất cả các tab content
    document.querySelectorAll('.tab-content').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    // 2. Bỏ class active ở tất cả các nút
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // 3. Hiện tab được chọn
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
        selectedTab.style.display = 'block';
        selectedTab.classList.add('active');
    }
    
    // 4. Active nút được bấm
    if(evt) evt.currentTarget.classList.add('active');
    
    // 5. Cập nhật lại vị trí slider của tab đó (đảm bảo hiển thị đúng trang đang xem)
    updateSlider(tabId);
}

// Nút Next (Tiến)
function nextSlide() { 
    moveSlide(1); 
}

// Nút Prev (Lùi)
function prevSlide() { 
    moveSlide(-1); 
}
function nextSlide() {
    slide(1);
}

function prevSlide() {
    slide(-1);
}

function slide(direction) {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return;

    const viewport = document.querySelector('.slider-viewport');
    if (!viewport) return;

    const itemsPerPage = window.innerWidth <= 768 ? 2 : 4;
    const slideWidth = viewport.offsetWidth;

    viewport.scrollBy({
        left: direction * slideWidth,
        behavior: 'smooth'
    });
}

{
    const slideWidth = viewport.offsetWidth;

    track.style.transform = `translateX(-${currentPage * slideWidth}px)`;
}
// === CÁC HÀM MODAL (POPUP) ===
function openModal() { 
    const modal = document.getElementById('booking-modal');
    if(modal) modal.style.display = 'flex'; 
}

function closeModal() { 
    const modal = document.getElementById('booking-modal');
    if(modal) modal.style.display = 'none'; 
}

// Đóng modal khi bấm ra ngoài vùng trắng
window.onclick = function(e) { 
    const modal = document.getElementById('booking-modal');
    if (e.target == modal) {
        closeModal(); 
    }
}

// Hàm chuyển trang (Demo)
function goToPage() { 
    // Thay đường dẫn trang đích của bạn vào đây
    window.location.href = "#"; 
}
/*------------------------------------------*/ 




/* Thương hiệu mình có gì  */

/*__________________________________________*/
// Đợi trang web tải xong
document.addEventListener("DOMContentLoaded", function() {
    
    // Lấy nút Back To Top
    let mybutton = document.getElementById("backToTopBtn");

    // Khi người dùng cuộn xuống 200px thì hiện nút
    window.onscroll = function() { scrollFunction() };

    function scrollFunction() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            mybutton.style.display = "block";
        } else {
            mybutton.style.display = "none";
        }
    }

    // Khi bấm vào nút thì cuộn lên đầu trang mượt mà
    mybutton.addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

// --- LOGIC CHO MODAL TÌM KIẾM ---

// Lấy các phần tử
const searchModal = document.getElementById('modal-search');
const searchBtn = document.getElementById('btn-search-trigger');
const closeSearchBtns = document.querySelectorAll('.close-search'); // Lấy tất cả nút đóng class .close-search

// Mở modal khi bấm nút kính lúp
if(searchBtn) {
    searchBtn.addEventListener('click', function() {
        searchModal.style.display = 'flex'; // Dùng flex để căn giữa màn hình
    });
}

// Đóng modal khi bấm nút X hoặc Hủy
closeSearchBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        searchModal.style.display = 'none';
    });
});

// Đóng khi bấm ra ngoài vùng trắng
window.addEventListener('click', function(e) {
    if (e.target == searchModal) {
        searchModal.style.display = 'none';
    }
});
/*=======================================================*/
/* =============================================================
   PHẦN 1: HIỆU ỨNG CUỘN TRANG (ANIMATION)
   ============================================================= */
document.addEventListener("DOMContentLoaded", function() {
    
    // Cấu hình khi nào thì hiệu ứng chạy (20% phần tử hiện ra)
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Chỉ chạy hiệu ứng 1 lần rồi thôi
            }
        });
    }, observerOptions);

    // Chọn các phần tử cần hiệu ứng bay lên
    const animatedElements = document.querySelectorAll('.feature-card, .intro-image, .intro-content');
    
    animatedElements.forEach(el => {
        // Thiết lập trạng thái ban đầu (ẩn và nằm thấp xuống)
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        
        // Bắt đầu theo dõi
        observer.observe(el);
    });

    // Thêm style cho class .visible vào trang
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});


/* =============================================================
   PHẦN 2: TÍNH NĂNG GIỎ HÀNG & HEADER BADGE
   ============================================================= */

/* =============================================================
   PHẦN 1: HIỆU ỨNG CUỘN TRANG (ANIMATION)
   ============================================================= */
document.addEventListener("DOMContentLoaded", function() {
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.feature-card, .intro-image, .intro-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});


/* =============================================================
   PHẦN 2: TÍNH NĂNG GIỎ HÀNG (ĐÃ SỬA LỖI SỐ 0)
   ============================================================= */

// 1. CẤU HÌNH & LẤY DỮ LIỆU
let cart = JSON.parse(localStorage.getItem('myCart')) || [];

// Lấy các thẻ HTML giao diện giỏ hàng
const elEmpty = document.getElementById('empty-view');
const elPopulated = document.getElementById('populated-view');
const elList = document.getElementById('cart-list-container');
const elSubtotal = document.getElementById('subtotal');
const elTotal = document.getElementById('total');
const elTitle = document.getElementById('page-title');

// Hàm định dạng tiền
const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

// --- HÀM 1: CẬP NHẬT SỐ TRÊN ICON (SỬA LỖI QUAN TRỌNG) ---
function updateHeaderCount() {
    let totalQty = 0;
    cart.forEach(item => totalQty += parseInt(item.quantity));

    // THAY ĐỔI QUAN TRỌNG: 
    // Dùng querySelectorAll để tìm TẤT CẢ các thẻ có class 'count-badge'
    // (Bất kể là trên menu mobile hay desktop đều sẽ được cập nhật)
    const allBadges = document.querySelectorAll('.count-badge');

    allBadges.forEach(badge => {
        badge.innerText = totalQty;
        // Nếu số lượng > 0 thì thêm class 'show' để hiện đỏ
        if (totalQty > 0) {
            badge.classList.add('show');
            badge.style.opacity = '1'; // Đảm bảo hiện rõ
        } else {
            badge.classList.remove('show');
            badge.style.opacity = '0'; // Ẩn đi
        }
    });

    console.log("Đã cập nhật số lượng giỏ hàng:", totalQty);
}

// --- HÀM 2: VẼ GIAO DIỆN ---
function renderCart() {
    // Luôn chạy cập nhật số trước
    updateHeaderCount();

    // Nếu không ở trang giỏ hàng (không tìm thấy ID giao diện) thì dừng
    if (!elEmpty || !elPopulated) return;

    // Cập nhật tiêu đề trang
    if (elTitle) elTitle.innerText = `Giỏ hàng (${cart.length})`;

    if (cart.length === 0) {
        elEmpty.classList.remove('hidden');
        elPopulated.classList.add('hidden');
    } else {
        elEmpty.classList.add('hidden');
        elPopulated.classList.remove('hidden');

        let html = '';
        let totalAmount = 0;

        cart.forEach((item, index) => {
            let lineTotal = item.price * item.quantity;
            totalAmount += lineTotal;
            let img = item.image || 'https://via.placeholder.com/90';

            html += `
            <div class="cart-item">
                <div style="flex: 4; display: flex; align-items: center;">
                    <div style="cursor: pointer; margin-right: 15px;" onclick="removeItem(${index})">
                        <i class="fa-regular fa-trash-can"></i>
                    </div>
                    <img src="${img}" style="width: 80px; height: 80px; object-fit: cover; margin-right: 15px; border-radius: 4px;">
                    <div>
                        <h3 style="font-size: 15px; margin: 0; font-weight: 600;">${item.name}</h3>
                        <p style="font-size: 13px; color: #777;">${fmt(item.price)}</p>
                    </div>
                </div>
                <div style="flex: 1.5; text-align: center;">
                    <div class="qty-group" style="display:flex; justify-content:center; align-items:center; border:1px solid #ddd; width:fit-content; margin:0 auto;">
                        <button onclick="updateQty(${index}, -1)" style="width:30px; height:30px; border:none; background:#fff; cursor:pointer;">-</button>
                        <input type="text" value="${item.quantity}" readonly style="width:30px; text-align:center; border:none; outline:none;">
                        <button onclick="updateQty(${index}, 1)" style="width:30px; height:30px; border:none; background:#fff; cursor:pointer;">+</button>
                    </div>
                </div>
                <div style="flex: 1.5; text-align: right; font-weight: bold;">
                    ${fmt(lineTotal)}
                </div>
            </div>
            `;
        });

        if (elList) elList.innerHTML = html;
        if (elSubtotal) elSubtotal.innerText = fmt(totalAmount);
        if (elTotal) elTotal.innerText = fmt(totalAmount);
    }
}

// --- CÁC HÀM XỬ LÝ ---
function updateQty(idx, change) {
    if (cart[idx].quantity + change > 0) {
        cart[idx].quantity += change;
        saveAndRender();
    }
}

function removeItem(idx) {
    if (confirm("Xóa sản phẩm này?")) {
        cart.splice(idx, 1);
        saveAndRender();
    }
}

function saveAndRender() {
    localStorage.setItem('myCart', JSON.stringify(cart));
    renderCart();
}

// 3. KHỞI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    renderCart();
});







    // 1. HÀM BẬT/TẮT QR CODE
    function toggleQR(show) {
        const qrBox = document.getElementById('qr-box');
        if (show) {
            qrBox.style.display = 'block'; // Hiện lên
        } else {
            qrBox.style.display = 'none';  // Ẩn đi
        }
    }

    // 2. HÀM VẼ SẢN PHẨM (Render) - Cập nhật HTML chuẩn đẹp
    function renderCheckoutItems() {
        let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        const container = document.getElementById('checkout-items-container');
        const elSub = document.getElementById('checkout-subtotal');
        const elTotal = document.getElementById('checkout-total');
        
        // Format tiền tệ
        const fmt = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

        if (cart.length === 0) {
            container.innerHTML = '<p style="text-align:center; color:#999;">Không có sản phẩm nào</p>';
            return;
        }

        let html = '';
        let total = 0;

        cart.forEach(item => {
            let money = item.price * item.quantity;
            total += money;
            let img = item.image || 'https://via.placeholder.com/60';

            // HTML NÀY KHỚP VỚI CSS Ở BƯỚC 1
            html += `
            <div class="checkout-item">
                <img src="${img}" alt="${item.name}">
                <div class="checkout-item-info">
                    <h4>${item.name}</h4>
                    <p>Số lượng: ${item.quantity}</p>
                </div>
                <div class="checkout-item-price">
                    ${fmt(money)}
                </div>
            </div>
            `;
        });

        container.innerHTML = html;
        elSub.innerText = fmt(total);
        elTotal.innerText = fmt(total);
    }

    // 3. XỬ LÝ NÚT THANH TOÁN
    function finishOrder() {
        // Kiểm tra nhập liệu cơ bản
        let name = document.getElementById('cus-name').value;
        let phone = document.getElementById('cus-phone').value;
        
        if(!name || !phone) {
            alert("Vui lòng điền Họ tên và Số điện thoại!");
            return;
        }

        alert("Đặt hàng thành công! Cảm ơn bạn.");
        localStorage.removeItem('myCart'); // Xóa giỏ hàng
        window.location.href = 'index.html'; // Về trang chủ
    }

    // Chạy ngay khi trang tải xong
    document.addEventListener('DOMContentLoaded', () => {
        renderCheckoutItems();
        // Đảm bảo ban đầu QR ẩn (vì mặc định chọn COD)
        toggleQR(false); 
    });
