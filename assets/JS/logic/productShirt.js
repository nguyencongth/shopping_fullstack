import productApi from "../api/productAPI";
import { renderProductList } from "../utils/productRender";
import { renderPagination } from "../utils/renderPagination";

const itemsPerPage = 3; // Số mục trên mỗi trang

// Hàm để lấy và hiển thị dữ liệu từ trang cụ thể
async function getDataForPage(page) {
  try {
    const startIndex = (page - 1) * itemsPerPage; // Tính toán vị trí bắt đầu

    const { arrayProduct, pagination } = await productApi.getProductsShirt(
      page,
      itemsPerPage
    );
    renderProductList("product__List", arrayProduct);

    // Hiển thị thông tin phân trang
    renderPagination("pagination", page, pagination.totalPages, onPageClick);
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm: ", error);
  }
}

// Hàm xử lý sự kiện khi người dùng nhấp vào một trang cụ thể
function onPageClick(page) {
  getDataForPage(page);
}

// Khởi đầu: Lấy dữ liệu cho trang đầu tiên
getDataForPage(1);
