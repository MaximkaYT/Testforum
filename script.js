document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
    loadTheme();
    document.getElementById("toggle-theme").addEventListener("click", toggleTheme);
});

function addPost() {
    let username = document.getElementById("username").value.trim();
    let message = document.getElementById("message").value.trim();
    
    if (message === "") return;

    let userColor = getUserColor(username);

    let post = {
        author: username || "Аноним",
        color: userColor,
        content: message,
        timestamp: new Date().toLocaleString()
    };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    document.getElementById("message").value = "";
    loadPosts();
}

function loadPosts() {
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    let postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";

    posts.forEach(post => {
        let postElement = document.createElement("div");
        postElement.classList.add("post");
        postElement.innerHTML = `
            <div class="author" style="color:${post.color}">${post.author}</div>
            <div class="content">${post.content}</div>
            <small>${post.timestamp}</small>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Генерация уникального цвета для каждого имени
function getUserColor(name) {
    if (!name) return "#007bff"; // Цвет по умолчанию для "Анонимов"
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#" + ((hash & 0xffffff).toString(16)).padStart(6, "0");
    return color;
}

// Переключение темы
function toggleTheme() {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
}

// Загрузка темы при старте
function loadTheme() {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }
}