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

    // Profile Form Handler
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const profileMessage = document.getElementById('profileMessage');

            // Basic form validation
            if (!name || !email || !phone) {
                hideLoading();
                showMessage(profileMessage, 'Please fill out all fields.', 'danger');
                return;
            }

            // Store user profile details in localStorage
            const userProfile = { name, email, phone };
            localStorage.setItem('userProfile', JSON.stringify(userProfile));

            // Show success message
            showMessage(profileMessage, 'Profile updated successfully.', 'success');
            hideLoading();
        });

        // Load user profile details
        const userProfile = JSON.parse(localStorage.getItem('userProfile'));
        if (userProfile) {
            document.getElementById('name').value = userProfile.name;
            document.getElementById('email').value = userProfile.email;
            document.getElementById('phone').value = userProfile.phone;
        }
    }

    // Load order history
    const orderHistory = document.getElementById('orderHistory');
    if (orderHistory) {
        const orders = JSON.parse(localStorage.getItem('orders')) || [];
        let ordersHTML = '';
        orders.forEach(order => {
            ordersHTML += `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.train}</td>
                    <td>${order.from}</td>
                    <td>${order.to}</td>
                    <td>${order.departure}</td>
                    <td>${order.arrival}</td>
                    <td>${order.price}</td>
                    <td>${order.status}</td>
                    <td>${order.status === 'Confirmed' ? `<a href="refund.html?orderId=${order.orderId}" class="btn btn-danger">Refund</a>` : ''}</td>
                </tr>`;
        });
        orderHistory.innerHTML = ordersHTML;
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
});
