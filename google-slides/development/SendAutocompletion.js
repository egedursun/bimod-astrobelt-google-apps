function sendAutoCompletionRequest() {
    const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
    if (!authKey) {
        SlidesApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY);
        return;
    }

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
        if (slides.length === 0) {
            SlidesApp.getUi().alert("No slides found in this presentation.");
            return;
        }
        slide = slides[0];
    }

    let textContent = "";
    slide.getPageElements().forEach(pe => {
        if (pe.getPageElementType() === SlidesApp.PageElementType.SHAPE && pe.getText) {
            textContent += pe.getText().asString() + "\n";
        }
    });

    const url = GLOBAL_SERVER_URL + COMMAND_ENDPOINT__AUTO;
    const payload = {
        text_content: textContent,
        authentication_key: authKey,
    };
    const options = {
        method: 'post',
        payload: payload,
        muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(url, options);
    const jsonResponse = JSON.parse(response.getContentText());
    if (jsonResponse.error) {
        SlidesApp.getUi().alert('Error: ' + jsonResponse.error);
    } else {
        const newSlide = presentation.appendSlide(SlidesApp.PredefinedLayout.BLANK);
        const shape = newSlide.insertShape(SlidesApp.ShapeType.TEXT_BOX, 50, 50, 400, 300);
        shape.getText().setText(jsonResponse.output);
    }
}
