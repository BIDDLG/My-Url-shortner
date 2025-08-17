// PART 1: SELECT ALL ELEMENTS
const controlsPanel = document.querySelector('.controls-panel');
const previewButtonDesktop = document.getElementById('preview-button-desktop');
const previewButtonMobile = document.getElementById('preview-button-mobile');
const cssCodeOutput = document.getElementById('css-code-output');
const copyCodeBtn = document.getElementById('copy-code-btn');
const presetsContainer = document.getElementById('presets-container');

// A big object to hold all our input elements (Same as before)
const inputs = {
    btnText: document.getElementById('btn-text'),
    textColor: document.getElementById('text-color'),
    bgColor: document.getElementById('bg-color'),
    vPadding: document.getElementById('v-padding'),
    hPadding: document.getElementById('h-padding'),
    borderRadius: document.getElementById('border-radius'),
    shadowY: document.getElementById('shadow-y'),
    shadowBlur: document.getElementById('shadow-blur'),
    shadowColor: document.getElementById('shadow-color'),
};

// --- PRESETS DATA (Same 10 buttons) ---
const presets = [
    { name: 'Primary', bgColor: '#3498db', textColor: '#ffffff', shadowY: 4, borderRadius: 8 },
    { name: 'Success', bgColor: '#2ecc71', textColor: '#ffffff', shadowY: 4, borderRadius: 8 },
    { name: 'Danger', bgColor: '#e74c3c', textColor: '#ffffff', shadowY: 4, borderRadius: 8 },
    { name: 'Warning', bgColor: '#f1c40f', textColor: '#ffffff', shadowY: 4, borderRadius: 8 },
    { name: 'Neumorphic', bgColor: '#e0e5ec', textColor: '#555', shadowY: 5, shadowColor: '#a3b1c6' },
    { name: 'Pill', bgColor: '#9b59b6', textColor: '#ffffff', shadowY: 3, borderRadius: 50 },
    { name: '3D Push', bgColor: '#1abc9c', textColor: '#ffffff', shadowY: 6, shadowColor: '#16a085', borderRadius: 5 },
    { name: 'Minimal', bgColor: '#ffffff', textColor: '#333', shadowY: 2, shadowColor: '#dddddd', borderRadius: 4 },
    { name: 'Gradient', bgColor: 'linear-gradient(45deg, #ff6b6b, #f06595)', textColor: '#fff', shadowY: 5, borderRadius: 10 },
    { name: 'Dark', bgColor: '#34495e', textColor: '#ecf0f1', shadowY: 5, shadowColor: '#2c3e50', borderRadius: 6 },
];

// PART 2: CORE FUNCTIONS

// Function to generate the CSS and update BOTH button styles
function updateStyles() {
    const v = {};
    for (const key in inputs) {
        v[key] = inputs[key].value;
    }
    
    // An array of the two buttons to apply styles to both
    const previewButtons = [previewButtonDesktop, previewButtonMobile];

    previewButtons.forEach(button => {
        button.innerText = v.btnText;
        button.style.color = v.textColor;
        button.style.background = v.bgColor;
        button.style.padding = `${v.vPadding}px ${v.hPadding}px`;
        button.style.borderRadius = `${v.borderRadius}px`;
        button.style.border = 'none';
        
        // Special shadow for Neumorphic
        if (v.bgColor === '#e0e5ec') {
            button.style.boxShadow = `5px 5px 10px #a3b1c6, -5px -5px 10px #ffffff`;
        } else {
            button.style.boxShadow = `0px ${v.shadowY}px ${v.shadowBlur}px ${v.shadowColor}`;
        }
    });

    // Update slider value displays
    ['vPadding', 'hPadding', 'borderRadius', 'shadowY', 'shadowBlur'].forEach(id => {
        document.getElementById(`${id}-value`).textContent = `${inputs[id].value}px`;
    });

    generateCSSCode();
}

// Function to generate the final CSS code (Same as before)
function generateCSSCode() {
    const css = `
.my-button {
    background: ${previewButtonDesktop.style.background};
    color: ${previewButtonDesktop.style.color};
    padding: ${previewButtonDesktop.style.padding};
    border-radius: ${previewButtonDesktop.style.borderRadius};
    border: ${previewButtonDesktop.style.border};
    box-shadow: ${previewButtonDesktop.style.boxShadow};
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    transition: all 0.2s ease;
}
.my-button:hover {
    transform: translateY(-2px);
    box-shadow: 0px ${parseInt(inputs.shadowY.value) + 2}px ${parseInt(inputs.shadowBlur.value) + 4}px ${inputs.shadowColor.value};
}
    `;
    cssCodeOutput.textContent = css.trim();
}

// Function to apply a preset (Same as before)
function applyPreset(preset) {
    const newValues = {
        bgColor: preset.bgColor,
        textColor: preset.textColor,
        shadowY: preset.shadowY || 4,
        borderRadius: preset.borderRadius || 8,
        shadowColor: preset.shadowColor || '#000000',
    };
    for (const key in newValues) {
        if (inputs[key]) {
            inputs[key].value = newValues[key];
        }
    }
    updateStyles();
}

// PART 3: EVENT LISTENERS AND INITIALIZATION (Same as before)
controlsPanel.addEventListener('input', updateStyles);

copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCodeOutput.textContent).then(() => {
        copyCodeBtn.innerText = 'Copied!';
        setTimeout(() => { copyCodeBtn.innerText = 'Copy CSS'; }, 2000);
    });
});

document.addEventListener('DOMContentLoaded', () => {
    presets.forEach(preset => {
        const btn = document.createElement('button');
        btn.className = 'preset-btn';
        btn.innerText = preset.name;
        btn.style.background = preset.bgColor;
        btn.style.color = preset.textColor;
        btn.addEventListener('click', () => applyPreset(preset));
        presetsContainer.appendChild(btn);
    });
    updateStyles(); // Initial style application
});
