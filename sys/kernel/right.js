class rightDisplayController {
	constructor () {
		this.focus = false; // Does the user have this in focus?
		this.options = [];
		this.MENU_LENGTH = 8; // Number of items in the side bar menu
		this.numStatus = 4; //Number of statuses
		this.highlight = 1;
		this.colorsEnable = false;
		this.runNumEnable = false;
	}

	setFocus() {
		if(this.focus) {
			this.unFocus();
		} else {
			this.focus = true;
			document.getElementById("option1").style.backgroundColor = "#fff";
			document.getElementById("option1").style.color = "#000";
		}
	}

	unFocus() {
		/* Unset the focus */
		document.getElementById("option" + this.highlight).style.backgroundColor = "#000";
		document.getElementById("option" + this.highlight).style.color = "#fff";
		this.highlight = 1;
		this.focus = false;
		setTimeout(function() {document.getElementById("userInputBar").focus()}, 100);
	}

	downArrow() {
		if (this.highlight != this.MENU_LENGTH && PANIC != true) {
			document.getElementById("option" + this.highlight).style.backgroundColor = "#000";
			document.getElementById("option" + this.highlight).style.color = "#fff";
			this.highlight++;
			document.getElementById("option" + this.highlight).style.backgroundColor = "#fff";
			document.getElementById("option" + this.highlight).style.color = "#000";
		}
	}


	upArrow() {
		if (this.highlight != 1 && PANIC != true) {
			document.getElementById("option" + this.highlight).style.backgroundColor = "#000";
			document.getElementById("option" + this.highlight).style.color = "#fff";
			this.highlight--;
			document.getElementById("option" + this.highlight).style.backgroundColor = "#fff";
			document.getElementById("option" + this.highlight).style.color = "#000";
		}
	}

	enter () {
		//display.consoleWrite("user pressed enter on: " + this.highlight);
		switch (this.highlight) {
			case 1:
				consoleWrite("System Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 2: 
				consoleWrite("Kernel Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 3:
				consoleWrite("Sudo (ClearType included) Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 4:
				consoleWrite("Display Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 5:
				if (this.colorsEnable){
					for(var x = 0 ;x < this.numStatus; x++) {
						document.getElementsByClassName("optcolr")[x].style.color = "#fff";
					}
					document.getElementById("option5").style.textDecoration = "none";
					this.colorsEnable = false;
				} else {
					for(var x = 0 ;x < this.numStatus; x++) {
						document.getElementsByClassName("optcolr")[x].style.color = "#9ed62a";
					}
					document.getElementById("option5").style.textDecoration = "underline";
					this.colorsEnable = true;
				}
				break;
			case 6:
				/* Debug Mode */
				if (console.debugMode == true) {
					console.debugMode = false;
					document.getElementById("option6").style.textDecoration = "none";
					consoleWrite("<span class='_s'>Leaving Debug Mode: System safe.</span>")
				} else {
					console.debugMode = true;
					document.getElementById("option6").style.textDecoration = "underline";
					consoleWrite("<span class='_f'>Entering Debug Mode: System corruption may occur. Use caution.</span>")
				}
				break;
			case 7:
				/* Run Numbers */
				if (console.runNumEnable == true) {
					display.enabledRunNumbers();
					document.getElementById("option7").style.textDecoration = "none";
				} else {
					display.enabledRunNumbers();
					document.getElementById("option7").style.textDecoration = "underline";
				}
				
				break;
			case 8:
				kernel_task("panic");
		}
	}
}



var rght = new rightDisplayController();