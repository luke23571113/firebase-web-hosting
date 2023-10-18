let isHomePage = true;

function switchContent() {
    const contentDiv = document.getElementById("content");
    if (isHomePage) {
        fetch('about.html')
            .then(response => response.text())
            .then(data => {
                contentDiv.innerHTML = data;
            });
    } else {
        contentDiv.innerHTML = `
            <h1>Welcome to the Home Page</h1>
            <p>This is the main content of the homepage.</p>
        `;
    }
    isHomePage = !isHomePage;
}
