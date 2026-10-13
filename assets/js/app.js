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
