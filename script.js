// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.className = savedTheme;

    // Toggle theme
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('light-theme')) {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark-theme');
        } else {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light-theme');
        }
    });

    // Modal functionality
    const modal = document.getElementById('subscribe-modal');
    const subscribeButton = document.getElementById('subscribe-trigger');
    const closeButton = document.getElementById('close-modal');
    const subscribeForm = document.getElementById('subscribe-form');

    function openModal() {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }

    subscribeButton.addEventListener('click', openModal);
    closeButton.addEventListener('click', closeModal);

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Function to show notification bubble
    function showNotification(message, isError = false) {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = 'notification'; // Reset classes
        if (isError) {
            notification.classList.add('error');
        }
        notification.classList.add('show');

        // Hide the notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    // Handle subscribe form submission
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;

            try {
                const response = await fetch('https://aeroloops-online.squareweb.app/subscribe', { // Replace with the backend's public URL
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    showNotification('Thank you for subscribing! We\'ll keep you updated with the latest aviation news.');
                    subscribeForm.reset();
                    closeModal();
                } else {
                    const error = await response.json();
                    showNotification(error.message || 'An error occurred. Please try again.', true);
                }
            } catch (err) {
                showNotification('Failed to connect to the server. Please try again later.', true);
            }
        });
    }

    // Text animation
    const words = ['site', 'blog', 'portal'];
    const animatedText = document.querySelector('.animated-text');
    let currentIndex = 0;

    function updateText() {
        animatedText.classList.add('fade');
        
        setTimeout(() => {
            animatedText.textContent = words[currentIndex];
            animatedText.classList.remove('fade');
            currentIndex = (currentIndex + 1) % words.length;
        }, 200);
    }

    setInterval(updateText, 2000);
});