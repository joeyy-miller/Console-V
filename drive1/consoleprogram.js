var programname = "iJD SNAKE";
var program_desc = "Brand new state of the art game from iJD where you control a snake.";
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
            consoleWrite('Welcome to <span class="_i">i</span>JD SNAKE!');
            consoleWrite('Type start to start. Control your dude uisng the arrow keys!');
            break;
        case "start":
            
        default: 
            consoleWrite("");
    }
}