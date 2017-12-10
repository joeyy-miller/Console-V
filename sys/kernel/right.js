
class rightDisplayController {
	constructor () {
		this.focus = false; // Does the user have this in focus?
		this.options = [];
		this.highlight = 1;
	}

	setFocus() {
		if(this.focus) {
			/* Unset the focus */
			document.getElementById("option" + this.highlight).style.backgroundColor = "#000";
			document.getElementById("option" + this.highlight).style.color = "#fff";
			this.highlight = 1;
			this.focus = false;
			setTimeout(function() {document.getElementById("userInputBar").focus()}, 100);
		} else {
			this.focus = true;
			document.getElementById("option1").style.backgroundColor = "#fff";
			document.getElementById("option1").style.color = "#000";
		}
	}

	downArrow() {
		if (this.highlight != 4) {
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
}

var rght = new rightDisplayController();