import React from "react";

export default class About extends React.Component {
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css", "/css/about.css" ],
			// jsFile: [ "/page/about.js" ]
		}
	}
	renderList () {
		var {abouts} = this.props;
		var html = [];
		abouts.map((about, i) => {
			html.push(<div className="form-group" key={ i }>
				<label className="label">{about.title}</label>
				<span className="form-static">{about.content}</span>
			</div>);
		});
		return html;
	}
  	render () {
	    return (
	    	<div className="content">
	    		<form className="form">
	    			{ this.renderList() }
	    			<img className="qrcode-weixin" src="/img/weixin.png"/>
	    		</form>
			</div>
	    );
	}
}