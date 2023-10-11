const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

// Define paths relative to your project directory
const frontendPath = path.join(__dirname, 'Front-End');
const backendPath = path.join(__dirname, 'backend');

// Serve static files from the specified directories
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
    // Send the main HTML file
    const indexPath = path.join(frontendPath, 'index.html');
    const htmlContent = fs.readFileSync(indexPath, 'utf8');
    
    // List all JavaScript files in the backend directory
    const jsFiles = fs.readdirSync(backendPath).filter(file => file.endsWith('.js'));
    
    // Generate script tags for each JavaScript file
    const scriptTags = jsFiles.map(file => `<script type="module" src="/backend/${file}"></script>`).join('\n');
    
    // Inject the script tags into the HTML content
    const modifiedHtmlContent = htmlContent.replace('<!-- INSERT_SCRIPTS_HERE -->', scriptTags);

    res.send(modifiedHtmlContent);
});

app.get('/backend/:file', (req, res) => {
    // Serve individual JavaScript files from the backend directory
    const fileName = req.params.file;
    res.sendFile(path.join(backendPath, fileName));
});

app.listen(3000, () => {
    console.log("The server is listening on port 3000");
});
