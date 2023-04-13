
/* ConsoleController Class 
	@date Write the date for the user
*/
class ConsoleController {
	constructor() {
		this.password = null;
		this.cmdHistory = [];
		this.cmdHistoryIndex = -1;
		this.cmdHistoryIndexSelect = -1;
		this.debugMode = false;
	} 

	deit() {
		this.cmdHistory = [];
		this.cmdHistoryIndex = -1;
		this.cmdHistoryIndex = -1;
	}

	passwordController() {
		if (this.password) {
			if (consolev.verifyPassword()) {
				this.password = null;
				consoleWrite("Password reset.");
			}
		} else {
			sys.pause("password");
			consoleWrite("Type your password");
		}
	}

	verifyPassword() {
		if (this.password) {
			consoleWrite("This action requires you to verify your password.");
			consoleWrite("Type your password to continue.");
			sys.pause("verify");
		}
		return true;
	}

	pushCommand(data1) {
		if (data1) { // Make sure it's not a NULL string
			this.cmdHistory.push(data1);
			this.cmdHistoryIndex++;
			this.cmdHistoryIndexSelect = this.cmdHistoryIndex;
		}
	}

	pullCommandBack() {
		if (this.cmdHistoryIndex != - 1) {
			if (this.cmdHistoryIndexSelect == 0)
				return this.cmdHistory[this.cmdHistoryIndexSelect];
			if (this.cmdHistoryIndexSelect != 0)
				this.cmdHistoryIndexSelect--;
			return this.cmdHistory[this.cmdHistoryIndexSelect + 1];
		}
		consoleWrite(reg_error + "No history of commands to retreive.");
		return document.getElementById("userInputBar").value;
	}

	pullCommandForward() {
		if (this.cmdHistoryIndex != - 1) {
			if (this.cmdHistoryIndexSelect == this.cmdHistoryIndex)
				return ""; // Return empty string, last command reteived
			if (this.cmdHistoryIndexSelect < this.cmdHistoryIndex)
				this.cmdHistoryIndexSelect++;
			return this.cmdHistory[this.cmdHistoryIndexSelect];
			}
		consoleWrite(reg_error + "No history of commands to retreive.");
		return document.getElementById("userInputBar").value;
	}

	date() {
		var date=new Date().getDay();
		switch(date)
		{
			case 0:
				date="Sunday";
				break;
			case 1:
				date="Monday";
				break;
			case 2:
				date="Tuesday";
				break;
			case 3:
				date="Wednesday";
				break;
			case 4:
				date="Thursday";
				break;
			case 5:
				date="Friday";
				break;
			case 6:
				date="Saturday";
				break;
			default:
				date= reg_error + "fetching date";
		}
		var currentTime = new Date();
		var month = currentTime.getMonth() + 1;
		var day = currentTime.getDate();
		var year = currentTime.getFullYear();
		consoleWrite("It is "+date+"; "+month + "/" + day + "/" + year+".");
	}

	time() {
		consoleWrite("It is " + display.getTime());
	}
	
	debugModeSetting() {
		if (this.debugMode == true) {
			this.debugMode = false;
			consoleWrite("<span class='_s'>Exited Debug Mode.</span>")
		} else {
			this.debugMode = true;
			consoleWrite("<span class='_f'>Entering Debug Mode: System corruption may occur. Use caution.</span>")
		}
	}
}

var consolev = new ConsoleController();
