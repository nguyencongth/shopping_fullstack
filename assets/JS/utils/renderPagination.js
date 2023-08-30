export function renderPagination(
  containerId,
  currentPage,
  totalPages,
  onPageClick
) {
  const container = document.getElementById(containerId);

  // Xóa nội dung cũ trong container (nếu có)
  container.innerHTML = "";

  // Tạo nút "Trang đầu"
  const firstPageButton = createPaginationButton(
    "firstPage",
    1,
    currentPage,
    onPageClick
  );
  container.appendChild(firstPageButton);

  // Tạo nút "Trang trước"
  const prevPageButton = createPaginationButton(
    "prevPage",
    currentPage - 1,
    currentPage,
    onPageClick
  );
  container.appendChild(prevPageButton);

  // Tạo các nút liên quan đến các trang
  for (let page = 1; page <= totalPages; page++) {
    const pageButton = createPaginationButton(
      page.toString(),
      page,
      currentPage,
      onPageClick
    );
    container.appendChild(pageButton);
  }

  // Tạo nút "Trang sau"
  const nextPageButton = createPaginationButton(
    "nextPage",
    currentPage + 1,
    currentPage,
    onPageClick
  );
  container.appendChild(nextPageButton);

  // Tạo nút "Trang cuối"
  const lastPageButton = createPaginationButton(
    "lastPage",
    totalPages,
    currentPage,
    onPageClick
  );
  container.appendChild(lastPageButton);
}

function createPaginationButton(label, page, currentPage, onPageClick) {
  const button = document.createElement("li");
  if (label === "firstPage") {
    button.innerHTML = `<span aria-hidden="true">&laquo;</span>`;
  } else if (label === "lastPage") {
    button.innerHTML = `<span aria-hidden="true">&raquo;</span>`;
  } else if (label === "prevPage") {
    button.innerHTML = `<span aria-hidden="true">&lt;</span>`;
  } else if (label === "nextPage") {
    button.innerHTML = `<span aria-hidden="true">&gt;</span>`;
  } else {
    button.textContent = label;
  }

  // Đặt lớp CSS cho nút hiện tại
  if (page === currentPage) {
    button.classList.add("active-pagination");
  }

  // Đặt sự kiện click cho nút
  button.addEventListener("click", () => {
    onPageClick(page);
  });

  return button;
}
