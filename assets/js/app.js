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
