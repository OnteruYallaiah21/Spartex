// =================== DOM ELEMENTS ===================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');
const themeButtons = document.querySelectorAll('.theme-btn');
const loginBtn = document.querySelector('.login-btn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.querySelector('.close-modal');
const chatbotIcon = document.querySelector('.chatbot-icon');
const chatbotContainer = document.getElementById('chatbotContainer');
const closeChatbot = document.querySelector('.close-chatbot');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const currentYear = document.getElementById('current-year');

// =================== MOBILE MENU TOGGLE ===================
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// =================== THEME SWITCHER ===================
document.addEventListener("DOMContentLoaded", () => {
    const themeButtons = document.querySelectorAll('.theme-btn');

    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Apply saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
});

// =================== LOGIN MODAL ===================
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'flex';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// =================== CHATBOT WIDGET ===================
chatbotIcon.addEventListener('click', () => {
    chatbotContainer.style.display = chatbotContainer.style.display === 'block' ? 'none' : 'block';
});

closeChatbot.addEventListener('click', () => {
    chatbotContainer.style.display = 'none';
});

// Simple chatbot functionality
chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (message) {
        // Add user message
        addMessage(message, 'user');
        chatbotInput.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const responses = [
                "I'm an AI assistant here to help with your questions about SpartexAI services.",
                "Could you provide more details about your inquiry?",
                "Our team specializes in LLM integration and RAG-based solutions.",
                "For pricing information, please visit our pricing section.",
                "Thank you for your message! How can I assist you further?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'bot');
        }, 1000);
    }
}

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('chatbot-message');
    if (sender === 'user') {
        messageDiv.style.marginLeft = 'auto';
        messageDiv.style.backgroundColor = 'rgba(74, 107, 255, 0.2)';
    }
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// =================== SMOOTH SCROLLING ===================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// =================== ACTIVE NAV LINK ON SCROLL ===================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// =================== FORM SUBMISSION HANDLERS ===================
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Login functionality will be implemented soon!');
    this.reset();
    loginModal.style.display = 'none';
});

document.getElementById('newsletterForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// =================== SET CURRENT YEAR ===================
currentYear.textContent = new Date().getFullYear();

// =================== ANIMATIONS ===================
// Add intersection observer for scroll animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .story-card, .team-card, .pricing-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    animateOnScroll();
});