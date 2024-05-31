const codeDisplay = document.getElementById('code-display');

const codeLines = [
    "public class Program {",
    "    public static void Main(string[] args) {",
    "        System.Console.WriteLine('Hello, World!');",
    "    }",
    "}"
];

let currentLine = 0;
let currentChar = 0;

function typeCode() {
    if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        if (currentChar < line.length) {
            codeDisplay.innerHTML += line[currentChar++];
            setTimeout(typeCode, 100); // Adjust typing speed here
        } else {
            codeDisplay.innerHTML += '\n';
            currentLine++;
            currentChar = 0;
            setTimeout(typeCode, 500); // Delay between lines
        }
    } else {
        codeDisplay.innerHTML += '<span class="cursor"></span>';
    }
}

typeCode();


document.addEventListener('DOMContentLoaded', function () {
    const filePath = 'assets/excel/04 - Tableau de synthèse - Epreuve E4.xlsx';
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const html = XLSX.utils.sheet_to_html(worksheet);
            document.getElementById('excel-table').innerHTML = html;
        })
        .catch(error => console.error('Error fetching and reading the Excel file:', error));
});
