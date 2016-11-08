import React from "react"
import ajax from "client-ajax"

export default class Secret extends React.Component {	
	static getMeta () {
		return {
			title: "廖仲武的博客 - Liaozhongwu's Blog",
			description: "廖仲武的博客 - Liaozhongwu's Blog",
			cssFile: [ "/vendor/font-awesome/css/font-awesome.min.css", "/css/theme.css", "/page/secret/index.css" ],
			jsFile: [ "/page/secret/index.js" ]
		}
	}
	constructor(props) {
		super(props)
		this.state = {
			model: 1, // 1查询 2添加
			lisence: "",
			password: "",
			msg: ""
		}
	}
	handleModelChange(model) {
		this.setState({
			model,
			lisence: "",
			password: "",
			msg: ""
		})
	}
	handleValueChange(key, value) {
		this.setState({
			[key]: value
		})
	}
	handleQuery() {
		const {lisence} = this.state
		ajax({
			url: "/secret/query",
			data: { lisence }
		}).then(data => {
			this.setState({
				msg: data.msg
			})
		})
	}
	handleSave() {
		const {lisence, password} = this.state
		ajax({
			url: "/secret/save",
			method: "post",
			data: {lisence, password}
		}).then(data => {
			this.setState({
				msg: data.msg
			})
		})
	}
	renderForm() {
		const {model, lisence, password, msg} = this.state
		if (model === 1) {
			return (
				<form className="form">
					<div className="form-group">
						<div className="form-control">
							<label className="label">车牌</label>
							<input className="input" type="text" name="lisence" placeholder="车牌" required
								value={lisence} onChange={e => this.handleValueChange("lisence", e.target.value)}/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-control">
							<input className="btn" type="button" value="查询" onClick={e => this.handleQuery()}/>
							<span className="form-static">{msg}</span>
						</div>
					</div>
				</form>
			)
		} else if (model === 2) {
			return (
				<form className="form">
					<div className="form-group">
						<div className="form-control">
							<label className="label">车牌</label>
							<input className="input" type="text" name="lisence" placeholder="车牌" required
								value={lisence} onChange={e => this.handleValueChange("lisence", e.target.value)}/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-control">
							<label className="label">密码</label>
							<input className="input" type="text" name="lisence" placeholder="密码" required
								value={password} onChange={e => this.handleValueChange("password", e.target.value)}/>
						</div>
					</div>
					<div className="form-group">
						<div className="form-control">
							<input className="btn" type="button" value="收录" onClick={e => this.handleSave()}/>
							<span className="form-static">{msg}</span>
						</div>
					</div>
				</form>
			)
		}
	}
	render() {
		const {model} = this.state
		return (
			<div className="content">
				<div className="tabs">
					<div className={model === 1 ? "tab active" : "tab"} onClick={e => this.handleModelChange(1)}>我要查询</div>
					<div className={model === 2 ? "tab active" : "tab"} onClick={e => this.handleModelChange(2)}>我要收录</div>
				</div>
				{ this.renderForm() }
			</div>
		);
	}
}