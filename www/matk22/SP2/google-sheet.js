// Client ID and API key from the Developer Console
const CLIENT_ID = '1081083055445-mvv1oij804bgobcnna1vb3d8d3vvinh1.apps.googleusercontent.com'
const API_KEY = 'AIzaSyB8qwxi6mBBtxuCAcrWpHX2NxmB9jAeW_s'

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"]

// Authorization scopes required by the API multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/drive.file"

const authorizeButton = document.getElementById('authorize_button')
const signoutButton = document.getElementById('signout_button')

/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient)
}

let spreadsheetId

async function createTable () {
  const response = await gapi.client.sheets.spreadsheets.create({
    properties: {
      title: 'results'
    }
  })
  console.log(response)
  spreadsheetId = response.result.spreadsheetId
  console.log(spreadsheetId)
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client.init({
    apiKey: API_KEY,
    clientId: CLIENT_ID,
    discoveryDocs: DISCOVERY_DOCS,
    scope: SCOPES
  }).then(() => {
    // Listen for sign-in state changes.
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus)

    // Handle the initial sign-in state.
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get())

    authorizeButton.onclick = handleAuthClick
    createTable()
  }, (error) => {
    console.log(JSON.stringify(error, null, 2))
  })
}

let newSheetId = 0

async function addResultSheet() {
  ++newSheetId
  
  const requests = [
    {
      addSheet: {
        properties: {
          sheetId: newSheetId,
          title: `Results${newSheetId}`
        }
      }
    }
  ]

  const update = {
    spreadsheetId,
    resource: { requests }
  }

  response = await gapi.client.sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    resource: { requests }
  })
  console.log(response)
}

async function writeResults () {
  const totalQuestion = resultBox.querySelector(".total-question").innerHTML
  const attempt = resultBox.querySelector(".total-attempt").innerHTML
  const correctAnswers = resultBox.querySelector(".total-correct").innerHTML
  const wrongAnswers = resultBox.querySelector(".total-wrong").innerHTML
  const percentage = resultBox.querySelector(".percentage").innerHTML
  const totalScore = resultBox.querySelector(".total-score").innerHTML

  const values = [
    ['Date', new Date()],
    ['Total question', totalQuestion],
    ['Attempt', attempt],
    ['Correct', correctAnswers],
    ['Wrong', wrongAnswers],
    ['Percentage', percentage],
    ['Total score', totalScore],
  ]

  const { result } = await gapi.client.sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `Results${newSheetId}!A1:B7`,
    valueInputOption: 'USER_ENTERED',
    resource: { values }
  })
  console.log(result)
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
async function updateSigninStatus(isSignedIn) {
  authorizeButton.style.display = 'block'
}

/**
 *  Sign in the user upon button click.
 */
async function handleAuthClick(event) {
  await gapi.auth2.getAuthInstance().signIn()

  try {
    await addResultSheet()
  } catch (e) {
    console.log(e)
  }
  
  await writeResults()

  await gapi.auth2.getAuthInstance().signOut()
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  // gapi.auth2.getAuthInstance().signOut()
}
