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

        // await userAPI.login({email, password})
            // .then(response => {
            //     const data = response.data;
            //     if(data.statusCode === 200) {
            //         document.getElementById("account").style.display = "none";
            //         document.getElementById("user-info").style.display = "block";
            //         document.getElementById("user-name").textContent = email;
            //         setTimeout(()=>{
            //             window.location.href = "../index.html"
            //         },1000)
            //     }
            //     else {
            //         document.getElementById("form-message").textContent = data.StatusMessage;
            //     }
            // })
            try {
                const res = await userAPI.login(data)
                if(res){
                    // document.getElementById("account").style.display = "none";
                    // document.getElementById("user-info").style.display = "block";
                    // document.getElementById("user-name").textContent = email;
                    localStorage.setItem('isLoggedIn', true);
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
  