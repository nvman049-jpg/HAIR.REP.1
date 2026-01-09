// ============================================
// PRODUCTS DATABASE - PHỤ KIỆN TÓC GIẢ
// ============================================

const PRODUCTS_DB = {
  // Sản phẩm 1: Băng Dính Dán Tóc Giả Nam VTG KD06
  "bang-dinh-dan-kd06": {
    id: "bang-dinh-dan-kd06",
    name: "Băng Dính Dán Tóc Giả Nam VTG KD06",
    sku: "VTG-KD06-2024",
    price: "250.000",
    oldPrice: null, // Để null nếu không có giá cũ
    rating: 5.0,
    reviewCount: 45,
    soldCount: 45,
    tag: "BÁN CHẠY",
    tagType: "hot", // 'hot', 'new', 'sale'

    // Hình ảnh sản phẩm
    images: [
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-4.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-3.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-1.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-6.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-toc-gia-nam-vtg-kd06-7.webp",
    ],

    // Mô tả ngắn
    shortDescription:
      "Băng dính dán tóc giả chuyên dụng VTG KD06 được thiết kế đặc biệt cho nam giới, giúp cố định tóc giả chắc chắn, bền bỉ suốt cả ngày. Sản phẩm an toàn cho da đầu, không gây kích ứng và dễ dàng tháo gỡ khi cần thiết.",

    // Thông tin nhanh
    quickInfo: [
      {
        icon: "fa-solid fa-clock",
        label: "Thời gian giữ keo:",
        value: "3-5 tuần với điều kiện bảo quản tốt",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        label: "Phù hợp loại da:",
        value: "Mọi loại da, đặc biệt da nhạy cảm",
      },
      {
        icon: "fa-solid fa-earth-asia",
        label: "Xuất xứ:",
        value: "Hàn Quốc",
      },
      {
        icon: "fa-solid fa-users",
        label: "Đối tượng sử dụng:",
        value: "Nam giới sử dụng tóc giả, tóc thật",
      },
    ],

    // Tab: Mô tả chi tiết
    description: {
      title: "Giới thiệu Băng Dính Dán Tóc Giả VTG KD06",
      content: `
        <ul class="product-specs-list">
          <li><strong>Tên sản phẩm:</strong> Băng dính dán tóc giả Lace Front Walker Tape</li>
          <li><strong>Mã sản phẩm:</strong> VTG KD06</li>
          <li><strong>Xuất xứ:</strong> Mỹ</li>
          <li><strong>Thương hiệu:</strong> Walker Tape</li>
        </ul>

        <h3 class="desc-heading">Công dụng của Băng Dính Dán Tóc Giả Lace Front Walker Tape VTG Hair</h3>
        <p>
          Băng dính dán tóc giả Lace Front Walker Tape là một trong những sản phẩm bán chạy nhất của hãng Walker tape. Cuộn Lace Front nổi tiếng vì độ dính bền chắc, không có mùi và được sản xuất trong môi trường kháng khuẩn cao.
        </p>
      `,
    },

    // Tab: Thông số kỹ thuật
    specifications: [
      { label: "Tên sản phẩm", value: "Băng Dính Dán Tóc Giả Nam VTG KD06" },
      { label: "Mã sản phẩm", value: "VTG-KD06-2024" },
      { label: "Chất liệu", value: "Keo acrylic y tế, lớp nền vải không dệt" },
      { label: "Độ bám dính", value: "Cực cao - 3 đến 5 tuần" },
      { label: "Thời gian sử dụng", value: "3-5 tuần (tùy điều kiện sử dụng)" },
      { label: "Xuất xứ", value: "Hàn Quốc" },
      { label: "Kích thước", value: "3cm x 3m (1 cuộn)" },
      { label: "Trọng lượng", value: "50g" },
      {
        label: "Bảo quản",
        value: "Nơi khô ráo, tránh ánh nắng trực tiếp, nhiệt độ < 30°C",
      },
      { label: "Hạn sử dụng", value: "24 tháng kể từ ngày sản xuất" },
    ],

    // Tab: Hướng dẫn sử dụng
    usageSteps: [
      {
        title: "Chuẩn bị da đầu",
        content:
          "Làm sạch da đầu bằng dung dịch tẩy dầu chuyên dụng. Lau khô hoàn toàn và đảm bảo da đầu không còn dầu, bụi bẩn. Để da đầu khô tự nhiên khoảng 5-10 phút.",
      },
      {
        title: "Cắt băng dính theo kích thước",
        content:
          "Đo và cắt băng dính theo đường viền tóc giả của bạn. Nên cắt thành nhiều đoạn nhỏ để dễ dàng điều chỉnh và tạo đường viền tự nhiên hơn.",
      },
      {
        title: "Dán băng dính lên da đầu",
        content:
          "Gỡ lớp bảo vệ và dán băng dính lên da đầu theo đường viền đã chuẩn bị. Ấn nhẹ nhưng chắc chắn để băng dính bám chặt vào da.",
      },
      {
        title: "Đặt tóc giả lên đầu",
        content:
          "Cẩn thận đặt tóc giả lên vị trí đã dán băng dính, điều chỉnh để đường viền tự nhiên. Ấn nhẹ khu vực tiếp xúc với băng dính trong 10-15 giây.",
      },
      {
        title: "Hoàn thiện",
        content:
          "Chải lại tóc và kiểm tra độ chắc chắn. Tránh tiếp xúc với nước trong 24 giờ đầu để băng dính bám chắc nhất.",
      },
    ],

    // Sản phẩm liên quan (product IDs)
    relatedProducts: [
      "bang-dinh-dan-kd05",
      "keo-dan-white-walker-kd01",
      "keo-dan-kd03",
    ],
  },

  // Sản phẩm 2: Băng Dính Dán Tóc Giả VTG KD05
  "bang-dinh-dan-kd05": {
    id: "bang-dinh-dan-kd05",
    name: "Băng Dính Dán Tóc Giả VTG KD05",
    sku: "VTG-KD05-2024",
    price: "220.000",
    oldPrice: null,
    rating: 4.5,
    reviewCount: 102,
    soldCount: 102,
    tag: "BÁN CHẠY",
    tagType: "hot",

    images: [
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-vtg-kd05-5.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-dinh-dan-toc-gia-vtg-kd05-1.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-keo-dan-toc-gia-super-tape-vtg-kd05-3.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-keo-dan-toc-gia-super-tape-vtg-kd05-4.webp",
      "trangchu/Ảnh phụ kiện tóc giả/bang-keo-dan-toc-gia-super-tape-vtg-kd05-7.webp",
    ],

    shortDescription:
      "Băng dính dán tóc giả VTG KD05 phiên bản cải tiến với khả năng bám dính tốt hơn và thời gian giữ keo lâu hơn. Sản phẩm được nhiều khách hàng tin dùng nhờ độ bền và an toàn tuyệt đối.",

    quickInfo: [
      {
        icon: "fa-solid fa-clock",
        label: "Thời gian giữ keo:",
        value: "4-6 tuần với điều kiện bảo quản tốt",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        label: "Phù hợp loại da:",
        value: "Mọi loại da",
      },
      {
        icon: "fa-solid fa-earth-asia",
        label: "Xuất xứ:",
        value: "Hàn Quốc",
      },
      {
        icon: "fa-solid fa-users",
        label: "Đối tượng sử dụng:",
        value: "Nam & nữ sử dụng tóc giả",
      },
    ],

    description: {
      title: "Giới thiệu Băng Dính Dán Tóc Giả VTG KD05",
      content: `
        <ul class="product-specs-list">
          <li><strong>Tên sản phẩm:</strong> Băng Dính Dán Tóc Giả VTG KD05</li>
          <li><strong>Mã sản phẩm:</strong> VTG KD05</li>
          <li><strong>Xuất xứ:</strong> Hàn Quốc</li>
          <li><strong>Thương hiệu:</strong> VTG Hair</li>
        </ul>

        <h3 class="desc-heading">Công dụng của Băng Dính Dán Tóc Giả VTG KD05</h3>
        <p>
          Băng dính dán tóc giả VTG KD05 là phiên bản cải tiến từ dòng KD06, được nâng cấp với công thức keo dính mới giúp tăng thời gian giữ keo lên 4-6 tuần. Đây là lựa chọn hoàn hảo cho những ai cần độ bền cao và sử dụng lâu dài.
        </p>
      `,
    },

    specifications: [
      { label: "Tên sản phẩm", value: "Băng Dính Dán Tóc Giả VTG KD05" },
      { label: "Mã sản phẩm", value: "VTG-KD05-2024" },
      {
        label: "Chất liệu",
        value: "Keo acrylic y tế cao cấp, lớp nền vải không dệt",
      },
      { label: "Độ bám dính", value: "Cực cao - 4 đến 6 tuần" },
      { label: "Xuất xứ", value: "Hàn Quốc" },
      { label: "Kích thước", value: "3cm x 4m (1 cuộn)" },
      { label: "Trọng lượng", value: "65g" },
    ],

    usageSteps: [
      {
        title: "Làm sạch da đầu",
        content:
          "Sử dụng dung dịch tẩy dầu chuyên dụng để làm sạch da đầu. Lau khô hoàn toàn.",
      },
      {
        title: "Cắt và dán băng dính",
        content:
          "Cắt băng dính theo kích thước phù hợp và dán lên da đầu theo đường viền tóc giả.",
      },
      {
        title: "Đặt tóc giả",
        content: "Đặt tóc giả lên vị trí đã chuẩn bị và ấn nhẹ để cố định.",
      },
    ],

    relatedProducts: [
      "bang-dinh-dan-kd06",
      "keo-dan-kd03",
      "keo-dan-white-walker-kd01",
    ],
  },

  // Sản phẩm 3: Keo Dán Tóc Giả Great White Walker Tape VTG KD01
  "keo-dan-white-walker-kd01": {
    id: "keo-dan-white-walker-kd01",
    name: "Keo Dán Tóc Giả Great White Walker Tape VTG KD01",
    sku: "VTG-KD01-2024",
    price: "350.000",
    oldPrice: null,
    rating: 3.0,
    reviewCount: 32,
    soldCount: 32,
    tag: null,
    tagType: null,

    images: [
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-great-white-walker-tape-vtg-kd01-1.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-great-white-walker-tape-vtg-kd01-2.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-great-white-walker-tape-vtg-kd01-4.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-great-white-walker-tape-vtg-kd01-5.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-great-white-walker-tape-vtg-kd01-9.webp",
    ],

    shortDescription:
      "Keo dán tóc giả Great White Walker Tape là dòng sản phẩm cao cấp với độ bám dính siêu mạnh, phù hợp cho những ai cần độ cố định tối đa. Sản phẩm được nhập khẩu trực tiếp từ Hàn Quốc.",

    quickInfo: [
      {
        icon: "fa-solid fa-clock",
        label: "Thời gian giữ keo:",
        value: "6-8 tuần với điều kiện tốt",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        label: "Phù hợp loại da:",
        value: "Da khỏe, không nhạy cảm",
      },
      {
        icon: "fa-solid fa-earth-asia",
        label: "Xuất xứ:",
        value: "Hàn Quốc",
      },
      {
        icon: "fa-solid fa-users",
        label: "Đối tượng sử dụng:",
        value: "Chuyên nghiệp, vận động viên",
      },
    ],

    description: {
      title: "Giới thiệu Keo Dán Tóc Giả Great White Walker Tape",
      content: `
        <ul class="product-specs-list">
          <li><strong>Tên sản phẩm:</strong> Keo Dán Tóc Giả Great White Walker Tape VTG KD01</li>
          <li><strong>Mã sản phẩm:</strong> VTG KD01</li>
          <li><strong>Xuất xứ:</strong> Hàn Quốc</li>
          <li><strong>Thương hiệu:</strong> Walker Tape</li>
        </ul>

        <h3 class="desc-heading">Công dụng của Keo Dán Tóc Giả Great White Walker Tape</h3>
        <p>
          Great White Walker Tape là dòng keo dán cao cấp nhất trong bộ sưu tập của HAIR REP 1-1. Với độ bám dính siêu mạnh, sản phẩm này được thiết kế đặc biệt cho những người cần độ cố định tối đa như vận động viên, diễn viên hoặc những ai có lịch trình bận rộn.
        </p>
      `,
    },

    specifications: [
      {
        label: "Tên sản phẩm",
        value: "Keo Dán Tóc Giả Great White Walker Tape VTG KD01",
      },
      { label: "Mã sản phẩm", value: "VTG-KD01-2024" },
      { label: "Chất liệu", value: "Keo acrylic chuyên nghiệp" },
      { label: "Độ bám dính", value: "Siêu cao - 6 đến 8 tuần" },
      { label: "Xuất xứ", value: "Hàn Quốc" },
      { label: "Dung tích", value: "50ml" },
    ],

    usageSteps: [
      {
        title: "Chuẩn bị da đầu",
        content: "Làm sạch da đầu kỹ lưỡng với dung dịch tẩy dầu chuyên dụng.",
      },
      {
        title: "Bôi keo",
        content: "Bôi một lớp mỏng keo lên da đầu và để khô 5-10 phút.",
      },
      {
        title: "Đặt tóc giả",
        content: "Đặt tóc giả lên và ấn chắc chắn trong 30 giây.",
      },
    ],

    relatedProducts: [
      "keo-dan-kd03",
      "bang-dinh-dan-kd06",
      "bang-dinh-dan-kd05",
    ],
  },

  // Sản phẩm 4: Keo Dán Tóc Giả Vừa Tóc Giả KD03
  "keo-dan-kd03": {
    id: "keo-dan-kd03",
    name: "Keo Dán Tóc Giả Vừa Tóc Giả KD03",
    sku: "VTG-KD03-2024",
    price: "300.000",
    oldPrice: null,
    rating: 4.5,
    reviewCount: 345,
    soldCount: 345,
    tag: "BÁN CHẠY",
    tagType: "hot",

    images: [
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-vua-toc-gia-kd03-3.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-vua-toc-gia-kd03-1.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-vua-toc-gia-kd03-2.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-vua-toc-gia-kd03-4.webp",
      "trangchu/Ảnh phụ kiện tóc giả/keo-dan-toc-gia-vua-toc-gia-kd03-5.webp",
    ],

    shortDescription:
      "Keo dán tóc giả KD03 là sản phẩm bán chạy nhất với hơn 345 đơn hàng. Công thức cân bằng giữa độ bám dính và tính an toàn, phù hợp cho người mới bắt đầu sử dụng tóc giả.",

    quickInfo: [
      {
        icon: "fa-solid fa-clock",
        label: "Thời gian giữ keo:",
        value: "3-4 tuần",
      },
      {
        icon: "fa-solid fa-heart-pulse",
        label: "Phù hợp loại da:",
        value: "Mọi loại da",
      },
      {
        icon: "fa-solid fa-earth-asia",
        label: "Xuất xứ:",
        value: "Việt Nam",
      },
      {
        icon: "fa-solid fa-users",
        label: "Đối tượng sử dụng:",
        value: "Người mới bắt đầu",
      },
    ],

    description: {
      title: "Giới thiệu Keo Dán Tóc Giả KD03",
      content: `
        <ul class="product-specs-list">
          <li><strong>Tên sản phẩm:</strong> Keo Dán Tóc Giả Vừa Tóc Giả KD03</li>
          <li><strong>Mã sản phẩm:</strong> VTG KD03</li>
          <li><strong>Xuất xứ:</strong> Việt Nam</li>
          <li><strong>Thương hiệu:</strong> VTG Hair</li>
        </ul>

        <h3 class="desc-heading">Công dụng của Keo Dán Tóc Giả KD03</h3>
        <p>
          Keo dán tóc giả KD03 là lựa chọn số 1 cho người mới bắt đầu sử dụng tóc giả. Với công thức cân bằng giữa độ bám dính và tính an toàn, sản phẩm này đã nhận được hơn 345 đánh giá tích cực từ khách hàng.
        </p>
      `,
    },

    specifications: [
      { label: "Tên sản phẩm", value: "Keo Dán Tóc Giả Vừa Tóc Giả KD03" },
      { label: "Mã sản phẩm", value: "VTG-KD03-2024" },
      { label: "Chất liệu", value: "Keo acrylic y tế" },
      { label: "Độ bám dính", value: "Cao - 3 đến 4 tuần" },
      { label: "Xuất xứ", value: "Việt Nam" },
      { label: "Dung tích", value: "40ml" },
    ],

    usageSteps: [
      {
        title: "Làm sạch da đầu",
        content: "Rửa sạch da đầu và lau khô hoàn toàn.",
      },
      {
        title: "Bôi keo",
        content: "Bôi keo lên da đầu và chờ 3-5 phút.",
      },
      {
        title: "Đặt tóc giả",
        content: "Đặt tóc giả và ấn nhẹ để cố định.",
      },
    ],

    relatedProducts: [
      "bang-dinh-dan-kd06",
      "bang-dinh-dan-kd05",
      "keo-dan-white-walker-kd01",
    ],
  },
};

// Export để sử dụng trong các file khác
if (typeof module !== "undefined" && module.exports) {
  module.exports = PRODUCTS_DB;
}
