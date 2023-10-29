const Btn = document.querySelector('#btn-filter-price');
const panel = document.querySelector('#model');
const btnUp = document.querySelector('.btn-up');
const btnDown = document.querySelector('.btn-down');


panel.style.display = "none";
btnUp.style.display = "none";
btnDown.style.display = "inline-block";

Btn.addEventListener('click', (e) => {
    e.preventDefault();

    if (panel.style.display === "none") {
        panel.style.display = "block";
        btnUp.style.display = "inline-block";
        btnDown.style.display = "none";
    } else {
        panel.style.display = "none";
        btnUp.style.display = "none";
        btnDown.style.display = "inline-block";
    }
});