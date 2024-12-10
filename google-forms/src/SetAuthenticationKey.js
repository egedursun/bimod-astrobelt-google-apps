function setAuthKey() {
    const ui = FormApp.getUi();
    const response = ui.prompt(MENU_ITEM_NAME_SET_AUTHENTICATION_KEY, MENU_CONTENT_INSTRUCTION_SET_AUTHENTICATION_KEY, ui.ButtonSet.OK_CANCEL);
    if (response.getSelectedButton() === ui.Button.OK) {
        PropertiesService.getDocumentProperties().setProperty(AUTH_KEY_SPECIFIER, response.getResponseText());
        ui.alert(MENU_ALERT_SUCCESS_SET_AUTHENTICATION_KEY);
    } else {
        ui.alert(MENU_ALERT_EMPTY_INPUT_SET_AUTHENTICATION_KEY);
    }
}