function sendCommandToAI(command, commandType) {
    // clearSelectionIfEmpty();
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
        if (pageRange && pageRange.getPages().length > 0 && pageRange.getPages()[0] instanceof Slide) {
            slide = pageRange.getPages()[0];
        }
    }
    if (!slide) {
        const slides = presentation.getSlides();
        if (slides.length === 0) {
            SlidesApp.getUi().alert("No slides found.");
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
    let selectedText = "";
    if (selection && selection.getSelectionType() === SlidesApp.SelectionType.PAGE_ELEMENT) {
        const pageElementRange = selection.getPageElementRange();
        if (pageElementRange) {
            const pageElements = pageElementRange.getPageElements();
            if (pageElements && pageElements.length > 0) {
                const shape = pageElements[0];
                if (shape.getPageElementType() === SlidesApp.PageElementType.SHAPE && shape.getText) {
                    selectedText = shape.getText().asString();
                }
            }
        }
    }
    let endpoint;
    if (commandType === COMMAND_NAME__AI) {
        endpoint = COMMAND_ENDPOINT__AI;
    } else if (commandType === COMMAND_NAME__WEB) {
        endpoint = COMMAND_ENDPOINT__WEB;
    } else if (commandType === COMMAND_NAME__IMG) {
        endpoint = COMMAND_ENDPOINT__IMG;
    } else if (commandType === COMMAND_NAME__SQL) {
        endpoint = COMMAND_ENDPOINT__SQL;
    } else if (commandType === COMMAND_NAME__NOSQL) {
        endpoint = COMMAND_ENDPOINT__NOSQL;
    } else if (commandType === COMMAND_NAME__SSH) {
        endpoint = COMMAND_ENDPOINT__SSH;
    } else if (commandType === COMMAND_NAME__VECT) {
        endpoint = COMMAND_ENDPOINT__VECT;
    } else if (commandType === COMMAND_NAME__REPO) {
        endpoint = COMMAND_ENDPOINT__REPO;
    } else if (commandType === COMMAND_NAME__SITE) {
        endpoint = COMMAND_ENDPOINT__SITE;
    } else {
        SlidesApp.getUi().alert(APPLICATION_PROCESS_ERROR_UNSUPPORTED_COMMAND_TYPE);
        return;
    }
    const url = GLOBAL_SERVER_URL + endpoint;
    const payload = {
        text_content: textContent,
        authentication_key: authKey,
    };
    if (INSERTION_TYPE_COMMANDS.includes(commandType)) {
        payload.command = command;
    }
    if (commandType === 'select') {
        payload.selected_text = selectedText;
    }
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
        insertOutputAtCursor(jsonResponse.output);
    }
}