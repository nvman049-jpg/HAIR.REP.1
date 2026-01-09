document.addEventListener('DOMContentLoaded', () => {
    // --- Logic cho Bộ lọc (Filter) trang Hướng dẫn (Demo) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Xóa active cũ
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            // Thêm active cho nút vừa bấm
            this.classList.add('active');
            
            // Logic lọc bài viết có thể viết thêm ở đây sau này
            console.log('Đã chọn bộ lọc:', this.innerText);
        });
    });

    // Các logic JS riêng khác cho trang này...
});