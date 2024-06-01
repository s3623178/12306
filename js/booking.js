document.addEventListener('DOMContentLoaded', function() {
    const trainData = [
        { train: 'G123', from: 'Beijing', to: 'Shanghai', departure: '08:00', arrival: '12:00', duration: '4h', price: '$50', status: 'Available' },
        { train: 'D456', from: 'Beijing', to: 'Guangzhou', departure: '09:00', arrival: '15:00', duration: '6h', price: '$70', status: 'Available' },
        { train: 'Z789', from: 'Shanghai', to: 'Shenzhen', departure: '10:00', arrival: '18:00', duration: '8h', price: '$80', status: 'Available' },
        { train: 'K101', from: 'Guangzhou', to: 'Beijing', departure: '11:00', arrival: '19:00', duration: '8h', price: '$65', status: 'Available' },
        { train: 'T202', from: 'Shanghai', to: 'Beijing', departure: '12:00', arrival: '16:00', duration: '4h', price: '$55', status: 'Available' },
        { train: 'A303', from: 'Shenzhen', to: 'Shanghai', departure: '13:00', arrival: '21:00', duration: '8h', price: '$75', status: 'Available' },
        { train: 'B404', from: 'Beijing', to: 'Shenzhen', departure: '14:00', arrival: '22:00', duration: '8h', price: '$85', status: 'Available' },
        { train: 'C505', from: 'Guangzhou', to: 'Shanghai', departure: '15:00', arrival: '23:00', duration: '8h', price: '$90', status: 'Available' }
    ];

    const trainSelect = document.getElementById('train');
    const fromInput = document.getElementById('from');
    const toInput = document.getElementById('to');
    const departureInput = document.getElementById('departure');
    const arrivalInput = document.getElementById('arrival');
    const trainTableBody = document.getElementById('trainTableBody');

    trainData.forEach(train => {
        const option = document.createElement('option');
        option.value = train.train;
        option.textContent = `${train.train} - ${train.from} to ${train.to}`;
        trainSelect.appendChild(option);

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${train.train}</td>
            <td>${train.from}</td>
            <td>${train.to}</td>
            <td>${train.departure}</td>
            <td>${train.arrival}</td>
            <td>${train.duration}</td>
            <td>${train.price}</td>
            <td>${train.status}</td>
            <td><button class="btn btn-primary select-train" data-train="${train.train}">Select</button></td>
        `;
        trainTableBody.appendChild(row);
    });

    document.querySelectorAll('.select-train').forEach(button => {
        button.addEventListener('click', function() {
            const selectedTrain = trainData.find(train => train.train === this.dataset.train);
            if (selectedTrain) {
                trainSelect.value = selectedTrain.train;
                fromInput.value = selectedTrain.from;
                toInput.value = selectedTrain.to;
                departureInput.value = selectedTrain.departure;
                arrivalInput.value = selectedTrain.arrival;
            }
        });
    });

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
            const from = document.getElementById('from').value;
            const to = document.getElementById('to').value;
            const departure = document.getElementById('departure').value;
            const arrival = document.getElementById('arrival').value;
            const seat = document.getElementById('seat').value;
            const bookingMessage = document.getElementById('bookingMessage');

            // Basic form validation
            if (!name || !age || !gender || !train || !from || !to || !departure || !arrival || !seat) {
                hideLoading();
                showMessage(bookingMessage, 'Please fill out all fields.', 'danger');
                return;
            }

            // Store booking details in localStorage
            const bookingDetails = { name, age, gender, train, from, to, departure, arrival, seat };
            localStorage.setItem('bookingDetails', JSON.stringify(bookingDetails));

            // Redirect to payment page
            setTimeout(() => {
                hideLoading();
                window.location.href = 'payment.html';
            }, 1000);
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
});
