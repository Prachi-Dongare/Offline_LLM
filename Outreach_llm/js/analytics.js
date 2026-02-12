// Analytics Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeCharts();
    initializeHeatmap();
    initializeDateRangeSelector();
    initializeExportButton();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('dashboardThemeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('dashboardThemeToggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }
}

// Charts Initialization
function initializeCharts() {
    initEngagementChart();
    initPlatformChart();
}

function initEngagementChart() {
    const ctx = document.getElementById('engagementChart');
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? '#334155' : '#e2e8f0';

    const data = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Messages',
            data: [145, 189, 234, 178, 267, 123, 89],
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: '#3b82f6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }, {
            label: 'Engagement',
            data: [89, 123, 156, 134, 189, 98, 67],
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.1)',
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: '#8b5cf6',
            pointBorderColor: '#ffffff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6
        }]
    };

    window.engagementChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 20
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: isDark ? '#f1f5f9' : '#1e293b',
                    bodyColor: isDark ? '#94a3b8' : '#64748b',
                    borderColor: gridColor,
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: true
                }
            },
            scales: {
                x: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor
                    }
                },
                y: {
                    grid: {
                        color: gridColor,
                        drawBorder: false
                    },
                    ticks: {
                        color: textColor
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Handle chart type change
    const chartTypeSelect = document.getElementById('engagementChartType');
    if (chartTypeSelect) {
        chartTypeSelect.addEventListener('change', function() {
            const chartType = this.value;
            if (chartType === 'area') {
                window.engagementChart.config.type = 'line';
            } else {
                window.engagementChart.config.type = chartType;
            }
            window.engagementChart.update();
        });
    }
}

function initPlatformChart() {
    const ctx = document.getElementById('platformChart');
    if (!ctx) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const textColor = isDark ? '#94a3b8' : '#64748b';

    const data = {
        labels: ['WhatsApp', 'Email', 'LinkedIn', 'Instagram', 'Twitter'],
        datasets: [{
            data: [847, 624, 512, 398, 287],
            backgroundColor: [
                '#25D366',
                '#EA4335',
                '#0A66C2',
                '#E4405F',
                '#1DA1F2'
            ],
            borderColor: isDark ? '#1e293b' : '#ffffff',
            borderWidth: 3,
            hoverOffset: 8
        }]
    };

    window.platformChart = new Chart(ctx, {
        type: 'doughnut',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '60%',
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        padding: 16,
                        font: {
                            size: 12
                        }
                    }
                },
                tooltip: {
                    backgroundColor: isDark ? '#1e293b' : '#ffffff',
                    titleColor: isDark ? '#f1f5f9' : '#1e293b',
                    bodyColor: isDark ? '#94a3b8' : '#64748b',
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderWidth: 1,
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.raw / total) * 100).toFixed(1);
                            return `${context.label}: ${context.raw} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Heatmap Initialization
function initializeHeatmap() {
    const days = ['heatmapMon', 'heatmapTue', 'heatmapWed', 'heatmapThu', 'heatmapFri', 'heatmapSat', 'heatmapSun'];
    
    days.forEach(dayId => {
        const container = document.getElementById(dayId);
        if (!container) return;
        
        // Create 24 hour cells (8 hours for simplicity)
        for (let i = 0; i < 8; i++) {
            const cell = document.createElement('div');
            cell.className = 'heatmap-cell';
            const level = Math.floor(Math.random() * 6); // Random activity level 0-5
            if (level > 0) {
                cell.classList.add(`level-${level}`);
            }
            cell.title = `Hour ${i * 3}-${(i + 1) * 3}: ${Math.floor(Math.random() * 50)} activities`;
            container.appendChild(cell);
        }
    });
}

// Date Range Selector
function initializeDateRangeSelector() {
    const dateRangeBtns = document.querySelectorAll('.date-range-btn');
    
    dateRangeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            dateRangeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateAnalyticsData(this.dataset.range);
        });
    });
}

function updateAnalyticsData(range) {
    // Simulate data update based on date range
    const multipliers = {
        '7d': 1,
        '30d': 4,
        '90d': 12
    };
    
    const multiplier = multipliers[range] || 1;
    
    // Update stat values with animation
    animateValue('totalMessages', 1247 * multiplier, true);
    animateValue('totalContacts', 3892 * multiplier, true);
    animateValue('totalEngagement', (45.2 * multiplier) + 'K', false);
    
    // Update charts
    if (window.engagementChart) {
        const newData = [145, 189, 234, 178, 267, 123, 89].map(v => v * multiplier);
        window.engagementChart.data.datasets[0].data = newData;
        window.engagementChart.update();
    }
    
    if (window.platformChart) {
        const newData = [847, 624, 512, 398, 287].map(v => v * multiplier);
        window.platformChart.data.datasets[0].data = newData;
        window.platformChart.update();
    }
}

// Animate number values
function animateValue(elementId, endValue, isNumber) {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const startValue = parseInt(element.textContent.replace(/[^0-9]/g, '')) || 0;
    const duration = 1000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic
        
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        
        if (isNumber) {
            element.textContent = Math.round(currentValue).toLocaleString();
        } else {
            element.textContent = currentValue.toFixed(1) + 'K';
        }
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Export Button
function initializeExportButton() {
    const exportBtn = document.getElementById('exportBtn');
    
    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            // Create CSV data
            const data = [
                ['Metric', 'Value', 'Change'],
                ['Total Messages', '1,247', '+12.5%'],
                ['Contacts', '3,892', '+8.2%'],
                ['Engagement', '45.2K', '+24.1%'],
                ['Avg Response', '2.4m', '-3.1%'],
                [''],
                ['Platform', 'Messages', 'Percentage'],
                ['WhatsApp', '847', '32.5%'],
                ['Email', '624', '23.9%'],
                ['LinkedIn', '512', '19.6%'],
                ['Instagram', '398', '15.3%'],
                ['Twitter/X', '287', '11.0%']
            ];
            
            const csvContent = data.map(row => row.join(',')).join('\n');
            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            
            link.setAttribute('href', url);
            link.setAttribute('download', 'analytics_export_' + new Date().toISOString().split('T')[0] + '.csv');
            link.style.visibility = 'hidden';
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Show notification
            showNotification('Analytics exported successfully!', 'success');
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? '#22c55e' : '#3b82f6'};
        color: white;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease forwards;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            const icon = sidebarToggle.querySelector('i');
            if (sidebar.classList.contains('collapsed')) {
                icon.className = 'fas fa-chevron-right';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }
    
    // Settings modal
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    
    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', function() {
            settingsModal.classList.add('active');
        });
    }
    
    // Close modal function
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    };
    
    // Close modal on backdrop click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
            window.location.href = 'signup.html';
        });
    }
});
