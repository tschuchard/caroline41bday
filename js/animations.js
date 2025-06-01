// Caroline's 41st Birthday - Animation Functions

// Counter animation with easing
function animateCounter() {
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
    yearsOf.classList.add('animate');
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

// Utility function for adding staggered animations
function addStaggeredAnimation(elements, className = 'animate', delay = 100) {
    elements.forEach((element, index) => {
        setTimeout(() => {
            element.classList.add(className);
        }, index * delay);
    });
}