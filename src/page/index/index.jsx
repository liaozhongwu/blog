import React from "react"
import Random from "../../../lib/random"
import CDN from "../../../cdn"

export default class Index extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			description: "廖仲武的个人网站 - Liaozhongwu's Personal Website",
			cssFile: [ "/css/theme.css", "/page/index/index.css" ],
      jsFile: [ "/page/index/index.js" ]
		}
	}

  constructor (props) {
    super();
    this.state = {
      img: Random(props.imgs),
      animationType: null,
      animationState: null
    }
  }

  onChange () {
    let types = ["fade", "scale", "scalex", "scaley"]
    let {imgs} = this.props
    let {img, animationType} = this.state
    let i, t
    while (true) {
      i = Random(imgs)
      if (i !== img) {
        break;
      }
    }
    while (true) {
      t = Random(types)
      if (t !== animationType) {
        break;
      }
    }
    this.setState({
      animationType: t,
      animationState: "leave"
    }, () => {
      setTimeout(() => {
        this.setState({
          img: i,
          animationState: "enter"
        })
      }, 500);
    });
  }

	render() {
    let {img, animationType, animationState} = this.state;

    let bgClass = "background"
    if (animationType && animationState) {
      bgClass += " background-" + animationType + "-" + animationState
    }
    return (
    	<div className="main" onClick={e => this.onChange()}>
        <img className={bgClass} src={CDN(img)}/>
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