import userAPI from "../api/userAPI";
import { toast } from "../utils/toast";

const customerID = localStorage.getItem('login_id');

async function getCustomerById() {
    const customerID = localStorage.getItem("login_id");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phoneNumber = document.getElementById("phoneNumber");
    const address = document.getElementById("address");
    const email_news = document.getElementById("email-news");
    try {
        const {arrayCustomer} = await userAPI.getCustomerById(customerID);
        const customer = arrayCustomer
        customer.forEach(cus => {
            if(fullName) fullName.value = cus.fullname;
            if(email) email.value = cus.email;
            if(phoneNumber) phoneNumber.value = cus.phonenumber;
            if(address) address.value = cus.address;
            if(email_news) email_news.value = cus.email;
        });
    } catch (error) {
        console.log('error getting customer', error);
    }
}

getCustomerById()

function changePassword() {
    const btn_changePassword = document.getElementById('btn-changePassword');
    const currentPasswordError = document.getElementById('currentPasswordError');
    const currentPasswordInput = document.getElementById('currentPassword');
    const form = document.getElementById('form-changePassword');

    btn_changePassword.addEventListener('click', async (e)=> {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmNewPassword = document.getElementById('confirmNewPassword').value;
        try {
            const response = await userAPI.changePassword(customerID, currentPassword, newPassword, confirmNewPassword);
            if(response.statusCode === 200) {
                currentPasswordInput.classList.remove('error-current-password');
                form.reset();
                toast.success("Đổi mật khẩu thành công");
            } else if(response.statusCode === 401) {
                currentPasswordError.textContent = response.statusMessage;
                currentPasswordInput.classList.add('error-current-password');
            }
        } catch (error) {
            console.log(error);
        }

    })
}
changePassword();