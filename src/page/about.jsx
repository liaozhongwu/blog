import React from "react";
import Header from "../component/Header";
import Footer from "../component/Footer";

export default class About extends React.Component {
	static getMeta () {
		return {
			cssFile: [ "/theme.css" ],
			jsFile: [ "/page/about.js" ]
		}
	}
	renderList () {
		var abouts = this.props.data;
		var html = [];
		abouts.map((about, i) => {
			html.push(<p key={ i }><label className="label">{about.title}</label>{about.content}</p>);
		});
		return html;
	}
  	render () {
	    return (
	    	<div className="content">
	    		{ this.renderList() }
			</div>
	    );
	}
}