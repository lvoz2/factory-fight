// API URL (ensure not to include "/" at end
const url = "http://localhost:3000"

// Establishing initial connection with server and seeing if there are any player slots available
function initialiseServer() {
	// Send a ping to server and receive a response
	fetch(url + "/initialise", {method: "POST", body: JSON.stringify({"ping": "true"})}).then((res) => {
		// If the response is okay, put response into variable
		if (res.ok) {
			var reqJsonInit;
			res.json().then((data) => {
				reqJsonInit = data;
				// If the response fulfils criteria and lobby has available player slots, show player name input form
				if (reqJsonInit.pong == "true" && reqJsonInit.lobby == "available") {
					show("playerNameForm");
					console.log("Show Player Name Form");
				}
				// Else if response fulfils criteria but lobby is full, show error page showing server full
				else if (reqJsonInit.pong == "true" && reqJsonInit.lobby == "full") {
					document.getElementById("errorText").textContent = "Server Full, please try again later";
					show("errorPage");
				}
				// Otherwise response doesn't fulfil criteria and an unknown error occured, showing error page
				else {
					document.getElementById("errorText").textContent = "An unknown error occured";
					show("errorPage");
				}
			})
		}
	});
}

// Sends player name to server, and receives a response confirming the input was successful
function sendPlayerName() {
	// Put player name text box input into variable
	var playerName = document.getElementById("nameInput").value;
	// Send player name to server and receive JSON in return
	fetch(url + "/newplayer", {method: "POST", body: JSON.stringify({"playerName": playerName})}).then((res) => {
		// If response is okay, then put response data into variable
		if (res.ok) {
			var reqJsonPlayerName;
			res.json().then((data) => {
				reqJsonPlayerName = data;
				// If the player name was successfully added to player list, state success.
				if (reqJsonPlayerName.success == true) {
					document.getElementById("playerNameParagraph").textContent = "Player Name: "+ reqJsonPlayerName.playerName;
					show("success");
				}
				// Else if success failed, stating error page as name is already likely being used
				else if (reqJsonPlayerName.success == false) {
					document.getElementById("errorText").textContent = "Error, try another player name";
					show("errorPage");
				}
				// Otherwise show unknown error if there was no success true or false
				else {
					document.getElementById("errorText").textContent = "An unknown error occured";
					show("errorPage");
				}
			})
		}
	});
}

// Changes visibility of div's based on function parameters
function show(showPage) {
	// Records all div's that need to be hidden, under class name 'page'
	var pagesToHide = document.getElementsByClassName("page");
	// Repeat until all div's with class 'page' are hidden
	for (var i = 0; i < pagesToHide.length; i++) {
		pagesToHide[i].style.display = 'none';
	}
	// Make requested div visible after all others have been hidden
	document.getElementById(showPage).style.display='block';
}
