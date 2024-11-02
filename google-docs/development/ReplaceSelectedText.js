function replaceSelectedText(output) {
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_SELECTED_TEXT_TO_MODIFY);
    return;
  }
  const elements = selection.getRangeElements();
  let startElement = null;
  let startOffset = null;
  elements.forEach(element => {
    if (element.getElement().editAsText) {
      if (!startElement) {
        startElement = element.getElement().editAsText();
        startOffset = element.getStartOffset();
      }
      element.getElement().editAsText().deleteText(element.getStartOffset(), element.getEndOffsetInclusive());
    }
  });
  if (startElement && startOffset !== null) {
    startElement.insertText(startOffset, output);
    // insertMarkdownAtCursorWithOffset(startOffset, output)
  } else {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_VALID_INSERTION_POINT);
  }
}