document.addEventListener("DOMContentLoaded", function() {

    // =============================================================
    // 1. GLOBAL: HÀM MỞ MODAL
    // =============================================================
    window.openModal = function() {
        const modal = document.getElementById('modal-consult');
        if (modal) {
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('open');
            }, 10);
        } else {
            console.error("Lỗi: Không tìm thấy ID 'modal-consult' trong HTML");
        }
    };

    // =============================================================
    // 2. LOGIC TỔNG HỢP: CLICK (Header, Đóng Modal, Tìm kiếm)
    // =============================================================
    document.body.addEventListener('click', function(e) {
        
        // --- A. Nút Đặt Lịch trên Header ---
        const triggerBtn = e.target.closest('#btn-consult-trigger');
        if (triggerBtn) {
            e.preventDefault();
            window.openModal();
        }

        // --- B. Đóng Modal Đặt Lịch ---
        if (e.target.closest('.close-consult') || e.target.id === 'modal-consult') {
            const modal = document.getElementById('modal-consult');
            if (modal) {
                modal.classList.remove('open');
                setTimeout(() => { modal.style.display = 'none'; }, 300);
            }
        }

        // --- C. Logic Tìm Kiếm ---
        // Mở
        const searchTrigger = e.target.closest('#btn-search-trigger');
        if (searchTrigger) {
            e.preventDefault();
            const modal = document.getElementById('modal-search');
            const input = document.getElementById('search-input-field');
            if (modal) {
                modal.classList.add('open');
                setTimeout(() => { if(input) input.focus(); }, 100);
            }
        }
        // Đóng
        if (e.target.closest('.close-search') || e.target.id === 'modal-search') {
            const modal = document.getElementById('modal-search');
            if (modal) modal.classList.remove('open');
        }
    });

    // Đóng bằng phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modalConsult = document.getElementById('modal-consult');
            if (modalConsult && modalConsult.classList.contains('open')) {
                modalConsult.classList.remove('open');
                setTimeout(() => modalConsult.style.display = 'none', 300);
            }
            const modalSearch = document.getElementById('modal-search');
            if (modalSearch) modalSearch.classList.remove('open');
        }
    });

    // =============================================================
    // 3. XỬ LÝ FORM ĐẶT LỊCH TRONG MODAL (QUAN TRỌNG)
    // =============================================================
    // Lưu ý: Phải có id="modal-booking-form" trong HTML thì đoạn này mới chạy
    const modalForm = document.getElementById('modal-booking-form');

    if (modalForm) {
        modalForm.addEventListener('submit', function(event) {
            // CHẶN LOAD LẠI TRANG
            event.preventDefault(); 
            
            // Lấy dữ liệu (chấp nhận cả name hoặc type để tìm input)
            const nameInput = modalForm.querySelector('input[name="fullname"]') || modalForm.querySelector('input[type="text"]');
            const phoneInput = modalForm.querySelector('input[name="phone"]') || modalForm.querySelector('input[type="tel"]');
            
            const name = nameInput ? nameInput.value : "Khách hàng";
            const phone = phoneInput ? phoneInput.value : "...";

            // Hiện thông báo
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Đăng ký thành công!',
                    text: `Cảm ơn ${name}! Chúng tôi sẽ liên hệ số ${phone} ngay.`,
                    icon: 'success',
                    confirmButtonText: 'Đóng',
                    confirmButtonColor: '#000',
                    timer: 5000,
                    timerProgressBar: true
                }).then((result) => {
                    modalForm.reset(); // Xóa chữ sau khi đóng thông báo
                    
                    // Đóng modal
                    const modal = document.getElementById('modal-consult');
                    if (modal) {
                        modal.classList.remove('open');
                        setTimeout(() => { modal.style.display = 'none'; }, 300);
                    }
                });
            } else {
                alert(`Cảm ơn ${name}! Chúng tôi sẽ gọi lại cho số ${phone}.`);
                modalForm.reset();
            }
        });
    } else {
        // Nếu quên đặt ID trong HTML, dòng này sẽ báo lỗi trong F12 Console
        console.error("LỖI: Bạn chưa thêm id='modal-booking-form' vào thẻ <form> trong Modal HTML!");
    }

    // =============================================================
    // 4. XỬ LÝ FORM Ở CHÂN TRANG (FOOTER)
    // =============================================================
    const footerForm = document.querySelector('.booking-form');
    if (footerForm) {
        footerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('fullname') ? document.getElementById('fullname').value : "Khách";
            const phone = document.getElementById('phone') ? document.getElementById('phone').value : "";

            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Đã nhận thông tin!',
                    text: `Cảm ơn ${name}! HAIR REP 1-1 sẽ liên hệ SĐT ${phone} sớm nhất.`,
                    icon: 'success',
                    confirmButtonText: 'OK',
                    confirmButtonColor: '#000'
                });
            } else {
                alert(`Đã nhận thông tin của ${name}!`);
            }
            footerForm.reset();
        });
    }

    // =============================================================
    // 5. CẬP NHẬT GIỎ HÀNG
    // =============================================================
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('myCart')) || [];
            let totalQty = 0;
            cart.forEach(item => totalQty += parseInt(item.quantity || 0));

            const badges = document.querySelectorAll('.count-badge, .cart-count-badge');
            if (badges.length === 0) return;

            badges.forEach(badge => {
                badge.innerText = totalQty;
                if (totalQty > 0) {
                    badge.style.display = 'flex'; 
                    badge.style.opacity = '1';
                    badge.style.visibility = 'visible';
                } else {
                    badge.style.display = 'none';
                    badge.style.opacity = '0';
                }
            });
        } catch (error) {
            console.error("Lỗi giỏ hàng:", error);
        }
    }

    updateCartCount();
    setInterval(updateCartCount, 150);
    window.addEventListener('storage', updateCartCount);
});




