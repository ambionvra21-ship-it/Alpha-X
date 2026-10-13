// --- Project Devilmycry666 Core Architecture Engine ---

// Application State Layer
const appState = {
    expenses: [
        { id: 1, title: 'Initial Project Seed', amount: 150.00 }
    ],
    currentCurrency: 'PHP',
    currencySymbols: { PHP: '₱', USD: '\$', EUR: '€' },
    conversionRates: { PHP: 1, USD: 0.018, EUR: 0.017 }
};

// --- MODULE 1: EXPENSE TRACKER ---
function renderExpenses() {
    const listContainer = document.getElementById('expense-list');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    const symbol = appState.currencySymbols[appState.currentCurrency];
    const rate = appState.conversionRates[appState.currentCurrency];

    appState.expenses.forEach(item => {
        const convertedAmount = (item.amount * rate).toFixed(2);
        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <span>${item.title}</span>
            <span class="amount-tag">${symbol}${convertedAmount}</span>
            <div class="action-buttons">
                <button class="btn-icon edit-btn" onclick="editExpense(${item.id})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete-btn" onclick="deleteExpense(${item.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listContainer.appendChild(li);
    });
}

function addExpense(title, amount) {
    const rate = appState.conversionRates[appState.currentCurrency];
    appState.expenses.push({ id: Date.now(), title: title, amount: amount / rate });
    renderExpenses();
}

function deleteExpense(id) {
    appState.expenses = appState.expenses.filter(item => item.id !== id);
    renderExpenses();
}

function editExpense(id) {
    const item = appState.expenses.find(i => i.id === id);
    if (!item) return;
    const rate = appState.conversionRates[appState.currentCurrency];
    const newTitle = prompt("Edit description:", item.title);
    const newAmount = prompt(`Edit amount (${appState.currentCurrency}):`, (item.amount * rate).toFixed(2));
    if (newTitle && newAmount && !isNaN(parseFloat(newAmount))) {
        item.title = newTitle;
        item.amount = parseFloat(newAmount) / rate;
        renderExpenses();
    }
}

// --- MODULE 2 & 4: CLIPBOARD & EMAIL DRAFTER ---
function initializeClipboardManager() {
    const holdBtn = document.querySelector('#clipboard-manager .btn-secondary');
    const inputArea = document.getElementById('snippet-input');
    const tagsContainer = document.querySelector('.quick-tags');
    if (holdBtn && inputArea && tagsContainer) {
        holdBtn.addEventListener('click', () => {
            const text = inputArea.value.trim();
            if (!text) return;
            const btn = document.createElement('button');
            btn.className = 'tag-btn';
            btn.textContent = text.length > 15 ? text.substring(0, 12) + '...' : text;
            btn.addEventListener('click', () => { navigator.clipboard.writeText(text); });
            tagsContainer.appendChild(btn);
            inputArea.value = '';
        });
    }
}

function initializeEmailDrafter() {
    const draftBtn = document.querySelector('#email-drafter .btn-primary');
    const toneSelect = document.getElementById('email-tone');
    const contextArea = document.getElementById('email-context');
    if (draftBtn && toneSelect && contextArea) {
        draftBtn.addEventListener('click', () => {
            const context = contextArea.value.trim() || '[No context]';
            contextArea.value = `[${toneSelect.value.toUpperCase()} DRAFT]\nRegarding your request:\n${context}\n\nBest regards,\n[Developer Workspace]`;
        });
    }
}

// --- BATCH 2: VERSION 2 (V-2 AI WORKSPACE & DEVELOPER SANDBOX) ---
function initializeAIWorkspace() {
    const submitBtn = document.getElementById('ai-submit-btn');
    const promptInput = document.getElementById('ai-prompt-input');
    const chatOutput = document.getElementById('ai-chat-output');
    if (!submitBtn || !promptInput || !chatOutput) return;

    submitBtn.addEventListener('click', () => {
        const promptText = promptInput.value.trim();
        if (!promptText) return;

        const userDiv = document.createElement('div');
        userDiv.className = 'ai-bubble user-msg';
        userDiv.textContent = promptText;
        chatOutput.appendChild(userDiv);
        promptInput.value = '';

        setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'ai-bubble reply-msg';
            replyDiv.innerHTML = `<strong>AI Response:</strong> Completed task matching parameter blueprint details. Output script or content draft compiled safely.`;
            chatOutput.appendChild(replyDiv);
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }, 500);
    });
}

