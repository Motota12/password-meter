let container = document.querySelector(".container");
const passwordInput = document.querySelector("#Yourpassword");
const toggleBtn = document.getElementById("togglePassword");
const strengthLabel = document.getElementById("strengthLabel");
const bars = document.querySelectorAll(".bar");
const tips = document.getElementById("tips");

let isPasswordVisible = false;

function strength(password) {
    let score = 0;
    const length = password.length;

    // Length
    if (length >= 8) score++;
    if (length >= 12) score++;

    // Lowercase
    if (/[a-z]/.test(password)) score++;

    // Uppercase
    if (/[A-Z]/.test(password)) score++;

    // Numbers
    if (/[0-9]/.test(password)) score++;

    // Special chars
    if (/[^A-Za-z0-9]/.test(password)) score++;

    // No consecutive repeats (basic)
    if (!/(.)\1{2,}/.test(password)) score++;

    return score;
}

function updateStrength() {
    const password = passwordInput.value;
    const score = strength(password);

    // Remove all classes
    container.classList.remove("weak", "moderate", "strong");

    let label = "ضعيفة";
    let tip = "أضف المزيد من الطول والتنوع.";
    let barCount = 0;

    if (score <= 2) {
        container.classList.add("weak");
        label = "ضعيفة";
        barCount = 1;
    } else if (score <= 4) {
        container.classList.add("moderate");
        label = "متوسطة";
        barCount = 2;
        tip = "أضف رموزاً خاصة وحروف كبيرة.";
    } else {
        container.classList.add("strong");
        label = "قوية";
        barCount = 4;
        tip = "ممتاز! كلمة مرور آمنة.";
    }

    // Update bars
    bars.forEach((bar, index) => {
        if (index < barCount) {
            bar.style.width = "50px";
        } else {
            bar.style.width = "10px";
        }
    });

    strengthLabel.textContent = label;
    tips.textContent = tip;
}

// Toggle password visibility
toggleBtn.addEventListener("click", () => {
    isPasswordVisible = !isPasswordVisible;
    passwordInput.type = isPasswordVisible ? "text" : "password";
    toggleBtn.textContent = isPasswordVisible ? "🙈" : "👁️";
});

// Real-time update
passwordInput.addEventListener("input", updateStrength);
