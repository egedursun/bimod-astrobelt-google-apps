function replaceSelectedCells(output) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const range = sheet.getActiveRange();
  if (!range) {
    SpreadsheetApp.getUi().alert("No selected cells to modify.");
    return;
  }
  const rows = output.split("\n").filter(row => row);
  const data = rows.map(row => row.split(",").map(cell => cell.trim()));
  const numRows = range.getNumRows();
  const numCols = range.getNumColumns();
  const outputValues = Array.from({ length: numRows }, (_, rowIndex) =>
    Array.from({ length: numCols }, (_, colIndex) =>
      (rowIndex < data.length && colIndex < data[rowIndex].length) ? data[rowIndex][colIndex] : ""
    )
  );
  sheet.getRange(range.getRow(), range.getColumn(), numRows, numCols).setValues(outputValues);
}
