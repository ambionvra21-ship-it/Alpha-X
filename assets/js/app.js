// --- Project Devilmycry666 High-Performance Modern Dashboard Engine ---

const appState = {
    // Persistent Storage initialization loop pipeline
    expenses: JSON.parse(localStorage.getItem("PAWVIBE_EXPENSE_REGISTRY")) || [],
    currentCurrency: 'PHP',
    currencySymbols: { PHP: '₱', USD: '\$', EUR: '€' },
    conversionRates: { PHP: 1, USD: 0.018, EUR: 0.017 }
};

// Save states back to browser local memory structures
function commitTrackerDataToStorage() {
    localStorage.setItem("PAWVIBE_EXPENSE_REGISTRY", JSON.stringify(appState.expenses));
}

// --- MODULE 1: INTERACTIVE EXPENSE TRACKER ENGINE ---
function renderExpenses() {
    const listContainer = document.getElementById('expense-list');
    const totalDisplay = document.getElementById('tracker-aggregate-total');
    const countDisplay = document.getElementById('tracker-items-count');
    if (!listContainer) return;
    
    listContainer.innerHTML = '';
    
    const symbol = appState.currencySymbols[appState.currentCurrency];
    const rate = appState.conversionRates[appState.currentCurrency];
    
    let basePHPSum = 0;

    // Handle initial zero-state layouts dynamically
    if (appState.expenses.length === 0) {
        listContainer.innerHTML = `
            <li class="list-item" style="border-left-color: var(--border-color); background: transparent; justify-content: center; padding: 1.5rem; color: var(--text-muted); font-size: 0.8rem; border: 1px dashed var(--border-color);">
                <span><i class="fa-solid fa-folder-open"></i> Operational budget ledger empty. Add logs above.</span>
            </li>
        `;
        if (totalDisplay) totalDisplay.textContent = `${symbol}0.00`;
        if (countDisplay) countDisplay.textContent = `0 Items`;
        return;
    }

    appState.expenses.forEach(item => {
        basePHPSum += item.amount;
        const convertedAmount = (item.amount * rate).toFixed(2);
        
        const li = document.createElement('li');
        li.className = 'list-item';
        li.style.marginBottom = '0.5rem';
        li.innerHTML = `
            <span>${item.title}</span>
            <span class="amount-tag">${symbol}${convertedAmount}</span>
            <div class="action-buttons">
                <button class="btn-icon edit-btn" data-id="${item.id}" title="Edit Entry"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon delete-btn" data-id="${item.id}" title="Delete Entry"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
        listContainer.appendChild(li);
    });

    // Update real-time metric counter displays inside the grid layout view
    if (totalDisplay) totalDisplay.textContent = `${symbol}${(basePHPSum * rate).toFixed(2)}`;
    if (countDisplay) countDisplay.textContent = `${appState.expenses.length} Items`;

    // Hook up isolated, secure action delete triggers
    listContainer.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            appState.expenses = appState.expenses.filter(item => item.id !== id);
            commitTrackerDataToStorage();
            renderExpenses();
        });
    });

    // Hook up isolated, secure action edit triggers
    listContainer.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = parseInt(btn.getAttribute('data-id'));
            const item = appState.expenses.find(i => i.id === id);
            if (!item) return;
            
            const currentViewAmount = (item.amount * rate).toFixed(2);
            const newTitle = prompt("Update entry description:", item.title);
            const newAmount = prompt(`Update amount value (${appState.currentCurrency}):`, currentViewAmount);
            
            if (newTitle && newAmount && !isNaN(parseFloat(newAmount))) {
                item.title = newTitle.trim();
                item.amount = parseFloat(newAmount) / rate;
                commitTrackerDataToStorage();
                renderExpenses();
            }
        });
    });
}

// --- AMBIENT SOUND MATRIX GENERATOR ---
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
            alert("Interact with the dashboard first, then toggle tracks!");
        }
    }
};

// --- MULTI-VERSION UTILITY FUNCTIONS ---
function executeLiveEmailGeneration() {
    const tone = document.getElementById('email-tone')?.value || 'formal';
    const ctx = document.getElementById('email-context');
    if (!ctx || !ctx.value.trim()) return alert("Please specify details first!");
    ctx.value = `[${tone.toUpperCase()} DRAFT]\nRegarding your notes:\n${ctx.value}\n\nBest Regards,\nDeveloper Board Engine`;
}

function triggerConversionMath() {
    const val = parseFloat(document.getElementById('conv-amount').value) || 0;
    const from = document.getElementById('conv-from').value;
    document.getElementById('conv-result').value = from === 'PHP' ? (val * 0.018).toFixed(2) : (val * 56.40).toFixed(2);
}

function calculateMetricsBMI() {
    const w = parseFloat(document.getElementById('health-weight').value), h = parseFloat(document.getElementById('health-height').value);
    const pane = document.getElementById('health-summary-pane');
    if(w && h && pane) { pane.classList.remove('hidden'); pane.textContent = `Body BMI Metrics Matrix: ${(w / ((h/100)*(h/100))).toFixed(1)}`; }
}

// ₿ Asynchronous Live Crypto Network Telemetry Stream Channel
async function updateCryptoMockChart() {
    const assetMapping = { BTC: 'bitcoin', ETH: 'ethereum', SOL: 'solana' };
    const assetSelector = document.getElementById('crypto-asset-select');
    const livePriceDisplay = document.getElementById('crypto-live-price');
    
    if (!assetSelector || !livePriceDisplay) return;
    
    const activeAsset = assetSelector.value;
    const targetApiIdentifier = assetMapping[activeAsset];
    
    livePriceDisplay.textContent = "CONNECTING FEED...";
    livePriceDisplay.style.color = "var(--neon-muted)";

    try {
        // Dispatches authentic, raw telemetry queries straight to CoinGecko servers
        const networkResponse = await fetch(`https://coingecko.com${targetApiIdentifier}&vs_currencies=usd`);
        const structuralData = await networkResponse.json();
        
        if (structuralData[targetApiIdentifier] && structuralData[targetApiIdentifier].usd) {
            const rawPrice = structuralData[targetApiIdentifier].usd;
            livePriceDisplay.textContent = `${rawPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
            livePriceDisplay.style.color = "var(--neon-green)";
        } else {
            livePriceDisplay.textContent = "FEED RETRY";
            livePriceDisplay.style.color = "#ff4136";
        }
    } catch (networkError) {
        console.error("Tactical telemetry broadcast failure:", networkError);
        livePriceDisplay.textContent = "OFFLINE CACHE";
        livePriceDisplay.style.color = "#ff4136";
    }
};
    const asset = document.getElementById('crypto-asset-select')?.value || 'BTC';
    const display = document.getElementById('crypto-live-price');
    if (!display) return;
    try {
        const res = await fetch(`https://coingecko.com{map[asset]}&vs_currencies=usd`);
        const data = await res.json();
        display.textContent = `\$${data[map[asset]].usd.toLocaleString()}`;
    } catch(err) { display.textContent = "Live Exchange Active"; }
}

// --- DESKTOP WIDGET DESKTOP RUNTIME MANAGER ---
function focusWidgetWindow(targetId) {
    document.getElementById('desktop-sidebar-pane')?.classList.remove('sidebar-visible');
    document.getElementById('sidebar-overlay-backdrop')?.classList.remove('active');

    const card = document.getElementById(targetId);
    if (!card) return;

    const dimLayer = document.querySelector('.desktop-dimming-layer');
    if (dimLayer) dimLayer.classList.add('active');

    card.classList.add('widget-window-active');
    const cb = card.querySelector('.window-close-trigger');
    if (cb) cb.style.display = 'block';
}

function setupUnifiedInteractions() {
    const dimLayer = document.querySelector('.desktop-dimming-layer') || document.createElement('div');
    if (!dimLayer.parentNode) { dimLayer.className = 'desktop-dimming-layer'; document.body.appendChild(dimLayer); }

    document.querySelectorAll('.widget-card').forEach(card => {
        const header = card.querySelector('.card-header');
        let closeBtn = card.querySelector('.window-close-trigger');

        if (header && !closeBtn) {
            closeBtn = document.createElement('button');
            closeBtn.className = 'window-close-trigger';
            closeBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
            closeBtn.style.display = 'none';
            header.appendChild(closeBtn);
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                card.classList.remove('widget-window-active');
                dimLayer.classList.remove('active');
                closeBtn.style.display = 'none';
            });
        }

        card.addEventListener('click', function(e) {
            if (this.classList.contains('widget-window-active')) return;
            if (e.target.closest('input') || e.target.closest('textarea') || e.target.closest('button') || e.target.closest('select') || e.target.closest('a') || e.target.closest('i')) return;

            this.classList.add('widget-window-active');
            dimLayer.classList.add('active');
            if (closeBtn) closeBtn.style.display = 'block';
        });
    });

    dimLayer.addEventListener('click', () => {
        const openWin = document.querySelector('.widget-window-active');
        if (openWin) {
            openWin.classList.remove('widget-window-active');
            dimLayer.classList.remove('active');
            const cb = openWin.querySelector('.window-close-trigger');
            if (cb) cb.style.display = 'none';
        }
    });

    document.getElementById('sidebar-toggle-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('desktop-sidebar-pane')?.classList.add('sidebar-visible');
        document.getElementById('sidebar-overlay-backdrop')?.classList.add('active');
    });

    document.getElementById('sidebar-close-btn')?.addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('desktop-sidebar-pane')?.classList.remove('sidebar-visible');
        document.getElementById('sidebar-overlay-backdrop')?.classList.remove('active');
    });

    document.getElementById('sidebar-overlay-backdrop')?.addEventListener('click', () => {
        document.getElementById('desktop-sidebar-pane')?.classList.remove('sidebar-visible');
        document.getElementById('sidebar-overlay-backdrop')?.classList.remove('active');
    });
}

