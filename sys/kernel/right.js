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
			/* Unfocus */
			consoleWrite("<span class='_g'>Changed focus</span> to input.")
			this.unFocus();
		} else {
			/* Focus the sidebar */
			document.getElementById('userInputBar').setAttribute('readonly', 'readOnly');
			this.focus = true;
			document.getElementById("option" + this.highlight).classList.add("rightSelected");
			document.getElementById('userInputBar').style.backgroundColor = 'lightgray';
			consoleWrite("<span class='_g'>Changed focus</span> to sidebar.")
		}
	}

	unFocus() {
		/* Unset the focus */
		document.getElementById("option" + this.highlight).classList.remove("rightSelected");
		this.focus = false;
		setTimeout(function() {document.getElementById("userInputBar").focus()}, 100);
		document.getElementById('userInputBar').removeAttribute('readonly');
		document.getElementById('userInputBar').style.backgroundColor = '#fff';
	}

	downArrow() {
		if (this.highlight != this.MENU_LENGTH && PANIC != true) {
			document.getElementById("option" + this.highlight).classList.remove("rightSelected");
			this.highlight++;
			document.getElementById("option" + this.highlight).classList.add("rightSelected");
			if (consolev.debugMode) {consoleWrite("Arrow down.")}
		}
	}


	upArrow() {
		if (this.highlight != 1 && PANIC != true) {
			document.getElementById("option" + this.highlight).classList.remove("rightSelected");
			this.highlight--;
			document.getElementById("option" + this.highlight).classList.add("rightSelected");
			if (consolev.debugMode) {consoleWrite("Arrow up.")}
		}
	}

	enter () {
		//display.consoleWrite("user pressed enter on: " + this.highlight);
		switch (this.highlight) {
			case 1:
				if (this.colorsEnable){
					/* Disable System Colors */
					document.getElementById("consoleDisplay").classList.remove("noColors");
					for(var x = 0 ;x < this.numStatus; x++) {
						document.getElementsByClassName("optcolr")[x].style.color = "#9ed62a";
					}
					document.getElementById("option1").style.textDecoration = "underline";
					this.colorsEnable = false;
				} else {
					/* Enable System Colors */
					document.getElementById("consoleDisplay").classList.add("noColors");
					for(var x = 0 ;x < this.numStatus; x++) {
						document.getElementsByClassName("optcolr")[x].style.color = "#fff";
					}
					document.getElementById("option1").style.textDecoration = "none";
					this.colorsEnable = true;
				}
				break;
			case 2:
				/* Debug Mode */
<<<<<<< HEAD
				if (console.debugMode == true) {
					console.debugMode = false;
					document.getElementById("option6").style.textDecoration = "none";
					consoleWrite("<span class='_s'>Leaving Debug Mode: System safe.</span>")
				} else {
					console.debugMode = true;
					document.getElementById("option6").style.textDecoration = "underline";
					consoleWrite("<span class='_f'>Entering Debug Mode: System corruption may occur. Use caution.</span>")
				}
=======
				consolev.debugModeSetting();
				if (consolev.debugMode == true) {document.getElementById("option2").style.textDecoration = "underline"; }
				else { document.getElementById("option2").style.textDecoration = "none"; }
>>>>>>> 7fd564dff81583eef72eaba68613f77e58f5d9c7
				break;
			case 3:
				/* Run Numbers */
<<<<<<< HEAD
				if (console.runNumEnable == true) {
					display.enabledRunNumbers();
					console.runNumEnable = false;
					document.getElementById("option7").style.textDecoration = "none";
				} else {
					console.runNumEnable = true;
					display.enabledRunNumbers();
					document.getElementById("option7").style.textDecoration = "underline";
				}
				
=======
				display.enabledRunNumbers();
				if (display.runLines == true) {document.getElementById("option3").style.textDecoration = "underline"; }
				else { document.getElementById("option3").style.textDecoration = "none"; }
>>>>>>> 7fd564dff81583eef72eaba68613f77e58f5d9c7
				break;
			
			case 4:
				kernel_task("panic");
			case 5:
				consoleWrite("System Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 6: 
				consoleWrite("Kernel Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 7:
				consoleWrite("Sudo (ClearType included) Status: <span class='_s'>NOMINAL</span>.");
				break;
			case 8:
				consoleWrite("Display Status: <span class='_s'>NOMINAL</span>.");
				break;
		}
	}
}



var rght = new rightDisplayController();