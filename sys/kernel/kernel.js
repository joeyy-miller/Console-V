
/* Display Class 
	@consoleWrite This fucntion writes to the display the data passed to it

	@scrl This is a utility function that 
*/
class Display {
	constructor() {
		this.linenumber=1; // Used to target the a tags
		this.runnumber=1; // The overall run number of the system
		this.theme = "black"; // Black is the default theme
		this.consoleline="line1";
		this.runLines = false; // Run number setings. true = on
		this.LINE_COUNT = 20;
		this.animation = true; // Goes false when clearing the screen, to stop animations from playing
		this.WIDTH = 79;
		this.lineContents = Array(20).fill(" ");
	} 

	status() {
		if (this.linenumber && this.runnumber && this.consoleline && this.LINE_COUNT && this.lineContents) {
			return "ok";
		}
		return "fail";
	}

	checkWidth() {
		this.WIDTH = 79 - this.runnumber.toString().length - 3;
	}

	enabledRunNumbers() {
		if (this.runLines) {
			this.runLines = false;
			this.WIDTH = 79;
			consoleWrite("Runnumbers now disabled.");
		} else {
			this.runLines = true;
			this.checkWidth();
			consoleWrite("Runnumbers now enabled.");
		}
	}

	consoleWrite(data1, line) {
		if (line) {
			// Rewrite only the specified line
			data1 = data1.toString();
			var data2 = data1.substring(0,this.WIDTH);
			this.lineContents[line - 1] = data2;
		} else {
			// Rewrite the next clear line
			data1 = data1.toString();

			//Check for HTML in the string:
			var htmlLength;
			var data2;
			try {
				htmlLength = data1.match(/<(.*?)>/)[1].length + 2;
				data2 = data1.substring(0,(this.WIDTH +htmlLength));
			} catch (err) {data2 = data1.substring(0,(this.WIDTH));}

			if (this.linenumber <= this.LINE_COUNT) {
				if (this.runLines) {
					//User has runumbers on
					this.checkWidth(); // Set the width to match the increasing runumber
					this.lineContents[this.linenumber-1] = "[" + this.runnumber + "] " + data2;
				} else {
					this.lineContents[this.linenumber-1] = data2;
				}
				this.runnumber++;
				this.linenumber++;
				this.consoleline="line"+this.linenumber;
			} else if (this.linenumber > this.LINE_COUNT) { 
				this.scrl();
				if (this.runLines) {
					//User has runumbers on
					this.checkWidth();
					this.lineContents[this.LINE_COUNT-1] = "[" + this.runnumber + "] " + data2;
				} else {
					this.lineContents[this.LINE_COUNT - 1] = data2;
				}
				this.linenumber++;
				this.runnumber++;
			}
			if (data1.length > (this.WIDTH + htmlLength)) {
				consoleWrite(data1.substring((this.WIDTH + htmlLength)));
			}
		}
		this.rsh_scrn();
	}

	//Change the program title
	title(data1) {
		document.getElementById("program-name").innerHTML = data1;
	}

	// Refresh the screen
	rsh_scrn () {
		if (sys.pwrSts) {
			for (var i=1;i<=this.LINE_COUNT;i++) {
				document.getElementById("line" + i).innerHTML = this.lineContents[i-1];
			}
		}
	}

	clear() {
		for (var i=1;i<=this.LINE_COUNT;i++){
			document.getElementById("line" + i).innerHTML = "";
			this.lineContents[i-1] = ""; // Clear display array
		}
		this.linenumber=1; // Used to target the a tags
		this.runnumber=1; // The overall run number of the system
		this.consoleline="line1";
		this.animation = false;
		setTimeout(function() { display.animation = true}, 100); // Reset animation flag
	}

	/* Utility */
	scrl() {
		for (var i=0;i<this.LINE_COUNT;i++){
			this.lineContents[i] = this.lineContents[i+1];
		}
	}

	getTime() {
		var today = new Date();
	    var h = today.getHours();
	    var m = today.getMinutes();
	    var s = today.getSeconds();
	    if (m < 10) {m = "0" + m};
	    if (s < 10) {s = "0" + s};
	    if (h < 1) {h = "12"} // 0 hours or 12 am
	    if (h > 12) {h-=12;s += " pm"}else{s+=" am"};
		return h + ":" + m + ":" + s;
	}

	time() {
	    document.getElementById('time').innerHTML = display.getTime();
	    if (sys.pwrSts)
	    	setTimeout(display.time, 500);
	 	else 
			document.getElementById("time").innerHTML = '';
	}

