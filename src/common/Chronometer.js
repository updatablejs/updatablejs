

export class Chronometer {
	
	startTime;
	stopTime;
	timeList = {};
   
	constructor() {
		this.start();
	}
   
	start() {
		this.startTime = Date.now();
	}
	
	stop() {
		this.stopTime = Date.now();
		
		return this.getTime();
	}
	
	getTime() {
		var result = this.stopTime - this.startTime;
        
		return result > 0 ? result : 0;
    }
	
	reset() {
		this.startTime = null;
		this.stopTime = null;
		this.timeList = [];
	}
	
	mark(key) {
		var time = Date.now();
		
		if (key) this.timeList[key] = time;
	
		return time - this.startTime;
	}

	display() {
		for (var key of Object.keys(this.timeList)) {
    		console.log(key + ' ' + this.timeList[key] - this.startTime)
		}
	}
}
