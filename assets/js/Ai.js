 // --- CẤU HÌNH BIẾN TOÀN CỤC ---
    const aisModal = document.getElementById('aisSearchModal');
    const aisVideo = document.getElementById('aisVideo');
    let aisStream = null;
    let isModelsLoaded = false; // Biến kiểm tra xem AI đã tải xong chưa

    document.addEventListener("DOMContentLoaded", function() {
        // 1. Chặn nút tìm kiếm cũ & Gắn nút Banner
        const oldButton = document.getElementById('btn-search-trigger');
        if(oldButton) {
            const newButton = oldButton.cloneNode(true);
            newButton.id = 'btn-ai-search-pro'; 
            oldButton.parentNode.replaceChild(newButton, oldButton);
            newButton.addEventListener('click', (e) => { e.preventDefault(); aisOpenModal(); });
        }
        
        // 2. TẢI MODEL AI NGAY KHI VÀO TRANG (Để lúc khách bấm là dùng được ngay)
        loadAIModels();
    });

    // --- HÀM TẢI TRÍ TUỆ NHÂN TẠO (MODEL) ---
    async function loadAIModels() {
        try {
            // --- SỬA LẠI ĐƯỜNG DẪN MỚI TẠI ĐÂY (Link JSDelivr siêu nhanh) ---
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';            
            await Promise.all([
                // Tải bộ não nhận diện khuôn mặt
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                // Tải bộ não nhận diện giới tính/tuổi
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL)
            ]);
            
            console.log("✅ AI Models đã tải xong!");
            isModelsLoaded = true;
        } catch (error) {
            console.error("❌ Lỗi tải AI:", error);
            alert("Lỗi: Không tải được AI. Bạn hãy nhấn phím F12 và chọn tab Console để xem chi tiết lỗi đỏ nhé!");
        }
    }


    // --- CÁC HÀM GIAO DIỆN ---
    function aisOpenModal() { 
        aisModal.style.display = 'flex'; 
        aisModal.style.zIndex = '999999'; 
    }
    
    function aisCloseModal() { 
        aisModal.style.display = 'none'; 
        aisStopCamera(); 
        aisResetUI(); 
    }

    function aisSwitchTab(type) {
        if (type === 'text') {
            document.getElementById('ais-text-view').style.display = 'block';
            document.getElementById('ais-ai-view').style.display = 'none';
            document.getElementById('aisTabText').classList.add('active');
            document.getElementById('aisTabAI').classList.remove('active');
            aisStopCamera();
        } else {
            document.getElementById('ais-text-view').style.display = 'none';
            document.getElementById('ais-ai-view').style.display = 'block';
            document.getElementById('aisTabText').classList.remove('active');
            document.getElementById('aisTabAI').classList.add('active');
        }
    }

    function openAiDirectly() {
        aisOpenModal();
        aisSwitchTab('ai');
    }

    // --- XỬ LÝ CAMERA & QUÉT AI ---
    async function aisHandleAction() {
        const btn = document.getElementById('aisBtnAction');
        const scanLine = document.getElementById('aisScanLine');
        const resultBox = document.getElementById('aisResultBox');
        const camText = document.querySelector('.ais-camera-text');

        // BƯỚC 1: BẬT CAMERA
        if (!aisStream) {
            try {
                aisStream = await navigator.mediaDevices.getUserMedia({ video: true });
                aisVideo.srcObject = aisStream;
                aisVideo.style.display = 'block';
                camText.style.display = 'none';
                
                if(isModelsLoaded) {
                    btn.innerText = "✨ QUÉT & PHÂN TÍCH";
                } else {
                    btn.innerText = "Đang tải dữ liệu AI...";
                    btn.disabled = true;
                    // Chờ model tải xong thì mở nút
                    const checkLoad = setInterval(() => {
                        if(isModelsLoaded) {
                            btn.innerText = "✨ QUÉT & PHÂN TÍCH";
                            btn.disabled = false;
                            clearInterval(checkLoad);
                        }
                    }, 1000);
                }
                resultBox.style.display = 'none';
            } catch (e) { 
                alert("Vui lòng cho phép mở Camera!"); 
            }
            return;
        } 

        // BƯỚC 2: TIẾN HÀNH QUÉT THỰC TẾ
        scanLine.style.display = 'block';
        btn.innerText = "AI đang nhìn bạn...";
        btn.disabled = true;

        // Đợi 1 chút cho hiệu ứng đẹp
        setTimeout(async () => {
            if (!isModelsLoaded) {
                alert("AI chưa sẵn sàng, vui lòng thử lại sau vài giây.");
                resetBtnState();
                return;
            }

            // --- GỌI HÀM NHẬN DIỆN THỰC TẾ ---
            const detection = await faceapi.detectSingleFace(
                aisVideo, 
                new faceapi.TinyFaceDetectorOptions()
            ).withAgeAndGender();

            scanLine.style.display = 'none';

            if (detection) {
                // Nhận diện thành công
                const gender = detection.gender; // Kết quả trả về: 'male' hoặc 'female'
                const genderProbability = detection.genderProbability; // Độ tin cậy (0.0 - 1.0)
                
                // Hiển thị kết quả
                aisShowResults(gender);
                
                btn.innerText = "📷 QUÉT LẠI";
                btn.disabled = false;
            } else {
                // Không thấy mặt
                alert("Không tìm thấy khuôn mặt! Vui lòng giữ mặt trong khung hình và đủ sáng.");
                btn.innerText = "📷 THỬ LẠI";
                btn.disabled = false;
            }
        }, 1500);
    }

    function resetBtnState() {
        const btn = document.getElementById('aisBtnAction');
        const scanLine = document.getElementById('aisScanLine');
        scanLine.style.display = 'none';
        btn.innerText = "✨ QUÉT & PHÂN TÍCH";
        btn.disabled = false;
    }

    function aisStopCamera() {
        if (aisStream) {
            aisStream.getTracks().forEach(track => track.stop());
            aisStream = null;
            aisVideo.srcObject = null;
            aisVideo.style.display = 'none';
            document.querySelector('.ais-camera-text').style.display = 'block';
            document.getElementById('aisBtnAction').innerText = "📷 BẬT CAMERA";
        }
    }

    // --- HIỂN THỊ KẾT QUẢ DỰA TRÊN GIỚI TÍNH THỰC ---
    function aisShowResults(detectedGender) {
        const list = document.getElementById('aisHairList');
        const faceNameElement = document.getElementById('aisFaceName');

        // Dữ liệu sản phẩm (Bạn nhớ sửa lại link thật nhé)
        const maleStyles = [
            { name: "Tóc Giả Mullet Nam", desc: "Cá tính, che gáy tốt.", link: "pages/Sản phẩm và dịch vụ/Tóc giả nam/Chi tiết tóc nam/chi_tiet_toc_nam.html" },
            { name: "Mái Hói Nam Chữ M", desc: "Tự nhiên, che hói.", link: "pages/Sản phẩm và dịch vụ/Tóc giả nam/Chi tiết tóc nam/chi_tiet_toc_nam.html" },
            { name: "Side Part 7/3", desc: "Lịch lãm, công sở.", link: "pages/Sản phẩm và dịch vụ/Tóc giả nam/Chi tiết tóc nam/chi_tiet_toc_nam.html" }
        ];

        const femaleStyles = [
            { name: "Tóc Giả Nữ Mái Kẹp Bằng Tóc Thật", desc: "Dày dặn, nữ tính.", link: "pages/Sản phẩm và dịch vụ/Tóc giả nữ/chi tiết tóc nữ/chi tiết tóc nữ/chi_tiet_toc_nu.html" },
            { name: "Tóc Ngoạm Đuôi Ngựa", desc: "Gọn gàng, năng động.", link: "san-pham/toc-ngoam.html" },
            { name: "Tóc Mái Thưa", desc: "Hack tuổi, che trán.", link: "san-pham/mai-thua.html" }
        ];

        const faces = ["MẶT TRÁI XOAN", "MẶT TRÒN", "MẶT V-LINE", "MẶT VUÔNG"];
        const randomFace = faces[Math.floor(Math.random() * faces.length)]; // Khuôn mặt vẫn random (vì AI detect khuôn mặt phức tạp hơn)

        let displayGender = "";
        let finalData = [];

        // Logic chia luồng dựa trên kết quả AI
        if (detectedGender === 'female') {
            displayGender = "NỮ";
            finalData = femaleStyles;
        } else {
            displayGender = "NAM";
            finalData = maleStyles;
        }

        faceNameElement.innerHTML = `${randomFace} <span style="font-size:0.8em; color:#666">(${displayGender})</span>`;

        list.innerHTML = "";
        // Random lấy 3 sản phẩm trong danh sách phù hợp
        finalData.sort(() => 0.5 - Math.random()).slice(0, 3).forEach(item => {
            list.innerHTML += `
                <div class="ais-hair-item">
                    <div class="ais-hair-info">
                        <h4>${item.name}</h4>
                        <p>${item.desc}</p>
                    </div>
                    <a href="${item.link}" class="ais-btn-view" target="_blank">Xem chi tiết</a>
                </div>
            `;
        });

        document.getElementById('aisResultBox').style.display = 'block';
        setTimeout(() => {
            const mb = document.querySelector('.ais-modal-body');
            mb.scrollTo({ top: mb.scrollHeight, behavior: 'smooth' });
        }, 100);
    }

    function aisResetUI() {
        aisSwitchTab('text');
        document.getElementById('aisResultBox').style.display = 'none';
    }

    window.onclick = function(e) { 
        if (e.target == aisModal) aisCloseModal(); 
    }

    // Hàm mở trực tiếp tab AI khi bấm nút nổi
    function openAiDirectly() {
        // 1. Mở Modal lên (Hàm cũ của bạn)
        aisOpenModal();
        
        // 2. Tự động chuyển sang tab AI Scanner (Hàm cũ của bạn)
        aisSwitchTab('ai');
    }  