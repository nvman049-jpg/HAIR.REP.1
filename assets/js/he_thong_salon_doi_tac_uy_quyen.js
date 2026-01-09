// Hệ thống tương tác cho trang Salon đối tác
function initSalonMapPage() {
    const provinceFilter = document.getElementById('provinceFilter');
    const salonItems = document.querySelectorAll('.salon-item');
    const salonCountSpan = document.getElementById('salonCount');
    const mapFrame = document.getElementById('mapFrame');
    const currentSalonName = document.getElementById('currentSalonName');
    const currentSalonAddress = document.getElementById('currentSalonAddress');
    const currentSalonHours = document.getElementById('currentSalonHours');
    const currentSalonPhone = document.getElementById('currentSalonPhone');
    const directionLink = document.getElementById('directionLink');

    if (!provinceFilter || !salonItems.length) return;

    // Dữ liệu mẫu chi tiết cho từng salon (có thể mở rộng)
    const salonDetails = {
        'Dũng Xoăn': { hours: '8h00 – 20h00 (T2 - CN)', phone: '0876 165 555' },
        'Cô Vanh Tóc Thật Nam Nữ': { hours: '8h00 – 20h00 (T2 - CN)', phone: 'Liên hệ salon' },
        'Lâm Barber shop': { hours: '8h00 – 20h00 (T2 - CN)', phone: 'Liên hệ salon' },
        // Thêm thông tin cho các salon khác
    };

    // Hàm cập nhật số lượng salon hiển thị
    function updateSalonCount() {
        const visibleItems = document.querySelectorAll('.salon-item:not([style*="display: none"])').length;
        salonCountSpan.textContent = `${visibleItems} salon`;
    }

    // Hàm cập nhật bản đồ và thông tin chi tiết
    function updateMapAndInfo(selectedItem) {
        if (!selectedItem) return;

        const mapAddress = selectedItem.getAttribute('data-map');
        const salonName = selectedItem.querySelector('.salon-item-name').textContent;
        const salonAddress = selectedItem.querySelector('.salon-item-address').textContent.replace('📍', '').trim();

        // 1. Cập nhật iframe bản đồ
        if (mapFrame && mapAddress) {
            const encodedAddress = encodeURIComponent(mapAddress);
            mapFrame.src = `https://www.google.com/maps?q=${encodedAddress}&output=embed&hl=vi`;
        }

        // 2. Cập nhật thông tin chi tiết bên phải
        if (currentSalonName) currentSalonName.textContent = salonName;
        if (currentSalonAddress) currentSalonAddress.textContent = salonAddress;
        if (currentSalonHours) {
            currentSalonHours.textContent = salonDetails[salonName]?.hours || '8h00 – 20h00';
        }
        if (currentSalonPhone) {
            currentSalonPhone.textContent = salonDetails[salonName]?.phone || 'Liên hệ salon';
        }
        if (directionLink && mapAddress) {
            const encodedDir = encodeURIComponent(mapAddress);
            directionLink.href = `https://www.google.com/maps/dir/?api=1&destination=${encodedDir}`;
        }

        // 3. Đánh dấu salon đang active
        salonItems.forEach(item => item.classList.remove('active'));
        selectedItem.classList.add('active');
    }

    // 1. Sự kiện lọc theo tỉnh
    provinceFilter.addEventListener('change', function() {
        const selectedProvince = this.value;

        salonItems.forEach(item => {
            const itemProvince = item.getAttribute('data-province');
            if (selectedProvince === 'all' || itemProvince === selectedProvince) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });

        // Sau khi lọc, chọn và hiển thị salon đầu tiên còn lại
        const firstVisibleItem = document.querySelector('.salon-item:not([style*="display: none"])');
        if (firstVisibleItem) {
            updateMapAndInfo(firstVisibleItem);
        }

        updateSalonCount();
    });

    // 2. Sự kiện click vào từng salon
    salonItems.forEach(item => {
        item.addEventListener('click', function() {
            updateMapAndInfo(this);
        });
    });

    // Khởi tạo: chọn salon đầu tiên và đếm
    if (salonItems.length > 0) {
        updateMapAndInfo(salonItems[0]);
        updateSalonCount();
    }
}

// Chạy khi DOM sẵn sàng
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSalonMapPage);
} else {
    initSalonMapPage();
}

