# XML Escaper

## Overview
The XML Escaper script is designed to safely escape special characters within the `<title>` and `<summary>` tags of XML files. It converts characters such as `&`, `<`, `>`, `"`, and `'` into their corresponding XML escape codes (`&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&apos;` respectively). This process ensures that XML files are correctly formatted and can be parsed without errors related to these special characters.

## Features
- Automatically processes all XML files located in a specified input directory.
- Escapes special characters within `<title>` and `<summary>` tags of each XML file.
- Saves the processed XML files to a specified output directory, appending "_output" to the original filename.
- Provides a summary of changes made for each file, including counts of each special character escaped.

## Prerequisites
Before you run the script, make sure you have Node.js installed on your system. You can download it from the official [Node.js website](https://nodejs.org/).

## Installation
1. Clone this repository or download the script to your local machine.
2. Place the script in your desired directory, e.g., `C:\Users\<YourUsername>\Documents\Repository\XMLEscaper`.
3. Ensure the directory structure includes `input` and `output` folders within the same directory as the script for processing and storing XML files, respectively.

## Usage
1. **Prepare Your XML Files:** Place your XML files in the `input` folder. The script will automatically process all XML files found in this directory.

2. **Run the Script:**
    - Open a Command Prompt, Terminal, or PowerShell window.
    - Navigate to the directory where your script is located.
    - Execute the command `node xmlEscaper.js`.

3. **Check the Output:**
    - Upon successful execution, find the processed XML files in the `output` folder. Each processed file will have "_output" appended to its original filename.
    - The console will display a summary of the changes made for each file.

## Customization
- **Tag Selection:** To escape characters in tags other than `<title>` and `<summary>`, adjust the `replaceTextInTag` function calls within the script.

## Troubleshooting
- Make sure Node.js is correctly installed and accessible from your command line or terminal.
- Confirm that your XML files are placed in the `input` folder.
- The script automatically creates the `output` folder if it doesn't exist. Ensure the script has the necessary permissions to create directories and write files on your system.

## Contributing
Feel free to fork the repository and submit pull requests with any enhancements or fixes.
