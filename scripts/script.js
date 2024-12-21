const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");

console.log("Script is running on this page.");

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
    const navLinks = document.querySelectorAll(".nav-item .nav-link");
    const currentPath = document.location.pathname;
    navLinks.forEach(link => {
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add("active");
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const userList = document.getElementById('user-list');
    const errorMessage = document.getElementById('error-message');

    const fetchData = async (filterCondition) => {
        try {
            loader.style.display = 'block';
            userList.innerHTML = '';
            errorMessage.style.display = 'none';

            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = await response.json();

            const filteredUsers = users.filter(user =>
                filterCondition === 'high' ? user.id > 5 : user.id <= 5
            );

            renderUsers(filteredUsers);
        } catch (error) {
            console.error(error);
            errorMessage.style.display = 'block';
        } finally {
            loader.style.display = 'none';
        }
    };

    const renderUsers = (users) => {
        if (users.length === 0) {
            const li = document.createElement('li');
            li.textContent = "Пользователей не найдено."
            userList.appendChild(li);
            return;
        }

        users.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.name} (${user.email})`;
            userList.appendChild(li);
        });
    };

    fetchData('high')
        .then(r => console.log(r))
        .catch(e => console.error(e));

    setTimeout(() => {
        fetchData('low')
            .then(r => console.log(r))
            .catch(e => console.error(e));
    }, 5000);
});

// Check if annyang (voice recognition library) is available
if (annyang) {
    console.log("Annyang is available and ready!");  // Log that Annyang is ready

    // Define the voice commands and their corresponding actions
    const commands = {
        // Command to go to the home page
        'home': () => {
            window.location.href = 'index.html';  // Redirect to index.html (Home Page)
        },
        
        // Command to go to the themes page
        'themes': () => {
            window.location.href = 'ownership.html';  // Redirect to ownership.html (Themes Page)
        },

        // Command to go to the constructor page
        'constructor': () => {
            window.location.href = 'constructor.html';  // Redirect to constructor.html (Constructor Page)
        },

        // Command to go to the contact page (which redirects to themes in this case)
        'contact': () => {
            window.location.href = 'ownership.html';  // Redirect to ownership.html (same as themes page)
        },

        // Command to show an alert with a greeting message
        'say hello': () => {
            alert('Hello! Welcome to the site.');  // Show a greeting message in an alert box
        },

        // Command to display a funny GIF (this can be used as a fun Easter egg)
        'ho ho ho': () => {
            window.location.href = 'imgs/rick.gif';  // Redirect to a GIF (rick.gif) - Easter egg
        },

        // Command to show another GIF based on a famous Harry Potter phrase
        'the boy who lived': () => {
            window.location.href = 'imgs/AVADACEDAVRA.gif';  // Redirect to another GIF (AVADACEDAVRA.gif) - Easter egg
        }
    };

    // Add the defined commands to annyang
    annyang.addCommands(commands);

    // Start voice recognition
    annyang.start();

    console.log("Voice recognition started");  // Log that voice recognition has started

    // Use case Scenario:
    // 1. **User visits the website:**
    //    The website loads and initializes Annyang (voice recognition).
    //    User is prompted to speak voice commands like "home", "say hello", "ho ho ho", etc.
    
    // 2. **User interacts with the website via voice commands:**
    //    a. "Home" redirects to the homepage.
    //    b. "Themes" redirects to the themes page.
    //    c. "Constructor" redirects to the constructor page.
    //    d. "Contact" redirects to the themes page (same as themes).
    //    e. "Say hello" triggers a greeting message in an alert.
    //    f. "Ho ho ho" triggers a fun Rick GIF.
    //    g. "The boy who lived" triggers a Harry Potter GIF.

} else {
    // If annyang is not supported in the browser, log an error message
    console.error("Annyang is not supported in this browser.");
    // If the browser doesn't support Annyang, voice commands won't work, and you can either show an error message
    // or use another fallback navigation (such as a normal UI with buttons).
}


