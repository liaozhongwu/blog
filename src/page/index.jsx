import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default class Index extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/theme.css" ],
			jsFile: [ "/page/index.js" ]
		}
	}
	renderList () {
		var notices = this.props.data;
		var html = [];
		notices.map((notice, i) => {
			html.push(<li className="item" key={ i }>
				<span dangerouslySetInnerHTML={{__html: notice.title}}></span>
				<span className="time">{notice.createTime}</span>
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