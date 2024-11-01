function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile(SIDEBAR_FILE_NAME)
    .setTitle(APPLICATION_NAME)
    .setWidth(DEFAULT_SIDEBAR_WIDTH_PX);
  SpreadsheetApp.getUi().showSidebar(html);
}