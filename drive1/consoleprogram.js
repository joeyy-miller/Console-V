var programname = "iJD Animation Suite";
var program_desc = "This application allows you to test different aspects of the new rendering engine in Console V.";
//Prase input
function programuserinput()
{
    switch (document.getElementById("userInputBar").value.toLowerCase())
    {
        //Each case is a command by the user. 
        case "p":
            jd_animation();
            consoleWrite("Animating");
            break;
        default: 
            consoleWrite("No input detected.");
    }
}

//Control the function
function programuser(data1) {
    switch (data1)
    {
        //Each case is a command from the system
        case "run":
            //This is called when the user runs the first program
            consoleWrite('Welcome to <span class="_i">i</span>JD animation suite asdfasdfasdfasdfasdf');
            break;
        default: 
            consoleWrite("");
    }
}

var jd_pass = 0;
var jd_position = 0;
function jd_animation() {
    if (jd_pass == 0) {
        jd_position = display.linenumber;
        display.linenumber += 3;
        display.consoleline += 3;
        jd_pass = 15;
    } 
    if (jd_pass == 15) {
        display.lineContents[jd_position-1] = "  o  ";
        display.lineContents[jd_position] = " /#\\ ";
        display.lineContents[jd_position+1] = " _|_ ";
        display.rsh_scrn();
    } else if (jd_pass == 30) {
        display.lineContents[jd_position-1] = " \\o/ ";
        display.lineContents[jd_position] = "  #  ";
        display.lineContents[jd_position+1] = "_/\\_";
        display.rsh_scrn();
        jd_pass = 1;
    }
    jd_pass++;
    if (sys.pwrSts && display.animation) {
        setTimeout(animateMan, 50);
    } else {
        display.clear();
        jd_pass = 0;
        jd_position = 0;
    }
}

