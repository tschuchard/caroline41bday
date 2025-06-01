// Caroline's 41st Birthday - Complete JavaScript

// Animation sequence data
const phrases = [
    "being amazing",
    "loving others", 
    "awesome adventures",
    "making memories",
    "fun times",
    "spreading joy",
    "being incredible",
    "creating magic"
];

let currentPhraseIndex = 0;
let isFirstPhrase = true;

// DOM elements
let counter, yearsOf, currentPhrase;

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Get DOM elements
    counter = document.getElementById('counter');
    yearsOf = document.getElementById('yearsOf');
    currentPhrase = document.getElementById('currentPhrase');
    
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
        console.log('Lucide icons initialized');
    } else {
        console.warn('Lucide not loaded');
    }
    
    // Set up scroll animations
    setupScrollAnimations();
    
    // Create sparkling dots grid
    createSparklingGrid();
    
    // Create stats sparkles after a delay to ensure section is ready
    setTimeout(() => {
        createSparklingGridStats();
    }, 2000);
    
    // Start the main animation sequence
    setTimeout(startAnimationSequence, 1000);
    
    // Set up scroll indicator click handler
    setupScrollHandler();
    
    // Set up refresh button click handler
    setupRefreshButton();
    
    // Handle window resize for sparkling grid
    window.addEventListener('resize', () => {
        const gridContainer = document.getElementById('sparklingGrid');
        if (gridContainer) {
            gridContainer.innerHTML = ''; // Clear existing dots
            createSparklingGrid(); // Recreate grid
        }
    });
});

// Main animation sequence
function startAnimationSequence() {
    animateCounter();
}

// Counter animation with easing
function animateCounter() {
    if (!counter) return;
    
    let count = 0;
    const target = 41;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    counter.classList.add('animate');
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        count = Math.floor(easeOutQuart * target);
        
        counter.textContent = count;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
            setTimeout(animateYearsOf, 500);
        }
    }
    
    updateCounter();
}

// Years of animation
function animateYearsOf() {
    if (!yearsOf) return;
    yearsOf.classList.add('animate');
    
    // Start floating animations after both elements are in place
    setTimeout(() => {
        if (counter) counter.classList.add('floating');
        if (yearsOf) yearsOf.classList.add('floating');
    }, 1000);
    
    setTimeout(startPhraseAnimation, 800);
}

// Phrase animation cycle with slide down effect
function startPhraseAnimation() {
    showNextPhraseWithSlideDown();
}

function showNextPhraseWithSlideDown() {
    if (!currentPhrase) return;
    
    if (isFirstPhrase) {
        // First phrase: slide down from above
        const words = phrases[currentPhraseIndex].split(' ');
        currentPhrase.innerHTML = `<div>${words[0]}</div><div>${words[1]}</div>`;
        currentPhrase.className = 'phrase slide-in-down';
        
        // Trigger animation after a brief delay
        setTimeout(() => {
            currentPhrase.classList.add('active');
        }, 100);
        
        isFirstPhrase = false;
        
        // Schedule next phrase change for first phrase
        setTimeout(showNextPhraseWithSlideDown, 3500);
        return;
    } else {
        // Subsequent phrases: current slides down and out, new one slides down and in
        
        // Slide out current phrase downward
        currentPhrase.classList.remove('active');
        currentPhrase.classList.add('slide-out-down');
        
        // After slide out completes, change text and slide in from above
        setTimeout(() => {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            const words = phrases[currentPhraseIndex].split(' ');
            currentPhrase.innerHTML = `<div>${words[0]}</div><div>${words[1]}</div>`;
            
            // Reset classes and set up for slide in from above
            currentPhrase.className = 'phrase slide-in-down';
            
            // Trigger slide in animation
            setTimeout(() => {
                currentPhrase.classList.add('active');
            }, 100);
        }, 600); // Half of transition duration (1.2s = 1200ms)
        
        // Schedule next phrase change (much slower)
        setTimeout(showNextPhraseWithSlideDown, 3500);
    }
}

// Sparkling dots grid effect
function createSparklingGrid() {
    const gridContainer = document.getElementById('sparklingGrid');
    if (!gridContainer) return;
    
    const gridSpacing = 80; // Distance between dots
    const containerWidth = window.innerWidth;
    const containerHeight = window.innerHeight;
    
    // Calculate number of dots needed
    const dotsPerRow = Math.ceil(containerWidth / gridSpacing);
    const dotsPerColumn = Math.ceil(containerHeight / gridSpacing);
    
    // Create grid of dots
    for (let row = 0; row < dotsPerColumn; row++) {
        for (let col = 0; col < dotsPerRow; col++) {
            const dot = document.createElement('div');
            dot.className = 'sparkle-dot';
            
            // Random size variation
            const sizeRandom = Math.random();
            if (sizeRandom < 0.3) {
                dot.classList.add('small');
            } else if (sizeRandom > 0.8) {
                dot.classList.add('large');
            }
            
            // Position the dot
            dot.style.left = (col * gridSpacing + Math.random() * 20 - 10) + 'px';
            dot.style.top = (row * gridSpacing + Math.random() * 20 - 10) + 'px';
            
            // Random animation delay
            dot.style.animationDelay = Math.random() * 3 + 's';
            dot.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            gridContainer.appendChild(dot);
        }
    }
}

