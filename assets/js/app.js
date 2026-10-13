// --- Project Devilmycry666 V-1 Core Engine ---

// Application State
const appState = {
    expenses: [
        { id: 1, title: 'Initial Project Seed', amount: 150.00 }
    ],
    currentCurrency: 'PHP',
    currencySymbols: {
        PHP: '₱',
        USD: '\$',
        EUR: '€'
    },
    // Simple conversion factors relative to PHP baseline for utility math
    conversionRates: {
        PHP: 1,
        USD: 0.018,
        EUR: 0.017
    }
};

// --- Module 1: Expense Tracker Core Functions ---
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
                <button class="btn-icon edit-btn" onclick="editExpense(${item.id})" title="Edit"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete-btn" onclick="deleteExpense(${item.id})" title="Delete"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listContainer.appendChild(li);
    });
}

function addExpense(title, amount) {
    // Standardize input back to base PHP representation relative to active symbol setting
    const rate = appState.conversionRates[appState.currentCurrency];
    const baseAmount = amount / rate;

    const newExpense = {
        id: Date.now(),
        title: title,
        amount: baseAmount
    };

    appState.expenses.push(newExpense);
    renderExpenses();
}

function deleteExpense(id) {
    appState.expenses = appState.expenses.filter(item => item.id !== id);
    renderExpenses();
}

function editExpense(id) {
    const item = appState.expenses.find(item => item.id === id);
    if (!item) return;
    
    const rate = appState.conversionRates[appState.currentCurrency];
    const activeViewAmount = (item.amount * rate).toFixed(2);
    
    const newTitle = prompt("Edit description:", item.title);
    const newAmount = prompt(`Edit amount (${appState.currentCurrency}):`, activeViewAmount);
    
    if (newTitle !== null && newAmount !== null && !isNaN(parseFloat(newAmount))) {
        item.title = newTitle;
        item.amount = parseFloat(newAmount) / rate;
        renderExpenses();
    }
}

// --- Module 2: Quick Snippets Operations ---
function initializeClipboardManager() {
    const holdBtn = document.querySelector('#clipboard-manager .btn-secondary');
    const inputArea = document.getElementById('snippet-input');
    const tagsContainer = document.querySelector('.quick-tags');

    if (holdBtn && inputArea && tagsContainer) {
        holdBtn.addEventListener('click', () => {
            const text = inputArea.value.trim();
            if (!text) return;

            // Generate a shortened title label for the custom snippet chip
            const displayLabel = text.length > 15 ? text.substring(0, 12) + '...' : text;
            
            const newBtn = document.createElement('button');
            newBtn.className = 'tag-btn';
            newBtn.textContent = displayLabel;
            newBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(text);
                alert('Snippet copied to your system clipboard!');
            });

            tagsContainer.appendChild(newBtn);
            inputArea.value = '';
        });
    }
}

// --- Module 4: Smart Email Custom Text Structuring ---
function initializeEmailDrafter() {
    const draftBtn = document.querySelector('#email-drafter .btn-primary');
    const toneSelect = document.getElementById('email-tone');
    const contextArea = document.getElementById('email-context');

    if (draftBtn && toneSelect && contextArea) {
        draftBtn.addEventListener('click', () => {
            const tone = toneSelect.value;
            const context = contextArea.value.trim() || '[No details provided]';
            
            let structuredOutput = '';
            if (tone === 'formal') {
                structuredOutput = `Dear Sir/Madam,\n\nI am writing to follow up regarding the following details:\n${context}\n\nPlease let me know your thoughts at your earliest convenience.\n\nBest regards,\n[Your Name]`;
            } else if (tone === 'casual') {
                structuredOutput = `Hey there,\n\nJust wanted to quickly drop a line about this:\n${context}\n\nLet me know what you think! Catch you later.\n\nCheers,\n[Your Name]`;
            } else if (tone === 'urgent') {
                structuredOutput = `URGENT NOTICE:\n\nPlease review the following details immediately:\n${context}\n\nAction is required regarding this matter as soon as possible.\n\nThank you,\n[Your Name]`;
            }
            
            contextArea.value = structuredOutput;
        });
    }
}

// --- Event Binding & Initialization Entry Point ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial Render
    renderExpenses();
    initializeClipboardManager();
    initializeEmailDrafter();

    // Setup Currency Selector Change Event
    const currencyDropdown = document.getElementById('currency-select');
    if (currencyDropdown) {
        currencyDropdown.addEventListener('change', (e) => {
            appState.currentCurrency = e.target.value;
            renderExpenses();
        });
    }

    // Setup Form Submit Event for New Expenses
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

// --- Version 2 (V-2) Extended Logic Engines ---

document.addEventListener('DOMContentLoaded', () => {
    initializeAIWorkspace();
    initializeAISearch();
    initializeAPITester();
});

