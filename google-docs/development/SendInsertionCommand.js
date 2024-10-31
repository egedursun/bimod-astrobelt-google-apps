function sendCommandToAI(command, commandType) {
  clearSelectionIfEmpty();
  const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
  if (!authKey) {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY);
    return;
  }
  const body = DocumentApp.getActiveDocument().getBody();
  const textContent = body.getText();
  let selectedText = null;
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (selection) {
    const elements = selection.getRangeElements();
    selectedText = elements.map(element => element.getElement().asText().getText().substring(element.getStartOffset(), element.getEndOffsetInclusive() + 1)).join('');
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
  }
  else {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_UNSUPPORTED_COMMAND_TYPE);
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
    DocumentApp.getUi().alert('Error: ' + jsonResponse.error);
  } else {
    insertOutputAtCursor(jsonResponse.output);
  }
}

function sendSelectCommand(command) {
  const authKey = PropertiesService.getDocumentProperties().getProperty(AUTH_KEY_SPECIFIER);
  if (!authKey) {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY);
    return;
  }
  const selection = DocumentApp.getActiveDocument().getSelection();
  if (!selection) {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_SELECTED_TEXT_TO_MODIFY);
    return;
  }
  let selectedText = '';
  const elements = selection.getRangeElements();
  const body = DocumentApp.getActiveDocument().getBody();
  const textContent = body.getText();
  const commandInput = command;

  elements.forEach(element => {
    if (element.getElement().editAsText && element.getStartOffset() !== -1 && element.getEndOffsetInclusive() !== -1) {
      const text = element.getElement().asText();
      selectedText += text.getText().substring(element.getStartOffset(), element.getEndOffsetInclusive() + 1);
    }
  });

  if (selectedText.trim() === '') {
    DocumentApp.getUi().alert(APPLICATION_PROCESS_ERROR_NO_SELECTED_TEXT_TO_MODIFY);
    return;
  }

  const url = GLOBAL_SERVER_URL + COMMAND_ENDPOINT__SELECT;
  const payload = {
    text_content: textContent,
    selected_text: selectedText,
    authentication_key: authKey,
    command: commandInput,
  };

  const options = {
    method: 'post',
    payload: payload,
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const jsonResponse = JSON.parse(response.getContentText());

  if (jsonResponse.error) {
    DocumentApp.getUi().alert('BimodLab Error: ' + jsonResponse.error);
  } else {
    replaceSelectedText(jsonResponse.output);
  }
}