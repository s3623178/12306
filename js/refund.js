document.addEventListener('DOMContentLoaded', function() {
    // Show loading overlay
    function showLoading() {
        document.getElementById('loading').classList.remove('d-none');
    }

    // Hide loading overlay
    function hideLoading() {
        document.getElementById('loading').classList.add('d-none');
    }

    // Show message
    function showMessage(element, message, type = 'danger') {
        element.classList.remove('d-none', 'alert-success', 'alert-danger');
        element.classList.add(`alert-${type}`);
        element.textContent = message;
    }

    // Hide message
    function hideMessage(element) {
        element.classList.add('d-none');
    }

    // Load order information
    function loadOrderInfo(orderId) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        return orders.find(order => order.orderId === orderId);
    }

    // Refund order
    function refundOrder(orderId) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        const orderIndex = orders.findIndex(order => order.orderId === orderId);
        if (orderIndex > -1) {
            orders[orderIndex].status = 'Refunded';
            localStorage.setItem('orders', JSON.stringify(orders));
            return orders[orderIndex];
        }
        return null;
    }

    // Refund Form Handler
    const refundForm = document.getElementById('refundForm');
    if (refundForm) {
        refundForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const orderId = document.getElementById('orderId').value;
            const refundMessage = document.getElementById('refundMessage');

            // Basic form validation
            if (!orderId) {
                hideLoading();
                showMessage(refundMessage, 'Please enter an order ID.', 'danger');
                return;
            }

            // Process refund
            const orderInfo = refundOrder(orderId);
            if (orderInfo) {
                hideLoading();
                showMessage(refundMessage, 'Order refunded successfully.', 'success');

                const orderInfoBody = document.getElementById('orderInfoBody');
                orderInfoBody.innerHTML = `
                    <tr>
                        <td>${orderInfo.orderId}</td>
                        <td>${orderInfo.train}</td>
                        <td>${orderInfo.from}</td>
                        <td>${orderInfo.to}</td>
                        <td>${orderInfo.departure}</td>
                        <td>${orderInfo.arrival}</td>
                        <td>${orderInfo.price}</td>
                        <td>${orderInfo.status}</td>
                    </tr>
                `;
                document.getElementById('orderInfo').classList.remove('d-none');
            } else {
                hideLoading();
                showMessage(refundMessage, 'Order ID not found.', 'danger');
            }
        });
    }

    // Check if user is logged in
    function checkLogin() {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            document.getElementById('loginLink').classList.add('d-none');
            document.getElementById('registerLink').classList.add('d-none');
            document.getElementById('profileLink').classList.remove('d-none');
            document.getElementById('ordersLink').classList.remove('d-none');
            document.getElementById('logoutLink').classList.remove('d-none');
        } else {
            document.getElementById('loginLink').classList.remove('d-none');
            document.getElementById('registerLink').classList.remove('d-none');
            document.getElementById('profileLink').classList.add('d-none');
            document.getElementById('ordersLink').classList.add('d-none');
            document.getElementById('logoutLink').classList.add('d-none');
        }
    }

    // Logout handler
    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('user');
        checkLogin();
        window.location.href = 'index.html';
    });

    checkLogin();

    // Load order details if query parameter exists
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get('orderId');
    if (orderId) {
        const orderInfo = loadOrderInfo(orderId);
        if (orderInfo) {
            const orderInfoBody = document.getElementById('orderInfoBody');
            orderInfoBody.innerHTML = `
                <tr>
                    <td>${orderInfo.orderId}</td>
                    <td>${orderInfo.train}</td>
                    <td>${orderInfo.from}</td>
                    <td>${orderInfo.to}</td>
                    <td>${orderInfo.departure}</td>
                    <td>${orderInfo.arrival}</td>
                    <td>${orderInfo.price}</td>
                    <td>${orderInfo.status}</td>
                </tr>
            `;
            document.getElementById('orderInfo').classList.remove('d-none');
            document.getElementById('orderId').value = orderInfo.orderId;
        }
    }
});
