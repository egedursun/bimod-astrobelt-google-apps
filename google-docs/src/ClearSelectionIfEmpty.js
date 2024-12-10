function clearSelectionIfEmpty() {
    const doc = DocumentApp.getActiveDocument();
    const selection = doc.getSelection();
    if (selection) {
        const selectedElements = selection.getRangeElements();
        if (selectedElements.length === 1) {
            const textElement = selectedElements[0].getElement().asText();
            const selectedText = textElement.getText().substring(
                selectedElements[0].getStartOffset(),
                selectedElements[0].getEndOffsetInclusive() + 1
            );
            if (selectedText.trim() === "") {
                const cursorPosition = selectedElements[0].getStartOffset();
                doc.setCursor(doc.newPosition(textElement, cursorPosition));
            }
        }
    }
}