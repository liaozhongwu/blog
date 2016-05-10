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
      current: Random(props.imgs),
      animationType: null,
      animationState: null
    }
  }

  onChange () {
    let types = ["fade", "scalex", "scaley"]
    let {imgs} = this.props
    let {current, animationType} = this.state
    let img, type
    while (true) {
      img = Random(imgs)
      if (img !== current) {
        break;
      }
    }
    while (true) {
      type = Random(types)
      if (type !== animationType) {
        break;
      }
    }
    this.setState({
      animationType: type,
      animationState: "leave"
    }, () => {
      setTimeout(() => {
        this.setState({
          current: img,
          animationState: "enter"
        })
      }, 500);
    });
  }

	render() {
    let {imgs} = this.props;
    let {current, animationType, animationState} = this.state;

    return (
    	<div className="main" onClick={e => this.onChange()}>
        {
          imgs.map((img , i) => {
            let bgClass = "background"
            if (img === current) {
              if (animationType && animationState) {
                bgClass += " background-" + animationType + "-" + animationState
              }
            } else {
              bgClass += " background-hidden"
            }
            return (<img key={i} className={bgClass} src={CDN(img)}/>)
          })
        }
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