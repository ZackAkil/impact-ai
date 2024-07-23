function currentRowNumber(){
  const range = SpreadsheetApp.getActiveRange();
  return range.getRow();
}


function currentRowData(){
  const sheet = SpreadsheetApp.getActiveSheet();
  const rowNumber = currentRowNumber()
  return getRowDataAsObject(sheet, rowNumber)
}


function setDataOfRowByColumnName(sheet, rowNumber, columnName, data){
  `
  Sets the data of a row in a sheet by column name.

  Args:
      sheet (Sheet): The sheet to set the data in.
      rowNumber (int): The row number to set the data in.
      columnName (str): The name of the column to set the data in.
      data (any): The data to set in the column.

  Returns:
      None
  `
  const header = sheet.getRange(1, 1, 1, 
    sheet.getLastColumn()).getValues()[0]

  const columnIndex = header.indexOf(columnName) + 1
  var range = sheet.getRange(rowNumber, columnIndex);
  range.setValue(data);
}


function getRowDataAsObject(sheet, rowNumber){
    `
    Takes a sheet and a row number and returns an object with the header values as keys and the corresponding row data as values.

    Args:
        sheet (Sheet): The sheet to get the data from.
        rowNumber (int): The row number to get the data from.

    Returns:
        dict: A dictionary with the header values as keys and the corresponding row data as values.
    `
  const header = sheet.getRange(1, 1, 1, 
    sheet.getLastColumn()).getValues()[0]

  const rowData = sheet.getRange(rowNumber, 1, 1, 
    sheet.getLastColumn()).getValues()[0];

  const outputObject = {}
  for (let i = 0; i < header.length; i++) {
    outputObject[header[i]] = rowData[i]
  }
  return outputObject
}