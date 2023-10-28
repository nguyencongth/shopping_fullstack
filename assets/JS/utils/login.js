import userAPI from "../api/userAPI";
import { toast } from "./toast";
function Login() {
    const formSubmit = document.getElementById("form-login");
    formSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const email = formSubmit.querySelector("#email").value;
        const password = formSubmit.querySelector("#password").value;

        const data =  {
            email,
            password,
        }
        try {
            if (localStorage.getItem('login_id')) return;
            const res = await userAPI.login(data)
            if(res.id_customer){
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('login_id', res.id_customer);
                localStorage.setItem('email', email);
                toast.success("Đăng nhập thành công");
                setTimeout(()=>{
                    window.location.assign('/index.html');
                },1000)
            }
            else {
                toast.error("Đăng nhập thất bại");
            }
        }
        catch(err) {
            console.log("Lỗi kết nối đến máy chủ API", err);
        }
    })
}

(async () => {
    Login();
})();
  