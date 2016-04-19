import React from "react"

export default class Index extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			description: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			cssFile: [ "/css/theme.css", "/css/index/index.css" ]
		}
	}
	render() {
		let {notices} = this.props
    return (
    	<div className="content">
    		<div className="magic">
    			<div className="magic-block">
    				<img src="/img/node.png" alt="node" title="node"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/mongo.png" alt="mongo" title="mongo"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/npm.png" alt="npm" title="npm"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/react.png" alt="react" title="react"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/gulp.png" alt="gulp" title="gulp"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/webpack.png" alt="webpack" title="webpack"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/html5.png" alt="html5" title="html5"/>
    			</div>
    			<div className="magic-block">
    				<img src="/img/css3.png" alt="css3" title="css3"/>
    			</div>
    		</div>
			</div>
    );
	}	
}