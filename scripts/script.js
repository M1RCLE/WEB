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

    // Первая загрузка данных
    fetchData('high')
        .then(r => console.log(r))
        .catch(e => console.error(e));

    // Случайная фильтрация через 5 секунд
    setTimeout(() => {
        fetchData('low')
            .then(r => console.log(r))
            .catch(e => console.error(e));
    }, 5000);
});

