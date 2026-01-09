/**
 * Hàm tải thành phần Header/Footer
 * @param {string} selector - ID của thẻ div (ví dụ: "#header-placeholder")
 * @param {string} filePath - Đường dẫn tới file HTML (ví dụ: "components/header.html")
 */
async function loadComponent(selector, filePath) {
    try {
        const element = document.querySelector(selector);
        if (!element) return; // Nếu không có thẻ div thì dừng lại

        // 1. Tải file HTML
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Không tìm thấy file: ${filePath}`);
        
        const html = await response.text();
        element.innerHTML = html;

        console.log(`✅ Đã tải xong: ${filePath}`);

        // 2. Kích hoạt lại các Script (Quan trọng cho Chatbot/AI/Menu)
        // Nếu bạn dùng file script.js chung, hãy đảm bảo nó chạy sau khi header tải xong
        // Hoặc gọi hàm khởi động lại ở đây (nếu có).
        
        // Ví dụ: restartMainScript(); 

    } catch (error) {
        console.error(`❌ Lỗi tải component [${filePath}]:`, error);
        element.innerHTML = `<p style="color:red; text-align:center;">Lỗi: Không tìm thấy file ${filePath}</p>`;
    }
}