import React from "react"
import Showdown from "showdown"
import ajax from "client-ajax"
import "../../lib/date"
let converter = new Showdown.Converter()

export default class Blog extends React.Component {
	static getMeta () {
		return {
			title: "廖仲武的博客 - Liaozhongwu's Blog",
			description: "廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/css/theme.css", "/css/blog.css" ],
			jsFile: [ "/page/blog.js" ]
		}
	}
	constructor (props) {
		super();
		this.state = {
			blog: props.blog,
			comments: props.comments,
			comment: {
				name: "",
				phone: "",
				email: "",
				content: ""
			},
			commentMsg: ""
		}
	}
	handleSubmit () {
		let {blog, comments, comment} = this.state

		if (!comment.name) {
			this.setState({
				commentMsg: "please input your name"
			});
			return;
		}
		if (!comment.content) {
			this.setState({
				commentMsg: "please input your content"
			});
			return;
		}

		ajax({
			url: "/comment/save", 
			method: "post",
			data: {
				bid: blog._id,
				name: comment.name,
				phone: comment.phone,
				email: comment.email,
				content: comment.content
			},
			before: () => {
				this.setState({
					commentMsg: "submiting...",
				});
			},
			success: (resp) => {
				comments.push(resp.body);
				this.setState({
					comments: comments,
					comment: {
						name: "",
						phone: "",
						email: "",
						content: ""
					},
					commentMsg: "submit success",
				});
			},
			error: () => {
				this.setState({
					commentMsg: "submit failure",
				});
			},
			complete: () => {
				setTimeout(() => {
					this.setState({
						commentMsg: "",
					});
				}, 2000);
			}
		});	
	}
	handleCommentValueChange (key, value) {
		let {comment} = this.state;
		comment[key] = value;
		this.setState({
			comment: comment
		});
	}
	renderComments () {
		let {comments, comment, commentMsg} = this.state
		let html = []
		comments.map(function (comment, i) {
			html.push(
				<li className="item comment" key={i}>
					<span className="comment-label">{comment.name}:</span>
					<span className="time">{comment.createTime.toString()}</span>
					<span className="comment-content">{comment.content}</span>
				</li>
			)
		})
		html.push(
			<li className="item" key="add">
				<form className="form">
					<div className="form-group">
						<label className="label">name*:</label>
						<input className="input" type="text" name="name" placeholder="name" required
							value={comment.name} onChange={e => this.handleCommentValueChange("name", e.target.value)}/>
					</div>
					<div className="form-group">
						<label className="label">phone:</label>
						<input className="input" type="text" name="phone" placeholder="phone"
							value={comment.phone} onChange={e => this.handleCommentValueChange("phone", e.target.value)}/>
					</div>
					<div className="form-group">
						<label className="label">email:</label>
						<input className="input" type="text" name="email" placeholder="email"
							value={comment.email} onChange={e => this.handleCommentValueChange("email", e.target.value)}/>
					</div>
					<div className="form-group">
						<label className="label">content*:</label>
						<textarea className="textarea" name="content" placeholder="content" required
							value={comment.content} onChange={e => this.handleCommentValueChange("content", e.target.value)}></textarea>
					</div>
	    			<div className="form-group">
						<label className="label"></label>
	    				<input className="btn" type="button" value="提交评论" onClick={e => this.handleSubmit()}/>
	    				<span className="msg-btn">{ commentMsg }</span>
	    			</div>
				</form>
			</li>
		);
		return html;
	}
	render() {
		let {blog} = this.state
    return (
    	<div className="content">
  			<p className="title">
  				{blog.title}
  				<span className="time">{blog.createTime.toString()}</span>
  			</p>
				<article className="article" dangerouslySetInnerHTML={{__html: converter.makeHtml(blog.content)}}></article>
				<ul className="list">
					{ this.renderComments() }
				</ul>
			</div>				
    );
	}
}