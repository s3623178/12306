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
    
    // Sort table
    function sortTable(table, column, asc = true) {
        const dirModifier = asc ? 1 : -1;
        const tBody = table.tBodies[0];
        const rows = Array.from(tBody.querySelectorAll("tr"));

        // Sort each row
        const sortedRows = rows.sort((a, b) => {
            const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
            const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();

            return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
        });

        // Remove all existing rows from the table
        while (tBody.firstChild) {
            tBody.removeChild(tBody.firstChild);
        }

        // Re-add the newly sorted rows
        tBody.append(...sortedRows);

        // Remember the order
        table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
        table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
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

    // Search Form Handler
    const searchForm = document.getElementById('searchForm');
    if (searchForm) {
        searchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const date = document.getElementById('date').value;
            
            // Simulate search results
            setTimeout(() => {
                hideLoading();
                const results = [
                    { train: 'G123', from: 'Beijing', to: 'Shanghai', departure: '08:00', arrival: '12:00', duration: '4h', price: '$50' },
                    { train: 'D456', from: 'Beijing', to: 'Guangzhou', departure: '09:00', arrival: '15:00', duration: '6h', price: '$70' },
                    { train: 'Z789', from: 'Shanghai', to: 'Shenzhen', departure: '10:00', arrival: '18:00', duration: '8h', price: '$80' },
                    { train: 'K101', from: 'Guangzhou', to: 'Beijing', departure: '11:00', arrival: '19:00', duration: '8h', price: '$65' },
                    { train: 'T202', from: 'Shanghai', to: 'Beijing', departure: '12:00', arrival: '16:00', duration: '4h', price: '$55' },
                    { train: 'A303', from: 'Shenzhen', to: 'Shanghai', departure: '13:00', arrival: '21:00', duration: '8h', price: '$75' },
                    { train: 'B404', from: 'Beijing', to: 'Shenzhen', departure: '14:00', arrival: '22:00', duration: '8h', price: '$85' },
                    { train: 'C505', from: 'Guangzhou', to: 'Shanghai', departure: '15:00', arrival: '23:00', duration: '8h', price: '$90' }
                ];
                
                let resultsHTML = `
                    <h2>Available Trains</h2>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col" class="sortable">Train</th>
                                <th scope="col" class="sortable">From</th>
                                <th scope="col" class="sortable">To</th>
                                <th scope="col" class="sortable">Departure</th>
                                <th scope="col" class="sortable">Arrival</th>
                                <th scope="col" class="sortable">Duration</th>
                                <th scope="col" class="sortable">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`;
                results.forEach(result => {
                    resultsHTML += `
                        <tr>
                            <td>${result.train}</td>
                            <td>${result.from}</td>
                            <td>${result.to}</td>
                            <td>${result.departure}</td>
                            <td>${result.arrival}</td>
                            <td>${result.duration}</td>
                            <td>${result.price}</td>
                            <td><a href="booking.html?train=${result.train}" class="btn btn-primary">Book</a></td>
                        </tr>`;
                });
                resultsHTML += `
                        </tbody>
                    </table>`;
                
                document.getElementById('searchResults').innerHTML = resultsHTML;

                document.querySelectorAll('.sortable').forEach(headerCell => {
                    headerCell.addEventListener('click', () => {
                        const tableElement = headerCell.parentElement.parentElement.parentElement;
                        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
                        const currentIsAscending = headerCell.classList.contains('th-sort-asc');

                        sortTable(tableElement, headerIndex, !currentIsAscending);
                    });
                });
            }, 1000);
        });
    }
    
    // Booking Form Handler
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const name = document.getElementById('name').value;
            const age = document.getElementById('age').value;
            const gender = document.getElementById('gender').value;
            const train = document.getElementById('train').value;
            const seat = document.getElementById('seat').value;
            const bookingMessage = document.getElementById('bookingMessage');
            
            // Basic form validation
            if (!name || !age || !gender || !train || !seat) {
                hideLoading();
                showMessage(bookingMessage, 'Please fill out all fields.', 'danger');
                return;
            }
            
            // Store booking details in localStorage
            const bookingDetails = { name, age, gender, train, seat };
            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));
            
            // Redirect to payment page
            setTimeout(() => {
                hideLoading();
                window.location.href = 'payment.html';
            }, 1000);
        });
    }

    // Payment Form Handler
    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const cardNumber = document.getElementById('cardNumber').value;
            const cardName = document.getElementById('cardName').value;
            const expiryDate = document.getElementById('expiryDate').value;
            const cvv = document.getElementById('cvv').value;
            const paymentMessage = document.getElementById('paymentMessage');
            
            // Basic form validation
            if (!cardNumber || !cardName || !expiryDate || !cvv) {
                hideLoading();
                showMessage(paymentMessage, 'Please fill out all fields.', 'danger');
                return;
            }
            
            // Simulate payment processing
            setTimeout(() => {
                hideLoading();
                // Retrieve booking details from localStorage
                const bookingDetails = JSON.parse(localStorage.getItem('bookingDetails'));
                
                // Store confirmation details in localStorage
                const confirmationDetails = `
                    <p><strong>Name:</strong> ${bookingDetails.name}</p>
                    <p><strong>Age:</strong> ${bookingDetails.age}</p>
                    <p><strong>Gender:</strong> ${bookingDetails.gender}</p>
                    <p><strong>Train:</strong> ${bookingDetails.train}</p>
                    <p><strong>Seat Preference:</strong> ${bookingDetails.seat}</p>
                    <p><strong>Status:</strong> Confirmed</p>
                `;
                localStorage.setItem('confirmationDetails', confirmationDetails);
                
                // Store order details in localStorage
                const orders = JSON.parse(localStorage.getItem('orders')) || [];
                const orderId = 'ORD' + Math.floor(Math.random() * 1000000);
                const orderDetails = {
                    orderId,
                    ...bookingDetails,
                    price: bookingDetails.price || '$50',
                    status: 'Confirmed',
                    departure: '08:00',
                    arrival: '12:00'
                };
                orders.push(orderDetails);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // Redirect to confirmation page
                window.location.href = 'confirmation.html';
            }, 2000);
        });
    }
    
    // Display Confirmation Details
    if (window.location.pathname.includes('confirmation.html')) {
        const confirmationDetails = localStorage.getItem('confirmationDetails');
        if (confirmationDetails) {
            document.getElementById('confirmationDetails').innerHTML = confirmationDetails;
        }
    }

    // User Profile and Order History
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
                </tr>`;
        });
        orderHistory.innerHTML = ordersHTML;
    }

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Your message has been sent. We will get back to you shortly.');
            contactForm.reset();
        });
    }
});

