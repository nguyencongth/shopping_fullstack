import orderAPI from "../api/orderAPI";

const customerID = localStorage.getItem("login_id");
const tableBody = document.getElementById('orderList');

try {
    const { arrayOrders } = await orderAPI.getOrderByCustomerID(customerID);
    if (arrayOrders) {
        arrayOrders.forEach(order => {
            const row = tableBody.insertRow();

            // Thêm các ô dữ liệu
            const orderIdCell = row.insertCell(0);
            orderIdCell.textContent = `#${order.order_id}`;

            const orderDateCell = row.insertCell(1);
            orderDateCell.textContent = new Date(order.order_date).toLocaleDateString();

            const shippingAddressCell = row.insertCell(2);
            shippingAddressCell.textContent = order.shippingAddress;

            const totalAmountCell = row.insertCell(3);
            totalAmountCell.textContent = `${order.total_amount} VND`;

            const paymentMethodCell = row.insertCell(4);
            paymentMethodCell.textContent = order.paymentMethod;

            const orderStatusCell = row.insertCell(5);

            let orderStatusText = '';
            let orderStatusClass = '';

            switch(order.orderStatus){
                case 0: orderStatusText = "Chờ xác nhận";
                orderStatusClass = 'status-pending';
                break;
                case 1: orderStatusText = "Đã được xác nhận";
                orderStatusClass = 'status-confirmed';
                break;
                case 2: orderStatusText = "Hoàn thành";
                orderStatusClass = 'status-finished';
                break;
                default: orderStatusText = "Không xác định";
            }

            orderStatusCell.textContent = order.orderStatus = orderStatusText;
            
            orderStatusCell.classList.add(orderStatusClass);

            const detailsButtonCell = row.insertCell(6);

            // Tạo nút "Chi tiết"
            const showDetailsButton = document.createElement('button');
            showDetailsButton.textContent = 'Chi tiết';
            showDetailsButton.classList.add('btn-detail');

            // Tạo một phần chi tiết và ẩn nó ban đầu
            const orderDetails = document.createElement('div');
            orderDetails.classList.add('orderDetails');
            orderDetails.style.display = 'none'; // Ẩn ban đầu

            // Thêm danh sách sản phẩm trong đơn hàng
            const orderItemsList = document.createElement('ul');
            orderItemsList.innerHTML = '<h3>Chi tiết đơn hàng</h3>';
            order.orderItems.forEach(orderItem => {
                const orderItemListItem = document.createElement('li');
                orderItemListItem.innerHTML = `
                    Sản phẩm: #${orderItem.idsp}<br>
                    Số lượng: ${orderItem.quantity}<br>
                    Thành tiền: ${orderItem.subtotal} VND
                `;
                orderItemsList.appendChild(orderItemListItem);
            });

            orderDetails.appendChild(orderItemsList);

            // Gắn sự kiện click cho nút "Chi tiết"
            showDetailsButton.addEventListener('click', () => {
                if (orderDetails.style.display === 'none') {
                    orderDetails.style.display = 'block';
                } else {
                    orderDetails.style.display = 'none';
                }
            });

            detailsButtonCell.appendChild(showDetailsButton);
            detailsButtonCell.appendChild(orderDetails);

            const cancelOrderCell = row.insertCell(7);
            const btnCancel = document.createElement("button");
            btnCancel.textContent = 'Hủy đơn hàng';
            btnCancel.classList.add('btn-cancel');

            if(order.orderStatus === 'Hoàn thành' || order.orderStatus === 'Đã được xác nhận') {
                btnCancel.disabled = true;
            }
            else {
                btnCancel.disabled = false;
            }

            cancelOrderCell.appendChild(btnCancel);

            const confirmOrderCell = row.insertCell(8);
            const btnConfirm = document.createElement("button");
            btnConfirm.textContent = 'Đã nhận được hàng';
            btnConfirm.classList.add('btn-confirm');

            if(order.orderStatus === 'Chờ xác nhận' || order.orderStatus === 'Hoàn thành') {
                btnConfirm.disabled = true;
            }
            else {
                btnConfirm.disabled = false;
            }
            confirmOrderCell.appendChild(btnConfirm);
        });
    } else {
        const noOrdersMessage = document.createElement('p');
        noOrdersMessage.textContent = 'Không có đơn hàng nào.';
        tableBody.appendChild(noOrdersMessage);
    }
} catch (error) {
    console.error("Lỗi khi tải dữ liệu đơn hàng", error);
}
