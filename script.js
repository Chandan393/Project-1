document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll("#practices-list input");
    const countDisplay = document.getElementById("count");
    const successMessage = document.getElementById("success-message");
    const rewardContainer = document.getElementById("reward");

    function updateSummary() {
        let checkedCount = [...checkboxes].filter(checkbox => checkbox.checked).length;

        countDisplay.textContent = checkedCount;

        if (checkedCount >= 10) {  // Updated threshold to 10
            successMessage.innerHTML = "Amazing! You're following excellent coding practices!";
            fetchRandomAnimalImage();  // Fetch a reward image
        } else {
            successMessage.innerHTML = "";
            rewardContainer.innerHTML = "";
        }

        localStorage.setItem("checkedPractices", JSON.stringify([...checkboxes].map(cb => cb.checked)));
    }

    // Load saved state
    const savedState = JSON.parse(localStorage.getItem("checkedPractices"));
    if (savedState) {
        checkboxes.forEach((checkbox, index) => {
            checkbox.checked = savedState[index];
        });
    }

    checkboxes.forEach(checkbox => checkbox.addEventListener("change", updateSummary));

    updateSummary();  // Update on page load

    function fetchRandomAnimalImage() {
        fetch("https://place.dog/300/200")  // Placeholder for an actual API
            .then(response => {
                rewardContainer.innerHTML = `<img src="${response.url}" alt="Cute Animal">`;
            })
            .catch(error => console.error("Error fetching image:", error));
    }
});