// --- 1. DỮ LIỆU SẢN PHẨM (Bạn nhớ thay link thật vào đây) ---
const productDatabase = [
    { id: 1, name: "Tóc giả Two Block làm từ tóc thật ", image: "/assets/images/Tocgianam/Tóc giả nam Two Block cho tóc hói làm từ tóc thật.webp", link: "../../../pages/Sản phẩm và dịch vụ/Tóc giả nam/Chi tiết tóc nam/chi_tiet_toc_nam.html" },
    { id: 2, name: "Tóc Giả Nữ Mái Kẹp Bằng Tóc Thật ", image: "/assets/images/chitiettocnu/toc-gia-nu.png", link: "../../../pages/Sản phẩm và dịch vụ/Tóc giả nữ/chi tiết tóc nữ/chi_tiet_toc_nu.html" },
    { id: 3, name: "Băng Dính Dán Tóc Giả Nam VTG KD06", image: "/assets/images/trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-4.webp", link: "/assets/images/Tocgianam/Tóc giả nam Two Block cho tóc hói làm từ tóc thật.webp", link: "../../../pages/Sản phẩm và dịch vụ/Phụ kiện tóc giả/chi_tiet_phu_kien.html" },
];

// --- 2. KHAI BÁO HÀM TOÀN CỤC (Để sửa lỗi nút Tìm trong HTML) ---
window.handleSearchSubmit = function(e) {
    e.preventDefault(); // Chặn load lại trang
    const input = document.getElementById('search-input-field');
    if (!input) return;
    
    const keyword = input.value.toLowerCase().trim();
    // Tìm chính xác hoặc tương đối
    const match = productDatabase.find(p => p.name.toLowerCase().includes(keyword));
    
    if (match) {
        window.location.href = match.link; // Chuyển trang
    } else {
        alert('Không tìm thấy sản phẩm nào khớp với từ khóa: ' + keyword);
    }
};

window.closeSearch = function() {
    const modal = document.getElementById('modal-search');
    if (modal) modal.classList.remove('active');
    // Ẩn gợi ý khi đóng
    const box = document.getElementById('suggestions-container');
    if (box) box.classList.remove('show');
};

// --- 3. LẮNG NGHE SỰ KIỆN TOÀN TRANG (Xử lý vấn đề Header load chậm) ---
document.addEventListener('input', function(e) {
    // Chỉ chạy khi người dùng gõ vào ô tìm kiếm đúng ID
    if (e.target && e.target.id === 'search-input-field') {
        const keyword = e.target.value.toLowerCase().trim();
        const suggestionBox = document.getElementById('suggestions-container');
        
        if (!suggestionBox) return;

        suggestionBox.innerHTML = ''; // Xóa cũ

        if (keyword.length === 0) {
            suggestionBox.classList.remove('show');
            return;
        }

        // Lọc sản phẩm
        const matched = productDatabase.filter(p => p.name.toLowerCase().includes(keyword));

        if (matched.length > 0) {
            suggestionBox.classList.add('show');
            matched.forEach(product => {
                const div = document.createElement('div');
                div.classList.add('suggestion-item');
                div.innerHTML = `
                    <img src="${product.image}" class="s-image">
                    <div class="s-info">
                        <span class="s-name">${product.name}</span>
                  
                    </div>
                `;
                // Bắt sự kiện click vào dòng gợi ý
                div.addEventListener('click', function() {
                    window.location.href = product.link;
                });
                suggestionBox.appendChild(div);
            });
        } else {
            suggestionBox.classList.add('show');
            suggestionBox.innerHTML = '<div style="padding:10px; text-align:center;">Không có kết quả</div>';
        }
    }
});