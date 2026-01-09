document.addEventListener("DOMContentLoaded", function() {
    // 1. Tạo HTML cho thanh tiện ích
    const toolbarHTML = `
        <div class="floating-toolbar">
            <a href="https://zalo.me/0876165555" target="_blank" class="ft-btn zalo-btn" title="Chat Zalo">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Icon_of_Zalo.svg/1200px-Icon_of_Zalo.svg.png" alt="Zalo">
            </a>

            <a href="tel:0876165555" class="ft-btn phone-btn" title="Gọi ngay">
                <i class="fa fa-phone"></i>
            </a>

            <a href="https://m.me/vuatocgia" target="_blank" class="ft-btn mess-btn" title="Chat Messenger">
                <i class="fab fa-facebook-messenger"></i>
            </a>

            <a href="mailto:cskh@vuatocgia.com" class="ft-btn mail-btn" title="Gửi Email">
                <i class="fa fa-envelope"></i>
            </a>

            <div class="ft-btn up-btn" id="scrollToTopBtn" title="Lên đầu trang">
                <i class="fa fa-arrow-up"></i>
            </div>
        </div>
    `;

    // 2. Chèn HTML vào cuối thẻ body
    document.body.insertAdjacentHTML('beforeend', toolbarHTML);

    // 3. Thêm CSS trực tiếp bằng JS (để không phải sửa file CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        /* Khung bao ngoài */
        .floating-toolbar {
            position: fixed;
            right: 15px;
            bottom: 30px; /* Cách đáy màn hình */
            display: flex;
            flex-direction: column;
            gap: 12px; /* Khoảng cách giữa các nút */
            z-index: 9999;
        }

        /* Style chung cho các nút */
        .ft-btn {
            width: 45px;
            height: 45px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            text-decoration: none;
            color: white;
            font-size: 20px;
        }

        .ft-btn:hover {
            transform: translateY(-3px); /* Hiệu ứng nảy lên khi di chuột */
            box-shadow: 0 6px 10px rgba(0,0,0,0.3);
        }

        /* 1. Zalo (Màu xanh dương đậm/hoặc trắng tùy ảnh) */
        .zalo-btn {
            background-color: #fff; /* Nền trắng cho logo Zalo nổi */
            overflow: hidden;
        }
        .zalo-btn img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        /* 2. Phone (Màu xanh lá) */
        .phone-btn {
            background-color: #00e676; /* Xanh lá tươi giống hình */
        }
        .phone-btn i {
            animation: ring 1.5s infinite; /* Hiệu ứng rung lắc */
        }

        /* 3. Messenger (Màu xanh dương) */
        .mess-btn {
            background-color: #0084ff;
        }

        /* 4. Mail (Màu đen) */
        .mail-btn {
            background-color: #000;
        }

        /* 5. Up Arrow (Màu đen) */
        .up-btn {
            background-color: #000;
            display: none; /* Mặc định ẩn */
        }

        /* Hiệu ứng rung cho nút gọi */
        @keyframes ring {
            0% { transform: rotate(0deg); }
            10% { transform: rotate(-25deg); }
            20% { transform: rotate(25deg); }
            30% { transform: rotate(-25deg); }
            40% { transform: rotate(25deg); }
            50% { transform: rotate(0deg); }
            100% { transform: rotate(0deg); }
        }

        /* Responsive: Trên mobile thu nhỏ xíu cho đỡ vướng */
        @media (max-width: 768px) {
            .floating-toolbar {
                right: 10px;
                bottom: 20px;
                gap: 10px;
            }
            .ft-btn {
                width: 40px;
                height: 40px;
                font-size: 18px;
            }
        }
    `;
    document.head.appendChild(style);

    // 4. Logic cho nút "Lên đầu trang"
    const upBtn = document.getElementById("scrollToTopBtn");
    
    // Bắt sự kiện cuộn chuột
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            upBtn.style.display = "flex"; // Hiện khi cuộn xuống 300px
        } else {
            upBtn.style.display = "none"; // Ẩn khi ở trên cùng
        }
    });

    // Bắt sự kiện click để cuộn lên
    upBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Cuộn mượt
        });
    });
});