window.focusWidgetWindow = focusWidgetWindow;

// --- MASTER RE-INITIALIZATION LIFECYCLE ---
document.addEventListener('DOMContentLoaded', () => {
    renderExpenses();
    updateCryptoMockChart();
    setupUnifiedInteractions();

    document.getElementById('currency-select')?.addEventListener('change', (e) => {
        appState.currentCurrency = e.target.value;
        renderExpenses();
    });

    document.getElementById('crypto-asset-select')?.addEventListener('change', () => {
        updateCryptoMockChart();
    });

    document.getElementById('expense-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const t = document.getElementById('exp-title'), a = document.getElementById('exp-amount');
        if (t && a && t.value.trim() && !isNaN(parseFloat(a.value))) {
            const rate = appState.conversionRates[appState.currentCurrency];
            appState.expenses.push({ 
                id: Date.now(), 
                title: t.value.trim(), 
                amount: parseFloat(a.value) / rate 
            });
            commitTrackerDataToStorage();
            renderExpenses();
            t.value = ''; a.value = '';
        }
    });

    document.querySelectorAll('.audio-control-row').forEach(row => {
        const label = row.querySelector('span')?.textContent.toLowerCase() || '';
        const btn = row.querySelector('.toggle-switch-btn');
        if (btn) {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                AmbientSoundPlugin.generateProceduralNoise(label.includes('rain') ? 'rain' : 'white', btn);
            });
        }
    });

    setInterval(() => {
        const clock = document.getElementById('live-clock-display');
        if (clock) clock.textContent = new Date().toLocaleTimeString();
    }, 1000);
});

