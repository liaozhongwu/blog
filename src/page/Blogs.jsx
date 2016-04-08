import React from "react"
import "../../lib/date"

export default class Blogs extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ],
			// jsFile: [ "/page/blogs.js" ]
		}
	}
	renderList () {
		var {blogs} = this.props;
		var html = [];
		blogs.map((blog, i) => {
			html.push(<li className="item" key={i}>
				<span className="time">{blog.createTime.toString()}</span>
				<a href={"/blog/" + blog.id}>{blog.title}</a>
			</li>);
		});
		return html;
	}
  	render() {
	    return (
	    	<div className="content">
				<ul className="list">
					{ this.renderList() }
				</ul>
			</div>
	    );
  	}	
}