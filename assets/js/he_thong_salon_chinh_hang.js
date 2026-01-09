// Tabs
const tabs = document.querySelectorAll('.tab');
const groups = document.querySelectorAll('.salon-group');
const mapFrame = document.getElementById('mapFrame');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Show salon group
        const city = tab.dataset.city;
        groups.forEach(g => g.classList.remove('active'));
        document.getElementById(city).classList.add('active');
    });
});

// Click salon → đổi map
document.querySelectorAll('.salon-card').forEach(card => {
    card.addEventListener('click', () => {
        const address = card.dataset.map;
        mapFrame.src = `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;
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