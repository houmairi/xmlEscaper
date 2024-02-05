# XML Escaper

## Overview
The XML Escaper script is designed to safely escape special characters within the `<title>` and `<summary>` tags of an XML file. It converts characters like `&`, `<`, `>`, `"`, and `'` into their corresponding XML escape codes (`&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&apos;` respectively). This process ensures that XML files are correctly formatted and can be parsed without errors related to these special characters.

## Features
- Reads an XML file from a specified input directory.
- Processes the XML content to escape special characters within `<title>` and `<summary>` tags.
- Saves the processed XML to a specified output directory.
- Provides a summary of changes made, including counts of each special character escaped.

## Prerequisites
Before you run the script, make sure you have Node.js installed on your system. You can download it from the official [Node.js website](https://nodejs.org/).

## Installation
1. Clone this repository or download the script to your local machine.
2. Place the script in your desired directory. For example: `C:\Users\<YourUsername>\Documents\Repository\XMLEscaper`.
3. Ensure your XML file to be processed is located in the `input` folder within the same directory as the script.
4. Ensure there is an `output` folder within the same directory as the script for the processed XML file.

## Usage
1. **Prepare Your XML File:** Place your XML file in the `input` folder and name it `input.xml`. The script is configured to look for this file by default.

2. **Run the Script:**
    - Open a Command Prompt, Terminal, or PowerShell window.
    - Navigate to the directory where your script is located.
    - Run the script by executing the command `node xmlEscaper.js`.

3. **Check the Output:**
    - After successful execution, check the `output` folder for the `output.xml` file.
    - The console will also display a summary of the changes made.

## Customization
- **Input and Output Paths:** You can modify the script to change the input and output file paths according to your directory structure.
- **Tag Selection:** If you wish to escape characters in tags other than `<title>` and `<summary>`, adjust the `replaceTextInTag` function calls within the script.

## Troubleshooting
- Ensure Node.js is correctly installed and accessible from your command line or terminal.
- Verify that your XML file is correctly placed in the `input` folder and named `input.xml`.
- If the `output` folder does not exist, the script should create it automatically. Ensure the script has the necessary permissions to create directories and write files in your system.

## Contributing
Feel free to fork the repository and submit pull requests with any enhancements or fixes.