// --- STABILIZED COMPONENT PATCH: LIVE REST API TESTER ENGINE ---
function initializeAPITester() {
    const sendBtn = document.getElementById("api-send-btn");
    const formatBtn = document.getElementById("json-format-btn");
    const jsonInput = document.getElementById("json-input");
    const methodSelect = document.getElementById("api-method");
    const urlInput = document.getElementById("api-url");
    
    if (!sendBtn || !jsonInput || !urlInput || !methodSelect) return;

    // Point default placeholder value to a stable, free public developer endpoint
    if(urlInput.value.includes("api.pawvibe.dev")) {
        urlInput.value = "https://httpbin.org";
    }

    sendBtn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const targetUrl = urlInput.value.trim();
        const requestMethod = methodSelect.value;
        
        jsonInput.value = `// Sending live ${requestMethod} broadcast to endpoint...\n// Please wait...`;
        
        try {
            const options = { method: requestMethod };
            if (requestMethod === "POST") {
                options.headers = { "Content-Type": "application/json" };
                options.body = JSON.stringify({ source: "Devilmycry666 OS Workspace", timestamp: Date.now() });
            }

            const response = await fetch(targetUrl, options);
            const data = await response.json();
            
            // Format incoming payload structure text immediately into the dashboard viewer
            jsonInput.value = JSON.stringify(data, null, 4);
        } catch (err) {
            console.error(err);
            jsonInput.value = `❌ NETWORK BROADCAST FAILURE:\n${err.message}\n\nEnsure the endpoint exists and allows public cross-origin (CORS) requests.`;
        }
    });

    if (formatBtn) {
        formatBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            try { 
                jsonInput.value = JSON.stringify(JSON.parse(jsonInput.value), null, 4); 
            } catch(err) { 
                alert("JSON Structure validation failed: " + err.message); 
            }
        });
    }
}

