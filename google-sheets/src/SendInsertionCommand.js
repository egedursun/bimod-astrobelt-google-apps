function sendCommandToAI(command, commandType) {
    const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
    if (!authKey) {
        SpreadsheetApp.getUi().alert("No authentication key found.");
        return;
    }
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getActiveRange();
    if (!range) {
        SpreadsheetApp.getUi().alert("No selected cells to read.");
        return;
    }
    const selectedText = range.getValues().flat().join(" ");
    let endpoint;
    switch (commandType) {
        case COMMAND_NAME__AI:
            endpoint = COMMAND_ENDPOINT__AI;
            break;
        case COMMAND_NAME__WEB:
            endpoint = COMMAND_ENDPOINT__WEB;
            break;
        case COMMAND_NAME__SQL:
            endpoint = COMMAND_ENDPOINT__SQL;
            break;
        case COMMAND_NAME__NOSQL:
            endpoint = COMMAND_ENDPOINT__NOSQL;
            break;
        case COMMAND_NAME__SSH:
            endpoint = COMMAND_ENDPOINT__SSH;
            break;
        case COMMAND_NAME__VECT:
            endpoint = COMMAND_ENDPOINT__VECT;
            break;
        case COMMAND_NAME__REPO:
            endpoint = COMMAND_ENDPOINT__REPO;
            break;
        case COMMAND_NAME__SITE:
            endpoint = COMMAND_ENDPOINT__SITE;
            break;
        default:
            SpreadsheetApp.getUi().alert("Unsupported command type.");
            return;
    }
    const url = GLOBAL_SERVER_URL + endpoint;
    const payload = {
        text_content: selectedText,
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
        SpreadsheetApp.getUi().alert("Error: " + jsonResponse.error);
    } else {
        replaceSelectedCells(jsonResponse.output);
    }
}

function sendSelectCommand(command) {
    const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
    if (!authKey) {
        SpreadsheetApp.getUi().alert("No authentication key found.");
        return;
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const range = sheet.getActiveRange();
    if (!range) {
        SpreadsheetApp.getUi().alert("No selected cells to modify.");
        return;
    }

    const selectedText = range.getValues().flat().join(" ");
    if (selectedText.trim() === '') {
        SpreadsheetApp.getUi().alert("No selected text to modify.");
        return;
    }

    const url = GLOBAL_SERVER_URL + COMMAND_ENDPOINT__SELECT;
    const payload = {
        text_content: selectedText,
        selected_text: selectedText,
        authentication_key: authKey,
        command: command,
    };

    const options = {
        method: 'post',
        payload: payload,
        muteHttpExceptions: true,
    };

    try {
        const response = UrlFetchApp.fetch(url, options);
        const jsonResponse = JSON.parse(response.getContentText());

        if (jsonResponse.error) {
            SpreadsheetApp.getUi().alert("BimodLab Error: " + jsonResponse.error);
        } else if (jsonResponse.output) {
            replaceSelectedCells(jsonResponse.output);
        } else {
            SpreadsheetApp.getUi().alert("No output returned from the server.");
        }
    } catch (error) {
        SpreadsheetApp.getUi().alert("Request failed: " + error.message);
    }
}