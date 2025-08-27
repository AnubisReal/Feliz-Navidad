class CountdownTimer {
    constructor() {
        this.targetDate = null;
        this.timerInterval = null;
        this.elements = {
            days: document.getElementById('days'),
            hours: document.getElementById('hours'),
            minutes: document.getElementById('minutes'),
            seconds: document.getElementById('seconds'),
            targetDate: document.getElementById('targetDate')
        };
        
        this.init();
    }

    init() {
        this.setNextMonday();
        this.startCountdown();
    }

    setNextMonday() {
        const now = new Date();
        const today = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
        
        // Calculate days until next Monday
        let daysUntilMonday;
        if (today === 0) { // Sunday
            daysUntilMonday = 1;
        } else if (today === 1) { // Monday
            // If it's Monday, check if it's past 9 AM, if so, go to next Monday
            if (now.getHours() >= 9) {
                daysUntilMonday = 7;
            } else {
                daysUntilMonday = 0;
            }
        } else { // Tuesday through Saturday
            daysUntilMonday = 8 - today;
        }
        
        // Set target date to next Monday at 9:00 AM
        this.targetDate = new Date();
        this.targetDate.setDate(now.getDate() + daysUntilMonday);
        this.targetDate.setHours(9, 0, 0, 0);
        
        // Update the date display
        this.updateDateDisplay();
    }

    updateDateDisplay() {
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric'
        };
        
        this.elements.targetDate.textContent = this.targetDate.toLocaleDateString('es-ES', options);
    }

    startCountdown() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }

        this.updateDisplay();
        this.timerInterval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const now = new Date().getTime();
        const distance = this.targetDate.getTime() - now;

        if (distance < 0) {
            // Monday has arrived, set next Monday
            this.setNextMonday();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        this.elements.days.textContent = days;
        this.elements.hours.textContent = hours;
        this.elements.minutes.textContent = minutes;
        this.elements.seconds.textContent = seconds;
    }
}

// Create floating shapes
function createFloatingShapes() {
    const shapesContainer = document.querySelector('.floating-shapes');
    const shapes = ['diamond', 'octagon', 'hexagon', 'triangle'];
    
    // Create multiple instances of each shape
    for (let i = 0; i < 8; i++) {
        const shape = document.createElement('div');
        const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
        
        shape.className = `shape ${shapeType}`;
        
        // Position shapes more towards center area but with some spread
        const centerX = 50 + (Math.random() - 0.5) * 60; // 20% to 80% width
        const centerY = 50 + (Math.random() - 0.5) * 60; // 20% to 80% height
        
        shape.style.left = centerX + '%';
        shape.style.top = centerY + '%';
        
        // Random animation delay for staggered effect
        shape.style.animationDelay = Math.random() * 15 + 's';
        
        // Slight size variation but keep them large
        const scale = 0.8 + Math.random() * 0.4;
        shape.style.transform += ` scale(${scale})`;
        
        shapesContainer.appendChild(shape);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CountdownTimer();
    createFloatingShapes();
});
