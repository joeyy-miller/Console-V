var programname = "Console Program Example v1.0";
//Prase input
function programuserinput()
{
    switch (document.getElementById("userInputBar").value.toLowerCase())
    {
        //Each case is a command by the user. 
        case "":
            //This is the response: Edit this.
            consoleWrite("No input detected!");
            break;
        case "yas":
            consoleWrite("The program is running");
            break;
        default: 
            consoleWrite("This is a default test!");
    }
}

//Control the function
function programuser(data1) {
    switch (data1)
    {
        //Each case is a command from the system
        case "run":
            //This is called when the user runs the first program
            consoleWrite("Welcome to Console V Program Example v1.0");
            break;
        default: 
            consoleWrite("");
    }
}