import orderAPI from "../api/orderAPI";
import { toast } from "../utils/toast";

const customerID = localStorage.getItem("login_id");
const tableBody = document.getElementById('orderList');

async function renderOrderList() {
    try {
        const { arrayOrders } = await orderAPI.getOrderByCustomerID(customerID);
        tableBody.innerHTML = '';
        if (arrayOrders.length > 0) {
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

                btnCancel.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        const orderID = order.order_id;
                        const response = await orderAPI.deleteOrder(orderID);
                        if(response.statusCode === 200) {
                            toast.success("Hủy đơn hàng thành công");
                            row.remove();
                        }
                    } catch (error) {
                        console.log("Error when delete order: ", error);
                    }
                })
    
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

                btnConfirm.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        const orderID = order.order_id;
                        const response = await orderAPI.updateOrderStatus(orderID, 2);
                        if(response.statusCode === 200) {
                            toast.success("Cảm ơn quý khách đã mua hàng.");

                            const orderStatusCell = row.cells[5];
                            orderStatusCell.textContent = "Hoàn thành";
                            orderStatusCell.classList.remove('status-pending', 'status-confirmed');
                            orderStatusCell.classList.add('status-finished');

                            // Vô hiệu hóa nút "Đã nhận được hàng"
                            btnConfirm.disabled = true;

                            const tabFinished = document.getElementById("tab-finished");
                            if(tabFinished) {
                                tabFinished.click();
                            }
                        }
                    } catch (error) {
                        console.log("Failed to update order status: ", error);
                    }
                });
            });
        } else {
            const noOrdersMessage = document.createElement('p');
            noOrdersMessage.textContent = 'Không có đơn hàng nào.';
            tableBody.appendChild(noOrdersMessage);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng", error);
    }
}
renderOrderList()

// confirm orders
async function confirmOrderList() {
    try {
        const { arrayOrders } = await orderAPI.getOrderByCustomerID(customerID);
        const confirmOrderElement = document.getElementById("confirmOrder");
        confirmOrderElement.innerHTML = '';
        const confirmOrders = arrayOrders.filter(o => o.orderStatus === 1);
        if(confirmOrders.length > 0) {
            confirmOrders.forEach(order => {
                const row = confirmOrderElement.insertRow();
        
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
                if(order.orderStatus === 1) {
                    orderStatusCell.textContent = "Đã được xác nhận";
                    orderStatusCell.classList.add("status-confirmed");
                }
        
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
        
                if(order.orderStatus === 1) {
                    btnCancel.disabled = true;
                }else {
                    btnCancel.disabled = false;
                }
                
        
                cancelOrderCell.appendChild(btnCancel);
        
                btnCancel.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        const orderID = order.order_id;
                        const response = await orderAPI.deleteOrder(orderID);
                        if(response.statusCode === 200) {
                            toast.success("Xóa đơn hàng thành công");
                            row.remove();
                        }
                    } catch (error) {
                        console.log("Lỗi khi xóa đơn hàng", error);
                    }
                })
        
                const confirmOrderCell = row.insertCell(8);
                const btnConfirm = document.createElement("button");
                btnConfirm.textContent = 'Đã nhận được hàng';
                btnConfirm.classList.add('btn-confirm');
        
                if(order.orderStatus === 1) {
                    btnConfirm.disabled = false;
                }
                else {
                    btnConfirm.disabled = true;
                }
                confirmOrderCell.appendChild(btnConfirm);

                btnConfirm.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        const orderID = order.order_id;
                        const response = await orderAPI.updateOrderStatus(orderID, 2);
                        if(response.statusCode === 200) {
                            toast.success("Cảm ơn quý khách đã mua hàng.");

                            const tabFinished = document.getElementById("tab-finished");
                            if(tabFinished) {
                                tabFinished.click();
                            }
                        }
                    } catch (error) {
                        console.log("Failed to update order status: ", error);
                    }
                });
            })
        } else {
            const noOrdersMessage = document.createElement('p');
            noOrdersMessage.textContent = 'Không có đơn hàng nào.';
            confirmOrderElement.appendChild(noOrdersMessage);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng", error);
    }
}
confirmOrderList();

