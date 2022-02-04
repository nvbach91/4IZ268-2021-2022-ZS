// Client ID and API key from the Developer Console
const CLIENT_ID = '1081083055445-mvv1oij804bgobcnna1vb3d8d3vvinh1.apps.googleusercontent.com'
const API_KEY = 'AIzaSyB8qwxi6mBBtxuCAcrWpHX2NxmB9jAeW_s'

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4']

// Authorization scopes required by the API multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/drive.file' //prava uzivatele


// aby se nepouzival inline js ()=>
document.addEventListener('DOMContentLoaded', () => {
  const apiScript = document.createElement('script')
  apiScript.type = 'text/javascript'
  apiScript.src = 'https://apis.google.com/js/api.js'
  apiScript.onload = function () {
    this.onload = function () { }
    handleClientLoad()
  }
  apiScript.onreadystatechange = function () {
    if (this.readyState === 'complete')
      this.onload()
  }

  document.body.appendChild(apiScript)


  const resultBox = document.querySelector('.result-box')
  const totalQuestion = resultBox.querySelector('.total-question')
  const attempt = resultBox.querySelector('.total-attempt')
  const correctAnswers = resultBox.querySelector('.total-correct')
  const wrongAnswers = resultBox.querySelector('.total-wrong')
  const percentage = resultBox.querySelector('.percentage')
  const totalScore = resultBox.querySelector('.total-score')

  const authorizeButton = document.querySelector('#authorize_button')


  let spreadsheetId

  async function createTable() {
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
   *  On load, called to load the auth2 library and API client library.
   */
  function handleClientLoad() {
    gapi.load('client:auth2', initClient)
  }


  /*
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

      authorizeButton.addEventListener('click', handleAuthClick)
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

  async function writeResults() {
    const values = [
      ['Date', new Date()],
      ['Total question', totalQuestion.innerText],
      ['Attempt', attempt.innerText],
      ['Correct', correctAnswers.innerText],
      ['Wrong', wrongAnswers.innerText],
      ['Percentage', percentage.innerText],
      ['Total score', totalScore.innerText],
    ]

    const { result } = await gapi.client.sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `Results${newSheetId}!A1:B7`,
      valueInputOption: 'USER_ENTERED',
      resource: { values }
    })
    console.log(result)
  }

  /*
   *  Called when the signed in status changes, to update the UI
   *  appropriately. After a sign-in, the API is called.
   */
  async function updateSigninStatus(isSignedIn) {
    authorizeButton.style.display = 'block'
  }

  /*
   *  Sign in the user upon button click.
   */
  let tableCreated = false

  async function handleAuthClick(event) {
    await gapi.auth2.getAuthInstance().signIn()

    if (!tableCreated) {
      await createTable()
      tableCreated = true
    }

    try {
      await addResultSheet() //novy list
    } catch (e) {
      console.log(e)
    }

    await writeResults()

    await gapi.auth2.getAuthInstance().signOut() //vychod z mailu
  }
})




// await asynchronni fce