import React from "react"
import CDN from "../../../cdn"

export default class Index extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			description: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			cssFile: [ "/css/theme.css", "/css/index/index.css" ],
      jsFile: [ "/js/index/index.js" ]
		}
	}

  constructor (props) {
    super();
    this.state = {
      index: props.index,
      animationState: "enter"
    }
  }

  random () {
    let {imgs} = this.props;
    let {index} = this.state;
    while (true) {
      let tmp = Math.floor(imgs.length * Math.random());
      if (tmp !== index) {
        return tmp;
      }
    }
  }

  onChange () {
    this.setState({
      animationState: "leave"
    }, () => {
      setTimeout(() => {
        this.setState({
          index: this.random(),
          animationState: "enter"
        })
      }, 800);
    });
  }

	render() {
    let {imgs} = this.props;
    let {index, animationState} = this.state;
    return (
    	<div className="main" onClick={e => this.onChange()}>
        <img className={"background background-fade-" + animationState} src={CDN(imgs[index])}/>
        <div className="box" onClick={e => e.stopPropagation()}>
          <div className="avatar"/>
          <p>stay hungry. stay foolish.</p>
          <nav className="nav">
            <a href="/">Home</a>
            <a href="/blogs">Blog</a>
            <a href="/about">About</a>
          </nav>
        </div>
		  </div>
    );
	}	
}