// Required Node.js modules
const fs = require('fs');
const path = require('path');
const figlet = require('figlet');

// Function to encode special XML characters within <title> and <summary> tags
function encodeXMLCharactersInTitlesAndSummaries(xmlString) {
    // Mapping of special characters to their XML escape sequences
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    };
    
    // Reverse mapping for summary generation
    const originalCharacters = {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&apos;': "'"
    };
    
    // Track changes made during escaping
    let changeCount = {
        '&': 0,
        '<': 0,
        '>': 0,
        '"': 0,
        "'": 0
    };

    // Function to replace special characters with their XML escape sequences
    function escapeSpecialChars(str) {
        const pattern = /&(?!amp;|lt;|gt;|quot;|apos;)|[<>"']/g;

        return str.replace(pattern, (char) => {
            changeCount[char]++;
            return escapeMap[char];
        });
    }

    // Function to apply text escaping within specified XML tags
    function replaceTextInTag(xml, tagName) {
        const tagRegex = new RegExp(`(<${tagName}>)(.*?)(</${tagName}>)`, 'gs');
        return xml.replace(tagRegex, (match, p1, p2, p3) => {
            return `${p1}${escapeSpecialChars(p2)}${p3}`;
        });
    }

    // Apply escaping to <title> and <summary> tags
    xmlString = replaceTextInTag(xmlString, 'title');
    xmlString = replaceTextInTag(xmlString, 'summary');

    // Generate summary of changes made
    let summary = Object.entries(changeCount).reduce((acc, [char, count]) => {
        if (count > 0) acc.push(`${originalCharacters[escapeMap[char]] || char} has been changed ${count} time(s).`);
        return acc;
    }, []).join("\n");

    return {encodedXMLString: xmlString, summary: summary};
}

// Generate ASCII art with figlet and display it in the console
figlet('XMLEscaper', function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data); // Print the generated ASCII art

    // Define input and output directory paths
    const inputDirPath = path.join(__dirname, 'input');
    const outputDirPath = path.join(__dirname, 'output');

    // Create output directory if it doesn't exist
    fs.mkdir(outputDirPath, { recursive: true }, (err) => {
        if (err) {
            console.error("Error creating output directory:", err);
            return;
        }

        // Read files from the input directory
        fs.readdir(inputDirPath, (err, files) => {
            if (err) {
                console.error("Error reading input directory:", err);
                return;
            }

            // Process each XML file in the input directory
            files.forEach(file => {
                if (path.extname(file).toLowerCase() === '.xml') {
                    const inputFilePath = path.join(inputDirPath, file);
                    const outputFileName = path.basename(file, path.extname(file)) + "_output" + path.extname(file);
                    const outputFilePath = path.join(outputDirPath, outputFileName);

                    // Read the content of the XML file
                    fs.readFile(inputFilePath, 'utf8', (err, data) => {
                        if (err) {
                            console.error(`Error reading file: ${file}`, err);
                            return;
                        }
                        // Encode XML characters in titles and summaries
                        let result = encodeXMLCharactersInTitlesAndSummaries(data);

                        // Write the processed content to a new file in the output directory
                        fs.writeFile(outputFilePath, result.encodedXMLString, (err) => {
                            if (err) {
                                console.error(`Error writing file: ${outputFileName}`, err);
                                return;
                            }
                            console.log(`File "${file}" has been processed and saved as "${outputFileName}".\nChanges made:\n${result.summary}`);
                        });
                    });
                }
            });
        });
    });
});