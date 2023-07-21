//1. 1.Create an html-page for displaying and editing text. When opening the page, the text should be displayed with div tag. When clicking Ctrl+E, textarea appears instead of div and can be edited. When pressing Ctrl+S, the div with edited text appears instead of textarea. Don’t forget to turn off default settings for these hotkey combinations.

let isEditMode = false;
const displayElement = document.getElementById("display");
const editorElement = document.getElementById("editor");

// Function to switch to edit mode (textarea) when Ctrl+E is pressed
function enableEditMode() {
  if (!isEditMode) {
    displayElement.style.display = "none";
    editorElement.style.display = "block";
    editorElement.value = displayElement.innerText;
    editorElement.focus();
    isEditMode = true;
  }
}

//  when Ctrl+S is press
function disableEditMode() {
  if (isEditMode) {
    displayElement.style.display = "block";
    editorElement.style.display = "none";
    displayElement.innerText = editorElement.value;
    isEditMode = false;
  }
}

// keydown event
function handleKeyDown(event) {
  // Check if Ctrl+E is pressed
  if (event.ctrlKey && event.key === "e") {
    event.preventDefault(); // Turn off default settings for Ctrl+E
    enableEditMode();
  }

  if (event.ctrlKey && event.key === "s") {
    event.preventDefault(); // Turn off default settings for Ctrl+S
    disableEditMode();
  }
}

document.addEventListener("keydown", handleKeyDown);

// 2.Create an html-page with a large table. When clicking the column heading, it is necessary to sort data of that column. Note that numerical values should be sorted as numbers, not as strings.

function sortTable(columnIndex) {
  const table = document.getElementById("sortableTable");
  const rows = Array.from(table.rows);
  const isNumericColumn = columnIndex === 1 || columnIndex === 2;

  rows.sort((row1, row2) => {
    const cellValue1 = row1.cells[columnIndex].textContent;
    const cellValue2 = row2.cells[columnIndex].textContent;

    if (isNumericColumn) {
      return Number(cellValue1) - Number(cellValue2);
    } else {
      return cellValue1.localeCompare(cellValue2);
    }
  });

  // Rebuild the sorted table
  table.tBodies[0].innerHTML = "";
  rows.forEach((row) => table.tBodies[0].appendChild(row));
}

// 3.Create an html-page with a text block in a frame. Execute the possibility to change the size of the block when holding the mouse cursor in the bottom right corner and pull it further.

let isResizing = false;
let initialWidth, initialHeight;
const frame = document.getElementById("frame");
const textBlock = document.getElementById("textBlock");

function startResize(e) {
  e.preventDefault();
  isResizing = true;
  initialWidth = frame.offsetWidth;
  initialHeight = frame.offsetHeight;

  document.addEventListener("mousemove", resize);
  document.addEventListener("mouseup", stopResize);
}

function resize(e) {
  if (!isResizing) return;

  const newWidth = initialWidth + (e.pageX - frame.offsetLeft - initialWidth);
  const newHeight = initialHeight + (e.pageY - frame.offsetTop - initialHeight);

  frame.style.width = `${newWidth}px`;
  frame.style.height = `${newHeight}px`;
}

function stopResize() {
  isResizing = false;
  document.removeEventListener("mousemove", resize);
  document.removeEventListener("mouseup", stopResize);
}
