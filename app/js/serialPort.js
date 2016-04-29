function serialPort(portName, dataHandler){
	this.serialport;
	this.init = function(){

		var serialModule = require("serialport");
		var SerialPort = serialModule.SerialPort;
		serialPort = new SerialPort(portName, {
			parser: serialModule.parsers.readline("\n"),
			baudrate: 9600
		}, false);
		
		serialPort.on("open", this.portOpen);
		serialPort.on("close", this.portClosed);
		serialPort.on("error", this.portError);
		serialPort.on("data", this.dataRecieved);

		serialPort.open();

	};

	this.portOpen = function(){
		console.log("puerto abierto...");
	};

	this.portClosed = function(){
		console.log("puerto cerrado...");
	};

	this.portError = function(e){
		console.log("Error: " + e);
	};

	this.dataRecieved = function(dataOfPort){
		dataHandler(dataOfPort);
	};
}
