// PART 1: SELECT ALL THE HTML ELEMENTS
// Form Inputs
const headerTextInput = document.getElementById('header-text');
const headerBgColorInput = document.getElementById('header-bg-color');
const headerTextColorInput = document.getElementById('header-text-color');
const searchbarCheckbox = document.getElementById('add-searchbar');
const footerTextInput = document.getElementById('footer-text');
const footerBgColorInput = document.getElementById('footer-bg-color');
const footerTextColorInput = document.getElementById('footer-text-color');

// Buttons and Output Area
const generateBtn = document.getElementById('generate-btn');
const outputCodeTextarea = document.getElementById('output-code');
const copyBtn = document.getElementById('copy-btn');


// PART 2: THE "GENERATE" BUTTON'S MAIN FUNCTION
// This function runs when the "Generate Website Code" button is clicked
generateBtn.addEventListener('click', () => {

    // 1. Get all the current values from the form
    const headerTitle = headerTextInput.value;
    const headerBgColor = headerBgColorInput.value;
    const headerTextColor = headerTextColorInput.value;
    const hasSearchBar = searchbarCheckbox.checked;
    const footerText = footerTextInput.value;
    const footerBgColor = footerBgColorInput.value;
    const footerTextColor = footerTextColorInput.value;

    // 2. Create the CSS code string
    const cssCode = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .site-header {
            background-color: ${headerBgColor};
            color: ${headerTextColor};
            padding: 20px;
            text-align: center;
        }
        .site-content {
            padding: 20px;
            min-height: 60vh;
            text-align: center;
        }
        .search-container input {
            padding: 10px;
            width: 300px;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .search-container button {
            padding: 10px 15px;
            border: none;
            background-color: ${headerBgColor};
            color: ${headerTextColor};
            border-radius: 4px;
            cursor: pointer;
        }
        .site-footer {
            background-color: ${footerBgColor};
            color: ${footerTextColor};
            padding: 15px;
            text-align: center;
            position: relative;
            bottom: 0;
            width: 100%;
        }
    `;

    // 3. Create the HTML code for the body
    // Start with the header
    let bodyHTML = `
    <header class="site-header">
        <h1>${headerTitle}</h1>
    </header>
    
    <main class="site-content">`;
    
    // Add search bar if the checkbox is checked
    if (hasSearchBar) {
        bodyHTML += `
        <div class="search-container">
            <input type="search" placeholder="Search...">
            <button>Search</button>
        </div>`;
    }

    // Add more content here in the future
    bodyHTML += `
        <p>Welcome to your new website!</p>
    </main>`;

    // Add the footer
    bodyHTML += `
    <footer class="site-footer">
        <p>${footerText}</p>
    </footer>`;

    // 4. Combine everything into the final, full HTML document
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${headerTitle}</title>
    <style>
${cssCode.trim()}
    </style>
</head>
<body>
${bodyHTML.trim()}
</body>
</html>
    `;

    // 5. Display the final code in the text area
    outputCodeTextarea.value = fullHTML.trim();
});


// PART 3: THE "COPY" BUTTON'S FUNCTION
copyBtn.addEventListener('click', () => {
    // Check if there is something to copy
    if (outputCodeTextarea.value) {
        outputCodeTextarea.select(); // Select the text
        document.execCommand('copy'); // Execute the copy command
        
        // Give user feedback
        copyBtn.innerText = 'Copied!';
        setTimeout(() => {
            copyBtn.innerText = 'Copy Code';
        }, 2000); // Change text back after 2 seconds
    } else {
        alert("Nothing to copy. Please generate the code first!");
    }
});
