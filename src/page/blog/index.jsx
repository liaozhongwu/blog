import React from "react"
import ajax from "client-ajax"
import "@lib/date"

export default class Blog extends React.Component {
	static getMeta () {
		return {
			title: "廖仲武的博客 - Liaozhongwu's Blog",
			description: "廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/css/theme.css", "/css/highlight.css", "/page/blog/index.css" ],
			jsFile: [ "/page/blog/index.js" ]
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

		if (!comment.content) {
			this.setState({
				commentMsg: "please input your content"
			});
			return;
		}
		if (!comment.name) {
			this.setState({
				commentMsg: "please input your name"
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
			success: (body) => {
				comments.push(body);
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
	render() {
		let {blog, comments, comment, commentMsg} = this.state
    return (
    	<div className="content">
  			<p className="title">
  				<span className="title-content">{blog.title}</span>
  				<span className="time">{blog.createTime.toString()}</span>
  			</p>
				<article className="article" dangerouslySetInnerHTML={{__html: blog.marked}}/>
				<ul className="list">
					{
						comments.map( (comment, i) => (
							<li className="item comment" key={i}>
								<p className="comment-title">
									<span className="comment-label">{comment.name}:</span>
									<span className="time">{comment.createTime.toString()}</span>
								</p>
								<article className="comment-content" dangerouslySetInnerHTML={{__html: comment.marked}} />
							</li>
						))
					}
				</ul>
				<form className="form">
					<div className="form-group">
						<label className="label">content*:</label>
						<div className="form-control">
							<textarea className="textarea" name="content" placeholder="content" required
								value={comment.content} onChange={e => this.handleCommentValueChange("content", e.target.value)}></textarea>
						</div>
					</div>
					<div className="form-group">
						<label className="label">name*:</label>
						<div className="form-control">
							<input className="input" type="text" name="name" placeholder="name" required
								value={comment.name} onChange={e => this.handleCommentValueChange("name", e.target.value)}/>
						</div>
					</div>
					<div className="form-group">
						<label className="label">phone:</label>
						<div className="form-control">
							<input className="input" type="text" name="phone" placeholder="phone"
								value={comment.phone} onChange={e => this.handleCommentValueChange("phone", e.target.value)}/>
						</div>
					</div>
					<div className="form-group">
						<label className="label">email:</label>
						<div className="form-control">
							<input className="input" type="text" name="email" placeholder="email"
								value={comment.email} onChange={e => this.handleCommentValueChange("email", e.target.value)}/>
						</div>
					</div>
	    		<div className="form-group">
						<label className="label"></label>
						<div className="form-control">
	    				<input className="btn" type="button" value="提交评论" onClick={e => this.handleSubmit()}/>
	    				<span className="msg-btn">{ commentMsg }</span>
	    			</div>
	    		</div>
				</form>
			</div>				
    );
	}
}