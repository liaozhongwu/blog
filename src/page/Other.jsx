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
	    		the chat system had moved to <a href="http://liaozhongwu.cn:8000" target="_blank">chat</a>
			</div>
	    );
  	}	
}