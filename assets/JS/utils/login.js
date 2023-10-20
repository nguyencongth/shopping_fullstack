import userAPI from "../api/userAPI";
function Login() {
    const formSubmit = document.getElementById("form-login");
    formSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();
    
        const email = formSubmit.querySelector("#email").value;
        const password = formSubmit.querySelector("#password").value;

        console.log(email);
        console.log(password);

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
                setTimeout(()=>{
                    window.location.assign('http://localhost:5173/index.html');
                },1000)
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
  