	colorUtility(textColor, bgColor, borderLeft, borderRight) {
		document.getElementById("display").style.backgroundColor = bgColor;
		document.getElementById("display").style.color = textColor;
		document.getElementById("rightBar").style.backgroundColor = bgColor;
		document.getElementById("rightBar").style.color = textColor;
		document.getElementById("rightBar").style.borderRight = "1px solid " + borderRight;
		document.getElementById("rightBar").style.borderLeft = "1px solid " + borderLeft;
	}

	setColor(color) {
		if (color == "reset") {
			display.colorUtility("#fff", "#000", "#fff", "#fff");
		} else if (color == "white") {
			display.colorUtility("#000", "#fff", "#000", "#fff");
			this.theme = "white";
		} else if (color == "blue") {
			display.colorUtility("#fff", "#9bc0e5", "#fff", "#fff");
			this.theme = "blue";
		} else if (color == "sublime") {
			display.colorUtility("#f8f8f2", "#272822", "#90908a", "#fff");
			this.theme = "sublime";
		} else if (color == "black") {
			display.setColor("reset");
			this.theme = "black";
		} else if (color == "init") {
			display.setColor(this.theme);
		}
	}
	
}

/* System Class
	Used to store system settings and statuses
*/
class System {
	constructor() {
		this.pwrSts = false; // Power off 
		this.version = "5.2.0";
		this.versionShort = "5.2";
		this.turnOffFlag = true; // This is used by power function to stop the global 'enter' fucntion from turning the system back on
		this.program = false; //To see if a program is running
		this.paused = false; //Used if system input is paused (progarm has taken over)
		this.pauseStatus = null; //Store reason why system is paused
	}

	init_tb() {
		setTimeout(function() {document.getElementById("topBar").innerHTML = '<a id="ijd" class="float-left"><i>i</i>JD <small>' + sys.versionShort + '</small></a><a id="program-name"></a><a id="time" style="float:right;"></a>'; },100);
		setTimeout(function() {document.getElementById("time").style.display = "inline";}, 125)
		document.getElementById("topBar").innerHTML = '<a id="time" href=""></a>';
		document.getElementById("topBar").style.borderBottom = '1px solid #fff';
		display.time();
	}
	init_rb() {
		setTimeout(function() {document.getElementById("rightBar").innerHTML = 'sys sts: ok<br>';}, 200);
		setTimeout(function() {document.getElementById("rightBar").innerHTML = 'sys sts: ok<br>kernel: ok<br>';}, 300);
		setTimeout(function() {document.getElementById("rightBar").innerHTML = 'sys sts: ok<br>kernel: ok<br>sudo: ok<br>';}, 350);
		setTimeout(function() {document.getElementById("rightBar").innerHTML = 'sys sts: ' + kernel_task() + '<br>kernel: ok<br>sudo: ok<br>disp: ' + display.status();}, 450);
		document.getElementById("rightBar").style.borderLeft = '1px solid #fff';
	}
	init_dp() { setTimeout(function() {consoleWrite("Welcome to Console V.")},200); }
	
	deit_dp() { display.clear();}
	deit_rb() {
		setTimeout(function() {document.getElementById("rightBar").innerHTML = '';}, 25);
		setTimeout(function() {document.getElementById("rightBar").style.borderLeft = 'none';}, 100); }
	deit_tb() {
		setTimeout(function() {document.getElementById("topBar").innerHTML = '<a id="time"></a>';}, 50);
		setTimeout(function() {document.getElementById("topBar").style.borderBottom = 'none';},100);
		display.time(); }


	pause(data1) {
		// Stop input. Used when a method needs to take control of input bar
		if (this.paused) {
			this.paused = false; 
		} else { 
			this.paused = true;
			if (data1) {
				this.pauseStatus = data1;
			}
		}
	}

	power() {
		if (this.pwrSts) {
			// Power off system
			this.turnOffFlag = false;
			this.pwrSts = false;
			this.program = false;
			console.deit();
			display.setColor("reset");
			document.getElementById("powerButton").setAttribute("onclick","");
			setTimeout(function() {document.getElementById("powerButton").setAttribute("onclick",'kernel_task("power")');}, 100);
			setTimeout(function(){ sys.turnOffFlag = true; }, 100);
			this.deit_dp();
			this.deit_tb();
			this.deit_rb();
		} else {
			document.getElementById("powerButton").setAttribute("onclick","");
			setTimeout(function() {document.getElementById("powerButton").setAttribute("onclick",'kernel_task("power")'); sys.turnOffFlag = true;}, 450);
			//Power On System
			this.pwrSts = true;
			this.turnOffFlag = false;
			this.init_tb();
			this.init_rb();
			display.setColor("init");
			if (console.password) {
				consoleWrite("Console V is <span class='_b _f'>locked</span>.")
				consoleWrite("Type your password to continute...")
				sys.pause("verify");
			} else {
				this.init_dp();
			}
		}
	}
}

