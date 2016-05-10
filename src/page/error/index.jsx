import React from "react";

export default class Error extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/page/theme.css" ]
		}
	}
	render() {
    return (
    	<div className="content">
    		<p>Sorry, The page is not found Or you have no permission</p>
    		<p>Click <a href="/">here</a> back to the home</p>
			</div>
    );
	}	
}