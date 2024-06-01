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
                    { train: 'G123', from: 'Beijing', to: 'Shanghai', departure: '08:00', arrival: '12:00', duration: '4h', price: '$50', status: 'Available' },
                    { train: 'D456', from: 'Beijing', to: 'Guangzhou', departure: '09:00', arrival: '15:00', duration: '6h', price: '$70', status: 'Available' },
                    { train: 'Z789', from: 'Shanghai', to: 'Shenzhen', departure: '10:00', arrival: '18:00', duration: '8h', price: '$80', status: 'Available' },
                    { train: 'K101', from: 'Guangzhou', to: 'Beijing', departure: '11:00', arrival: '19:00', duration: '8h', price: '$65', status: 'Available' },
                    { train: 'T202', from: 'Shanghai', to: 'Beijing', departure: '12:00', arrival: '16:00', duration: '4h', price: '$55', status: 'Available' },
                    { train: 'A303', from: 'Shenzhen', to: 'Shanghai', departure: '13:00', arrival: '21:00', duration: '8h', price: '$75', status: 'Refunded' },
                    { train: 'B404', from: 'Beijing', to: 'Shenzhen', departure: '14:00', arrival: '22:00', duration: '8h', price: '$85', status: 'Refunded' },
                    { train: 'C505', from: 'Guangzhou', to: 'Shanghai', departure: '15:00', arrival: '23:00', duration: '8h', price: '$90', status: 'Available' }
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
                                <th scope="col" class="sortable">Status</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>`;
                results.forEach(result => {
                    resultsHTML += `
                        <tr class="${result.status === 'Refunded' ? 'table-danger' : ''}">
                            <td>${result.train}</td>
                            <td>${result.from}</td>
                            <td>${result.to}</td>
                            <td>${result.departure}</td>
                            <td>${result.arrival}</td>
                            <td>${result.duration}</td>
                            <td>${result.price}</td>
                            <td>${result.status}</td>
                            <td>${result.status === 'Available' ? `<a href="booking.html?train=${result.train}" class="btn btn-primary">Book</a>` : ''}</td>
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