/* ConsoleController Class 
	@date Write the date for the user
*/
class ConsoleController {
	constructor() {
		this.password = null;
		this.cmdHistory = [];
		this.cmdHistoryIndex = -1;
		this.cmdHistoryIndexSelect = -1;
	} 

	deit() {
		this.cmdHistory = [];
		this.cmdHistoryIndex = -1;
		this.cmdHistoryIndex = -1;
	}

	passwordController() {
		if (this.password) {
			if (console.verifyPassword()) {
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
		consoleWrite("No history of commands to retreive.");
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
}



/* Kernel Task
	Used to run the system*/
function kernel_task(data1) {
	switch (data1) {
		case "panic":
			display.consoleWrite("<span class='_f'>A Kernel Panic has occured, please restart your system.</span>");
			break;
		case "display":
			consoleDisplay(); 
			break;
		case "power":
			sys.power();
			break;
	}
	return "ok";
}

/* Register Input
	Used to validate what was typed into the console line.*/
var reg_error = "<span class='_f'>Error:</span> ";
var reg_success = "<span class='_s'>";
var end_reg_success = "</span>";

function reg_input() {
	var input = document.getElementById("userInputBar").value.toLowerCase();
	var firstWord = null;
	var secondWord = null;
	if (sys.pwrSts) {
		if (!sys.program && !sys.paused) { //If system is not running a program
			if (input.indexOf(' ') != -1) {
				firstWord = input.substr(0,input.indexOf(' ') + 1);
				secondWord = input.substr(input.indexOf(' ') + 1);
			}
			else {
				firstWord = input;
				secondWord = null;
			}
			switch (firstWord) {
				/* a */
				case "a":
					consoleWrite("Rewritten.");
					break;
				/* b */
				/* c */
				case "clear":
				case "c":
					display.clear();
					break;
				case "color":
				case "theme":
					consoleWrite("Use this command to change the look of your system.");
					consoleWrite("Type color [theme] to select which theme to use.");
					consoleWrite("Themes installed: Black, White, Blue, Sublime.");
					break;
				case "color ":
				case "theme ":
					switch (secondWord) {
						case "black":
						case "default":
							display.setColor("black");
							break;
						case "blue":
							display.setColor("blue");
							break;
						case "sublime":
							display.setColor("sublime");
							break;
						case "white":
							display.setColor("white");
							break;
						default:
							consoleWrite(reg_error + secondWord + " is not a valid theme.")
					}
					break;
				/* d */
				case "info":
					consoleWrite("Designed by <span class='_i'>i</span>JD in sunny California");
					consoleWrite("Do not distribute Console without written permission from <span class='_i'>i</span>JD.");
					consoleWrite("Console V; version " + sys.version);
					break;
				case "date":
				case "d":
					console.date();
					break;
				case "echo ":
					var thirdWord = document.getElementById("userInputBar").value.substr(secondWord.indexOf(' ') + firstWord.length + 1);
					var flag = false;
					secondWord = secondWord.substr(0,secondWord.indexOf(' '))
					switch(secondWord) {
						case "-s":
							secondWord = "<span class='_s'>" + thirdWord + "</span>";
							flag = true;
							break;
						case "-f":
							secondWord = "<span class='_f'>" + thirdWord + "</span>";
							flag = true;
							break;
						case "-b":
							secondWord = "<span class='_b'>" + thirdWord + "</span>";
							flag = true;
							break;
						case "-i":
							secondWord = "<span class='_i'>" + thirdWord + "</span>";
							flag = true;
							break;
					}
					if (flag){
						consoleWrite(secondWord);
					} else {
						secondWord = document.getElementById("userInputBar").value.substr(input.indexOf(' ') + 1);
						consoleWrite(secondWord);
					}
					//consoleWrite(secondWord);
					break;
				/* e f g */
				/* h */
				case "help":
					consoleWrite("Console V. All commands are lowercase.")
					consoleWrite("<span class='_b'>system</span>: clear, date, echo, info, off, reload, theme, time, version.");
					consoleWrite("<span class='_b'>drive</span>: mount, run, drive info.");
					break;
				/* i j k l */
				/* m */
				case "mount":
				case "m":
				case "driveinfo":
				case "drive ":
					if( secondWord != "info" && secondWord != "desc") {
						consoleWrite(reg_error + document.getElementById("userInputBar").value + " was not a recognized command.");
						break;
					}
					if (programname) {
						if (secondWord == "desc" || secondWord == "info" || secondWord == "description")
						// Give description of program
						consoleWrite("<span class='_b'>" + programname + "</span>: " + program_desc);
						break;
					}
					if (programname) {
						consoleWrite(programname + " is mounted.");
					} else {
						consoleWrite(reg_error + "No program is mounted. Not ready for run.");
					}
					break;
				/* n */
				/* o */
				case "off":
					kernel_task("power");
					break;
				/* p */
				case "p":
					consoleWrite("Animating");
					animateMan();
					break;
				case "password":
				case "pass":
				case "set ":
				case "setpassword":
					if (secondWord == "password" || secondWord == null) {
						console.passwordController();
						break;
					}
					break;
				/* q */
				/* r */
				case "reload":
					location.reload();
					break;
				case "run":
				case "r":
					if (programname) {
						sys.program = true;
						sys.deit_rb();
						display.clear();
						display.title(programname);
						programuser("run");
					} else {
						consoleWrite(reg_error + "Cannot run. No program is mounted.");
					}
					break;
				case "runumber":
				case "runumbers":
				case "rn":
					display.enabledRunNumbers();
					break;
				/* s */
				/* t */
				case "time":
					console.time();
					break;
				/* u */
				case "unmount":
					consoleWrite(reg_error + "This is a legacy command, unmounting is not nessisary in Console V.");
					break;
				/* v */
				case "version":
				case "ver":
					consoleWrite("Console V; Version " + sys.version);
					break;
				/* w x y z */	
				default:
					if (document.getElementById("userInputBar").value != "") 
						consoleWrite(reg_error + document.getElementById("userInputBar").value + " was not a recognized command.");
					else 
						consoleWrite(reg_error + "That was not a recognized command.");
			}
		} else { //System is running a program or paused
			if (sys.program) {
				switch (document.getElementById("userInputBar").value.toLowerCase()) {
					case "exit":
					case "e":
						sys.program = false;
						display.clear();
						sys.init_rb();
						display.title("");
						consoleWrite(reg_success + programname + " closed." + end_reg_success);
						break;
					case "clear":
					case "c":
						display.clear();
						break;
					default:
						programuserinput();
				}
			} else if(sys.paused) {
				switch (sys.pauseStatus) {
					case "password":
						//System is paused to set a password
						if (!console.password) {
							console.password = document.getElementById("userInputBar").value;
							var star = "";
							for (var x = 0; x < console.password.length; x++) {
								star += "*";
							}
							consoleWrite(star);
							consoleWrite("Type your password again to verify");
						} else {
							if (document.getElementById("userInputBar").value == console.password) {
								consoleWrite(reg_success + "Password accepted." + end_reg_success);
							} else {
								consoleWrite(reg_error + "Passwords do not match. Exiting password manager.");
								console.password = null;
							}
							sys.pause();
						}
						break;
					case "verify":
						if (document.getElementById("userInputBar").value == console.password) {
							display.clear();
							consoleWrite(reg_success + "Password accepted." + end_reg_success);
							consoleWrite("Welcome to Console V.");
							sys.pause();
						} else {
							consoleWrite(reg_error + "Incorrect password.");
						}
						break;
					default:
						kernel_task("panic");
				}
			}
		}
	}
}

var pass = 0;
var position = 0;
function animateMan() {
	if (pass == 0) {
		position = display.linenumber;
		display.linenumber += 3;
		display.consoleline += 3;
		pass = 15;
	} 
	if (pass == 15) {
		display.lineContents[position-1] = "  o  ";
		display.lineContents[position] = " /#\\ ";
		display.lineContents[position+1] = " _|_ ";
		display.rsh_scrn();
	} else if (pass == 30) {
		display.lineContents[position-1] = " \\o/ ";
		display.lineContents[position] = "  #  ";
		display.lineContents[position+1] = "_/\\_";
		display.rsh_scrn();
		pass = 1;
	}
	pass++;
	if (sys.pwrSts && display.animation) {
		setTimeout(animateMan, 50);
	} else {
		display.clear();
		pass = 0;
		position = 0;
	}
}

function consoleWrite(data1) {
	display.consoleWrite(data1);
}

/* Enter Check
   Checks when to submit the user's command
*/
function entr_ck(e) {
    var unicode=e.keyCode? e.keyCode : e.charCode
    if (unicode == 13) 
	{ // Enter Key
		reg_input('display');
		console.pushCommand(document.getElementById("userInputBar").value);
		document.getElementById("userInputBar").value = "";
	}
	if (unicode == 38)
	{ // Up Arrow
		document.getElementById("userInputBar").value = console.pullCommandBack();
	}
	if (unicode == 40)
	{ // Up Arrow
		document.getElementById("userInputBar").value = console.pullCommandForward();
	}
}

/* On Load */
var display = new Display();
var sys = new System();
var console = new ConsoleController();