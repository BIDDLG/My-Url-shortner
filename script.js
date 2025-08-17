// PART 1: SELECT ALL ELEMENTS
const controls = document.querySelector('.controls-panel');
const previewButton = document.getElementById('preview-button');
const cssCodeOutput = document.getElementById('css-code-output');
const copyCodeBtn = document.getElementById('copy-code-btn');

// Input fields
const inputs = {
    btnText: document.getElementById('btn-text'),
    textColor: document.getElementById('text-color'),
    vPadding: document.getElementById('v-padding'),
    hPadding: document.getElementById('h-padding'),
    borderWidth: document.getElementById('border-width'),
    borderRadius: document.getElementById('border-radius'),
    borderColor: document.getElementById('border-color'),
    bgColor: document.getElementById('bg-color'),
    shadowX: document.getElementById('shadow-x'),
    shadowY: document.getElementById('shadow-y'),
    shadowBlur: document.getElementById('shadow-blur'),
    shadowColor: document.getElementById('shadow-color'),
};

// Span elements for displaying slider values
const valueSpans = {
    vPadding: document.getElementById('v-padding-value'),
    hPadding: document.getElementById('h-padding-value'),
    borderWidth: document.getElementById('border-width-value'),
    borderRadius: document.getElementById('border-radius-value'),
    shadowX: document.getElementById('shadow-x-value'),
    shadowY: document.getElementById('shadow-y-value'),
    shadowBlur: document.getElementById('shadow-blur-value'),
};

// PART 2: THE CORE FUNCTION
function updateButtonAndCode() {
    // Get all current values from inputs
    const v = {
        text: inputs.btnText.value,
        textColor: inputs.textColor.value,
        vPadding: inputs.vPadding.value,
        hPadding: inputs.hPadding.value,
        borderWidth: inputs.borderWidth.value,
        borderRadius: inputs.borderRadius.value,
        borderColor: inputs.borderColor.value,
        bgColor: inputs.bgColor.value,
        shadowX: inputs.shadowX.value,
        shadowY: inputs.shadowY.value,
        shadowBlur: inputs.shadowBlur.value,
        shadowColor: inputs.shadowColor.value,
    };

    // --- Update Live Preview Button ---
    previewButton.innerText = v.text;
    previewButton.style.color = v.textColor;
    previewButton.style.padding = `${v.vPadding}px ${v.hPadding}px`;
    previewButton.style.border = `${v.borderWidth}px solid ${v.borderColor}`;
    previewButton.style.borderRadius = `${v.borderRadius}px`;
    previewButton.style.backgroundColor = v.bgColor;
    previewButton.style.boxShadow = `${v.shadowX}px ${v.shadowY}px ${v.shadowBlur}px ${v.shadowColor}`;

    // --- Update Slider Value Spans ---
    for (const key in valueSpans) {
        if (valueSpans[key]) {
            valueSpans[key].innerText = `${inputs[key].value}px`;
        }
    }
    
    // --- Generate and Display CSS Code ---
    const generatedCSS = `
.my-button {
    color: ${v.textColor};
    background-color: ${v.bgColor};
    padding: ${v.vPadding}px ${v.hPadding}px;
    border: ${v.borderWidth}px solid ${v.borderColor};
    border-radius: ${v.borderRadius}px;
    box-shadow: ${v.shadowX}px ${v.shadowY}px ${v.shadowBlur}px ${v.shadowColor};
    cursor: pointer;
    font-size: 18px; /* You can add this as a control too! */
    text-align: center;
    text-decoration: none;
    display: inline-block;
}
    `;
    cssCodeOutput.textContent = generatedCSS.trim();
}

// PART 3: EVENT LISTENERS
// Use event delegation on the controls panel for efficiency
controls.addEventListener('input', updateButtonAndCode);

// Copy button functionality
copyCodeBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(cssCodeOutput.textContent).then(() => {
        copyCodeBtn.innerText = 'Copied!';
        setTimeout(() => { copyCodeBtn.innerText = 'Copy CSS'; }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
});

// Initial call to set everything up on page load
document.addEventListener('DOMContentLoaded', updateButtonAndCode);
