const moodMap = {
    'happy': { emoji: '😊', quote: "Keep spreading that joy! Your happiness lights up the world!" },
    'excited': { emoji: '🎉', quote: "Your enthusiasm is contagious! Keep that amazing energy!" },
    'sad': { emoji: '🥺', quote: "Every cloud has a silver lining. Tomorrow will be brighter!" },
    'angry': { emoji: '😠', quote: "Your feelings are valid. Take a moment to breathe and reset." },
    'tired': { emoji: '😴', quote: "Rest if you must, but don't you quit. You're stronger than you know!" },
    'peaceful': { emoji: '😌', quote: "Inner peace is the new success. Keep that tranquil spirit!" }
};

const specialGreetings = {
    'susagna': {
        nickname: 'my lil sis, chinnu',
        style: 'color: #ff69b4; font-weight: bold;'
    },
    'nirmala': {
        nickname: 'my dear sweet mom',
        style: 'color: #9932cc; font-weight: bold;'
    },
    'ramesh': {
        nickname: 'dad',
        style: 'color: #4169e1; font-weight: bold;'
    }
};

function startNewSession() {
    sessionStorage.removeItem('currentUser');
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('nameContainer').style.display = 'block';
}

function processName() {
    const nameInput = document.getElementById('nameInput');
    const name = nameInput.value.trim();
    
    if (!name) {
        nameInput.style.borderColor = '#ff6b6b';
        nameInput.placeholder = 'Please enter your name...';
        return;
    }

    const userData = {
        name: name.toLowerCase(),
        displayName: name
    };

    sessionStorage.setItem('currentUser', JSON.stringify(userData));
    showMoodContainer(userData);
}

function showMoodContainer(userData) {
    document.getElementById('nameContainer').style.display = 'none';
    document.getElementById('moodContainer').style.display = 'block';
    
    const userName = document.getElementById('userName');
    if (specialGreetings[userData.name]) {
        const { nickname, style } = specialGreetings[userData.name];
        userName.innerHTML = `<span style="${style}">${nickname}</span>`;
    } else {
        userName.textContent = userData.displayName;
    }
}

function selectMood(mood) {
    const response = moodMap[mood];
    showResult(response);
}

function processCustomMood() {
    const moodInput = document.getElementById('moodInput').value.toLowerCase().trim();
    let response = {
        emoji: '🤗',
        quote: "Whatever you're feeling is valid. Every emotion is a part of your journey!"
    };
    
    for (const mood in moodMap) {
        if (moodInput.includes(mood)) {
            response = moodMap[mood];
            break;
        }
    }
    
    showResult(response);
}

function showResult(response) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    // Hide all other containers
    document.getElementById('welcomeContainer').style.display = 'none';
    document.getElementById('nameContainer').style.display = 'none';
    document.getElementById('moodContainer').style.display = 'none';
    
    // Show only result container
    document.getElementById('resultContainer').style.display = 'block';
    
    document.getElementById('emojiDisplay').innerHTML = response.emoji;
    
    const quoteDisplay = document.getElementById('quoteDisplay');
    if (specialGreetings[currentUser.name]) {
        const { nickname } = specialGreetings[currentUser.name];
        quoteDisplay.innerHTML = `Hey ${nickname}, ${response.quote}`;
    } else {
        quoteDisplay.innerHTML = `Hey ${currentUser.displayName}, ${response.quote}`;
    }
}

function tryAnotherMood() {
    document.getElementById('resultContainer').style.display = 'none';
    document.getElementById('moodInput').value = '';
    document.getElementById('moodContainer').style.display = 'block';
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processName();
    });
    
    document.getElementById('moodInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') processCustomMood();
    });
});
