// --- Project Devilmycry666 Stabilized Core Architecture ---

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
        holdBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = inputArea.value.trim();
            if (!text) return;
            const btn = document.createElement('button');
            btn.className = 'tag-btn';
            btn.textContent = text.length > 15 ? text.substring(0, 12) + '...' : text;
            btn.addEventListener('click', (ev) => { 
                ev.stopPropagation();
                navigator.clipboard.writeText(text); 
            });
            tagsContainer.appendChild(btn);
            inputArea.value = '';
        });
    }
}

// --- BATCH 2: AMBIENT SOUNDS, EMAIL DRAFTER & VERSION 2 AI INTERFACES ---
const AmbientSoundPlugin = {
    audioContext: null,
    activeNodes: {},
    generateProceduralNoise(type, targetBtn) {
        try {
            if (!this.audioContext) this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (this.activeNodes[type]) {
                this.activeNodes[type].stop();
                delete this.activeNodes[type];
                targetBtn.classList.remove('active');
                targetBtn.textContent = 'OFF';
                return;
            }
            const bufferSize = 2 * this.audioContext.sampleRate;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const outputBuffer = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                outputBuffer[i] = (Math.random() * 2 - 1) * (type === 'rain' ? 0.35 : 0.15);
            }
            const noiseSource = this.audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            noiseSource.loop = true;
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = type === 'rain' ? 0.25 : 0.15;
            noiseSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            noiseSource.start();
            this.activeNodes[type] = noiseSource;
            targetBtn.classList.add('active');
            targetBtn.textContent = 'ON';
        } catch (err) {
            alert("Click onto your window interface workspace first, then toggle audio tracks!");
        }
    }
};

function executeLiveEmailGeneration() {
    const toneElement = document.getElementById('email-tone');
    const contextElement = document.getElementById('email-context');
    if (!toneElement || !contextElement) return;
    const rawContext = contextElement.value.trim();
    if (!rawContext) {
        alert("Please write a snippet draft description first!");
        return;
    }
    contextElement.value = `[${toneElement.value.toUpperCase()} ENGINE OUTPUT]\nDear Team,\n\nRegarding: ${rawContext}\n\nBest Regards,\nDeveloper Workspace Panel`;
}

function initializeAIWorkspace() {
    const submitBtn = document.getElementById('ai-submit-btn');
    const promptInput = document.getElementById('ai-prompt-input');
    const chatOutput = document.getElementById('ai-chat-output');
    if (submitBtn && promptInput && chatOutput) {
        submitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = promptInput.value.trim();
            if (!text) return;
            const userDiv = document.createElement('div');
            userDiv.className = 'ai-bubble user-msg';
            userDiv.textContent = text;
            chatOutput.appendChild(userDiv);
            promptInput.value = '';
            setTimeout(() => {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'ai-bubble reply-msg';
                replyDiv.innerHTML = `<strong>System Workspace Response:</strong> Request logged and structured under active baseline conditions.`;
                chatOutput.appendChild(replyDiv);
                chatOutput.scrollTop = chatOutput.scrollHeight;
            }, 400);
        });
    }
}

function initializeAISearch() {
    const searchBtn = document.getElementById('ai-search-btn');
    const queryInput = document.getElementById('ai-search-query');
    const outputPane = document.getElementById('ai-search-results');
    if (searchBtn && queryInput && outputPane) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            outputPane.classList.remove('hidden');
            outputPane.textContent = `Search Query: "${queryInput.value}"\nFilters Applied: Status = Verified, Isolation Matrix Mode active.`;
        });
    }
}

function initializeAPITester() {
    const sendBtn = document.getElementById('api-send-btn');
    const formatBtn = document.getElementById('json-format-btn');
    const jsonInput = document.getElementById('json-input');
    if (sendBtn) sendBtn.addEventListener('click', (e) => { e.stopPropagation(); alert("API request broadcast simulation successful."); });
    if (formatBtn && jsonInput) {
        formatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            try { jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 4); }
            catch(err) { alert("Syntax structuring parsing error: " + err.message); }
        });
    }
}

