// const Btns = document.querySelectorAll('.accordion')
// const modal = document.querySelector('.sidebar-sort')

// function show(){
//     if(modal.style.display == 'none'){
//         modal.classList.add('open')
//     } else {
//         modal.classList.remove('open')
//     }
// }

// for (const Btn of Btns) {
//     Btn.addEventListener('click', show)
// }

function showHide() {
    const panel = document.querySelector('.sidebar-sort')
    if (panel.style.display === "none") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

const Btns = document.querySelectorAll('.accordion')

for (const Btn of Btns) {
    Btn.addEventListener('click', showHide)
}