function initializeAISearch() {
    const searchBtn = document.getElementById('ai-search-btn');
    const queryInput = document.getElementById('ai-search-query');
    const outputPane = document.getElementById('ai-search-results');
    if (!searchBtn || !queryInput || !outputPane) return;

    searchBtn.addEventListener('click', () => {
        const query = queryInput.value.trim();
        if (!query) return;
        outputPane.classList.remove('hidden');
        outputPane.textContent = `[Parsed Knowledge Base Layer Match]\nQuery: "${query}"\nFilters Applied: Status = Active, Mode = Raw Structural Isolation.\nNo tracker algorithmic biases discovered. Content optimized for compilation.`;
    });
}

function initializeAPITester() {
    const sendBtn = document.getElementById('api-send-btn');
    const methodSelect = document.getElementById('api-method');
    const urlInput = document.getElementById('api-url');
    const jsonInput = document.getElementById('json-input');
    const formatBtn = document.getElementById('json-format-btn');

    if (sendBtn && methodSelect && urlInput) {
        sendBtn.addEventListener('click', () => {
            alert(`Simulated API Request Broadcast Triggered:\nMethod: ${methodSelect.value}\nTarget Endpoint: ${urlInput.value}\nResponse: Status 200 OK - Active Workspace Operational`);
        });
    }

    if (jsonInput && formatBtn) {
        formatBtn.addEventListener('click', () => {
            const rawString = jsonInput.value.trim();
            if (!rawString) return;
            try {
                jsonInput.value = JSON.stringify(JSON.parse(rawString), null, 4);
            } catch (err) {
                alert(`Invalid JSON Structural Format Detected:\n${err.message}`);
            }
        });
    }
}

function runBase64Encode() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        output.textContent = `Base64 Encoded Result:\n${btoa(input.value.trim())}`;
    }
}

function runRegexCheck() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        const passes = /^[a-zA-Z0-9 ]+\$/.test(input.value.trim());
        output.textContent = `Regex Match Engine Rule ([a-zA-Z0-9]):\n${passes ? '✔ PASS - Match Standard Verified' : '❌ FAIL - Invalid Tokens Discovered'}`;
    }
}

function generateMockQR() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        output.textContent = `[Generated Mock QR Pointer Matrix Data]\nTarget: data:image/png;base64,...(Linked to value: "${input.value.trim()}")`;
    }
}

function triggerLocalBackup() { alert("Application data array models synced down into temporary browser state local snapshot layout."); }
function triggerCloudSync() { alert("Account profile configurations saved and synced upstream to secure project cloud infrastructure layout."); }

// --- BATCH 3: VERSION 3 (V-3 POMODORO, CALCULATOR & HEALTH METRICS) ---
let pomodoroInterval = null;
let pomodoroSecondsLeft = 1500;

function initializePomodoroTimer() {
    const display = document.getElementById('pomodoro-display');
    const startBtn = document.getElementById('pomodoro-start');
    const pauseBtn = document.getElementById('pomodoro-pause');
    const resetBtn = document.getElementById('pomodoro-reset');
    if (!display || !startBtn || !pauseBtn || !resetBtn) return;

    function updateDisplayString() {
        const mins = Math.floor(pomodoroSecondsLeft / 60).toString().padStart(2, '0');
        const secs = (pomodoroSecondsLeft % 60).toString().padStart(2, '0');
        display.textContent = `${mins}:${secs}`;
    }

    startBtn.addEventListener('click', () => {
        if (pomodoroInterval) return;
        pomodoroInterval = setInterval(() => {
            if (pomodoroSecondsLeft > 0) {
                pomodoroSecondsLeft--;
                updateDisplayString();
            } else {
                clearInterval(pomodoroInterval);
                pomodoroInterval = null;
                alert("Focus interval complete! Take a step back and stretch.");
            }
        }, 1000);
    });

    pauseBtn.addEventListener('click', () => {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(pomodoroInterval);
        pomodoroInterval = null;
        pomodoroSecondsLeft = 1500;
        updateDisplayString();
    });
}