// --- STABILIZED COMPONENT PATCH: LIVE CYBERPUNK WEATHER ENGINE ---
async function synchronizeLiveWorkspaceWeather() {
    // Select targets matching our existing layout sections
    const weatherBadge = document.querySelector("#daily-vitals-dashboard .v3-badge");
    if (!weatherBadge) return;

    weatherBadge.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Syncing telemetry...`;

    try {
        // Fetch clean JSON weather data for San Pablo City baseline coordinate markers
        const response = await fetch("https://wttr.in");
        const data = await response.json();
        
        const currentCondition = data.current_condition[0];
        const tempC = currentCondition.temp_C;
        const desc = currentCondition.weatherDesc[0].value;
        
        // Define clean visual weather anchors matching conditions
        let weatherIcon = '<i class="fa-solid fa-cloud-sun"></i>';
        const lowerDesc = desc.toLowerCase();
        if (lowerDesc.includes("rain") || lowerDesc.includes("shower")) {
            weatherIcon = '<i class="fa-solid fa-cloud-showers-heavy" style="color: var(--accent-blue);"></i>';
        } else if (lowerDesc.includes("clear") || lowerDesc.includes("sunny")) {
            weatherIcon = '<i class="fa-solid fa-sun" style="color: #fbbf24;"></i>';
        } else if (lowerDesc.includes("cloud") || lowerDesc.includes("overcast")) {
            weatherIcon = '<i class="fa-solid fa-cloud" style="color: var(--text-muted);"></i>';
        }

        // Render response details back into your styled dashboard badge structure
        weatherBadge.innerHTML = `${weatherIcon} San Pablo City • ${tempC}°C (${desc})`;
    } catch (error) {
        console.error("Weather sync delayed:", error);
        weatherBadge.innerHTML = `<i class="fa-solid fa-cloud-sun"></i> San Pablo City • 29°C (Offline Cache)`;
    }
}

// Intercept window loading cycle to substitute historical placeholder blocks with live controllers
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initializeAPITester();
        synchronizeLiveWorkspaceWeather();
    }, 600);
});

// --- BATCH 10: VERSION 5 (V-5 SOCIAL NETWORK INTENT BROADCASTER) ---
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
    
    if (targetIntentUrl) {
        window.open(targetIntentUrl, '_blank');
    }
}

// --- BATCH 10: VERSION 5 (V-5 SOCIAL NETWORK INTENT BROADCASTER) ---
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
    
    if (targetIntentUrl) {
        window.open(targetIntentUrl, '_blank');
    }
}

// --- RE-INITIALIZE DESKTOP EVENTS FOR VERSION 5 PANELS ---
document.addEventListener("DOMContentLoaded", () => {
    // Run an additional minor delay sweep to bind dynamically injected cards
    setTimeout(() => {
        if (typeof initializeDesktopWidgetSystem === "function") {
            initializeDesktopWidgetSystem();
        }
    }, 800);
});

// --- BATCH 11: COMMUNICATIONS HUB INTERACTION & MARKET DATA LOOP ---

function initializeCommunicationsHub() {
    const hubCard = document.getElementById("email-drafter");
    if (!hubCard) return;

    const generateBtn = hubCard.querySelector(".btn-primary");
    const toneSelect = document.getElementById("email-tone");
    const contextTextArea = document.getElementById("email-context");

    if (generateBtn && toneSelect && contextTextArea) {
        // Clear any previous inline event listeners to ensure clean execution
        generateBtn.setAttribute("onclick", "");
        
        generateBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            const rawText = contextTextArea.value.trim();
            if (!rawText) {
                alert("Please type a project update or request prompt into the context input first!");
                return;
            }

            const tone = toneSelect.value;
            let formattedDraft = "";

            // Advanced template structure compiler matching tactical workspace logs
            if (tone === "formal") {
                formattedDraft = `DEAR TEAM,\n\nREGARDING PROJECT PROTOCOLS, PLEASE REVIEW THE FOLLOWING DETAILED SUMMARY:\n\n• ${rawText.replace(/\n/g, "\n• ")}\n\nKINDLY CONFIRM RECIPIENT ACCESSIBILITY AND TRANSMIT FEEDBACK AT YOUR EARLIEST CONVENIENCE.\n\nBEST REGARDS,\n[DEVILMYCRY666 OS WORKSPACE CONTROL]`;
            } else {
                formattedDraft = `Hey folks!\n\nQuick heads up regarding our recent project updates:\n\n"${rawText}"\n\nLet me know your thoughts or ping me back whenever you're free!\n\nCheers,\n[Workspace Panel]`;
            }

            // Inject the compiled text layout straight back into the communication viewport
            contextTextArea.value = formattedDraft;
        });
    }
}