function runBase64Encode() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        output.textContent = `Base64 Encoded Result: ${btoa(input.value.trim())}`;
    }
}

function runRegexCheck() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        const passes = /^[a-zA-Z0-9 ]+\$/.test(input.value.trim());
        output.textContent = `Regex Alphanumeric Verification: ${passes ? 'PASSED (Valid)' : 'FAILED (Invalid Symbols Found)'}`;
    }
}

function generateMockQR() {
    const output = document.getElementById('sandbox-output-pane');
    if (output) {
        output.classList.remove('hidden');
        output.textContent = "[Mock QR Layout Generation Matrix Compiled Safely]";
    }
}

// --- BATCH 2: AI WORKSPACE, EMAIL GENERATOR & DEVELOPMENT SANDBOX ---
const AmbientSoundPlugin = {
    audioContext: null,
    activeNodes: {},
    generateProceduralNoise(type, targetBtn) {
        try {
            if (!this.audioContext) this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            if (this.activeNodes[type]) {
                this.activeNodes[type].stop();
                delete this.activeNodes[type];
                targetBtn.classList.remove('active');
                targetBtn.textContent = 'OFF';
                return;
            }
            const bufferSize = 2 * this.audioContext.sampleRate;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const outputBuffer = noiseBuffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) {
                outputBuffer[i] = (Math.random() * 2 - 1) * (type === 'rain' ? 0.35 : 0.15);
            }
            const noiseSource = this.audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            noiseSource.loop = true;
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = type === 'rain' ? 0.25 : 0.15;
            noiseSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            noiseSource.start();
            this.activeNodes[type] = noiseSource;
            targetBtn.classList.add('active');
            targetBtn.textContent = 'ON';
        } catch (err) {
            alert("Click onto your window workspace first, then toggle audio tracks!");
        }
    }
};

function executeLiveEmailGeneration() {
    const toneElement = document.getElementById('email-tone');
    const contextElement = document.getElementById('email-context');
    if (!toneElement || !contextElement) return;
    const rawContext = contextElement.value.trim();
    if (!rawContext) {
        alert("Please write a snippet draft description first!");
        return;
    }
    contextElement.value = `[${toneElement.value.toUpperCase()} ENGINE OUTPUT]\nDear Team,\n\nRegarding: ${rawContext}\n\nBest Regards,\nDeveloper Workspace Panel`;
}

function initializeAIWorkspace() {
    const submitBtn = document.getElementById('ai-submit-btn');
    const promptInput = document.getElementById('ai-prompt-input');
    const chatOutput = document.getElementById('ai-chat-output');
    if (submitBtn && promptInput && chatOutput) {
        submitBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const text = promptInput.value.trim();
            if (!text) return;
            const userDiv = document.createElement('div');
            userDiv.className = 'ai-bubble user-msg';
            userDiv.textContent = text;
            chatOutput.appendChild(userDiv);
            promptInput.value = '';
            setTimeout(() => {
                const replyDiv = document.createElement('div');
                replyDiv.className = 'ai-bubble reply-msg';
                replyDiv.innerHTML = `<strong>System Workspace Response:</strong> Request logged and structured under active baseline conditions.`;
                chatOutput.appendChild(replyDiv);
                chatOutput.scrollTop = chatOutput.scrollHeight;
            }, 400);
        });
    }
}

// AI Context Search Parsing Engine
function initializeAISearch() {
    const searchBtn = document.getElementById('ai-search-btn');
    const queryInput = document.getElementById('ai-search-query');
    const outputPane = document.getElementById('ai-search-results');
    if (searchBtn && queryInput && outputPane) {
        searchBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            outputPane.classList.remove('hidden');
            outputPane.textContent = `Search Query: "${queryInput.value}"\nFilters Applied: Status = Verified, Isolation Matrix Mode active.`;
        });
    }
}

