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

    // Handle subscribe form submission
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            // Here you would typically send this to your backend
            alert('Thank you for subscribing! We\'ll keep you updated with the latest aviation news.');
            subscribeForm.reset();
            closeModal();
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