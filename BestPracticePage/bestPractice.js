const bestPracticeList = [
    { id: "semantic-html", text: "Use Semantic HTML", explanation: "Semantic HTML elements improve accessibility and SEO." },
    { id: "alt-text", text: "Use `alt` attributes for images", explanation: "Alt text provides context for screen readers and when images fail to load." },
    { id: "heading-structure", text: "Organize Content with Proper Nesting", explanation: "Proper heading structure helps accessibility and readability." },
    { id: "responsive-design", text: "Ensure responsive design using CSS Grid/Flexbox", explanation: "Grid and Flexbox help create fluid layouts that work on all devices." },
    { id: "separate-content", text: "Separate content (HTML) from presentation (CSS)", explanation: "Separating concerns makes maintenance easier and improves reusability." },
    { id: "rems-ems", text: "Instead of Pixels use Rems & Ems", explanation: "Relative units improve scalability and accessibility." },
    { id: "important", text: "Minimize the use of !important", explanation: "Overusing !important makes debugging and maintenance difficult." },
    { id: "inline-styling", text: "Avoid inline styles", explanation: "External stylesheets improve performance and maintainability." },
    { id: "let-const", text: "Use let and const instead of var", explanation: "Block-scoped variables prevent unexpected behavior." },
    { id: "local-storage", text: "Use Local Storage for Saving User Preferences", explanation: "LocalStorage helps persist user preferences without backend storage." },
    { id: "readable", text: "Keep JavaScript code modular and readable", explanation: "Modular code is easier to debug, test, and maintain." },
    { id: "event-delegation", text: "Use event delegation for better performance", explanation: "Delegating events improves efficiency, especially in dynamic lists." },
    { id: "accessible-website", text: "Keep your website accessible", explanation: "ARIA attributes and proper contrast improve usability for all users." },
    { id: "optimize-performance", text: "Optimize performance", explanation: "Minifying CSS/JS and lazy loading reduce load times." },
    { id: "browser", text: "Ensure cross-browser compatibility", explanation: "Test in different browsers to ensure consistent behavior." }
];

document.addEventListener("DOMContentLoaded", () => {
    const bestPracticeContainer = document.getElementById("best-practice-list");
    const countDisplay = document.getElementById("count");
    const successMessage = document.getElementById("success-message");
    const rewardContainer = document.getElementById("reward");
    const progressBar = document.getElementById("progress-bar");

    if (!bestPracticeContainer || !countDisplay || !successMessage || !rewardContainer || !progressBar) {
        console.error("Some required elements are missing.");
        return;
    }

    // Load Saved state from local storage
    const prevState = JSON.parse(localStorage.getItem("checkedPractices")) || {};

    bestPracticeList.forEach(({ id, text, explanation }) => {
        const listItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = id;
        checkbox.checked = prevState[id] || false;

        const label = document.createElement("label");
        label.htmlFor = id;
        label.textContent = text;
        label.classList.add("label");

        const explanationPara = document.createElement("p");
        explanationPara.classList.add("explanation");
        explanationPara.textContent = explanation;

        listItem.append(checkbox, label, explanationPara);
        bestPracticeContainer.appendChild(listItem);
    });

    function summaryUpdate() {
        const checkboxes = [...document.querySelectorAll("#best-practice-list input")];
        const checkedCount = checkboxes.filter(cb => cb.checked).length;
        const totalPractices = checkboxes.length;

        countDisplay.textContent = `${checkedCount} / ${totalPractices}`;
        progressBar.style.width = (checkedCount / totalPractices) * 100 + '%';

        if (checkedCount === totalPractices) {
            successMessage.innerHTML = "🎉 Congratulations! You've followed all best practices! 🚀";
        } else if (checkedCount >= 12) {
            successMessage.innerHTML = "🔥 Amazing! Your commitment to best practice is paying off!";
        } else if (checkedCount >= 8) {
            successMessage.innerHTML = "💪 You're doing great! Keep improving!";
        } else if (checkedCount >= 4) {
            successMessage.innerHTML = "👍 Good start! Try to check off more best practices!";
        } else {
            successMessage.innerHTML = "💡 Let's begin! Implement more best practices for better coding!";
        }

        const updatedState = Object.fromEntries(checkboxes.map(cb => [cb.id, cb.checked]));
        localStorage.setItem("checkedPractices", JSON.stringify(updatedState));

        if (checkedCount >= 12) {
            if (!localStorage.getItem("rewardImage")) {
                fetchAnimalPicture();
            } else {
                displayRewardImage(localStorage.getItem("rewardImage"));
            }
        } else {
            localStorage.removeItem("rewardImage");
            hideRewardImage();
        }
    }

    document.querySelectorAll("#best-practice-list input").forEach(checkbox => {
        checkbox.addEventListener("change", summaryUpdate);
    });

    function fetchAnimalPicture() {
        fetch("https://api.thecatapi.com/v1/images/search")
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const imageUrl = data[0].url;
                    localStorage.setItem("rewardImage", imageUrl);
                    displayRewardImage(imageUrl);
                }
            })
            .catch(error => console.error("Error fetching image:", error));
    }

    function displayRewardImage(imageUrl) {
        rewardContainer.innerHTML = `<img src="${imageUrl}" alt="Cute Animal" class="reward-image">`;
    }
    
    function hideRewardImage() {
        rewardContainer.innerHTML = ""; 
    }
    
    summaryUpdate();
});
