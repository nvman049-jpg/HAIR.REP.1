 // --- CẤU HÌNH KỊCH BẢN CHATBOT ---
    const botData = {
        "start": {
            text: "Chào bạn! Mình là trợ lý ảo của Hair Rep. Bạn đang quan tâm đến vấn đề gì ạ?",
            options: [
                { text: "💰 Giá các loại tóc", next: "price" },
                { text: "📍 Địa chỉ cửa hàng", next: "address" },
                { text: "🔧 Chính sách bảo hành", next: "warranty" },
                { text: "📞 Gặp nhân viên tư vấn", next: "human" }
            ]
        },
        "price": {
            text: "Dạ, giá tóc bên em dao động tùy loại ạ:<br>- Tóc mái hói: từ 1.800.000đ<br>- Tóc nguyên đầu: từ 3.500.000đ<br>Bạn muốn xem kỹ hơn loại nào?",
            options: [
                { text: "Xem Tóc Nam", next: "start" }, // Quay lại đầu hoặc dẫn link
                { text: "Xem Tóc Nữ", next: "start" },
                { text: "🔙 Quay lại menu", next: "start" }
            ]
        },
        "address": {
            text: "🏠 Hair Rep hiện có các chi nhánh tại:<br>1. Quận 1, TP.HCM<br>2. Cầu Giấy, Hà Nội<br>⏰ Mở cửa: 9:00 - 21:00 hàng ngày.",
            options: [
                { text: "Cảm ơn shop", next: "end" },
                { text: "🔙 Quay lại menu", next: "start" }
            ]
        },
        "warranty": {
            text: "🛡️ Bên em bảo hành 12 tháng cho lỗi kỹ thuật và hỗ trợ cắt tỉa miễn phí trọn đời sản phẩm ạ!",
            options: [
                { text: "Tuyệt vời", next: "end" },
                { text: "🔙 Quay lại menu", next: "start" }
            ]
        },
        "human": {
            text: "Dạ, bạn vui lòng gọi Hotline 1900 xxxx hoặc để lại SĐT, nhân viên sẽ gọi lại ngay ạ.",
            options: [
                { text: "🔙 Quay lại menu", next: "start" }
            ]
        },
        "end": {
            text: "Cảm ơn bạn đã quan tâm. Chúc bạn một ngày tốt lành! ❤️",
            options: [
                { text: "Chat lại từ đầu", next: "start" }
            ]
        }
    };

    // --- LOGIC XỬ LÝ ---
    const chatContainer = document.getElementById('chatbot-container');
    const chatBody = document.getElementById('chat-body');
    let isChatOpen = false;

    function toggleChat() {
        isChatOpen = !isChatOpen;
        chatContainer.style.display = isChatOpen ? 'flex' : 'none';
        
        // Nếu mở lần đầu mà chưa có tin nhắn -> Chạy kịch bản "start"
        if(isChatOpen && chatBody.innerHTML.trim() === "") {
            botReply("start");
        }
    }

    function botReply(stepId) {
        const step = botData[stepId];
        
        // 1. Hiện tin nhắn của Bot
        addMessage(step.text, 'bot');

        // 2. Hiện các nút lựa chọn (nếu có)
        if (step.options) {
            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'bot-options';
            
            step.options.forEach(opt => {
                const btn = document.createElement('button');
                btn.className = 'btn-option';
                btn.innerText = opt.text;
                btn.onclick = () => userClickOption(opt.text, opt.next);
                optionsDiv.appendChild(btn);
            });
            
            chatBody.appendChild(optionsDiv);
            scrollToBottom();
        }
    }

    function userClickOption(text, nextStepId) {
        // 1. Xóa các nút lựa chọn cũ đi cho đỡ rối (hoặc giữ lại tùy bạn)
        const oldOptions = document.querySelectorAll('.bot-options');
        oldOptions.forEach(el => el.style.display = 'none');

        // 2. Hiện tin nhắn người dùng vừa bấm
        addMessage(text, 'user');

        // 3. Bot trả lời sau 0.5s cho tự nhiên
        setTimeout(() => {
            botReply(nextStepId);
        }, 500);
    }

    function addMessage(html, sender) {
        const div = document.createElement('div');
        div.className = sender === 'bot' ? 'msg-bot' : 'msg-user';
        div.innerHTML = html;
        chatBody.appendChild(div);
        scrollToBottom();
    }

    function scrollToBottom() {
        chatBody.scrollTop = chatBody.scrollHeight;
    }