// Scroll animations setup
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add floating animation to birthday section elements
                if (entry.target.classList.contains('birthday-title')) {
                    setTimeout(() => {
                        entry.target.classList.add('floating');
                    }, 1000);
                }
                
                if (entry.target.classList.contains('my-love-text')) {
                    setTimeout(() => {
                        entry.target.classList.add('floating');
                    }, 1000);
                }
                
                // Create sparkles when stats section comes into view
                if (entry.target.classList.contains('stats-section')) {
                    setTimeout(createSparklingGridStats, 100);
                }
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    const birthdayTitle = document.getElementById('birthdayTitle');
    const myLoveText = document.querySelector('.my-love-text');
    const statsHeadline = document.querySelector('.stats-headline');
    const statCards = document.querySelectorAll('.stat-card');
    const statsSection = document.querySelector('.stats-section');
    
    if (birthdayTitle) {
        observer.observe(birthdayTitle);
    }
    
    if (myLoveText) {
        observer.observe(myLoveText);
    }
    
    if (statsHeadline) {
        observer.observe(statsHeadline);
    }
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    statCards.forEach((card, index) => {
        // Add staggered delay for each card
        card.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(card);
    });
}

// Smooth scrolling setup
function setupScrollHandler() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            const birthdaySection = document.querySelector('.birthday-section');
            if (birthdaySection) {
                birthdaySection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
}

// Refresh button setup
function setupRefreshButton() {
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            // Reset animation state
            isFirstPhrase = true;
            currentPhraseIndex = 0;
            
            // Reset counter
            if (counter) {
                counter.textContent = '0';
                counter.className = 'counter';
            }
            
            // Reset years of
            if (yearsOf) {
                yearsOf.className = 'years-of';
            }
            
            // Reset phrase
            if (currentPhrase) {
                currentPhrase.className = 'phrase';
                currentPhrase.innerHTML = '';
            }
            
            // Restart animation sequence
            setTimeout(startAnimationSequence, 500);
            
            // Refresh icons
            setTimeout(() => {
                if (typeof lucide !== 'undefined') {
                    lucide.createIcons();
                }
            }, 100);
        });
    }
}

// Utility function for adding staggered animations
function addStaggeredAnimation(elements, className = 'animate', delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(className);
        }, index * delay);
    });
}

// Sparkling dots grid effect for stats section
function createSparklingGridStats() {
    console.log('Attempting to create stats sparkles...');
    const gridContainer = document.getElementById('sparklingGridStats');
    console.log('Grid container found:', gridContainer);
    
    if (!gridContainer) {
        console.log('No grid container found!');
        return;
    }
    
    // Clear existing dots first
    gridContainer.innerHTML = '';
    
    const gridSpacing = 80; // Distance between dots
    const statsSection = document.querySelector('.stats-section');
    console.log('Stats section:', statsSection);
    
    const containerWidth = statsSection ? statsSection.offsetWidth : 1200;
    const containerHeight = statsSection ? statsSection.offsetHeight : 800;
    
    console.log('Container dimensions:', containerWidth, 'x', containerHeight);
    
    // Calculate number of dots needed
    const dotsPerRow = Math.ceil(containerWidth / gridSpacing);
    const dotsPerColumn = Math.ceil(containerHeight / gridSpacing);
    
    console.log('Creating stats sparkles:', dotsPerRow, 'x', dotsPerColumn);
    
    // Create grid of dots
    for (let row = 0; row < dotsPerColumn; row++) {
        for (let col = 0; col < dotsPerRow; col++) {
            const dot = document.createElement('div');
            dot.className = 'sparkle-dot';
            
            // Random size variation
            const sizeRandom = Math.random();
            if (sizeRandom < 0.3) {
                dot.classList.add('small');
            } else if (sizeRandom > 0.8) {
                dot.classList.add('large');
            }
            
            // Position the dot
            dot.style.left = (col * gridSpacing + Math.random() * 20 - 10) + 'px';
            dot.style.top = (row * gridSpacing + Math.random() * 20 - 10) + 'px';
            
            // Random animation delay
            dot.style.animationDelay = Math.random() * 3 + 's';
            dot.style.animationDuration = (2 + Math.random() * 2) + 's';
            
            // Make dots more visible for debugging
            dot.style.background = '#fefefe';
            dot.style.zIndex = '10';
            
            gridContainer.appendChild(dot);
        }
    }
    
    console.log('Created', gridContainer.children.length, 'sparkle dots');
}