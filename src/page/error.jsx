import React from "react";

export default class Error extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ]
		}
	}
  	render() {
	    return (
	    	<div className="content">
	    		Sorry, the page is not found.
			</div>
	    );
  	}	
}