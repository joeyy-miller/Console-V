/* Kernel Task
	Used to run the system*/
var PANIC = false;
function kernel_task(data1) {
	switch (data1) {
		case "panic":
			display.consoleWrite("<span class='_f'>A Kernel Panic has occured, please restart your system.</span>");
			document.getElementById("userInputBar").readOnly = true; 
			document.getElementById("userInputBar").style.backgroundColor = '#ce2732'; 
			document.getElementById("powerButton").style.backgroundColor = '#ce2732'; 
			document.getElementById("time").id = "brk-time";
			PANIC = true;
			break;
		case "unpanic":
			if (PANIC == true) {
				document.getElementById("userInputBar").readOnly = false; 
				document.getElementById("userInputBar").style.backgroundColor = '#FFF'; 
				document.getElementById("powerButton").style.backgroundColor = '#000'; 
				document.getElementById("brk-time").id = "time";
				PANIC = false;
			}
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
		consolev.pushCommand(document.getElementById("userInputBar").value);
		document.getElementById("userInputBar").value = "";
	}
	if (unicode == 38)
	{ // Up Arrow
		if (!rght.focus) 
			document.getElementById("userInputBar").value = consolev.pullCommandBack();
		else {
			rght.upArrow();
		}
	}
	if (unicode == 40)
	{ // Up Arrow
		if (!rght.focus) 
			document.getElementById("userInputBar").value = consolev.pullCommandForward();
		else {
			rght.downArrow();
		}
	}
}

/* Keydown Event
   Listener event that runs whenver a key is pressed to check if an action 
   	needs to be performed.
*/
document.onkeydown = function(evt) {
	evt = evt || window.event;
	// Enter Key
	var isEnter = false;
	if ("key" in evt) { isEnter = (evt.key == "Enter");
	} else { isEnter = (evt.keyCode == 13); }
	if (isEnter) {
		if (!sys.pwrSts && sys.turnOffFlag) {
			kernel_task("power");
		} else if (rght.focus) {
			rght.enter();
		}
	}

	// T Key (text key)
	var isText = false;
	if ("key" in evt) { isText = (evt.key == "t");
	} else { isText = (evt.keyCode == 84); }
	if (isText) {
		if (!(document.getElementById("userInputBar") === document.activeElement)) {
			document.getElementById("userInputBar").focus();
			var inputValue = document.getElementById("userInputBar").value;
			inputValue = inputValue.substring(0,inputValue.length - 1);
			setTimeout(function() {document.getElementById("userInputBar").value = inputValue;}, 10 );
		}
		if (consolev.debugMode) {consoleWrite("Text key.")}

	}
	// Esacpe key
	var isEscape = false;
	if ("key" in evt) { isEscape = (evt.key == "Escape" || evt.key == "Esc");
	} else { isEscape = (evt.keyCode == 27); } 
	if (isEscape && sys.pwrSts && sys.turnOffFlag) {
		kernel_task("power");
	}

	// Option Key
	var isOption = false;
	if ("key" in evt) { isOption = (evt.key == "Alt" || evt.key == "Option");
	} else { isOption = (evt.keyCode == 18); } 
	if (isOption && sys.pwrSts) {
		rght.setFocus();
		if (consolev.debugMode) {consoleWrite("Option key.")}
	}
}