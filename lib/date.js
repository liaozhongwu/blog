function getFormatNumber (num) {
	return num < 10 ? ("0" + num) : ("" + num)
} 

function getDate () {
	return this.getFullYear() + "-" + 
	getFormatNumber(this.getMonth() + 1) + "-" + 
	getFormatNumber(this.getDate())
}

function getDateTime () {
	return this.getFullYear() + "-" + 
	getFormatNumber(this.getMonth() + 1) + "-" + 
	getFormatNumber(this.getDate()) + " " + 
	getFormatNumber(this.getHours()) + ":" + 
	getFormatNumber(this.getMinutes()) + ":" + 
	getFormatNumber(this.getSeconds())
}

Date.prototype.toDate = getDate
Date.prototype.toDateTime = getDateTime
Date.prototype.toString = getDateTime
Date.prototype.toJSON = getDateTime