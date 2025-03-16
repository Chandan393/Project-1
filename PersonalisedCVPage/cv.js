document.addEventListener("DOMContentLoaded", function () {
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
                document.querySelectorAll('.nav-link').forEach(navLink => navLink.classList.remove('active'));
                this.classList.add('active');
            } else {
                console.warn(`Target section ${targetId} not found`);
            }
        });
    });
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
    const animateSkills = (section) => {
        section.querySelectorAll('.progress').forEach(skill => {
            const percent = skill.getAttribute('data-percent');
            if (percent) {
                skill.style.width = percent + '%';
            }
        });
    };

    const skillsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const skillsSection = document.querySelector('#skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }

    // Tab System
    const buttons = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');

    panes.forEach((pane, index) => {
        pane.style.display = index === 0 ? 'block' : 'none';
    });

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            buttons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            panes.forEach(pane => {
                pane.classList.remove('active');
                pane.style.display = 'none';
            });

            const tabId = this.getAttribute('data-tab');
            const activePane = document.getElementById(tabId);
            if (activePane) {
                activePane.classList.add('active');
                activePane.style.display = 'block';
            }
        });
    });

    // Project Modal
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "projectModal";
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

    const projectDetails = {
        project1: {
            title: "Test Automation Framework",
            description: "A comprehensive web application designed to test authentication, authorization, and data flow across multiple platforms.",
            features: [
                "User authentication and authorization testing",
                "Automated test case execution using TestNG",
                "Cross-browser testing with Selenium WebDriver",
                "HTML report generation",
                "Configurable test environment",
            ],
            technologies: ["Spring", "Spring Boot", "Selenium", "TestNG", "Java"],
            challenges: "One of the main challenges was setting up a reliable cross-browser testing environment and handling dynamic elements within the application.",
            outcomes: "Successfully implemented an automation framework that reduced manual testing time by 70% and improved test coverage and reliability.",
        },
        project2: {
            title: "Rental Web Application",
            description: "An e-commerce platform that allows users to rent products for temporary use instead of purchasing them outright.",
            features: [
                "User registration and authentication",
                "Product listing and search functionality",
                "Rental period selection and pricing calculation",
                "Secure payment processing",
                "User ratings and reviews",
            ],
            technologies: ["PHP", "HTML", "CSS", "JavaScript", "XAMP", "MySQL"],
            challenges: "Managing the rental period tracking and implementing a secure payment system were the major challenges faced during development.",
            outcomes: "Created a user-friendly interface that facilitated easy product rental. The platform was tested with a group of 50 users with positive feedback.",
        },
    };

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("project-details-btn")) {
            const projectId = event.target.getAttribute("data-project");
            const projectData = projectDetails[projectId];

            if (projectData) {
                document.getElementById("modal-title").textContent = projectData.title;
                document.getElementById("modal-body").innerHTML = `
                    <p>${projectData.description}</p>
                    <h3>Key Features</h3>
                    <ul>${projectData.features.map((feature) => `<li>${feature}</li>`).join("")}</ul>
                    <h3>Technologies Used</h3>
                    <div class="project-tech">${projectData.technologies.map((tech) => `<span>${tech}</span>`).join("")}</div>
                    <h3>Challenges</h3>
                    <p>${projectData.challenges}</p>
                    <h3>Outcomes</h3>
                    <p>${projectData.outcomes}</p>
                `;
                modal.style.display = "flex";
            }
        }

        if (event.target.classList.contains("modal-close") ||
            event.target.id === "modal-close-btn" ||
            event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Certification Carousel
    let currentCert = 0;
    const certSlides = document.querySelectorAll(".cert-slide");
    const nextBtn = document.querySelector(".cert-next");
    const prevBtn = document.querySelector(".cert-prev");
    const dotsContainer = document.querySelector(".cert-dots");

    if (!certSlides.length) return; 

    certSlides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.classList.add("cert-dot");
        if (index === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToCert(index));
        dotsContainer.appendChild(dot);
    });

    const certDots = document.querySelectorAll(".cert-dot");

    function goToCert(index) {
        certSlides.forEach((slide) => slide.classList.remove("active"));
        certDots.forEach((dot) => dot.classList.remove("active"));

        currentCert = index;
        certSlides[currentCert].classList.add("active");
        certDots[currentCert].classList.add("active");
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            currentCert = (currentCert + 1) % certSlides.length;
            goToCert(currentCert);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            currentCert = (currentCert - 1 + certSlides.length) % certSlides.length;
            goToCert(currentCert);
        });
    }

    let certInterval = setInterval(() => {
        currentCert = (currentCert + 1) % certSlides.length;
        goToCert(currentCert);
    }, 5000);

    document.querySelector(".certifications-carousel").addEventListener("mouseenter", () => {
        clearInterval(certInterval);
    });

    document.querySelector(".certifications-carousel").addEventListener("mouseleave", () => {
        certInterval = setInterval(() => {
            currentCert = (currentCert + 1) % certSlides.length;
            goToCert(currentCert);
        }, 5000);
    });
});
