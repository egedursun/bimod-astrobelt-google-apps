function sendAutoCompletionRequest() {
    const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
    if (!authKey) {
        DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY);
        return;
    }
    const body = DocumentApp.getActiveDocument().getBody();
    const textContent = body.getText();
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
        DocumentApp.getUi().alert('Error: ' + jsonResponse.error);
    } else {
        insertOutputAtCursor(jsonResponse.output);
    }
}