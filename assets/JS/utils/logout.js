document.getElementById('logout').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    localStorage.removeItem('login_id');
    localStorage.removeItem('token');

    window.location.assign('/assets/HTML/login.html');
});