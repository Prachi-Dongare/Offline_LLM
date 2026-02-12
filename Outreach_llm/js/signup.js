// ===== Theme Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    let isDark = false;

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        isDark = true;
        body.setAttribute('data-theme', 'dark');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            isDark = !isDark;
            body.setAttribute('data-theme', isDark ? 'dark' : 'light');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        });
    }
});

// ===== Password Toggle =====
function togglePassword(inputId) {
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
}

// ===== Form Switching =====
function switchToSignup() {
    const sliderTrack = document.getElementById('sliderTrack');
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (sliderTrack) {
        sliderTrack.style.transform = 'translateX(-50%)';
    }
    
    if (navDots.length >= 2) {
        navDots[0].classList.remove('active');
        navDots[1].classList.add('active');
    }
}

function switchToSignin() {
    const sliderTrack = document.getElementById('sliderTrack');
    const navDots = document.querySelectorAll('.nav-dot');
    
    if (sliderTrack) {
        sliderTrack.style.transform = 'translateX(0)';
    }
    
    if (navDots.length >= 2) {
        navDots[0].classList.add('active');
        navDots[1].classList.remove('active');
    }
}

// ===== Notification System =====
function showNotification(message, type) {
    type = type || 'success';
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notificationText');
    
    if (!notification || !notificationText) return;
    
    notification.className = 'notification ' + type;
    notificationText.textContent = message;
    notification.style.display = 'flex';
    notification.classList.add('show');
    
    setTimeout(function() {
        notification.classList.remove('show');
    }, 3000);
}

// ===== Form Validation =====
function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ===== Sign In Form Handler =====
document.addEventListener('DOMContentLoaded', function() {
    var signinForm = document.getElementById('signinForm');
    
    if (signinForm) {
        signinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var email = document.getElementById('signinEmail').value.trim();
            var password = document.getElementById('signinPassword').value;
            var rememberMe = document.getElementById('rememberMe').checked;

            // Simple validation
            if (!email || !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return false;
            }

            if (!password) {
                showNotification('Please enter your password', 'error');
                return false;
            }

            // Store login state
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            
            if (rememberMe) {
                localStorage.setItem('rememberedEmail', email);
            } else {
                localStorage.removeItem('rememberedEmail');
            }
            
            showNotification('Login successful! Redirecting...', 'success');
            
            // Redirect after short delay
            setTimeout(function() {
                window.location.href = 'Dashboard.html';
            }, 1000);
            
            return false;
        });
    }

    // ===== Sign Up Form Handler =====
    var signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            var name = document.getElementById('signupName').value.trim();
            var email = document.getElementById('signupEmail').value.trim();
            var password = document.getElementById('signupPassword').value;
            var confirmPassword = document.getElementById('signupConfirmPassword').value;
            var agreeTerms = document.getElementById('agreeTerms').checked;

            // Validation
            if (!name || name.length < 2) {
                showNotification('Please enter your name', 'error');
                return false;
            }

            if (!email || !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return false;
            }

            if (!password || password.length < 8) {
                showNotification('Password must be at least 8 characters', 'error');
                return false;
            }

            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return false;
            }

            if (!agreeTerms) {
                showNotification('Please agree to Terms & Conditions', 'error');
                return false;
            }

            // Store user data
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);
            localStorage.setItem('isLoggedIn', 'true');
            
            showNotification('Account created! Redirecting...', 'success');
            
            // Redirect after short delay
            setTimeout(function() {
                window.location.href = 'Dashboard.html';
            }, 1000);
            
            return false;
        });
    }

    // ===== Pre-fill remembered email =====
    var rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
        var emailInput = document.getElementById('signinEmail');
        if (emailInput) {
            emailInput.value = rememberedEmail;
            var rememberCheckbox = document.getElementById('rememberMe');
            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }
    }

    // ===== Check if already logged in =====
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        showNotification('Already logged in. Redirecting...', 'success');
        setTimeout(function() {
            window.location.href = 'Dashboard.html';
        }, 1000);
    }

    // Initialize slider
    switchToSignin();
});