document.querySelectorAll('.salon-card').forEach(card => {
    card.addEventListener('click', () => {
        document.querySelectorAll('.salon-card')
            .forEach(i => i.classList.remove('active'));

        card.classList.add('active');

        const map = card.dataset.map;
        document.getElementById('mapFrame').src =
            `https://www.google.com/maps?q=${encodeURIComponent(map)}&output=embed`;
    });
});
document.addEventListener("DOMContentLoaded", function () {

    const provinceSelect = document.getElementById("provinceFilter");
    const districtSelect = document.getElementById("districtFilter");
    const salonCards = document.querySelectorAll(".salon-card");
    const mapFrame = document.getElementById("mapFrame");

    // ===== HUYỆN THEO TỈNH (KHỚP HTML) =====
    const districtData = {
        "thai-binh": [
            { value: "ky-ba", label: "Kỳ Bá" }
        ],
        "quang-ninh": [
            { value: "ha-long", label: "Hạ Long" }
        ],
        "nghe-an": [
            { value: "tp-vinh", label: "TP Vinh" },
            { value: "quynh-luu", label: "Quỳnh Lưu" }
        ],
        "lao-cai": [
            { value: "kim-tan", label: "Kim Tân" }
        ],
        "thai-nguyen": [
            { value: "tp-pho-yen", label: "TP Phổ Yên" },
            { value: "dinh-phung", label: "Phan Đình Phùng" }
        ]
    };

    // ===== UPDATE HUYỆN =====
    function updateDistrictOptions(province) {
        districtSelect.innerHTML = `<option value="all">Tất cả huyện</option>`;

        if (districtData[province]) {
            districtData[province].forEach(d => {
                const opt = document.createElement("option");
                opt.value = d.value;
                opt.textContent = d.label;
                districtSelect.appendChild(opt);
            });
        }
    }

    // ===== FILTER SALON =====
    function filterSalons() {
        const province = provinceSelect.value;
        const district = districtSelect.value;

        let firstVisible = null;

        salonCards.forEach(card => {
            const cardProvince = card.dataset.province;
            const cardDistrict = card.dataset.district;

            const matchProvince = (province === "all" || cardProvince === province);
            const matchDistrict = (district === "all" || cardDistrict === district);

            if (matchProvince && matchDistrict) {
                card.style.display = "flex";
                if (!firstVisible) firstVisible = card;
            } else {
                card.style.display = "none";
                card.classList.remove("active");
            }
        });

        if (firstVisible) {
            setActiveSalon(firstVisible);
        }
    }

    // ===== SET ACTIVE + MAP =====
    function setActiveSalon(card) {
        salonCards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");

        const address = card.dataset.map;
        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
    }

    // ===== EVENTS =====
    provinceSelect.addEventListener("change", function () {
        updateDistrictOptions(this.value);
        districtSelect.value = "all";
        filterSalons();
    });

    districtSelect.addEventListener("change", filterSalons);

    salonCards.forEach(card => {
        card.addEventListener("click", function () {
            setActiveSalon(this);
        });
    });

    // ===== INIT =====
    filterSalons();

});

// Xử lý form submit
document.getElementById('partnerRegistrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Lấy giá trị từ form
    const name = this.querySelector('input[type="text"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const address = this.querySelector('textarea').value;
    
    // Kiểm tra dữ liệu
    if (!name.trim()) {
        alert('Vui lòng nhập họ và tên!');
        return;
    }
    
    if (!phone.trim()) {
        alert('Vui lòng nhập số điện thoại!');
        return;
    }
    
    if (!address.trim()) {
        alert('Vui lòng nhập tên và địa chỉ salon!');
        return;
    }
    
    // Kiểm tra số điện thoại (đơn giản)
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ''))) {
        alert('Vui lòng nhập số điện thoại hợp lệ!');
        return;
    }
    
    // Gửi dữ liệu (giả lập - trong thực tế sẽ gửi đến server)
    console.log('Thông tin đăng ký salon ủy quyền:', { 
        name, 
        phone, 
        address 
    });
    
    // Hiển thị thông báo thành công
    alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất qua số điện thoại: ' + phone);
    
    // Reset form
    this.reset();
});

// Thêm hiệu ứng focus cho input
document.querySelectorAll('#partnerRegistrationForm input, #partnerRegistrationForm textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 0 2px rgba(0, 0, 0, 0.1)';
    });
    
    input.addEventListener('blur', function() {
        this.style.boxShadow = 'none';
    });
});

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

document.addEventListener("DOMContentLoaded", function() {
    // 1. Lấy dữ liệu từ localStorage
    let cart = JSON.parse(localStorage.getItem('myCart')) || [];
        
    // 2. Tính tổng số lượng
    let totalQty = 0;
    cart.forEach(item => {
        totalQty += parseInt(item.quantity);
    });

    // 3. Cập nhật số lên icon
    const badges = document.querySelectorAll('.count-badge');
    badges.forEach(badge => {
        badge.innerText = totalQty;
            
        if (totalQty > 0) {
            badge.style.display = 'flex'; // Hiện lên
        } else {
            badge.style.display = 'none'; // Ẩn đi
        }
    });
});

function moModal() { 
    var modal = document.getElementById("modalOverlay");
    if(modal) modal.style.display = "flex"; 
}
function dongModal() { 
    var modal = document.getElementById("modalOverlay");
    if(modal) modal.style.display = "none"; 
}
