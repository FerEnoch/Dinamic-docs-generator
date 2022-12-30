function makeTrigger() {
    const sheet = SpreadsheetApp.getActive();
    ScriptApp.newTrigger('generarDocsRD')
        .forSpreadsheet(sheet)
        .onFormSubmit()
        .create();
};