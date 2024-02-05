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
        return str.replace(/[&<>"']/g, (char) => {
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

const inputPath = path.join(__dirname, 'input', 'input.xml');
const outputPath = path.join(__dirname, 'output', 'output.xml');

fs.readFile(inputPath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }
    let result = encodeXMLCharactersInTitlesAndSummaries(data);

    // Ensure the output directory exists
    fs.mkdir(path.dirname(outputPath), { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating output directory:", err);
            return;
        }

        // Write the modified XML to a new file
        fs.writeFile(outputPath, result.encodedXMLString, (err) => {
            if (err) {
                console.error("Error writing file:", err);
                return;
            }
            console.log('File has been saved. Changes made:', result.summary);
        });
    });
});
