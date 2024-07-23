function testPrompt(){
  console.log(callGemini('hello'))
}


// const MODEL = 'gemini-1.5-flash-001'
const MODEL = 'gemini-1.5-pro-001'
const REGION = 'us-central1'
const PROJECT_ID = SERVICE_ACCOUNT.project_id

// using Auth.gs
const service = getService();

function callGemini(prompt) {

  console.log('Calling Gemini on Vertex AI ')

  const token = service.getAccessToken()

  if(!service.hasAccess()){
    Logger.log('error ', service.getLastError());
    return 
  }

  const url = `https://${REGION}-aiplatform.googleapis.com/v1/projects/${PROJECT_ID}/locations/${REGION}/publishers/google/models/${MODEL}:generateContent`; 

  const payload = {
  "contents": {
    "role": "user",
    "parts": {
        "text": prompt
    }
  },
  "generation_config": {
    "temperature": 0.5,
    "topP": 0.8,
    "topK": 40
  }
}

  const options = {
    method: "POST",
    headers: {
        Authorization: 'Bearer ' + token
      },
    contentType: "application/json",
    payload: JSON.stringify(payload),
    muteHttpExceptions: true
  };

  const response = UrlFetchApp.fetch(url, options);
  const responseCode = response.getResponseCode();
  const responseContent = JSON.parse(response.getContentText());

  Logger.log("Response code: " + responseCode);
  return parseGeminiResponse(responseContent);
}

function parseGeminiResponse(response){
  return response.candidates[0].content.parts[0].text
}



