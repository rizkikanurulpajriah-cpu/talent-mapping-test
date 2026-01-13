// State Management
let currentQuestionIndex = 0;
let userAnswers = {}; // Format: { categoryId: score }
let userData = {
    name: '',
    age: ''
};
let myChart = null; // Store chart instance

// Listen to DOM Load
document.addEventListener('DOMContentLoaded', () => {
    console.log("App initialized");
});

// Navigation Functions
function showSection(id) {
    const sections = ['landing-page', 'user-form-page', 'quiz-page', 'result-page', 'history-page'];
    sections.forEach(section => {
        const el = document.getElementById(section);
        if (el) {
            if (section === id) {
                el.classList.remove('hidden');
                el.classList.add('fade-in');
            } else {
                el.classList.add('hidden');
                el.classList.remove('fade-in');
            }
        }
    });
}

function goToForm() {
    showSection('user-form-page');
}

function startQuiz(e) {
    e.preventDefault();
    const nameInput = document.getElementById('name').value;
    const ageInput = document.getElementById('age').value;

    if (nameInput && ageInput) {
        userData.name = nameInput;
        userData.age = ageInput;

        // Initialize scores for all 6 categories
        Object.keys(talents).forEach(key => {
            userAnswers[key] = 0;
        });

        currentQuestionIndex = 0;
        renderQuestion();
        showSection('quiz-page');
    }
}

// Quiz Logic
function renderQuestion() {
    if (questions.length === 0) return;

    const q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.text;

    // Update progress bar
    const progress = ((currentQuestionIndex) / questions.length) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function answerQuestion(score) {
    const currentQ = questions[currentQuestionIndex];

    // Add score to category
    if (userAnswers[currentQ.category] !== undefined) {
        userAnswers[currentQ.category] += score;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        // Slight delay for better UX
        setTimeout(() => {
            renderQuestion();
        }, 200);
    } else {
        finishQuiz();
    }
}

function finishQuiz() {
    // Complete progress bar
    document.getElementById('progressBar').style.width = '100%';

    setTimeout(() => {
        calculateResults();
        showSection('result-page');
    }, 500);
}

// Result Calculation & Display
function calculateResults() {
    document.getElementById('result-name').innerText = userData.name;

    // Sort talents by score descending
    const sortedTalents = Object.keys(userAnswers).sort((a, b) => userAnswers[b] - userAnswers[a]);

    // Get Top 3
    const top3Ids = sortedTalents.slice(0, 3);
    const topTalent = talents[top3Ids[0]]; // Number 1

    // Save to History (LocalStorage)
    saveHistory(userData.name, topTalent.name);

    // --- Render Top 3 Cards ---
    const top3Container = document.getElementById('top3-container');
    top3Container.innerHTML = ''; // Clear previous

    top3Ids.forEach((id, index) => {
        const t = talents[id];
        const card = document.createElement('div');
        // Add specific animation classes with delays
        card.className = `talent-card rank-${index + 1} slide-up delay-${(index + 1) * 200}`;
        card.innerHTML = `
            <div class="rank-badge">#${index + 1}</div>
            <div class="talent-name">${t.name}</div>
            <p class="talent-desc">${t.description}</p>
        `;
        top3Container.appendChild(card);
    });

    // --- Render Personal Insight ---
    const insightContainer = document.getElementById('personal-insight-container');
    insightContainer.innerHTML = `
        <div class="insight-card strength slide-up delay-600">
            <div class="insight-icon">💪</div>
            <div class="insight-title">Kekuatan Utama</div>
            <p>${topTalent.insight.strength}</p>
        </div>
        <div class="insight-card weakness slide-up delay-700">
            <div class="insight-icon">⚠️</div>
            <div class="insight-title">Area Pengembangan</div>
            <p>${topTalent.insight.weakness}</p>
        </div>
        <div class="insight-card motivation slide-up delay-800">
            <div class="insight-icon">🔥</div>
            <div class="insight-title">Motivasi</div>
            <p>${topTalent.insight.motivation}</p>
        </div>
    `;

    // --- Render Recommendations (based on #1 Talent) ---
    const recContainer = document.getElementById('career-recommendations');
    recContainer.innerHTML = '';

    // Create Profession Tags
    const careerTags = topTalent.careers.map(c => `<span class="tag">${c}</span>`).join('');
    const majorTags = topTalent.majors.map(m => `<span class="tag">${m}</span>`).join('');

    recContainer.innerHTML = `
        <div class="rec-item slide-up delay-400">
            <div class="rec-label">Profesi yang Cocok</div>
            <div class="rec-content">${careerTags}</div>
        </div>
        <div class="rec-item slide-up delay-500">
            <div class="rec-label">Jurusan Kuliah</div>
            <div class="rec-content">${majorTags}</div>
        </div>
    `;

    // --- Render Chart ---
    renderChart();
}

function renderChart() {
    const ctx = document.getElementById('talentChart').getContext('2d');

    // Prepare data
    const labels = Object.values(talents).map(t => t.name);
    const dataPoints = Object.keys(talents).map(key => userAnswers[key]);

    // Destroy previous chart if exists
    if (myChart) {
        myChart.destroy();
    }

    // Chart.js configuration
    myChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Skor Potensi',
                data: dataPoints,
                backgroundColor: 'rgba(99, 102, 241, 0.4)',
                borderColor: '#6366f1',
                pointBackgroundColor: '#fff',
                pointBorderColor: '#ec4899',
                borderWidth: 2,
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)'
                    },
                    pointLabels: {
                        color: '#cbd5e1',
                        font: {
                            size: 11,
                            family: 'Outfit'
                        }
                    },
                    ticks: {
                        display: false,
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}

// History Feature
function saveHistory(name, result) {
    const historyItem = {
        name: name,
        result: result,
        date: new Date().toLocaleDateString('id-ID')
    };

    let history = JSON.parse(localStorage.getItem('talentHistory')) || [];
    history.unshift(historyItem); // Add to beginning
    if (history.length > 10) history.pop(); // Keep only last 10

    localStorage.setItem('talentHistory', JSON.stringify(history));
}

function showHistory() {
    const listContainer = document.getElementById('history-list');
    listContainer.innerHTML = '';

    const history = JSON.parse(localStorage.getItem('talentHistory')) || [];

    if (history.length === 0) {
        listContainer.innerHTML = '<p class="text-center">Belum ada riwayat tes.</p>';
    } else {
        history.forEach(item => {
            const div = document.createElement('div');
            div.className = 'history-item';
            div.innerHTML = `
                <div>
                    <div style="font-weight:bold; color:white;">${item.name}</div>
                    <div class="history-date">${item.date}</div>
                </div>
                <div class="history-talent">${item.result}</div>
            `;
            listContainer.appendChild(div);
        });
    }

    showSection('history-page');
}
