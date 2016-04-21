import React from "react"
import "../../../lib/date"

export default class Blogs extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的博客 - Liaozhongwu's Blog",
			description: "廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/css/theme.css", "/css/blogs/index.css" ]
		}
	}
	renderList () {
		var {blogs} = this.props;
		var html = [];
		blogs.map((blog, i) => {
			html.push(<li className="item blog" key={i}>
				<a className="blog-title" href={"/blog/" + blog.key}>{blog.title}</a>
				<span className="time">{blog.createTime.toString()}</span>
				<div className="blog-preview">
					{blog.content}
				</div>
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