document.addEventListener('DOMContentLoaded', function() {
    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Your message has been sent. We will get back to you shortly.');
            contactForm.reset();
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
