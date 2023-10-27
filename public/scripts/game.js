class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.canvas.width = 600;
        this.canvas.height = 800;
        this.score = 0;

        // Define the spaceship and projectiles
        this.spaceship = { x: this.canvas.width / 2, y: this.canvas.height - 30, width: 30, height: 30, speed: 3 };
        this.projectiles = [];

        // Track the time since the last projectile was fired
        this.lastProjectileTime = 0;
        this.projectileDelay = 1000 / 3; // Fire three projectiles per second

        // Define the stars
        this.stars = this.createStars(100);

        // Define an object to store the state of the keys
        this.keys = {};

        // Handle keyboard input
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        document.addEventListener('keyup', (e) => this.handleKeyUp(e));

        // Start game loop
        this.update();

        // Handle keyboard input
        document.addEventListener('keydown', (e) => this.handleInput(e));
    }

    createStars(number) {
        const stars = [];
        for (let i = 0; i < number; i++) {
            const star = {
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 1  // Random size between 1 and 3
            };
            stars.push(star);
        }
        return stars;
    }

    redraw() {
        // Clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the background
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw the stars
        this.ctx.fillStyle = 'lightgray';
        for (const star of this.stars) {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.size, 0, 2 * Math.PI);
            this.ctx.fill();
        }

        // Draw the spaceship
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.spaceship.x, this.spaceship.y, this.spaceship.width, this.spaceship.height);

        // Draw each projectile
        this.ctx.fillStyle = 'blue';
        for (const projectile of this.projectiles) {
            this.ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
        }
    }

    handleInput(e) {
        if (e.key === 'ArrowRight') {
            this.spaceship.x = Math.min(this.canvas.width - this.spaceship.width, this.spaceship.x + this.spaceship.speed);
        } else if (e.key === 'ArrowLeft') {
            this.spaceship.x = Math.max(0, this.spaceship.x - this.spaceship.speed);
        } else if (e.key === ' ') {  // Space bar to shoot
            this.shoot();
        }
    }

    shoot() {
        const currentTime = Date.now();
        if (currentTime - this.lastProjectileTime > this.projectileDelay) {
            const projectile = {
                x: this.spaceship.x + this.spaceship.width / 2 - 2.5, // Center of the spaceship
                y: this.spaceship.y - 10,
                width: 5,
                height: 10,
                speed: 7
            };
            this.projectiles.push(projectile);
            this.lastProjectileTime = currentTime;
        }
    }

    updateProjectiles() {
        for (let i = this.projectiles.length - 1; i >= 0; i--) {
            this.projectiles[i].y -= this.projectiles[i].speed;
            if (this.projectiles[i].y + this.projectiles[i].height < 0) {
                this.projectiles.splice(i, 1);  // Remove the projectile if it goes off the screen
            }
        }
    }

    handleKeyDown(e) {
        this.keys[e.key] = true;
    }

    handleKeyUp(e) {
        this.keys[e.key] = false;
    }

    update() {
        // Update the spaceship position based on the keys
        if (this.keys['ArrowRight']) {
            this.spaceship.x = Math.min(this.canvas.width - this.spaceship.width, this.spaceship.x + this.spaceship.speed);
        }
        if (this.keys['ArrowLeft']) {
            this.spaceship.x = Math.max(0, this.spaceship.x - this.spaceship.speed);
        }
        if (this.keys[' ']) {  // Space bar to shoot
            this.shoot();
        }

        this.updateProjectiles();
        this.redraw();

        // Use requestAnimationFrame for smooth animations
        requestAnimationFrame(() => this.update());
    }
}

// Initialize the game
document.myGame = new Game();

// Log the score once every second
setInterval(() => console.log(document.myGame.score), 1000);
