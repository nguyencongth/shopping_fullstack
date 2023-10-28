import productApi from "../api/productAPI";
import { renderProductList } from "../utils/productRender";
import { renderPagination } from "../utils/renderPagination";

const itemsPerPage = 6; // Số mục trên mỗi trang

function getDataForPage(page) {
    const searchInput = document.querySelector("#inputSearch");
    const btnSearch = document.querySelector("#btnSearch");
    btnSearch.addEventListener("click", async (e) => {
        e.preventDefault();
        const keyword = searchInput.value.trim();
        if(keyword.length > 0) {
            setTimeout(() => {
                window.location.assign(`/assets/HTML/resultSearch.html?keyword=${encodeURIComponent(keyword)}`);
            },1000)
        }
    }); 
}

function onPageClick(page) {
    getDataForPage(page);
}
getDataForPage(1);