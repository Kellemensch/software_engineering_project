const fs = require("fs");

const inputPath = "complexity.json";
const outputPath = "complexity-report.html";

const raw = fs.readFileSync(inputPath, "utf8");
const data = JSON.parse(raw);

function levelClass(level) {
    if (level === "error") return "level-error";
    return "level-ok";
}

const rows = [];

data.forEach((fileEntry) => {
    const { file, complexityLevel, complexitySum, functionComplexities } =
        fileEntry;

    if (file === "src/tests-utils.jsx" || file === "src/model/receipt.test.ts")
        return;

    if (!functionComplexities || functionComplexities.length === 0) {
        rows.push(`
      <tr class="${levelClass(complexityLevel)} file-row">
        <td>${file}</td>
        <td colspan="3">No functions detected</td>
        <td>${complexityLevel}</td>
        <td>${complexitySum}</td>
      </tr>
    `);
    } else {
        functionComplexities.forEach((fn, index) => {
            const firstRow = index === 0;
            rows.push(`
        <tr class="${levelClass(complexityLevel)}">
          ${
              firstRow
                  ? `<td rowspan="${functionComplexities.length}">${file}</td>`
                  : ""
          }
          <td>${fn.name}</td>
          <td>${fn.complexity}</td>
          <td>${fn.line}</td>
          ${
              firstRow
                  ? `<td rowspan="${functionComplexities.length}">${complexityLevel}</td>`
                  : ""
          }
          ${
              firstRow
                  ? `<td rowspan="${functionComplexities.length}">${complexitySum}</td>`
                  : ""
          }
        </tr>
      `);
        });
    }
});

const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>Cyclomatic complexity report</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 20px;
      background: #f5f5f5;
    }
    h1 {
      font-size: 20px;
      margin-bottom: 10px;
    }
    .summary {
      font-size: 14px;
      margin-bottom: 16px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      font-size: 12px;
      background: #fff;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 4px 6px;
      text-align: left;
    }
    th {
      background-color: #f0f0f0;
      position: sticky;
      top: 0;
      z-index: 1;
    }
    
    .level-ok {
      background-color: #e7f8ec;
    }
    .level-error {
      background-color: #fbe8e8;
    }
    .legend {
      margin-top: 10px;
      font-size: 12px;
    }
    .legend span {
      display: inline-block;
      padding: 4px 8px;
      margin-right: 8px;
      border-radius: 3px;
    }
    .legend-ok {
      background-color: #e7f8ec;
      border: 1px solid #8ad4a0;
    }
    .legend-error {
      background-color: #fbe8e8;
      border: 1px solid #e58c8c;
    }
  </style>
</head>
<body>
  <h1>Cyclomatic complexity report</h1>
  <div class="summary">
    Files analyzed: ${data.length}.
  </div>

  <table>
    <thead>
      <tr>
        <th>File</th>
        <th>Function</th>
        <th>Complexity</th>
        <th>Line</th>
        <th>Complexity level</th>
        <th>Complexity sum</th>
      </tr>
    </thead>
    <tbody>
      ${rows.join("\n")}
    </tbody>
  </table>

  <div class="legend">
    <span class="legend-ok">Level "ok"</span>
    <span class="legend-error">Level "error"</span>
  </div>
</body>
</html>
`;

fs.writeFileSync(outputPath, html, "utf8");
console.log(`Report generated in ${outputPath}`);
