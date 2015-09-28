import React from "react";

export default class Index extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ],
			// jsFile: [ "/page/index.js" ]
		}
	}
	renderList () {
		var notices = this.props.data;
		var html = [];
		notices.map((notice, i) => {
			html.push(<li className="item" key={ i }>
				<span className="time">{notice.createTime}</span>
				<span dangerouslySetInnerHTML={{__html: notice.title}}></span>
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