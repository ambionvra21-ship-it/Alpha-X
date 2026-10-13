// --- Project Devilmycry666 High-Performance Telemetry Engine ---

const appState = {
    expenses: JSON.parse(localStorage.getItem("PAWVIBE_EXPENSE_REGISTRY")) || [
        { id: 1, title: 'Base Infrastructure', amount: 4500.00 },
        { id: 2, title: 'Network Allocation', amount: 3200.00 },
        { id: 3, title: 'Cloud Core Node', amount: 4750.00 }
    ],
    currentCurrency: 'PHP',
    currencySymbols: { PHP: '₱', USD: '\$', EUR: '€' },
    conversionRates: { PHP: 1, USD: 0.018, EUR: 0.017 }
};

function commitTrackerDataToStorage() {
    localStorage.setItem("PAWVIBE_EXPENSE_REGISTRY", JSON.stringify(appState.expenses));
}

// --- MODULE 1: REACTIVE GRAPH & LEDGER COMPILER ---
function renderExpenses() {
    const listContainer = document.getElementById('expense-list');
    const totalDisplay = document.getElementById('tracker-aggregate-total');
    const countDisplay = document.getElementById('tracker-items-count');
    const graphWrapper = document.querySelector('.graph-panel-column .sparkline-svg-mock');
    
    if (!listContainer) return;
    listContainer.innerHTML = '';
    
    const symbol = appState.currencySymbols[appState.currentCurrency];
    const rate = appState.conversionRates[appState.currentCurrency];
    let basePHPSum = 0;

    if (appState.expenses.length === 0) {
        listContainer.innerHTML = `<li style="font-size:0.75rem; color:#64748b; padding:0.5rem;">[Ledger Node Empty]</li>`;
        if (totalDisplay) totalDisplay.textContent = `${symbol}0.00`;
        if (countDisplay) countDisplay.textContent = `0 Items`;
        if (graphWrapper) graphWrapper.innerHTML = '<div style="font-size:10px; color:#475569;">No data logs discovered.</div>';
        return;
    }

    // Clear and re-populate the visual sparkline data graph canvas bars dynamically
    if (graphWrapper) graphWrapper.innerHTML = '';

    appState.expenses.forEach((item, index) => {
        basePHPSum += item.amount;
        const convertedAmount = (item.amount * rate).toFixed(2);
        
        // Render item row inside ledger display area
        const li = document.createElement('li');
        li.className = 'sci-fi-row-item';
        li.innerHTML = `
            <span>${item.title}</span>
            <span class="text-green">${symbol}${convertedAmount} 
                <i class="fa-solid fa-trash-can delete-btn" data-id="${item.id}" style="color:#ef4444; margin-left:8px; cursor:pointer;"></i>
            </span>
        `;
        listContainer.appendChild(li);

        // Generate matching height chart bars based on price volume variations
        if (graphWrapper) {
            const bar = document.createElement('div');
            bar.className = 'mock-bar';
            // Compute percentage height relative to a 5000 baseline threshold limit
            const percentageHeight = Math.min((item.amount / 5000) * 100, 100);
            bar.style.height = `${percentageHeight}%`;
            bar.style.transition = 'height 0.3s ease';
            graphWrapper.appendChild(bar);
        }
    });

    if (totalDisplay) totalDisplay.textContent = `${symbol}${(basePHPSum * rate).toFixed(2)}`;
    if (countDisplay) countDisplay.textContent = `${appState.expenses.length} Items`;

    // Hook secure action controllers
    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            appState.expenses = appState.expenses.filter(item => item.id !== id);
            commitTrackerDataToStorage();
            renderExpenses();
        });
    });
}

// --- MODULE 2: COMMUNICATIONS HUB LIVE WAVEFORM SYNTHESIZER ---
function generateLiveTelemetryWaveform() {
    const commsGraphWrapper = document.querySelector('#email-drafter .sparkline-svg-mock');
    if (!commsGraphWrapper) return;

    // Build matching telemetry wave bars
    commsGraphWrapper.innerHTML = '';
    commsGraphWrapper.style.display = 'flex';
    commsGraphWrapper.style.alignItems = 'flex-end';
    commsGraphWrapper.style.gap = '4px';

    // Spawn 10 dynamic data bars across the hub canvas width
    for (let i = 0; i < 10; i++) {
        const barNode = document.createElement('div');
        barNode.className = 'mock-bar bg-teal';
        barNode.style.height = `${Math.floor(Math.random() * 70) + 20}%`;
        barNode.style.flex = '1';
        barNode.style.background = 'var(--neon-blue)';
        barNode.style.transition = 'height 0.4s ease-in-out';
        commsGraphWrapper.appendChild(barNode);
    }

    // Set a continuous background interval fluctuation loop to mimic scanning operations
    setInterval(() => {
        const activeBars = commsGraphWrapper.querySelectorAll('.mock-bar');
        activeBars.forEach(bar => {
            bar.style.height = `${Math.floor(Math.random() * 75) + 15}%`;
        });
    }, 800);
}