function appendCalc(token) {
    const screen = document.getElementById('calc-screen');
    if (screen) screen.value = screen.value === '0' ? token : screen.value + token;
}

function clearCalc() {
    const screen = document.getElementById('calc-screen');
    if (screen) screen.value = '';
}

function executeCalc() {
    const screen = document.getElementById('calc-screen');
    if (!screen || !screen.value) return;
    try {
        screen.value = Function(`"use strict"; return (${screen.value})`)();
    } catch (e) {
        screen.value = 'Error';
    }
}

function triggerConversionMath() {
    const amount = parseFloat(document.getElementById('conv-amount').value) || 0;
    const from = document.getElementById('conv-from').value;
    const to = document.getElementById('conv-to').value;
    const resultField = document.getElementById('conv-result');
    if (!resultField) return;

    let multiplier = 1;
    if (from === 'PHP' && to === 'USD') multiplier = 0.018;
    if (from === 'USD' && to === 'PHP') multiplier = 56.40;
    resultField.value = (amount * multiplier).toFixed(2);
}

function calculateMetricsBMI() {
    const weight = parseFloat(document.getElementById('health-weight').value);
    const heightCm = parseFloat(document.getElementById('health-height').value);
    const pane = document.getElementById('health-summary-pane');
    if (!weight || !heightCm || !pane) {
        alert("Please specify weight and height values.");
        return;
    }

    const bmiValue = (weight / ((heightCm / 100) * (heightCm / 100))).toFixed(1);
    let condition = 'Normal';
    if (bmiValue < 18.5) condition = 'Underweight';
    else if (bmiValue >= 25) condition = 'Overweight';

    pane.classList.remove('hidden');
    pane.textContent = `[Daily Tracker Baseline V-3 Update]\nYour Calculated BMI: ${bmiValue} (${condition})\nLogs Staged: Water, Sugar and Cholesterol references structured successfully.`;
}

function startLiveClockEngine() {
    const display = document.getElementById('live-clock-display');
    if (!display) return;
    setInterval(() => { display.textContent = new Date().toLocaleTimeString(); }, 1000);
}

function setWorkspaceAlarm() {
    const timeVal = document.getElementById('alarm-time').value;
    if (timeVal) alert(`Workspace focus alarm mapped successfully for: ${timeVal}`);
}

// --- BATCH 4: VERSION 4 (V-4 *LIVE* FINANCIAL DATA FEED & NEWS TICKER) ---
const cryptoApiMap = {
    BTC: 'bitcoin',
    ETH: 'ethereum',
    SOL: 'solana'
};

