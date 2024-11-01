function restartApplet() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile(SIDEBAR_FILE_NAME)
    .setTitle(APPLICATION_NAME);
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}