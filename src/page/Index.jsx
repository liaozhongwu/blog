import React from "react";
import Showdown from "showdown";
var converter = new Showdown.Converter();

export default class Index extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ],
			// jsFile: [ "/page/index.js" ]
		}
	}
  	render() {
  		var content = this.props.data.content || "";
	    return (
	    	<div className="content" dangerouslySetInnerHTML={{__html: converter.makeHtml(content)}}></div>
	    );
  	}	
}