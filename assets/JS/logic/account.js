import userAPI from "../api/userAPI";

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