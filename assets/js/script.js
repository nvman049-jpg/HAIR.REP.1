
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('modal-search');
    const input = document.getElementById('search-input-field');
    
    // Biến chặn click nhầm lúc vừa mở
    let isModalOpen = false;

    // 1. MỞ MODAL (Dùng click cho body để bắt sự kiện)
    document.body.addEventListener('click', function(e) {
        // Tìm xem người dùng có bấm vào nút kính lúp không
        const trigger = e.target.closest('#btn-search-trigger');
        
        if (trigger) {
            e.preventDefault(); // Ngăn chặn hành vi mặc định
            e.stopPropagation(); // Ngăn sự kiện lan ra ngoài
            
            if (modal) {
                modal.classList.add('open'); // Hiện modal
                isModalOpen = true;
                
                // Focus vào ô nhập sau 100ms
                setTimeout(() => {
                    if(input) input.focus();
                }, 100);
            }
        }
    });

    // 2. ĐÓNG MODAL
    if (modal) {
        modal.addEventListener('click', function(e) {
            // Nếu bấm vào vùng nền trắng (overlay) HOẶC nút đóng (X)
            if (e.target === modal || e.target.closest('.close-search')) {
                // Chỉ đóng nếu modal đã mở ổn định
                if (isModalOpen) {
                    modal.classList.remove('open');
                    isModalOpen = false;
                }
            }
        });
    }

    // Đóng bằng phím ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && isModalOpen) {
            modal.classList.remove('open');
            isModalOpen = false;
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

// Hàm mở Modal
// Đợi trang load xong mới chạy
    ddocument.addEventListener('DOMContentLoaded', function() {
    // Xử lý submit form
    const bookingForm = document.getElementById('booking-form');
    if(bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn load lại trang
            submitBooking();
        });
    }

    // Click ra ngoài để đóng
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('booking-modal');
        if (e.target === modal) {
            closeModal();
        }
    });
});

function openModal() {
    const modal = document.getElementById('booking-modal');
    if(modal) {
        modal.style.display = 'flex'; // Dòng này giờ sẽ hoạt động vì CSS đã bỏ !important
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('booking-modal');
    if(modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Reset form khi đóng
        const form = document.getElementById('booking-form');
        if(form) form.reset();
    }
}

function submitBooking() {
    // Lấy value dựa trên ID đã thêm ở HTML
    const nameInput = document.getElementById('customer-name');
    const phoneInput = document.getElementById('customer-phone');
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    // Validate đơn giản
    const phoneRegex = /^[0-9]{10}$/;
    if(!phoneRegex.test(phone)) {
        alert('Số điện thoại không hợp lệ! Vui lòng nhập 10 chữ số.');
        return;
    }

    alert('✅ Đã gửi thông tin!\n\nTên: ' + name + '\nSĐT: ' + phone);
    closeModal();
}
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
// --- JS CHO PHẦN THƯƠNG HIỆU (Animation khi cuộn) ---
document.addEventListener("DOMContentLoaded", function() {
    
    const observerOptions = {
        threshold: 0.2 // Khi 20% phần tử hiện ra thì chạy hiệu ứng
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Chỉ chạy 1 lần
            }
        });
    }, observerOptions);

    // Chọn các phần tử cần hiệu ứng
    const animatedElements = document.querySelectorAll('.feature-card, .intro-image, .intro-content');
    
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
});

// Thêm class visible vào CSS động bằng JS (hoặc bạn thêm vào file css cũng được)
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    .visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(styleSheet);
/*=============================================================*/ 


/* */ 

function openVtgTab(evt, tabName) {
        // 1. Ẩn tất cả nội dung tab
        var i, tabContent, tabBtn;
        tabContent = document.getElementsByClassName("vtg-tab-content");
        for (i = 0; i < tabContent.length; i++) {
            tabContent[i].style.display = "none";
            tabContent[i].classList.remove("active-content");
        }

        // 2. Xóa class 'active' khỏi tất cả các nút
        tabBtn = document.getElementsByClassName("vtg-tab-btn");
        for (i = 0; i < tabBtn.length; i++) {
            tabBtn[i].className = tabBtn[i].className.replace(" active", "");
        }

        // 3. Hiển thị tab hiện tại và thêm class 'active' cho nút được bấm
        document.getElementById(tabName).style.display = "block";
        setTimeout(function() {
            document.getElementById(tabName).classList.add("active-content");
        }, 10); // Timeout nhỏ để kích hoạt animation
        evt.currentTarget.className += " active";
    }
// Hàm cập nhật số lượng trên icon
    function updateCartCount() {
        // 1. Lấy dữ liệu giỏ hàng
        const cart = JSON.parse(localStorage.getItem('myCart')) || [];
        
        // 2. Tính tổng số lượng (Ví dụ: Mua 2 cái áo + 1 cái quần = 3)
        let totalQty = 0;
        cart.forEach(item => {
            totalQty += item.quantity;
        });

        // 3. Hiển thị lên HTML
        const badge = document.getElementById('cart-count');
        if (badge) {
            badge.innerText = totalQty;
            
            // Nếu có hàng (>0) thì hiện số đỏ, ngược lại thì ẩn
            if (totalQty > 0) {
                badge.classList.add('show');
            } else {
                badge.classList.remove('show');
            }
        }
    }

    // Chạy hàm này ngay khi tải trang
    document.addEventListener('DOMContentLoaded', updateCartCount);


   