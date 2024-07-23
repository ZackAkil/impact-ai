function onOpen(e) {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🚀 Impact AI')
    .addItem('📯 Justify work item ', 'runJustification')
    .addItem('📝 Summarise impact', 'runImpactSummary')
    .addToUi();
}


function getConfig(){
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Config')
  return getRowDataAsObject(sheet, 2)
}


function buildPrompt(promptTemplate, promptParams){

  let fullPrompt = promptTemplate;

  for (const param in promptParams) {
    const placeholder = `{{${param}}}`;
    fullPrompt = fullPrompt.replace(placeholder, promptParams[param]);
  }
    return fullPrompt;
}


function runJustification(){

  const sheet = SpreadsheetApp.getActiveSheet()
  const rowNumber = currentRowNumber()

  const data = getRowDataAsObject(sheet, rowNumber)
  const config = getConfig()

  const taskText = data['Task']
  const jobSpec = config['Job spec']
  const promptTemplate = config['Impact Prompt']

  console.log(taskText, jobSpec, promptTemplate)

  const fullPrompt = buildPrompt(promptTemplate, {JOB_SPEC: jobSpec, TASK_DESCRIPTION:taskText})
  const newDescription = callGemini(fullPrompt)

  setDataOfRowByColumnName(sheet, rowNumber, 'Impact', newDescription)
}



function runImpactSummary(){

  const range = SpreadsheetApp.getActiveRange();
  const sheet = SpreadsheetApp.getActiveSheet();

  const firstRow = range.getRow()
  const lastRow = range.getLastRow()

  const impactList = []
  for (let i = firstRow; i <= lastRow; i++) {
    impact = getRowDataAsObject(sheet, i)
    impactList.push(impact['Impact'])
  }

  const impactSummary = summariseImpact(impactList)
  SpreadsheetApp.getUi().alert(impactSummary)
}


function summariseImpact(impactList){

    const config = getConfig()
    const promptTemplate = config['Summary Prompt']

    const fullPrompt = buildPrompt(promptTemplate, {TASKS: impactList})

    console.log('fullPrompt', fullPrompt)

    const summary = callGemini(fullPrompt)

    return summary
}