function initializeAPITester() {
    const sendBtn = document.getElementById('api-send-btn');
    const formatBtn = document.getElementById('json-format-btn');
    const jsonInput = document.getElementById('json-input');
    if (sendBtn) sendBtn.addEventListener('click', (e) => { e.stopPropagation(); alert("API request broadcast simulation successful."); });
    if (formatBtn && jsonInput) {
        formatBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            try { jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 4); }
            catch(err) { alert("Syntax structuring parsing error: " + err.message); }
        });
    }
}

function runBase64Encode() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        output.textContent = `Base64 Encoded Result: ${btoa(input.value.trim())}`;
    }
}

function runRegexCheck() {
    const input = document.getElementById('sandbox-input');
    const output = document.getElementById('sandbox-output-pane');
    if (input && output && input.value.trim()) {
        output.classList.remove('hidden');
        const passes = /^[a-zA-Z0-9 ]+\$/.test(input.value.trim());
        output.textContent = `Regex Alphanumeric Verification: ${passes ? 'PASSED (Valid)' : 'FAILED (Invalid Symbols Found)'}`;
    }
}

function generateMockQR() {
    const output = document.getElementById('sandbox-output-pane');
    if (output) {
        output.classList.remove('hidden');
        output.textContent = "[Mock QR Layout Generation Matrix Compiled Safely]";
    }
}

// --- BATCH 3: VERSION 3, 4, 5 CORE & MASTER DESKTOP ENGINE LOOP ---
let pomodoroInterval = null, pomodoroSecondsLeft = 1500;
function initializePomodoroTimer() {
    const display = document.getElementById('pomodoro-display');
    const startBtn = document.getElementById('pomodoro-start');
    const pauseBtn = document.getElementById('pomodoro-pause');
    const resetBtn = document.getElementById('pomodoro-reset');
    if (!display) return;
    function updateStr() { display.textContent = `${Math.floor(pomodoroSecondsLeft / 60).toString().padStart(2,'0')}:${(pomodoroSecondsLeft % 60).toString().padStart(2,'0')}`; }
    if (startBtn) startBtn.addEventListener('click', (e) => { e.stopPropagation(); if (!pomodoroInterval) pomodoroInterval = setInterval(() => { if (pomodoroSecondsLeft > 0) { pomodoroSecondsLeft--; updateStr(); } }, 1000); });
    if (pauseBtn) pauseBtn.addEventListener('click', (e) => { e.stopPropagation(); clearInterval(pomodoroInterval); pomodoroInterval = null; });
    if (resetBtn) resetBtn.addEventListener('click', (e) => { e.stopPropagation(); clearInterval(pomodoroInterval); pomodoroInterval = null; pomodoroSecondsLeft = 1500; updateStr(); });
}

function appendCalc(token) { document.getElementById('calc-screen').value += token; }
function clearCalc() { document.getElementById('calc-screen').value = ''; }
function executeCalc() {
    const scr = document.getElementById('calc-screen');
    try { scr.value = Function(`"use strict"; return (${scr.value})`)(); } catch(e) { scr.value = 'Error'; }
}

function triggerConversionMath() {
    const val = parseFloat(document.getElementById('conv-amount').value) || 0;
    document.getElementById('conv-result').value = document.getElementById('conv-from').value === 'PHP' ? (val * 0.018).toFixed(2) : (val * 56.40).toFixed(2);
}

function calculateMetricsBMI() {
    const w = parseFloat(document.getElementById('health-weight').value), h = parseFloat(document.getElementById('health-height').value);
    const pane = document.getElementById('health-summary-pane');
    if(w && h && pane) { pane.classList.remove('hidden'); pane.textContent = `Calculated BMI Body Profile Index Matrix Metrics: ${(w / ((h/100)*(h/100))).toFixed(1)}`; }
}

