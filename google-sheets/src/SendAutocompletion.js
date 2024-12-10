function sendAutoCompletionRequest() {
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
  const selectedValues = range.getValues().flat().join(" ");
  const url = GLOBAL_SERVER_URL + COMMAND_ENDPOINT__AUTO;
  const payload = {
    text_content: selectedValues,
    authentication_key: authKey,
    command: "auto",
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
      SpreadsheetApp.getUi().alert("Error: " + jsonResponse.error);
    } else {
      replaceSelectedCells(jsonResponse.output);
    }
  } catch (error) {
    SpreadsheetApp.getUi().alert("Request failed: " + error.message);
  }
}