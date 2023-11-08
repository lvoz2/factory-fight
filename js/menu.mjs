// API URL (ensure not to include "/" at end)
const url = "http://localhost:3000"
// Security key storage
// const securityKey;

// Establishing initial connection with server and seeing if there are any player slots available
export function initialiseServer() {
	// Send a ping to server and receive a response
	fetch(url + "/initialise", {method: "POST", body: JSON.stringify({"ping": "true"})}).then((res) => {
		// If the response is okay, put response into variable
		if (res.ok) {
			let reqJsonInit;
			res.json().then((data) => {
				reqJsonInit = data;
				// If the response fulfils criteria and lobby has available player slots, show player name input form
				if (reqJsonInit.pong == "true" && reqJsonInit.lobby == "available") {
					show("titlePage");
					securityKey = reqJsonInit.securityKey;
				}
				// Else if response fulfils criteria but lobby is full, show error page showing server full
				else if (reqJsonInit.pong == "true" && reqJsonInit.lobby == "full") {
					$("#errorText").text("Server Full, please try again later");
					show("errorPage");
				}
				// Otherwise response doesn't fulfil criteria and an unknown error occured, showing error page
				else {
					$("#errorText").text("An unknown error occured");
					show("errorPage");
				}
			})
		}
	});
}

// Sends player name to server, and receives a response confirming the input was successful
export function sendPlayerName() {
	// Put player name text box input into variable
	var playerName = $("#nameInput").val();
	// Send player name to server and receive JSON in return
	fetch(url + "/newplayer", {method: "POST", body: JSON.stringify({"playerName": playerName})}).then((res) => {
		// If response is okay, then put response data into variable
		if (res.ok) {
			let reqJsonPlayerName;
			res.json().then((data) => {
				reqJsonPlayerName = data;
				// If the player name was successfully added to player list, state success.
				if (reqJsonPlayerName.success == true) {
					$("#playerNameParagraph").text("Player Name: "+ reqJsonPlayerName.playerName);
					document.dispatchEvent(new Event("playerNameSent"));
					show("success");
				}
				// Else if success failed, stating error page as name is already likely being used
				else if (reqJsonPlayerName.success == false) {
					$("#errorText").text("Error, try another player name");
					show("errorPage");
				}
				// Otherwise show unknown error if there was no success true or false
				else {
					$("#errorText").text("An unknown error occured");
					show("errorPage");
				}
			})
		}
	});
}

// Changes visibility of div's based on function parameters
export function show(id, group = "page") {
	// Records all div's that need to be hidden, under class name 'page'
	$("." + group).addClass("hidden").removeClass("visible");
	// Make requested div visible after all others have been hidden
	$("#" + id).addClass("visible").removeClass("hidden");
}

const pkg = {initialiseServer, sendPlayerName, show};
export default pkg;
