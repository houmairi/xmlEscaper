const fs = require('fs');
const path = require('path');

function encodeXMLCharactersInTitlesAndSummaries(xmlString) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    };
    let changeCount = {
        '&': 0,
        '<': 0,
        '>': 0,
        '"': 0,
        "'": 0
    };

    function escapeSpecialChars(str) {
        // Updated pattern to avoid matching already escaped entities
        const pattern = /&(?!amp;|lt;|gt;|quot;|apos;)|[<>"']/g;

        return str.replace(pattern, (char) => {
            changeCount[char]++;
            return escapeMap[char];
        });
    }

    function replaceTextInTag(xml, tagName) {
        const tagRegex = new RegExp(`(<${tagName}>)(.*?)(</${tagName}>)`, 'gs');
        return xml.replace(tagRegex, (match, p1, p2, p3) => {
            return `${p1}${escapeSpecialChars(p2)}${p3}`;
        });
    }

    xmlString = replaceTextInTag(xmlString, 'title');
    xmlString = replaceTextInTag(xmlString, 'summary');

    let summary = Object.entries(changeCount).reduce((acc, [char, count]) => {
        if (count > 0) acc.push(`${escapeMap[char]}: ${count} change(s)`);
        return acc;
    }, []);

    return {encodedXMLString: xmlString, summary: summary.join(", ")};
}

const inputDirPath = path.join(__dirname, 'input');
const outputDirPath = path.join(__dirname, 'output');

// Ensure the output directory exists
fs.mkdir(outputDirPath, { recursive: true }, (err) => {
    if (err) {
        console.error("Error creating output directory:", err);
        return;
    }

    // Read the input directory for XML files
    fs.readdir(inputDirPath, (err, files) => {
        if (err) {
            console.error("Error reading input directory:", err);
            return;
        }

        files.forEach(file => {
            if (path.extname(file).toLowerCase() === '.xml') {
                const inputFilePath = path.join(inputDirPath, file);
                const outputFileName = path.basename(file, path.extname(file)) + "_output" + path.extname(file);
                const outputFilePath = path.join(outputDirPath, outputFileName);

                fs.readFile(inputFilePath, 'utf8', (err, data) => {
                    if (err) {
                        console.error(`Error reading file: ${file}`, err);
                        return;
                    }
                    let result = encodeXMLCharactersInTitlesAndSummaries(data);

                    fs.writeFile(outputFilePath, result.encodedXMLString, (err) => {
                        if (err) {
                            console.error(`Error writing file: ${outputFileName}`, err);
                            return;
                        }
                        console.log(`File "${file}" has been processed and saved as "${outputFileName}". Changes made:`, result.summary);
                    });
                });
            }
        });
    });
});
