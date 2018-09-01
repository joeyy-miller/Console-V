/* Register Input
	Used to validate what was typed into the console line.*/
var reg_error = "<span class='_f'>Error:</span> ";
var reg_success = "<span class='_s'>";
var end_reg_success = "</span>";

function reg_input() {
	var input = document.getElementById("userInputBar").value.toLowerCase();
	clearType.passInput(input);

	/*
	Not needed due to clearType
	var firstWord = null;
	var secondWord = null;
	*/


	if (sys.pwrSts) {
		if (!sys.program && !sys.paused && !rght.focus) { //If system is not running a program, paused, or focused
			switch (clearType.firstWord) {
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
					switch (clearType.secondWord) {
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
				/* e */
				case 'echo':
					consoleWrite("Write after this command to echo it. Flags: -s[green text] -b[bold text] etc.");
				break;
				case "echo ":
					var output = "";
					if (clearType.flags) {
						// There are flags, let's check them.
						for(var i = 0; i < clearType.flags.length; i++) {
							switch(clearType.flags[i]) {
								case "-s":
									output += "<span class='_s'>";
									break;
								case "-f":
									output += "<span class='_f'>";
									break;
								case "-b":
									output +="<span class='_b'>";
									break;
								case "-i":
									output +="<span class='_i'>";
									break;
							}
						}
						output += clearType.inputAfter;
						for(var i = 0; i < clearType.flags.length; i++) {
							output += "</span>";
						}
					} else {
						output += clearType.inputAfter;
					}
					consoleWrite(output);
					break;
				/* f g */
				/* h */
				case "help":
					consoleWrite("<span class='_j'>Console V</span>. All commands are lowercase.")
					consoleWrite("<span class='_b'>system</span>: clear, date, echo, info, off, reload, theme, time, version.");
					consoleWrite("<span class='_b'>drive</span>: mount, run, drive info.");
					consoleWrite("<span class='_b'>shortcuts</span>: shutdown - 'esc', power - 'enter', focus to input - 't'.")
					break;
				/* i j k l */
				/* m */
				case "mount":
				case "m":
				case "driveinfo":
				case "drive ":
					if( clearType.secondWord != "info" && clearType.secondWord != "desc") {
						consoleWrite(reg_error + document.getElementById("userInputBar").value + " was not a recognized command.");
						break;
					}
					if (programname) {
						if (clearType.secondWord == "desc" || clearType.secondWord == "info" || clearType.secondWord == "description")
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
					consoleWrite("<span class='_j'>Console V</span>; Version " + sys.version);
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
				switch (clearType.firstWord) {
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
							consoleWrite("Welcome to <span class='_j'>Console V</span>.");
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