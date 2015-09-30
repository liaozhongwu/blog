import React from "react";
import Showdown from "showdown";
var converter = new Showdown.Converter();

export default class Blog extends React.Component {
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ],
			jsFile: [ "/page/blog.js" ]
		}
	}
	constructor (props) {
		super();
		this.state = {
			data: props.data,
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
		var self = this;
		if (!this.state.comment.name) {
			this.setState({
				commentMsg: "please input your name"
			});
			return;
		}
		if (!this.state.comment.content) {
			this.setState({
				commentMsg: "please input your content"
			});
			return;
		}
		var params = {
			id: this.state.data.id,
			name: this.state.comment.name,
			phone: this.state.comment.phone,
			email: this.state.comment.email,
			content: this.state.comment.content
		};
		$.ajax({
			url: "/comment/save", 
			type: "post",
			data: params, 
			datatype: "json",
			beforeSend: function () {
				self.setState({
					commentMsg: "submiting...",
				});
			},
			success: function (result) {
				var data = self.state.data;
				data.comments.push(result);
				self.setState({
					data: data,
					comment: {
						name: "",
						phone: "",
						email: "",
						content: ""
					},
					commentMsg: "submit success",
				});
			},
			error: function () {
				self.setState({
					commentMsg: "submit failure",
				});
			},
			complete: function () {
				setTimeout(function () {
					self.setState({
						commentMsg: "",
					});
				}, 2000);
			}
		});	
	}
	handleCommentValueChange (key, value) {
		var comment = this.state.comment;
		comment[key] = value;
		this.setState({
			comment: comment
		});
	}
	renderComments () {
		var comments = this.state.data.comments || [];
		var html = [];
		comments.map(function (comment, i) {
			html.push(
				<li className="item comment" key={i}>
					<span className="comment-label">{comment.name}:</span>
					<span className="time">{comment.createTime}</span>
					<span className="comment-content">{comment.content}</span>
				</li>
			);
		});
		html.push(
			<li className="item" key="add">
				<form className="form">
					<div className="form-group">
						<label className="label">name*:</label>
						<input className="input" type="text" name="name" placeholder="name" required
							value={this.state.comment.name} onChange={(e) => {this.handleCommentValueChange("name", e.target.value)}}/>
					</div>
					<div className="form-group">
						<label className="label">phone:</label>
						<input className="input" type="text" name="phone" placeholder="phone"
							value={this.state.comment.phone} onChange={(e) => {this.handleCommentValueChange("phone", e.target.value)}}/>
					</div>
					<div className="form-group">
						<label className="label">email:</label>
						<input className="input" type="text" name="email" placeholder="email"
							value={this.state.comment.email} onChange={(e) => {this.handleCommentValueChange("email", e.target.value)}}/>
					</div>
					<div className="form-group">
						<label className="label">content*:</label>
						<textarea className="textarea" name="content" placeholder="content" required
							value={this.state.comment.content} onChange={(e) => {this.handleCommentValueChange("content", e.target.value)}}></textarea>
					</div>
	    			<div className="form-group">
						<label className="label"></label>
	    				<input className="btn" type="button" value="提交评论" onClick={ (e) => {this.handleSubmit()}}/>
	    				<span className="msg-btn">{ this.state.commentMsg }</span>
	    			</div>
				</form>
			</li>
		);
		return html;
	}
  	render() {
  		var title = this.state.data.title || "";
  		var content = this.state.data.content || "";
  		var createTime = this.state.data.createTime || "";
	    return (
	    	<div className="content">
    			<p className="title">
    				<span className="time">{createTime}</span>
    				{title}
    			</p>
				<article className="article" dangerouslySetInnerHTML={{__html: converter.makeHtml(content)}}></article>
				<ul className="list">
					{ this.renderComments() }
				</ul>
			</div>				
	    );
	}
}