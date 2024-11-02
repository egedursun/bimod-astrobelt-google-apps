function insertOutputAtCursor(output) {
  const cursor = DocumentApp.getActiveDocument().getCursor();
  if (cursor) {
    // cursor.insertText(output);
    insertMarkdownAtCursor(output)
  } else {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_CURSOR_PLACEMENT_FOUND);
  }
}