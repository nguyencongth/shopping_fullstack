import userAPI from "../api/userAPI";
import { toast } from "./toast";

function Login() {
    const formSubmit = document.getElementById("form-login");

    async function handleSubmit(e) {
        e.preventDefault();

        const email = formSubmit.querySelector("#email").value;
        const password = formSubmit.querySelector("#password").value;

        const data = {
            email,
            password,
        }
        try {
            if (localStorage.getItem('login_id')) return;
            const res = await userAPI.login(data)
            if (res.id_customer) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('token', res.token);
                localStorage.setItem('login_id', res.id_customer);
                localStorage.setItem('email', email);
                toast.success("Đăng nhập thành công");
                setTimeout(() => {
                    window.location.assign('/index.html');
                }, 1000)
            }
            else {
                toast.error("Đăng nhập thất bại");
            }
        }
        catch (err) {
            console.log("Lỗi kết nối đến máy chủ API", err);
        }
    }
    formSubmit?.addEventListener("submit", handleSubmit);

}

(async () => {
    Login();
})();


function checkTokenExpiration() {
    const token = localStorage.getItem('token');
    
    if (token) {
        const decodedToken = parseJwt(token);
        const expirationTime = decodedToken.exp * 1000; // Convert seconds to milliseconds

        if (expirationTime < Date.now()) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('token');
            localStorage.removeItem('login_id');
            localStorage.removeItem('email');
            window.location.assign('/assets/HTML/login.html');
        }
    }
}

// Hàm giải mã JWT
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

checkTokenExpiration();

setInterval(checkTokenExpiration, 3600000); // 3600000 milliseconds = 1 hour