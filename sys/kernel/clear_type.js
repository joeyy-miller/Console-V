/* clearTypeController Class 
	ClearType (C) iJD software, v1.0.
	@passInput Parses the input that the user types
*/
class clearTypeController {
	constructor () {

		this.fullInput; // Full input string
		this.words =[]; // Array of each words (including flags)
		this.flags =[]; // Array of each flag (not other words);
		// quick access words
		this.firstWord;
		this.secondWord;
		this.thirdWord;
		// quick access flags
		this.firstFlag;
		this.secondFlag;
		this.thirdFlag;

		this.inputAfter; // Input after flags and first command
	}

	passInput(data1) {
		if (data1.indexOf(' ') != -1) {

			this.fullInput = data1;
			this.words = data1.match(/\S+\s*/g);
			this.flags = data1.match(/(?=\S*['-])([a-zA-Z'-]+)/g);
			if (this.words != null){ 
				this.firstWord = this.words[0];
				this.secondWord = this.words[1];
				this.thirdWord = this.words[2];
				if (!this.secondWord) {
					this.secondWord = " ";
				}
			}
			if (this.flags != null) {
				this.firstFlag = this.flags[0];
				this.secondFlag = this.flags[1];
				this.thirdFlag = this.flags[2];

				this.inputAfter = this.fullInput;
				//Let's get the string after all the flags
				for (var i = 0;i < this.flags.length + 1; i++) {
					this.inputAfter = this.inputAfter.substring(this.inputAfter.indexOf(' ') + 1);
				}
			} else {
				this.inputAfter = this.fullInput;
				this.inputAfter = this.inputAfter.substring(this.inputAfter.indexOf(' ') + 1);
			}
		} else {
			this.words = data1;
			this.firstWord = this.words;
		}
	}
}

var clearType = new clearTypeController();