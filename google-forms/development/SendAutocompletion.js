function sendAutoCompletionRequest() {
  const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
  if (!authKey) {
    FormApp.getUi().alert("Error: No authentication key found.");
    return;
  }
  const form = FormApp.getActiveForm();
  if (!form) {
    FormApp.getUi().alert("Error: No active form found.");
    return;
  }
  const formTitle = form.getTitle();
  const url = GLOBAL_SERVER_URL + COMMAND_ENDPOINT__AUTO;
  const payload = {
    text_content: formTitle,
    authentication_key: authKey,
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
      FormApp.getUi().alert("Error: " + jsonResponse.error);
    } else {
      insertOutputAsQuestion(jsonResponse.output);
    }
  } catch (error) {
    FormApp.getUi().alert("Error: Failed to send request. " + error.message);
  }
}
