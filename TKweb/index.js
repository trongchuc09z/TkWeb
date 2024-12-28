const backToTopButton = document.querySelector(".back-to-top");
window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
}
backToTopButton.addEventListener("click", backToTop);
function backToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const eventButtons = document.querySelectorAll(".event-button");
eventButtons.forEach((button) => {
  button.addEventListener("click", toggleEventButton);
});

function toggleEventButton() {
  const button = event.target;
  button.classList.toggle("interested");
  if (button.classList.contains("interested")) {
    button.textContent = "Hủy quan tâm";
  } else {
    button.textContent = "Quan tâm";
  }
}

const pagination = document.querySelector(".pagination");
const pageItems = pagination.querySelectorAll(".page-item");
const prevButton = pagination.querySelector(".prev");
const nextButton = pagination.querySelector(".next");
const urlParams = new URLSearchParams(window.location.search);
let currentPage = parseInt(urlParams.get("page")) || 1;
const totalPages = 7;
function updatePagination() {
  pageItems.forEach((item) => {
    const pageNumber = parseInt(item.dataset.page);
    if (pageNumber) {
      if (pageNumber === currentPage) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    }
  });
  // Disable nút previous nếu ở trang đầu
  if (currentPage === 1) {
    prevButton.setAttribute("aria-disabled", "true");
    prevButton.classList.add("disabled");
    prevButton.removeAttribute("href");
  } else {
    prevButton.classList.remove("disabled");
    prevButton.setAttribute("href", `?page=${currentPage - 1}`);
    prevButton.removeAttribute("aria-disabled");
  }
  if (currentPage == totalPages) {
    nextButton.classList.add("disabled");
    nextButton.removeAttribute("href");
  } else {
    nextButton.classList.remove("disabled");
    nextButton.setAttribute("href", `?page=${currentPage + 1}`);
  }
}
function handlePageClick(event) {
  const clickedItem = event.target;
  const newPage = parseInt(clickedItem.dataset.page);
  if (!isNaN(newPage)) {
    currentPage = newPage;
  } else if (clickedItem.classList.contains("prev")) {
    currentPage--;
  } else if (clickedItem.classList.contains("next")) {
    currentPage++;
  }
  updatePagination();
}
updatePagination();

