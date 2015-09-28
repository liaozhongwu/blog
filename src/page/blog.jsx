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
	    		<div className="border-bottom">
	    			<p className="title">{title}</p>
	    			By <a href="/about">liaozhongwu</a>
	    			<span className="time">{createTime}</span>
	    		</div>
				<article dangerouslySetInnerHTML={{__html: converter.makeHtml(content)}}></article>
			</div>				
	    );
	}
}