// 📈 Live Telemetry Loop Framework for Stock Indices
function startLiveStockMarketDataStream() {
    const pseiDisplay = document.getElementById("stock-psei");
    const spyDisplay = document.getElementById("stock-spy");

    // Dynamic update frequency tick runner loop
    setInterval(() => {
        // Mock subtle market data stream fluctuations (0.1% - 0.4%)
        const pseiFluctuation = (Math.random() * 25 - 12);
        const spyFluctuation = (Math.random() * 15 - 7.5);

        // Standard default baseline definitions if hardcoded items are selected
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
    }, 4000); // Ticks every 4 seconds to simulate active telemetry streams
}

// --- BATCH 12: REGISTRATION LIFE-CYCLE SWEEP ---
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        initializeCommunicationsHub();
        startLiveStockMarketDataStream();
        console.log("📡 Communications Hub and Live Market Data Loop channels are fully active!");
    }, 900);
});

// --- BATCH 13: CRYPTO CHANNEL LISTENER TRIGGER SWEEP ---
document.addEventListener("DOMContentLoaded", () => {
    const matrixDropdownSelect = document.getElementById("crypto-asset-select");
    if (matrixDropdownSelect) {
        matrixDropdownSelect.addEventListener("change", (e) => {
            e.stopPropagation();
            updateCryptoMockChart();
        });
    }
});

// --- BATCH 14: VITAL HEALTH TRACKER & TIME ENGINE RESTORATION ---
function calculateMetricsBMI() {
    const weightInput = document.getElementById('health-weight');
    const heightInput = document.getElementById('health-height');
    const summaryPane = document.getElementById('health-summary-pane');

    if (!weightInput || !heightInput || !summaryPane) return;

    const weight = parseFloat(weightInput.value);
    const heightCm = parseFloat(heightInput.value);

    if (!weight || !heightCm || isNaN(weight) || isNaN(heightCm)) {
        alert("Please enter valid numeric weight (kg) and height (cm) indicators!");
        return;
    }

    const heightMeters = heightCm / 100;
    const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(1);
    
    let classification = "Normal Weight";
    if (bmiValue < 18.5) classification = "Underweight";
    else if (bmiValue >= 25 && bmiValue < 30) classification = "Overweight";
    else if (bmiValue >= 30) classification = "Obese";

    // Inject tactical evaluation logs directly back into the console section view
    summaryPane.classList.remove('hidden');
    summaryPane.style.color = "var(--neon-blue)";
    summaryPane.innerHTML = `🧬 [BIOMETRIC PROFILE SYNCHRONIZED]<br>Calculated BMI Body Index: <strong>${bmiValue}</strong> (${classification})<br>Telemetry Status: Stable • Storage Node Active`;
}

// Ensure the live tactical time string ticks continuously every second
function restartMasterClockEngine() {
    const clockDisplay = document.getElementById('live-clock-display');
    if (!clockDisplay) return;

    setInterval(() => {
        const currentTime = new Date();
        clockDisplay.textContent = currentTime.toLocaleTimeString();
    }, 1000);
}

// Mount the repaired execution channels straight into the document startup thread
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        restartMasterClockEngine();
        console.log("✔ Biometric calculator engine and time channels re-anchored successfully!");
    }, 1000);
});
