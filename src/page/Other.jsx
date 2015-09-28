import React from "react";

export default class Other extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ]
		}
	}
  	render() {
	    return (
	    	<div className="content">
	    		the chat system will change to React soon
			</div>
	    );
  	}	
}