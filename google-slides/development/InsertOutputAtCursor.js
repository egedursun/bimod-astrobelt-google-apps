function insertOutputAtCursor(content) {
    const text = content || "";
    const presentation = SlidesApp.getActivePresentation();
    if (!presentation) return;
    const selection = presentation.getSelection();
    let slide;
    if (selection) {
        const pageRange = selection.getPageRange();
        if (pageRange) {
            const pages = pageRange.getPages();
            if (pages && pages.length > 0 && pages[0] instanceof Slide) {
                slide = pages[0];
            }
        }
    }
    if (!slide) {
        const slides = presentation.getSlides();
        if (slides.length === 0) return;
        slide = slides[0];
    }
    const shape = slide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 400, 100);
    shape.getText().setText(text);
}