function executeLiveEmailGeneration() {
    const tone = document.getElementById('email-tone')?.value || 'formal';
    const ctx = document.getElementById('email-context');
    if (!ctx || !ctx.value.trim()) return alert("Please specify command parameters first!");
    ctx.value = `[${tone.toUpperCase()} CORE MATRIX DISPATCH]\nDEAR OPERATIONS TEAM,\n\nREGARDING LOGGED WORKSPACE ARRAYS:\n"${ctx.value}"\n\nTRANSMITTING SECURE DATA ROUTINES OVER PUBLIC NETWORK BRIDGES.\n\nBEST REGARDS,\nDEVILMYCRY666 OPERATING ENVIRONMENT`;
}

// --- MODULE 3 & 4: ASYNCHRONOUS CRYPTO & STOCK STREAM INTEGRATION ---
const cryptoAssetRegistry = {
    BTC: { apiId: 'bitcoin', displayId: 'crypto-btc-val', fallBackPrice: 57230.50 },
    ETH: { apiId: 'ethereum', displayId: 'crypto-eth-val', fallBackPrice: 2410.20 },
    SOL: { apiId: 'solana', displayId: 'crypto-sol-val', fallBackPrice: 141.75 }
};

async function syncTargetCryptoAssetFeed() {
    const activeSelection = document.getElementById('crypto-asset-select')?.value || 'BTC';
    const primaryViewDisplay = document.getElementById('crypto-live-price');
    if (!primaryViewDisplay) return;

    primaryViewDisplay.textContent = "SYNCHRONIZING REFRESH...";
    primaryViewDisplay.style.color = "var(--text-muted)";

    // First, run a background routine query to pull and update ALL matrix panel blocks matching your image
    for (const tokenKey in cryptoAssetRegistry) {
        const tokenConfig = cryptoAssetRegistry[tokenKey];
        try {
            const streamResponse = await fetch(`https://coingecko.com{tokenConfig.apiId}&vs_currencies=usd`);
            const payloadData = await streamResponse.json();
            const evaluatedPrice = payloadData[tokenConfig.apiId].usd;
            
            const cellElement = document.getElementById(tokenConfig.displayId);
            if (cellElement) {
                cellElement.textContent = `\$${evaluatedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
            }

            // If this asset loops into the active tracker dropdown view, update the main header badge metrics
            if (tokenKey === activeSelection) {
                primaryViewDisplay.textContent = `\$${evaluatedPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })} [ONLINE]`;
                primaryViewDisplay.style.color = "var(--neon-green)";
            }
        } catch (error) {
            // Revert back to the mock baseline price grid indicators if network constraints block queries
            const cellElement = document.getElementById(tokenConfig.displayId);
            if (cellElement) cellElement.textContent = `\$${tokenConfig.fallBackPrice.toLocaleString()}`;
            if (tokenKey === activeSelection) {
                primaryViewDisplay.textContent = `\$${tokenConfig.fallBackPrice.toLocaleString()} [CACHED]`;
                primaryViewDisplay.style.color = "#ff4136";
            }
        }
    }
}

// --- MODULE 4: STOCK TIE INDICES FLUCTUATOR FEED ---
function startLiveStockMarketDataStream() {
    const pseiDisplay = document.getElementById("stock-psei");
    const spyDisplay = document.getElementById("stock-spy");

    setInterval(() => {
        const pseiFluctuation = (Math.random() * 30 - 15);
        const spyFluctuation = (Math.random() * 18 - 9);

        let currentPsei = 7240.50 + pseiFluctuation;
        let currentSpy = 5710.25 + spyFluctuation;

        const pseiTrendPct = (((currentPsei - 7240.50) / 7240.50) * 100).toFixed(2);
        const spyTrendPct = (((currentSpy - 5710.25) / 5710.25) * 100).toFixed(2);

        if (pseiDisplay) {
            const isPseiUp = pseiTrendPct >= 0;
            pseiDisplay.textContent = `${currentPsei.toLocaleString(undefined, {maximumFractionDigits: 2})} (${isPseiUp ? '+' : ''}${pseiTrendPct}%)`;
            pseiDisplay.style.color = isPseiUp ? "var(--neon-green)" : "#ff4136";
        }

        if (spyDisplay) {
            const isSpyUp = spyTrendPct >= 0;
            spyDisplay.textContent = `${currentSpy.toLocaleString(undefined, {maximumFractionDigits: 2})} (${isSpyUp ? '+' : ''}${spyTrendPct}%)`;
            spyDisplay.style.color = isSpyUp ? "var(--neon-green)" : "#ff4136";
        }
    }, 5000);
}

// --- MODULE 5: POMODORO COUNTDOWN TRACKING TIMER ---
let pomodoroInterval = null;
let pomodoroSecondsLeft = 1500;

function initializePomodoroTimer() {
    const timerDisplay = document.getElementById('pomodoro-display');
    const startButton = document.getElementById('pomodoro-start');
    const pauseButton = document.getElementById('pomodoro-pause');

    if (!timerDisplay) return;

    function refreshTimerDisplayString() {
        const remainingMinutes = Math.floor(pomodoroSecondsLeft / 60).toString().padStart(2, '0');
        const remainingSeconds = (pomodoroSecondsLeft % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${remainingMinutes}:${remainingSeconds}`;
    }

    if (startButton) {
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (pomodoroInterval) return;
            
            startButton.style.borderColor = "var(--neon-green)";
            if (pauseButton) pauseButton.style.borderColor = "var(--border-cyan)";

            pomodoroInterval = setInterval(() => {
                if (pomodoroSecondsLeft > 0) {
                    pomodoroSecondsLeft--;
                    refreshTimerDisplayString();
                } else {
                    clearInterval(pomodoroInterval);
                    pomodoroInterval = null;
                    pomodoroSecondsLeft = 1500;
                    refreshTimerDisplayString();
                    alert("Focus session complete! Take a strategic break to recover.");
                }
            }, 1000);
        });
    }

    if (pauseButton) {
        pauseButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (!pomodoroInterval) return;

            clearInterval(pomodoroInterval);
            pomodoroInterval = null;
            
            if (startButton) startButton.style.borderColor = "var(--border-cyan)";
            pauseButton.style.borderColor = "#ff4136";
        });
    }
}

