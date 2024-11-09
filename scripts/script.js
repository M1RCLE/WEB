const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

console.log("Script is running on this page.");

window.addEventListener('load', function() {
    alert("Welcome to this page!");
});

menuOpenButton.addEventListener("click", () => {
    document.body.classList.toggle("show-mobile-menu");
});

menuCloseButton.addEventListener("click", () => menuOpenButton.click());


(function() {
    window.addEventListener('load', function() {
        const loadTime = (performance.now()).toFixed(2);

        const loadTimeInfo = document.getElementById('load-time-info');
        loadTimeInfo.textContent = `Page loaded in ${loadTime} ms`;
    });
})();

document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-item-side .nav-link");
    const currentPath = document.location.pathname;
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
});