// pending orders
async function pendingOrderList() {
    try {
        const { arrayOrders } = await orderAPI.getOrderByCustomerID(customerID);
        const pendingOrderElement = document.getElementById("pendingOrder");
        pendingOrderElement.innerHTML = '';
        const pendingOrders = arrayOrders.filter(o => o.orderStatus === 0);
        if(pendingOrders.length > 0) {
            pendingOrders.forEach(order => {
                const row = pendingOrderElement.insertRow();
        
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
                if(order.orderStatus === 0) {
                    orderStatusCell.textContent = "Chờ xác nhận";
                    orderStatusCell.classList.add("status-pending");
                }
        
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
        
                if(order.orderStatus === 1) {
                    btnCancel.disabled = true;
                }else {
                    btnCancel.disabled = false;
                }
                
        
                cancelOrderCell.appendChild(btnCancel);
        
                btnCancel.addEventListener('click', async (e) => {
                    e.preventDefault();
                    try {
                        const orderID = order.order_id;
                        const response = await orderAPI.deleteOrder(orderID);
                        if(response.statusCode === 200) {
                            toast.success("Hủy đơn hàng thành công");
                            row.remove();
                        }
                    } catch (error) {
                        console.log("Lỗi khi xóa đơn hàng", error);
                    }
                })
        
                const confirmOrderCell = row.insertCell(8);
                const btnConfirm = document.createElement("button");
                btnConfirm.textContent = 'Đã nhận được hàng';
                btnConfirm.classList.add('btn-confirm');
        
                if(order.orderStatus === 1) {
                    btnConfirm.disabled = false;
                }
                else {
                    btnConfirm.disabled = true;
                }
                confirmOrderCell.appendChild(btnConfirm);
            })
        } else {
            const noOrdersMessage = document.createElement('p');
            noOrdersMessage.textContent = 'Không có đơn hàng nào.';
            pendingOrderElement.appendChild(noOrdersMessage);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng", error);
    }
}
pendingOrderList();

// finished order
async function finishedOrderList() {
    try {
        const { arrayOrders } = await orderAPI.getOrderByCustomerID(customerID);
        const finishedOrderElement = document.getElementById("finishedOrder");
        finishedOrderElement.innerHTML = '';
        const finishedOrders = arrayOrders.filter(o => o.orderStatus === 2);
        if(finishedOrders.length > 0) {
            finishedOrders.forEach(order => {
                const row = finishedOrderElement.insertRow();
        
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
                if(order.orderStatus === 2) {
                    orderStatusCell.textContent = "Hoàn thành";
                    orderStatusCell.classList.add("status-finished");
                }
        
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
        
                //review button
                const reviewOrderCell = row.insertCell(7);
                const btnReview = document.createElement("button");
                btnReview.textContent = 'Đánh giá';
                btnReview.classList.add('btn-review');
                
                reviewOrderCell.appendChild(btnReview);
            })
        }
        else {
            const noOrdersMessage = document.createElement('p');
            noOrdersMessage.textContent = 'Không có đơn hàng nào.';
            finishedOrderElement.appendChild(noOrdersMessage);
        }
    } catch (error) {
        console.error("Lỗi khi tải dữ liệu đơn hàng", error);
    }
}
finishedOrderList();

const tabOrderList = document.getElementById("tab-listOrder");
tabOrderList.addEventListener("click",() => {
    renderOrderList();
})

const tabPending = document.getElementById("tab-pending");
tabPending.addEventListener("click",() => {
    pendingOrderList();
})

const tabFinished = document.getElementById("tab-finished");
tabFinished.addEventListener("click",() => {
    finishedOrderList();
})

const tabConfirmed = document.getElementById("tab-confirmed");
tabConfirmed.addEventListener("click",() => {
    confirmOrderList();
})

