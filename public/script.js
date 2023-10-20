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

class Main {
    constructor() {
        this.pageViewsKey = 'pageViewsCount';
        this.initializeCounter();
        this.displayCount();
    }

    initializeCounter() {
        if (!localStorage.getItem(this.pageViewsKey)) {
            localStorage.setItem(this.pageViewsKey, '0');
        }
    }

    incrementCount() {
        let currentCount = parseInt(localStorage.getItem(this.pageViewsKey));
        currentCount++;
        localStorage.setItem(this.pageViewsKey, currentCount.toString());
    }

    displayCount() {
        this.incrementCount();
        document.getElementById('count').innerHTML = 'You have visited this page ' + localStorage.getItem(this.pageViewsKey)  + ' times.';
    }

    // Custom Function 1: Reset the counter to 0
    resetCounter() {
        localStorage.setItem(this.pageViewsKey, '0');
        this.displayCount();
    }

    // Custom Function 2: Log the current counter value
    logCounter() {
        console.log(`Current Counter Value: ${localStorage.getItem(this.pageViewsKey)}`);
    }

    flashScreen() {
        console.log("hit");
        document.body.style.backgroundColor = 'purple';
        setTimeout(() => {
            document.body.style.backgroundColor = '';
        }, 100);
    }
}

document.mainClass = new Main();

// Event Binding 1: Click event to reset the counter
document.getElementById('resetButton').addEventListener('click', function() {
    document.mainClass.resetCounter();
});

// Event Binding 2: Mousemove event to log the current counter value
document.addEventListener('mousemove', function() {
    document.mainClass.logCounter();
});

// Example for flashScreen:
document.getElementById('flashScreenButton').addEventListener('click', function() {
    document.mainClass.flashScreen();
});