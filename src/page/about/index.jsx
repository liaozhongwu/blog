import React from "react";
import CDN from "../../../lib/cdn";

export default class About extends React.Component {
	static getMeta () {
		return {
			title: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
			description: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
			cssFile: [ "/css/theme.css", "/css/about/index.css" ]
		}
	}
	renderList () {
		var {abouts} = this.props;
		var html = [];
		abouts.map((about, i) => {
			html.push(<div className="form-group" key={ i }>
				<label className="label">{about.title}</label>
				<span className="form-static" dangerouslySetInnerHTML={{__html: about.content}} />
			</div>);
		});
		return html;
	}
  	render () {
	    return (
	    	<div className="content">
	    		<form className="form">
	    			{ this.renderList() }
	    			<img className="qrcode-weixin" src={CDN("/img/weixin.png")}/>
	    		</form>
				</div>
	    );
	}
}