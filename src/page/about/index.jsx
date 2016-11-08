import React from "react";
import CDN from "@cdn";

export default class About extends React.Component {
	static getMeta () {
		return {
			title: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
			description: "廖仲武的个人信息 - Liaozhongwu's Personal Infomation",
			cssFile: [ "/css/theme.css", "/page/about/index.css" ]
		}
	}
	renderList () {
		var {abouts} = this.props;
		var html = [];
		abouts.map((about, i) => {
			html.push(<div className="form-group" key={ i }>
				<div className="form-static">
					{about.title}
					<span className="ml10" dangerouslySetInnerHTML={{__html: about.content}} />
				</div>
			</div>);
		});
		return html;
	}
	render () {
		return (
			<div className="content">
				<img className="qrcode-weixin" src={CDN("/img/weixin.png")}/>
				<form className="form">
					{ this.renderList() }
				</form>
			</div>
		);
	}
}