async function updateCryptoMockChart() {
    const map = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana' };
    const asset = document.getElementById('crypto-asset-select')?.value || 'BTC';
    const display = document.getElementById('crypto-live-price');
    if (!display) return;
    try {
        const res = await fetch(`https://coingecko.com{map[asset]}&vs_currencies=usd`);
        const data = await res.json();
        display.textContent = `\$${data[map[asset]].usd.toLocaleString()}`;
    } catch(err) { display.textContent = "Live Exchange Active"; }
}

function shareToPlatform(p) { alert(`Intent broadcast tracking sequence mapped to target network channel destination: ${p}`); }

function initializeDesktopWidgetSystem() {
    let dimLayer = document.querySelector('.desktop-dimming-layer') || document.createElement('div');
    if (!dimLayer.parentNode) { dimLayer.className = 'desktop-dimming-layer'; document.body.appendChild(dimLayer); }

    document.querySelectorAll('.widget-card').forEach(card => {
        const header = card.querySelector('.card-header');
        if (header && !header.querySelector('.window-close-trigger')) {
            const closeBtn = document.createElement('button');
            closeBtn.className = 'window-close-trigger';
            closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            closeBtn.style.display = 'none';
            header.appendChild(closeBtn);
            
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('widget-window-active');
                dimLayer.classList.remove('active');
                closeBtn.style.display = 'none';
            });
        }

        card.addEventListener('click', function(e) {
            if (this.classList.contains('widget-window-active')) return;
            if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('button') || e.target.closest('select') || e.target.closest('a') || e.target.closest('.action-buttons') || e.target.closest('i')) return;

            this.classList.add('widget-window-active');
            dimLayer.classList.add('active');
            const cb = this.querySelector('.window-close-trigger');
            if (cb) cb.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    dimLayer.addEventListener('click', () => {
        const active = document.querySelector('.widget-window-active');
        if (active) {
            active.classList.remove('widget-window-active');
            dimLayer.classList.remove('active');
            const cb = active.querySelector('.window-close-trigger');
            if (cb) cb.style.display = 'none';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderExpenses();
    initializeClipboardManager();
    initializeAIWorkspace();
    initializeAISearch();
    initializeAPITester();
    initializePomodoroTimer();
    updateCryptoMockChart();
    initializeDesktopWidgetSystem();

    setInterval(() => { 
        const clock = document.getElementById('live-clock-display');
        if(clock) clock.textContent = new Date().toLocaleTimeString();
    }, 1000);

    // Audio Mixer Event Hooks
    const soundRows = document.querySelectorAll('.audio-control-row');
    soundRows.forEach(row => {
        const textLabel = row.querySelector('span').textContent.toLowerCase();
        const toggleButton = row.querySelector('.toggle-switch-btn');
        if (toggleButton) {
            if (textLabel.includes('rain')) {
                toggleButton.setAttribute('onclick', '');
                toggleButton.addEventListener('click', function(e) { e.stopPropagation(); AmbientSoundPlugin.generateProceduralNoise('rain', this); });
            } else if (textLabel.includes('white')) {
                toggleButton.setAttribute('onclick', ''); 
                toggleButton.addEventListener('click', function(e) { e.stopPropagation(); AmbientSoundPlugin.generateProceduralNoise('white', this); });
            }
        }
    });

    document.getElementById('crypto-asset-select')?.addEventListener('change', (e) => { e.stopPropagation(); updateCryptoMockChart(); });
    document.getElementById('currency-select')?.addEventListener('change', (e) => { e.stopPropagation(); appState.currentCurrency = e.target.value; renderExpenses(); });
    document.getElementById('email-drafter')?.querySelector('.btn-primary')?.addEventListener('click', (e) => { e.stopPropagation(); executeLiveEmailGeneration(); });

    document.getElementById('expense-form')?.addEventListener('submit', (e) => {
        e.preventDefault(); e.stopPropagation();
        const t = document.getElementById('exp-title'), a = document.getElementById('exp-amount');
        if (t && a && t.value.trim() && !isNaN(parseFloat(a.value))) {
            addExpense(t.value.trim(), parseFloat(a.value));
            t.value = ''; a.value = '';
        }
    });
});

// --- BATCH 9: STABILIZED WIDGET OPENERS & SIDEBAR NAVIGATION SYSTEMS ---

function focusWidgetWindow(targetId) {
    // Automatically close the sidebar when choosing an item
    const sidebar = document.getElementById('desktop-sidebar-pane');
    const sidebarBackdrop = document.getElementById('sidebar-overlay-backdrop');
    if (sidebar) sidebar.classList.remove('sidebar-visible');
    if (sidebarBackdrop) sidebarBackdrop.classList.remove('active');

    const targetCard = document.getElementById(targetId);
    if (!targetCard) return;

    // Simulate standard desktop window pop expansion trigger action
    const dimLayer = document.querySelector('.desktop-dimming-layer');
    if (dimLayer) dimLayer.classList.add('active');

    targetCard.classList.add('widget-window-active');
    const closeBtn = targetCard.querySelector('.window-close-trigger');
    if (closeBtn) closeBtn.style.display = 'block';

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function rebindStabilizedDesktopWidgetSystem() {
    console.log("🔄 Re-aligning desktop click handlers to fix unresponsive widget bugs...");
    
    let dimLayer = document.querySelector('.desktop-dimming-layer') || document.createElement('div');
    if (!dimLayer.parentNode) { dimLayer.className = 'desktop-dimming-layer'; document.body.appendChild(dimLayer); }

    // 1. Core Card Click Assignment Pipeline
    document.querySelectorAll('.widget-card').forEach(card => {
        // Clear any old messy click layouts
        const clone = card.cloneNode(true);
        card.parentNode.replaceChild(clone, card);
    });

    // Re-select fresh clean nodes following duplication reset routine
    document.querySelectorAll('.widget-card').forEach(card => {
        const header = card.querySelector('.card-header');
        const closeBtn = header ? header.querySelector('.window-close-trigger') : null;

        if (closeBtn) {
            closeBtn.style.display = card.classList.contains('widget-window-active') ? 'block' : 'none';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('widget-window-active');
                dimLayer.classList.remove('active');
                closeBtn.style.display = 'none';
            });
        }

        card.addEventListener('click', function(e) {
            // If the widget window app card is already expanded, do not fire open sequences
            if (this.classList.contains('widget-window-active')) return;

            // STABILIZED RULE: Check if the user is targeted at functional elements inside the layout preview cards
            if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('button') || e.target.closest('select') || e.target.closest('a') || e.target.closest('.action-buttons')) {
                return; // Let the custom event process naturally without interception
            }

            // Otherwise, expand the card smoothly!
            this.classList.add('widget-window-active');
            dimLayer.classList.add('active');
            const cb = this.querySelector('.window-close-trigger');
            if (cb) cb.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // 2. Sidebar Navigation Panel Event Registration Core
    const menuToggleBtn = document.getElementById('sidebar-toggle-btn');
    const menuCloseBtn = document.getElementById('sidebar-close-btn');
    const sidebarPane = document.getElementById('desktop-sidebar-pane');
    const sidebarBackdrop = document.getElementById('sidebar-overlay-backdrop');

    if (menuToggleBtn && sidebarPane && sidebarBackdrop) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebarPane.classList.add('sidebar-visible');
            sidebarBackdrop.classList.add('active');
        });
    }

    if (menuCloseBtn && sidebarPane && sidebarBackdrop) {
        menuCloseBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebarPane.classList.remove('sidebar-visible');
            sidebarBackdrop.classList.remove('active');
        });
    }

    if (sidebarBackdrop && sidebarPane) {
        sidebarBackdrop.addEventListener('click', () => {
            sidebarPane.classList.remove('sidebar-visible');
            sidebarBackdrop.classList.remove('active');
        });
    }
}

// Push bindings hook down execution sequence pipelines smoothly
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(rebindStabilizedDesktopWidgetSystem, 500);
});
