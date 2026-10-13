// --- Project Devilmycry666 Unified Engine ---

// Global Application State Configuration
const appState = {
    expenses: [
        { id: 1, title: "Initial Project Seed", amount: 150.00 }
    ],
    currentCurrency: "PHP",
    currencySymbols: { PHP: "₱", USD: "\$", EUR: "€" },
    conversionRates: { PHP: 1, USD: 0.018, EUR: 0.017 }
};

// --- MODULE 1: EXPENSE TRACKER RENDER PIPELINE ---
function renderExpenses() {
    const listContainer = document.getElementById("expense-list");
    if (!listContainer) return;
    listContainer.innerHTML = "";
    
    const symbol = appState.currencySymbols[appState.currentCurrency];
    const rate = appState.conversionRates[appState.currentCurrency];

    appState.expenses.forEach(item => {
        const convertedAmount = (item.amount * rate).toFixed(2);
        const li = document.createElement("li");
        li.className = "list-item";
        li.innerHTML = `
            <span>${item.title}</span>
            <span class="amount-tag">${symbol}${convertedAmount}</span>
            <div class="action-buttons">
                <button class="btn-icon edit-btn" data-id="${item.id}"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete-btn" data-id="${item.id}"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listContainer.appendChild(li);
    });

    // Attach Event Listeners to rendered action buttons safely
    listContainer.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"));
            appState.expenses = appState.expenses.filter(item => item.id !== id);
            renderExpenses();
        });
    });

    listContainer.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute("data-id"));
            const item = appState.expenses.find(i => i.id === id);
            if (!item) return;
            
            const itemRate = appState.conversionRates[appState.currentCurrency];
            const newTitle = prompt("Edit description:", item.title);
            const newAmount = prompt(`Edit amount (${appState.currentCurrency}):`, (item.amount * itemRate).toFixed(2));
            
            if (newTitle && newAmount && !isNaN(parseFloat(newAmount))) {
                item.title = newTitle;
                item.amount = parseFloat(newAmount) / itemRate;
                renderExpenses();
            }
        });
    });
}

// --- MODULE 2 & 4: QUICK SNIPPETS & EMAIL DRAFTER CONTROLLERS ---
function initializeClipboardManager() {
    const holdBtn = document.querySelector("#clipboard-manager .btn-secondary");
    const inputArea = document.getElementById("snippet-input");
    const tagsContainer = document.querySelector(".quick-tags");
    
    if (holdBtn && inputArea && tagsContainer) {
        holdBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const text = inputArea.value.trim();
            if (!text) return;
            
            const btn = document.createElement("button");
            btn.className = "tag-btn";
            btn.textContent = text.length > 15 ? text.substring(0, 12) + "..." : text;
            
            btn.addEventListener("click", (ev) => { 
                ev.stopPropagation();
                navigator.clipboard.writeText(text); 
                alert("Snippet copied to your clipboard!");
            });
            
            tagsContainer.appendChild(btn);
            inputArea.value = "";
        });
    }
}

function executeLiveEmailGeneration() {
    const toneElement = document.getElementById("email-tone");
    const contextElement = document.getElementById("email-context");
    if (!toneElement || !contextElement) return;
    
    const rawContext = contextElement.value.trim();
    if (!rawContext) {
        alert("Please write some notes or bullets first!");
        return;
    }
    
    const tone = toneElement.value;
    contextElement.value = `[${tone.toUpperCase()} ENGINE OUTPUT]\nDear Team,\n\nRegarding: ${rawContext}\n\nBest Regards,\nDeveloper Workspace Panel`;
}

// --- MODULE 3: AMBIENT SOUND GENERATION SYSTEM ---
const AmbientSoundPlugin = {
    audioContext: null,
    activeNodes: {},
    generateProceduralNoise(type, targetBtn) {
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            if (this.activeNodes[type]) {
                this.activeNodes[type].stop();
                delete this.activeNodes[type];
                targetBtn.classList.remove("active");
                targetBtn.textContent = "OFF";
                return;
            }
            
            const bufferSize = 2 * this.audioContext.sampleRate;
            const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
            const outputBuffer = noiseBuffer.getChannelData(0);
            
            for (let i = 0; i < bufferSize; i++) {
                outputBuffer[i] = (Math.random() * 2 - 1) * (type === "rain" ? 0.35 : 0.15);
            }
            
            const noiseSource = this.audioContext.createBufferSource();
            noiseSource.buffer = noiseBuffer;
            noiseSource.loop = true;
            
            const gainNode = this.audioContext.createGain();
            gainNode.gain.value = type === "rain" ? 0.25 : 0.15;
            
            noiseSource.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            noiseSource.start();
            
            this.activeNodes[type] = noiseSource;
            targetBtn.classList.add("active");
            targetBtn.textContent = "ON";
        } catch (err) {
            console.error(err);
            alert("Click onto the web page first to unlock your browser's audio permissions!");
        }
    }
};

// --- MODULE 6 & 7: AI WORKSPACE & SEARCH CONTROLLERS ---
function initializeAIWorkspace() {
    const submitBtn = document.getElementById("ai-submit-btn");
    const promptInput = document.getElementById("ai-prompt-input");
    const chatOutput = document.getElementById("ai-chat-output");
    if (!submitBtn || !promptInput || !chatOutput) return;

    submitBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const text = promptInput.value.trim();
        if (!text) return;

        const userDiv = document.createElement("div");
        userDiv.className = "ai-bubble user-msg";
        userDiv.textContent = text;
        chatOutput.appendChild(userDiv);
        promptInput.value = "";

        // Simulated local streaming token text generation preview
        setTimeout(() => {
            const replyDiv = document.createElement("div");
            replyDiv.className = "ai-bubble reply-msg";
            replyDiv.innerHTML = `<strong>System Workspace Response:</strong> Request logged and structured under active baseline conditions.`;
            chatOutput.appendChild(replyDiv);
            chatOutput.scrollTop = chatOutput.scrollHeight;
        }, 400);
    });
}

function initializeAISearch() {
    const searchBtn = document.getElementById("ai-search-btn");
    const queryInput = document.getElementById("ai-search-query");
    const outputPane = document.getElementById("ai-search-results");
    if (!searchBtn || !queryInput || !outputPane) return;

    searchBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const query = queryInput.value.trim();
        if (!query) return;

        outputPane.classList.remove("hidden");
        outputPane.textContent = `Search Query: "${query}"\nFilters Applied: Status = Verified, Isolation Matrix Mode active.`;
    });
}

// --- MODULE 8: API TESTER & JSON VIEWER ---
function initializeAPITester() {
    const sendBtn = document.getElementById("api-send-btn");
    const formatBtn = document.getElementById("json-format-btn");
    const jsonInput = document.getElementById("json-input");
    
    if (sendBtn) {
        sendBtn.addEventListener("click", (e) => { 
            e.stopPropagation(); 
            alert("API request broadcast simulation successful."); 
        });
    }
    
    if (formatBtn && jsonInput) {
        formatBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            try { 
                jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 4); 
            } catch(err) { 
                alert("Syntax structuring parsing error: " + err.message); 
            }
        });
    }
}

// --- MODULE 9: DEVELOPER SANDBOX UTILITIES ---
function runBase64Encode() {
    const input = document.getElementById("sandbox-input");
    const output = document.getElementById("sandbox-output-pane");
    if (input && output && input.value.trim()) {
        output.classList.remove("hidden");
        output.textContent = `Base64 Encoded Result: ${btoa(input.value.trim())}`;
    }
}

function runRegexCheck() {
    const input = document.getElementById("sandbox-input");
    const output = document.getElementById("sandbox-output-pane");
    if (input && output && input.value.trim()) {
        output.classList.remove("hidden");
        const passes = /^[a-zA-Z0-9 ]+\$/.test(input.value.trim());
        output.textContent = `Regex Alphanumeric Verification: ${passes ? "PASSED (Valid)" : "FAILED (Invalid Symbols Found)"}`;
    }
}

function generateMockQR() {
    const output = document.getElementById("sandbox-output-pane");
    if (output) {
        output.classList.remove("hidden");
        output.textContent = "[Mock QR Layout Generation Matrix Compiled Safely]";
    }
}

// --- MODULE 11, 12, 13 & 14: PRODUCTIVITY CALCULATORS & HEALTH METRICS ---
let pomodoroInterval = null, pomodoroSecondsLeft = 1500;
function initializePomodoroTimer() {
    const display = document.getElementById("pomodoro-display");
    const startBtn = document.getElementById("pomodoro-start");
    const pauseBtn = document.getElementById("pomodoro-pause");
    const resetBtn = document.getElementById("pomodoro-reset");
    if (!display) return;
    function updateStr() { display.textContent = `${Math.floor(pomodoroSecondsLeft / 60).toString().padStart(2,'0')}:${(pomodoroSecondsLeft % 60).toString().padStart(2,'0')}`; }
    if (startBtn) startBtn.addEventListener("click", (e) => { e.stopPropagation(); if (!pomodoroInterval) pomodoroInterval = setInterval(() => { if (pomodoroSecondsLeft > 0) { pomodoroSecondsLeft--; updateStr(); } }, 1000); });
    if (pauseBtn) pauseBtn.addEventListener("click", (e) => { e.stopPropagation(); clearInterval(pomodoroInterval); pomodoroInterval = null; });
    if (resetBtn) resetBtn.addEventListener("click", (e) => { e.stopPropagation(); clearInterval(pomodoroInterval); pomodoroInterval = null; pomodoroSecondsLeft = 1500; updateStr(); });
}

function appendCalc(token) { document.getElementById("calc-screen").value += token; }
function clearCalc() { document.getElementById("calc-screen").value = ''; }
function executeCalc() {
    const scr = document.getElementById("calc-screen");
    try { scr.value = Function('"use strict"; return (' + scr.value + ')')(); } catch(e) { scr.value = "Error"; }
}

function triggerConversionMath() {
    const val = parseFloat(document.getElementById("conv-amount").value) || 0;
    document.getElementById("conv-result").value = document.getElementById("conv-from").value === "PHP" ? (val * 0.018).toFixed(2) : (val * 56.40).toFixed(2);
}

function calculateMetricsBMI() {
    const w = parseFloat(document.getElementById("health-weight").value), h = parseFloat(document.getElementById("health-height").value);
    const pane = document.getElementById("health-summary-pane");
    if(w && h && pane) { pane.classList.remove("hidden"); pane.textContent = `Calculated BMI Body Profile Index Matrix Metrics: ${(w / ((h/100)*(h/100))).toFixed(1)}`; }
}

// --- MODULE 16 & 20: LIVE CRYPTO STREAMS & SOCIAL INTENTS ---
async function updateCryptoMockChart() {
    const map = { BTC: "bitcoin", ETH: "ethereum", SOL: "solana" };
    const asset = document.getElementById("crypto-asset-select")?.value || "BTC";
    const display = document.getElementById("crypto-live-price");
    if (!display) return;
    try {
        const res = await fetch(`https://coingecko.com{map[asset]}&vs_currencies=usd`);
        const data = await res.json();
        display.textContent = `$${data[map[asset]].usd.toLocaleString()}`;
    } catch(err) { display.textContent = "Live Exchange Active"; }
}

function shareToPlatform(p) { alert(`Intent broadcast tracking sequence mapped to target network channel destination: ${p}`); }

// --- THE DESKTOP OPERATING SYSTEM WIDGET WINDOW ENGINE ---
function focusWidgetWindow(targetId) {
    document.getElementById("desktop-sidebar-pane")?.classList.remove("sidebar-visible");
    document.getElementById("sidebar-overlay-backdrop")?.classList.remove("active");

    const card = document.getElementById(targetId);
    if (!card) return;

    const dimLayer = document.querySelector(".desktop-dimming-layer");
    if (dimLayer) dimLayer.classList.add("active");

    card.classList.add("widget-window-active");
    const cb = card.querySelector(".window-close-trigger");
    if (cb) cb.style.display = "block";
}

function initializeDesktopWidgetSystem() {
    let dimLayer = document.querySelector(".desktop-dimming-layer") || document.createElement("div");
    if (!dimLayer.parentNode) { dimLayer.className = "desktop-dimming-layer"; document.body.appendChild(dimLayer); }

    document.querySelectorAll(".widget-card").forEach(card => {
        const header = card.querySelector(".card-header");
        let closeBtn = card.querySelector(".window-close-trigger");

        if (header && !closeBtn) {
            closeBtn = document.createElement("button");
            closeBtn.className = "window-close-trigger";
            closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
            closeBtn.style.display = "none";
            header.appendChild(closeBtn);
        }

        if (closeBtn) {
            closeBtn.addEventListener("click", (e) => {
                e.stopPropagation();
                card.classList.remove("widget-window-active");
                dimLayer.classList.remove("active");
                closeBtn.style.display = "none";
            });
        }

        card.addEventListener("click", function(e) {
            if (this.classList.contains("widget-window-active")) return;
            if (e.target.closest("input") || e.target.closest("textarea") || e.target.closest("button") || e.target.closest("select") || e.target.closest("a") || e.target.closest(".action-buttons") || e.target.closest("i")) return;

            this.classList.add("widget-window-active");
            dimLayer.classList.add("active");
            if (closeBtn) closeBtn.style.display = "block";
        });
    });

    dimLayer.addEventListener("click", () => {
        const openWin = document.querySelector(".widget-window-active");
        if (openWin) {
            openWin.classList.remove("widget-window-active");
            dimLayer.classList.remove("active");
            const cb = openWin.querySelector(".window-close-trigger");
            if (cb) cb.style.display = "none";
        }
    });

    // Sidebar Action Event Wireframes
    document.getElementById("sidebar-toggle-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("desktop-sidebar-pane")?.classList.add("sidebar-visible");
        document.getElementById("sidebar-overlay-backdrop")?.classList.add("active");
    });

    document.getElementById("sidebar-close-btn")?.addEventListener("click", (e) => {
        e.stopPropagation();
        document.getElementById("desktop-sidebar-pane")?.classList.remove("sidebar-visible");
        document.getElementById("sidebar-overlay-backdrop")?.classList.remove("active");
    });

    document.getElementById("sidebar-overlay-backdrop")?.addEventListener("click", () => {
        document.getElementById("desktop-sidebar-pane")?.classList.remove("sidebar-visible");
        document.getElementById("sidebar-overlay-backdrop")?.classList.remove("active");
    });
}

