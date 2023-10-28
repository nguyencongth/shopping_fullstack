import productApi from "../api/productAPI";
import { renderProductList } from "../utils/productRender";
import { renderPagination } from "../utils/renderPagination";

const itemsPerPage = 6; // Số mục trên mỗi trang

async function getDataForPage(page) {
    // Lấy từ khóa tìm kiếm từ URL
    const params = new URLSearchParams(window.location.search);
    const keyword = params.get("keyword");

    if (keyword) {
        try {
            const startIndex = (page - 1) * itemsPerPage; // Tính toán vị trí bắt đầu

            const { arrayProduct, pagination } = await productApi.searchProduct(
                keyword,
                page,
                itemsPerPage
            );
            renderProductList("product__List", arrayProduct);
            renderPagination("pagination", page, pagination.totalPages, onPageClick);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu sản phẩm: ", error);
        }
    }
}

function onPageClick(page) {
    getDataForPage(page);
}
getDataForPage(1);