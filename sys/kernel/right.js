class rightDisplayController {
	constructor () {
		this.focus = false; // Does the user have this in focus?
		this.options = [];
		this.MENU_LENGTH = 6; // Number of items in the side bar menu
		this.numStatus = 4; //Number of statuses
		this.highlight = 1;
		this.colorsEnable = false;
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
		if (this.highlight != this.MENU_LENGTH) {
			document.getElementById("option" + this.highlight).style.backgroundColor = "#000";
			document.getElementById("option" + this.highlight).style.color = "#fff";
			this.highlight++;
			document.getElementById("option" + this.highlight).style.backgroundColor = "#fff";
			document.getElementById("option" + this.highlight).style.color = "#000";
		}
	}


	upArrow() {
		if (this.highlight != 1) {
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
					this.colorsEnable = false;
				} else {
					for(var x = 0 ;x < this.numStatus; x++) {
						document.getElementsByClassName("optcolr")[x].style.color = "#9ed62a";
					}
					this.colorsEnable = true;
				}
				
				break;
			case 6:
				kernel_task("panic");
		}
	}
}



var rght = new rightDisplayController();