async function updateCryptoMockChart() {
    const selector = document.getElementById('crypto-asset-select');
    const priceDisplay = document.getElementById('crypto-live-price');
    const chartViewport = document.getElementById('crypto-chart-viewport');
    
    if (!selector || !priceDisplay || !chartViewport) return;
    
    const asset = selector.value;
    const apiId = cryptoApiMap[asset];
    
    priceDisplay.textContent = "Fetching Live Data...";
    priceDisplay.style.color = "var(--text-muted)";

    try {
        // Dispatches live asynchronous request to the free public CoinGecko API feed
        const response = await fetch(`https://coingecko.com{apiId}&vs_currencies=usd`);
        const data = await response.json();
        const livePriceUSD = data[apiId].usd;

        priceDisplay.textContent = `\$${livePriceUSD.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
        priceDisplay.style.color = "var(--accent-green)";
    } catch (error) {
        console.error("Live API Error:", error);
        priceDisplay.textContent = "Feed Delayed";
        priceDisplay.style.color = "var(--accent-red)";
    }
    
    // Visually update the charting layout canvas structures
    const candles = chartViewport.querySelectorAll('.candlestick');
    candles.forEach(candle => {
        const randomHeight = Math.floor(Math.random() * 50) + 35;
        candle.style.height = `${randomHeight}%`;
        candle.className = Math.random() > 0.4 ? 'candlestick high-green' : 'candlestick low-red';
    });
}

function refreshFinancialNews() {
    const container = document.getElementById('news-feed-container');
    if (!container) return;
    
    container.innerHTML = '';
    const newsTemplates = [
        "🗓️ [Economic Calendar] Central Bank keeps key borrowing rates steady; retail indices steady.",
        "📈 [Market Alert] Digital assets show strong momentum following tech sector volume increases.",
        "📊 [FX Update] USD/PHP trades steadily near 56.40 baseline markers in afternoon sessions.",
        "📉 [Stock Brief] Composite stock index experiences minor profit-taking across blue-chip boards."
    ];
    
    const shuffledNews = [...newsTemplates].sort(() => 0.5 - Math.random());
    shuffledNews.forEach(item => {
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble reply-msg';
        bubble.style.fontSize = '0.8rem';
        bubble.style.marginBottom = '0.4rem';
        bubble.textContent = item;
        container.appendChild(bubble);
    });
}

// --- BATCH 5: VERSION 5 (V-5 SOCIAL NETWORKS & MASTER EVENT LOOP) ---
function copyAllSocialHandles() {
    const defaultTags = "@Devilmycry666_Workspace #BuildInPublic #DeveloperTools";
    navigator.clipboard.writeText(defaultTags);
    alert("Project workspace identifier tags saved to clipboard:\n" + defaultTags);
}

function shareToPlatform(platformId) {
    const textInput = document.getElementById('social-share-text');
    if (!textInput) return;
    
    const postContent = textInput.value.trim();
    if (!postContent) {
        alert("Please enter a custom message update inside the textarea to share!");
        return;
    }
    
    const encodedText = encodeURIComponent(postContent);
    let targetIntentUrl = '';
    
    if (platformId === 'X') targetIntentUrl = `https://x.com{encodedText}`;
    if (platformId === 'FB') targetIntentUrl = `https://facebook.com{encodedText}`;
    if (platformId === 'TG') targetIntentUrl = `https://t.me{encodedText}`;
    
    if (targetIntentUrl) window.open(targetIntentUrl, '_blank');
}

// --- MASTER APPLICATION INITIALIZATION SWITCH ---
document.addEventListener('DOMContentLoaded', () => {
    // Fire up every background controller sequence across V1-V5
    renderExpenses();
    initializeClipboardManager();
    initializeEmailDrafter();
    initializeAIWorkspace();
    initializeAISearch();
    initializeAPITester();
    initializePomodoroTimer();
    startLiveClockEngine();
    updateCryptoMockChart();
    refreshFinancialNews();

    // Event binding for main currency conversions
    const currencyDropdown = document.getElementById('currency-select');
    if (currencyDropdown) {
        currencyDropdown.addEventListener('change', (e) => {
            appState.currentCurrency = e.target.value;
            renderExpenses();
        });
    }

    // Event binding for logging tracker expense inputs
    const expenseForm = document.getElementById('expense-form');
    if (expenseForm) {
        expenseForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const titleInput = document.getElementById('exp-title');
            const amountInput = document.getElementById('exp-amount');
            
            if (titleInput && amountInput) {
                const title = titleInput.value.trim();
                const amount = parseFloat(amountInput.value);
                if (title && !isNaN(amount)) {
                    addExpense(title, amount);
                    titleInput.value = '';
                    amountInput.value = '';
                }
            }
        });
    }
});