// --- MODULE 7 & 8: BIOMETRIC HEALTH LOGS & ENVIRONMENT ---
function calculateMetricsBMI() {
    const weightInput = document.getElementById('health-weight');
    const heightInput = document.getElementById('health-height');
    const summaryPane = document.getElementById('health-summary-pane');

    if (!weightInput || !heightInput || !summaryPane) return;

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (!weight || !heightCm || isNaN(weight) || isNaN(heightCm)) {
        alert("Please enter valid numeric indicators!");
        return;
    }

    const bmiValue = (weight / ((heightCm / 100) * (heightCm / 100))).toFixed(1);
    let status = "Normal Weight";
    if (bmiValue < 18.5) status = "Underweight";
    else if (bmiValue >= 25) status = "Overweight";

    summaryPane.innerHTML = `🧬 BMI: <strong>${bmiValue}</strong> (${status})<br>Sync Code Terminal Checked.`;
}

function shareToPlatform(p) { alert(`Intent broadcast sequence mapped to: ${p}`); }

// --- MASTER RE-INITIALIZATION SYSTEM BOOT SWITCH ---
document.addEventListener('DOMContentLoaded', () => {
    // Ignite all modular sub-systems sequentially
    renderExpenses();
    generateLiveTelemetryWaveform();
    syncTargetCryptoAssetFeed();
    startLiveStockMarketDataStream();
    initializePomodoroTimer();

    // Event binding for interactive currency / crypto adjustments
    document.getElementById('crypto-asset-select')?.addEventListener('change', () => {
        syncTargetCryptoAssetFeed();
    });

    document.getElementById('expense-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = document.getElementById('exp-title'), a = document.getElementById('exp-amount');
        if (t && a && t.value.trim() && !isNaN(parseFloat(a.value))) {
            appState.expenses.push({ 
                id: Date.now(), 
                title: t.value.trim(), 
                amount: parseFloat(a.value) 
            });
            commitTrackerDataToStorage();
            renderExpenses();
            t.value = ''; a.value = '';
        }
    });

    const commsHubBtn = document.querySelector('#email-drafter .btn-primary');
    if (commsHubBtn) {
        commsHubBtn.addEventListener('click', executeLiveEmailGeneration);
    }

    // Keep active operating clock channels ticking perfectly every second
    setInterval(() => {
        const clock = document.getElementById('live-clock-display');
        if (clock) clock.textContent = new Date().toLocaleTimeString();
    }, 1000);
});
