import React from "react"

export default class Notice extends React.Component {	
	static getMeta () {
		return {
			cssFile: [ "/css/theme.css" ]
		}
	}
	render() {
		let {notices} = this.props
    return (
    	<div className="content">
    		{notices.map((notice, i) => <p key={i} className="notice" dangerouslySetInnerHTML={{__html: notice.title}}/>)}
			</div>
    );
	}	
}