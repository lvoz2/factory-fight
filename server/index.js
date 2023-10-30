// Import Express.js
import express from 'express'
// Import body-parser (to handle parameters more easily)
import bodyParser from 'body-parser'

// This variable defines the port of your computer where the API will be available
const PORT = 3000

// This variable instantiate the Express.js library
const app = express()

// Indicate to Express.js that you're using an additional plugin to treat parameters
app.use(bodyParser.urlencoded({ extended: true }))

// The code below starts the API with these parameters:
// 1 - The PORT where your API will be available
// 2 - The callback function (function to call) when your API is ready
app.listen(PORT, () =>
  console.log(`The Books API is running on: http://localhost:${PORT}.`))

let playersJoined = [
	'testplayer',
]

// The code below creates a GET route with these parameters:
// 1 - The route where the code will be executed
// 2 - The function containing the code to execute
app.get('/initialise', (request, response) => {
  // The string we want to display on http://localhost:3000
  response.send('Player ' + PORT)
})

app.get ('/players', (request, response) => {
	return response.json({ playerList: playersJoined })
})

app.post('/newplayer', (request, response) => {
  // We get the parameter 'name' from the body
  const playerName = request.body.name

  // We check if the book list includes the new book
  // If it is, we return 'false'
  if (playersJoined.includes(playerName)) return response.json({ success: false })

  // Otherwise, we add the new book in the list and return 'true'
  playersJoined.push(playerName)
  return response.json({ success: true })
})