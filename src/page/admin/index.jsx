import React from "react";

export default class Admin extends React.Component {	
	static getMeta () {
		return {
			title: "编辑 - 廖仲武的博客 - Liaozhongwu's Blog",
			description: "编辑 - 廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/css/theme.css" ]
		}
	}
	renderInput () {
		var {blog} = this.props;
		var html = [];
		if (blog) {
			html.push(
				<div className="form-group" key="id">
					<input className="input block-level" type="text" name="id" placeholder="id" defaultValue={blog.id} readOnly/>
				</div>
			);
			html.push(
				<div className="form-group" key="key">
					<input className="input block-level" type="text" name="key" placeholder="key" defaultValue={blog.key}/>
				</div>
			);
			html.push(
				<div className="form-group" key="title">
					<input className="input block-level" type="text" name="title" placeholder="title" defaultValue={blog.title}/>
				</div>
			);
			html.push(
				<div className="form-group" key="content">
					<textarea className="textarea block-level" name="content" placeholder="content" defaultValue={blog.content}></textarea>
				</div>
			);
  	} else {
			html.push(
				<div className="form-group" key="key">
					<input className="input block-level" type="text" name="key" placeholder="key"/>
				</div>
			);
			html.push(
				<div className="form-group" key="title">
					<input className="input block-level" type="text" name="title" placeholder="title"/>
				</div>
			);
			html.push(
				<div className="form-group" key="content">
					<textarea className="textarea block-level" name="content" placeholder="content"></textarea>
				</div>
			);
		}
		return html;
	}
	render() {
    return (
    	<div className="content">
    		<form className="form" action="/blog/save" method="post">
    			{ this.renderInput() }
    			<div className="form-group">
    				<input className="input" type="password" name="password" placeholder="password" />
    			</div>
    			<div className="form-group">
    				<input className="btn" type="submit" value="保存"/>
    			</div>
    		</form>
			</div>
    );
	}	
}