import React from "react"
import "../../../lib/date"

export default class Blogs extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的博客 - Liaozhongwu's Blog",
			description: "廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/vendor/font-awesome/css/font-awesome.min.css", "/css/theme.css", "/css/blogs/index.css" ]
		}
	}
	render() {
		let {blogs} = this.props
    return (
    	<div className="content">
				<ul className="list">
					{ 
						blogs.map((blog, i) => (
							<li className="item blog" key={i}>
								<a className="blog-title" href={"/blog/" + blog.key}>{blog.title}</a>
								<span className="time">{blog.createTime.toString()}</span>
								<div className="blog-preview">
									{blog.content}
								</div>
								<div className="blog-count">
									<i className="fa fa-commenting-o"/>
									<span className="number">{blog.counts.comment}</span>
								</div>
							</li>
						))
					}
				</ul>
			</div>
    );
	}
}