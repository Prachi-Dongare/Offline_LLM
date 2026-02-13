// ===== Form Switching (MAKE GLOBAL FOR HTML onclick) =====
window.switchToSignup = function () {
    const sliderTrack = document.getElementById('sliderTrack');
    const navDots = document.querySelectorAll('.nav-dot');

    if (sliderTrack) {
        sliderTrack.style.transform = 'translateX(-50%)';
    }

    if (navDots.length >= 2) {
        navDots[0].classList.remove('active');
        navDots[1].classList.add('active');
    }
};

window.switchToSignin = function () {
    const sliderTrack = document.getElementById('sliderTrack');
    const navDots = document.querySelectorAll('.nav-dot');

    if (sliderTrack) {
        sliderTrack.style.transform = 'translateX(0)';
    }

    if (navDots.length >= 2) {
        navDots[0].classList.add('active');
        navDots[1].classList.remove('active');
    }
};

// ===== Password Toggle (GLOBAL) =====
window.togglePassword = function (inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const button = input.nextElementSibling;
    if (!button) return;

    const icon = button.querySelector('i');
    if (!icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
};

// ===== Notification =====
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');

    if (!notification || !notificationText) return;

    notification.className = 'notification ' + type;
    notificationText.textContent = message;
    notification.style.display = 'flex';
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ===== Email Validation =====
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== MAIN DOM READY =====
document.addEventListener('DOMContentLoaded', function () {

    // ===== Theme Toggle =====
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDark = false;

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDark = true;
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            isDark = !isDark;
            body.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark
                ? '<i class="fas fa-sun"></i>'
                : '<i class="fas fa-moon"></i>';
        });
    }

    // ===== LOGIN HANDLER =====
    const signinForm = document.getElementById('signinForm');

    if (signinForm) {
        signinForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const email = document.getElementById('signinEmail').value.trim();
            const password = document.getElementById('signinPassword').value;

            if (!email || !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            if (!password) {
                showNotification('Please enter your password', 'error');
                return;
            }

            try {
                const formData = new URLSearchParams();
                formData.append('username', email);
                formData.append('password', password);
                formData.append('grant_type', 'password');

                const response = await fetch('http://127.0.0.1:8000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('access_token', data.access_token);
                    localStorage.setItem('token_type', data.token_type);
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userEmail', email);

                    showNotification('Login successful!', 'success');

                    setTimeout(() => {
                        window.location.href = 'Dashboard.html';
                    }, 1000);
                } else {
                    showNotification(data.detail || 'Invalid credentials', 'error');
                }

            } catch (error) {
                showNotification('Server error', 'error');
            }
        });
    }

    // ===== SIGNUP HANDLER =====
    const signupForm = document.getElementById('signupForm');

    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const name = document.getElementById('signupName').value.trim();
            const email = document.getElementById('signupEmail').value.trim();
            const password = document.getElementById('signupPassword').value;
            const confirmPassword = document.getElementById('signupConfirmPassword').value;

            if (!name) {
                showNotification('Please enter your name', 'error');
                return;
            }

            if (!email || !validateEmail(email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }

            if (password.length < 6) {
                showNotification('Password must be at least 6 characters', 'error');
                return;
            }

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    showNotification('Account created successfully!', 'success');

                    setTimeout(() => {
                        switchToSignin();
                    }, 1000);
                } else {
                    showNotification(data.detail || 'Signup failed', 'error');
                }

            } catch (error) {
                showNotification('Server error', 'error');
            }
        });
    }

});
