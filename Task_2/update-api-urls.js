const fs = require('fs');
const path = require('path');

function updateApiUrls(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory() && file !== 'node_modules') {
      updateApiUrls(filePath);
    } else if (file.endsWith('.js')) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;

      // Replace hardcoded localhost URLs
      content = content.replace(/http:\/\/localhost:5000/g, '${process.env.REACT_APP_API_URL || "http://localhost:5000"}');

      if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
      }
    }
  });
}

// Update client/src directory
updateApiUrls('./client/src');
console.log('API URL updates completed!');