// Make accessible to inline navigation tags
window.focusWidgetWindow = focusWidgetWindow;

// --- MASTER SYSTEM INITIALIZATION LOOP IGNITION ---
document.addEventListener("DOMContentLoaded", () => {
    renderExpenses();
    initializeClipboardManager();
    initializeAIWorkspace();
    initializeAISearch();
    initializeAPITester();
    initializePomodoroTimer();
    updateCryptoMockChart();
    initializeDesktopWidgetSystem();

    setInterval(() => { 
        const clock = document.getElementById("live-clock-display");
        if(clock) clock.textContent = new Date().toLocaleTimeString();
    }, 1000);

    document.getElementById("crypto-asset-select")?.addEventListener("change", (e) => { e.stopPropagation(); updateCryptoMockChart(); });
    document.getElementById("currency-select")?.addEventListener("change", (e) => { e.stopPropagation(); appState.currentCurrency = e.target.value; renderExpenses(); });
    document.getElementById("email-drafter")?.querySelector(".btn-primary")?.addEventListener("click", (e) => { e.stopPropagation(); executeLiveEmailGeneration(); });

    // Procedural Audio Router Toggles
    document.querySelectorAll(".audio-control-row").forEach(row => {
        const label = row.querySelector("span")?.textContent.toLowerCase() || "";
        const btn = row.querySelector(".toggle-switch-btn");
        if (btn) {
            btn.addEventListener("click", (e) => {
                e.stopPropagation();
                AmbientSoundPlugin.generateProceduralNoise(label.includes("rain") ? "rain" : "white", btn);
            });
        }
    });

    document.getElementById("expense-form")?.addEventListener("submit", (e) => {
        e.preventDefault(); e.stopPropagation();
        const t = document.getElementById("exp-title"), a = document.getElementById("exp-amount");
        if (t && a && t.value.trim() && !isNaN(parseFloat(a.value))) {
            const rate = appState.conversionRates[appState.currentCurrency];
            appState.expenses.push({ id: Date.now(), title: t.value.trim(), amount: parseFloat(a.value) / rate });
            renderExpenses();
            t.value = ''; a.value = '';
        }
    });
});
