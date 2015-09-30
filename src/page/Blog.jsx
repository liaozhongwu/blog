import React from "react";
import Showdown from "showdown";
var converter = new Showdown.Converter();

export default class Blog extends React.Component {
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ],
			// jsFile: [ "/page/blog.js" ]
		}
	}
  	render() {
  		var title = this.props.data.title || "";
  		var content = this.props.data.content || "";
  		var createTime = this.props.data.createTime || "";
	    return (
	    	<div className="content">
    			<p className="title">
    				<span className="time">{createTime}</span>
    				{title}
    			</p>
				<article className="article" dangerouslySetInnerHTML={{__html: converter.makeHtml(content)}}></article>
			</div>				
	    );
	}
}