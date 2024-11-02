function sendCommandToAI(command, commandType) {
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

  const formTitle = form.getTitle(); // Placeholder text content for the request
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
    default:
      FormApp.getUi().alert("Error: Unsupported command type.");
      return;
  }

  const url = GLOBAL_SERVER_URL + endpoint;
  const payload = {
    text_content: formTitle,
    authentication_key: authKey,
  };

  if (INSERTION_TYPE_COMMANDS.includes(commandType)) {
    payload.command = command;
  }

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
      // Insert the output as a question in the form
      insertOutputAsQuestion(jsonResponse.output);
    }
  } catch (error) {
    FormApp.getUi().alert("Error: Failed to send request. " + error.message);
  }
}