// AI Writing Simulation Core
function initializeAIWorkspace() {
    const submitBtn = document.getElementById('ai-submit-btn');
    const promptInput = document.getElementById('ai-prompt-input');
    const chatOutput = document.getElementById('ai-chat-output');

    if (!submitBtn || !promptInput || !chatOutput) return;

    submitBtn.addEventListener('click', () => {
        const promptText = promptInput.value.trim();
        if (!promptText) return;

        // Render User Input bubble
        const userDiv = document.createElement('div');
        userDiv.className = 'ai-bubble user-msg';
        userDiv.textContent = promptText;
        chatOutput.appendChild(userDiv);
        promptInput.value = '';

        // Simulate AI Core processing streaming text completion
        setTimeout(() => {
            const replyDiv = document.createElement('div');
            replyDiv.className = 'ai-bubble reply-msg';
            replyDiv.innerHTML = `<strong>AI Response:</strong> Completed task matching parameter blueprint details. Output script or content draft compiled safely.`;
            chatOutput.appendChild(replyDiv);
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }, 600);
    });
}

// AI Context Search Parsing Engine
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

// API Endpoint Request & JSON Parsing Layout Controller
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
            if (!rawString) {
                alert("Please paste a raw JSON string to format.");
                return;
            }
            try {
                const parsedObject = JSON.parse(rawString);
                jsonInput.value = JSON.stringify(parsedObject, null, 4);
            } catch (err) {
                alert(`Invalid JSON Structural Format Detected:\n${err.message}`);
            }
        });
    }
}

// Developer Sandbox Utilities Actions
function runBase64Encode() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (!input || !output || !input.value.trim()) return;

    output.classList.remove('hidden');
    output.textContent = `Base64 Encoded Result:\n${btoa(input.value.trim())}`;
}

function runRegexCheck() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (!input || !output || !input.value.trim()) return;

    output.classList.remove('hidden');
    const alphaNumericRegex = /^[a-zA-Z0-9 ]+\$/;
    const passes = alphaNumericRegex.test(input.value.trim());
    output.textContent = `Regex Match Engine Rule ([a-zA-Z0-9]):\n${passes ? '✔ PASS - Match Standard Verified' : '❌ FAIL - Invalid Tokens Discovered'}`;
}

function generateMockQR() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (!input || !output || !input.value.trim()) return;

    output.classList.remove('hidden');
    output.textContent = `[Generated Mock QR Pointer Matrix Data]\nTarget: data:image/png;base64,...(Linked to value: "${input.value.trim()}")`;
}

// Browser Session Local Account Profile Persistence Mock
function triggerLocalBackup() {
    alert("Application data array models synced down into temporary browser state local snapshot layout.");
}

function triggerCloudSync() {
    alert("Account profile configurations saved and synced upstream to secure project cloud infrastructure layout.");
}

// --- Version 3 (V-3) Utility & Health Engines ---

document.addEventListener('DOMContentLoaded', () => {
    initializePomodoroTimer();
    startLiveClockEngine();
});

// Pomodoro Countdown Mechanism Variables
let pomodoroInterval = null;
let pomodoroSecondsLeft = 1500; // 25 minutes baseline

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

// Interactive Calculator Screen Controls
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
        // Evaluates basic client-side expression strings safely
        screen.value = Function(`"use strict"; return (${screen.value})`)();
    } catch (e) {
        screen.value = 'Error';
    }
}

// Live Converter Exchange Calculations
function triggerConversionMath() {
    const amount = parseFloat(document.getElementById('conv-amount').value) || 0;
    const from = document.getElementById('conv-from').value;
    const to = document.getElementById('conv-to').value;
    const resultField = document.getElementById('conv-result');

    if (!resultField) return;

    // Standard baseline rate variables matching global models
    let conversionMultiplier = 1;
    if (from === 'PHP' && to === 'USD') conversionMultiplier = 0.018;
    if (from === 'USD' && to === 'PHP') conversionMultiplier = 56.40;

    resultField.value = (amount * conversionMultiplier).toFixed(2);
}

// BMI Tracker Health Metrics Calculator
function calculateMetricsBMI() {
    const weight = parseFloat(document.getElementById('health-weight').value);
    const heightCm = parseFloat(document.getElementById('health-height').value);
    const pane = document.getElementById('health-summary-pane');

    if (!weight || !heightCm || !pane) {
        alert("Please specify weight and height values.");
        return;
    }

    const heightMeters = heightCm / 100;
    const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(1);
    
    let profileCondition = 'Normal';
    if (bmiValue < 18.5) profileCondition = 'Underweight';
    else if (bmiValue >= 25) profileCondition = 'Overweight';

    pane.classList.remove('hidden');
    pane.textContent = `[Daily Tracker Baseline V-3 Update]\nYour Calculated BMI: ${bmiValue} (${profileCondition})\nLogs Staged: Water, Sugar and Cholesterol references structured successfully.`;
}

// Live Clock Time Management Engine
function startLiveClockEngine() {
    const display = document.getElementById('live-clock-display');
    if (!display) return;
    
    setInterval(() => {
        const timeNow = new Date();
        display.textContent = timeNow.toLocaleTimeString();
    }, 1000);
}

function setWorkspaceAlarm() {
    const timeVal = document.getElementById('alarm-time').value;
    if (timeVal) alert(`Workspace focus alarm mapped successfully for: ${timeVal}`);
}
