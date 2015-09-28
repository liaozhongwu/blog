import React from "react";

export default class Header extends React.Component {
  render() {
    return (
		<header className="header">
			<nav className="nav">
				<a href="/">首页</a>
				<a href="/blogs">博客</a>
				<a href="/about">关于</a>
				<a href="/other">其它</a>
			</nav>
			<div className="motto">
				<img className="avatar" src="/img/avatar.jpg"/>
				<p>stay hungry, stay foolish</p>
			</div>
		</header>
    );
  }
}