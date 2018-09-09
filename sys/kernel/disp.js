
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
		document.querySelector("#rightBar > span").style.color = textColor;
		document.getElementById("rightBar").style.backgroundColor = bgColor;
		document.getElementById("rightBar").style.color = textColor;
		document.getElementById("rightBar").style.borderRight = "1px solid " + borderRight;
		document.getElementById("rightBar").style.borderLeft = "1px solid " + borderLeft;
	}

	setColor(color) {
		// Add the current theme to the DOM for CSS control
		document.getElementById("consoleDisplay").classList.remove(this.theme);
		document.getElementById("consoleDisplay").classList.add(color);

		if (color == "reset") {
			display.colorUtility("#fff", "#000", "#fff", "#fff");
		} else if (color == "white") {
			display.colorUtility("#000", "#fff", "#000", "#fff");
			this.theme = "white";
		} else if (color == "blue") {
			display.colorUtility("#fff", "#66ccff", "#fff", "#fff");
			this.theme = "blue";
		} else if (color == "sublime") {
			display.colorUtility("#f8f8f2", "#272822", "#90908a", "#fff");
			this.theme = "sublime";
		} else if (color == "default") {
			display.setColor("reset");
			this.theme = "default";
		} else if (color == "init") {
			display.setColor(this.theme);
		}
	}
	
}

var display = new Display();