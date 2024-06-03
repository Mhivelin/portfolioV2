document.addEventListener('DOMContentLoaded', (event) => {
    Prism.highlightAll();
});

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
            setTimeout(typeCode, 100);
        } else {
            codeDisplay.innerHTML += '\n';
            currentLine++;
            currentChar = 0;
            setTimeout(typeCode, 500);
        }
    } else {
        codeDisplay.innerHTML += '<span class="cursor"></span>';
        Prism.highlightElement(codeDisplay);
    }
}

typeCode();




document.addEventListener('DOMContentLoaded', function () {
    const filePath = 'assets/excel/Tableau_de_synthese_-_Epreuve_E4_-_BTS_SIO_2023.xlsx';
    fetch(filePath)
        .then(response => response.arrayBuffer())
        .then(data => {
            try {
                const workbook = XLSX.read(data, { type: 'array' });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                console.log('Excel data:', jsonData);

                const table = document.createElement('table');
                table.className = 'table table-striped';

                jsonData.forEach((row, rowIndex) => {
                    if (row.some(cell => cell && cell.toString().trim() !== '')) {
                        const rowElement = document.createElement('tr');
                        row.forEach(cell => {
                            const cellElement = document.createElement(rowIndex === 0 ? 'th' : 'td');
                            cellElement.textContent = cell || '';
                            rowElement.appendChild(cellElement);
                        });
                        table.appendChild(rowElement);
                    }
                });

                const excelTable = document.getElementById('excel-table');
                if (excelTable) {
                    excelTable.innerHTML = '';
                    excelTable.appendChild(table);
                } else {
                    console.error('Element with id "excel-table" not found.');
                }
            } catch (error) {
                console.error('Error processing the Excel data:', error);
            }
        })
        .catch(error => console.error('Error fetching and reading the Excel file:', error));
});

document.addEventListener("DOMContentLoaded", () => {
    const blocks = document.querySelectorAll(".block");
    const containerHeight = document.querySelector('.skills-container').clientHeight;

    blocks.forEach(block => {
        const randomX = Math.random() * (window.innerWidth - block.clientWidth);
        block.style.left = `${randomX}px`;

        gsap.to(block, {
            duration: 3,
            y: containerHeight - block.clientHeight,
            ease: "bounce.out"
        });

    });
});
