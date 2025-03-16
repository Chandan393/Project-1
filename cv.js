document.querySelectorAll('.nav-link').forEach(link => {
link.addEventListener('click', function (e) {
e.preventDefault();

const targetId = this.getAttribute('href');
const targetSection = document.querySelector(targetId);

if (targetSection) {
window.scrollTo({
top: targetSection.offsetTop - 100,
behavior: 'smooth'
});

// Update active link
document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('active'));
this.classList.add('active');
} else {
console.warn(`Target section ${targetId} not found`);
}
});
});

// Highlight Active Navigation Link on Scroll
window.addEventListener('scroll', function () {
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

let currentSection = '';

sections.forEach(section => {
const sectionTop = section.offsetTop - 150;
const sectionHeight = section.clientHeight;

if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
currentSection = '#' + section.getAttribute('id');
}
});

navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href') === currentSection) {
link.classList.add('active');
}
});
});

// Skills Progress Animation
const animateSkills = () => {
document.querySelectorAll('.progress').forEach(skill => {
const percent = skill.getAttribute('data-percent');
if (percent) {
skill.style.width = percent + '%';
}
});
};

// Animate skills when they come into view
const skillsObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
animateSkills();
skillsObserver.unobserve(entry.target);
}
});
}, { threshold: 0.5 });

const skillsSection = document.querySelector('#skills');
if (skillsSection) {
skillsObserver.observe(skillsSection);
}

// Tab System - Fixed to ensure both internship tabs work correctly
document.addEventListener("DOMContentLoaded", function () {
const buttons = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');

// Make sure all panes except first one are hidden initially
panes.forEach((pane, index) => {
if (index !== 0) {
pane.style.display = 'none';
} else {
pane.style.display = 'block';
}
});

buttons.forEach(button => {
button.addEventListener('click', function () {
// Remove 'active' from all buttons
buttons.forEach(btn => btn.classList.remove('active'));

// Add 'active' to clicked button
this.classList.add('active');

// Hide all tab panes
panes.forEach(pane => {
pane.classList.remove('active');
pane.style.display = 'none';
});

// Show the selected tab pane
const tabId = this.getAttribute('data-tab');
const activePane = document.getElementById(tabId);
if (activePane) {
activePane.classList.add('active');
activePane.style.display = 'block';
}
});
});
});

// Project Modal
const modal = document.createElement('div');
modal.className = 'modal';
modal.id = 'projectModal';
modal.innerHTML = `
<div class="modal-content">
<div class="modal-header">
<h2 id="modal-title">Project Details</h2>
<button class="modal-close">&times;</button>
</div>
<div class="modal-body" id="modal-body"></div>
<div class="modal-footer">
<button class="project-details-btn" id="modal-close-btn">Close</button>
</div>
</div>
`;
document.body.appendChild(modal);

// Project Details Data
const projectDetails = {
project1: {
title: "Test Automation Framework",
description: "A comprehensive web application designed to test authentication, authorization, and data flow across multiple platforms.",
features: [
"User authentication and authorization testing",
"Automated test case execution using TestNG",
"Cross-browser testing with Selenium WebDriver",
"HTML report generation",
"Configurable test environment"
],
technologies: ["Spring", "Spring Boot", "Selenium", "TestNG", "Java"],
challenges: "One of the main challenges was setting up a reliable cross-browser testing environment and handling dynamic elements within the application.",
outcomes: "Successfully implemented an automation framework that reduced manual testing time by 70% and improved test coverage and reliability."
},
project2: {
title: "Rental Web Application",
description: "An e-commerce platform that allows users to rent products for temporary use instead of purchasing them outright.",
features: [
"User registration and authentication",
"Product listing and search functionality",
"Rental period selection and pricing calculation",
"Secure payment processing",
"User ratings and reviews"
],
technologies: ["PHP", "HTML", "CSS", "JavaScript", "XAMP", "MySQL"],
challenges: "Managing the rental period tracking and implementing a secure payment system were the major challenges faced during development.",
outcomes: "Created a user-friendly interface that facilitated easy product rental. The platform was tested with a group of 50 users with positive feedback."
}
};

document.querySelectorAll('.project-details-btn').forEach(button => {
button.addEventListener('click', () => {
const projectId = button.getAttribute('data-project');
const projectData = projectDetails[projectId];

if (projectData) {
document.getElementById('modal-title').textContent = projectData.title;
document.getElementById('modal-body').innerHTML = `
<p>${projectData.description}</p>
<h3>Key Features</h3>
<ul>${projectData.features.map(feature => `<li>${feature}</li>`).join('')}</ul>
<h3>Technologies Used</h3>
<div class="project-tech">${projectData.technologies.map(tech => `<span>${tech}</span>`).join('')}</div>
<h3>Challenges</h3>
<p>${projectData.challenges}</p>
<h3>Outcomes</h3>
<p>${projectData.outcomes}</p>
`;
modal.style.display = 'flex';
}
});
});

// Close modal
document.querySelectorAll('.modal-close, #modal-close-btn').forEach(button => {
button.addEventListener('click', () => modal.style.display = 'none');
});
modal.addEventListener('click', (e) => {
if (e.target === modal) {
modal.style.display = 'none';
}
});

// Certification Carousel
let currentCert = 0;
const certSlides = document.querySelectorAll('.cert-slide');
const certDots = document.querySelectorAll('.cert-dot');

function goToCert(index) {
certSlides.forEach(slide => slide.classList.remove('active'));
certDots.forEach(dot => dot.classList.remove('active'));

currentCert = index;
certSlides[currentCert].classList.add('active');

// Check if dot exists before trying to add class
if (certDots[currentCert]) {
certDots[currentCert].classList.add('active');
}
}

document.querySelector('.cert-next').addEventListener('click', () => {
currentCert = (currentCert + 1) % certSlides.length;
goToCert(currentCert);
});

document.querySelector('.cert-prev').addEventListener('click', () => {
currentCert = (currentCert - 1 + certSlides.length) % certSlides.length;
goToCert(currentCert);
});

// Auto-rotate certifications
let certInterval = setInterval(() => {
currentCert = (currentCert + 1) % certSlides.length;
goToCert(currentCert);
}, 5000);

// Create dots for certification carousel
const dotsContainer = document.querySelector('.cert-dots');
if (dotsContainer) {
certSlides.forEach((_, index) => {
const dot = document.createElement('span');
dot.classList.add('cert-dot');
if (index === 0) dot.classList.add('active');
dot.addEventListener('click', () => goToCert(index));
dotsContainer.appendChild(dot);
});
}

// Dynamic Year for Copyright
const yearElement = document.getElementById('current-year');
if (yearElement) {
yearElement.textContent = new Date().getFullYear();
}
