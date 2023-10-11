import userAPI from "../api/userAPI";

function register() {
    const formSubmit = document.getElementById("form-register");
    formSubmit.addEventListener("submit", async (e) => {
        e.preventDefault();
        const fullName = formSubmit.querySelector("#fullname").value
        const email = formSubmit.querySelector("#email").value
        const phoneNumber = formSubmit.querySelector("#phone_number").value
        const password = formSubmit.querySelector("#password").value
        const address = formSubmit.querySelector("#province").value
        const data = {
            fullName,
            email,
            phoneNumber,
            password,
            address,
        }
        try {
            await userAPI.register(data);
            formSubmit.reset();
            setTimeout(() => {
                window.location.assign('./login.html');
              }, 1000);
        }
        catch {
            console.log('Add data error');
        }

        // await userAPI.register(data)
        //     .then(response => {
        //         const data = response.data
        //     if(response.statusCode === 200) {
        //         setTimeout(() => {
        //             window.location.assign('./login.html');
        //         },1000)
        //     }
        //     else {
        //         formSubmit.querySelector(".form-message").textContent = data.statusMessage
        //     }
        //     })
        //     .catch(error => {
        //         console.error("Lỗi kết nối đến máy chủ API", error);
        //     });
    });
}
(async () => {
    register();
  })();