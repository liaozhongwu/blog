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
	    		the chat system move to <a href="liaozhongwu.cn:8000">chat</a>
			</div>
	    );
  	}	
}