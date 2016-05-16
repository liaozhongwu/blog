(function () {
	var canvas = document.getElementById("canvas")
	var rect = canvas.getBoundingClientRect()
	var context = canvas.getContext('2d')

	function resize (e) {
		canvas.setAttribute("width", window.innerWidth || document.body.clientWidth)
		canvas.setAttribute("height", window.innerHeight || document.body.clientWidth)				
	}

	window.addEventListener("resize", resize)
	resize()

	var points = []
	for (var i = 0; i < 100; ++i) {
		points.push({
			x: random(0, rect.width),
			y: random(0, rect.height),
			r: random(0, Math.PI*2),
			s: 1,
		})
	}
	var mouse = null
	var RAF = (function () {
		return window.requestAnimationFrame || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame || 
			window.oRequestAnimationFrame || 
			window.RequestAnimationFrame || 
			function (func) {
				setTimeout(func, 1000 / 60)
			}
	})()

	function random (min, max) {
		return Math.random() * (max - min) + min
	}

	function near (p1, p2, d) {
		d = d || 100
		if (p1 && p2) {
			var dx = p1.x - p2.x
			var dy = p1.y - p2.y 
			if (dx * dx + dy * dy < d * d) {
				return true;
			}
		}
		return false;
	}

	function getRadian (fromPoint, toPoint) {
		var r = 0;
		if (toPoint.x === fromPoint.x) {
			if (toPoint.y > fromPoint.y) {
				r = 0
			} else {
				r = Math.PI
			}
		} else {
			r = Math.atan((toPoint.y - fromPoint.y) / (toPoint.x - fromPoint.x))

			if (r < 0) {
				r += Math.PI
			}
			if (toPoint.y < fromPoint.y) {
				r += Math.PI
			}
		}
		return r;
	}

	function render () {
		clear()

		points.forEach(function (point) {
			var dx = point.s * Math.cos(point.r)
			var dy = point.s * Math.sin(point.r)

			point.x += dx
			point.y += dy

			if (mouse && near(mouse, point, 150) && !near(mouse, point, 100)) {
				point.x += (mouse.x - point.x) * 0.03
				point.y += (mouse.y - point.y) * 0.03
			}

			if (point.y <= 0 || point.y >= canvas.height) {
				point.r = Math.PI*2 - point.r
			}

			if (point.x <= 0 || point.x >= canvas.width) {
				if (point.r > Math.PI) {
					point.r = Math.PI*3 - point.r
				} else {
					point.r = Math.PI - point.r
				}
			}

			context.fillStyle="#333333"
			context.fillRect(point.x - 0.5, point.y - 0.5, 1, 1)
		})

		if (mouse) {
			var nearPoints = points.filter(function(point) {
				return near(mouse, point, 120)
			}).sort(function (p1, p2) {
				return (getRadian(mouse, p1) > getRadian(mouse, p2)) ? 1 : -1
			})

			nearPoints.forEach(function (point, i) {
				context.beginPath()
				context.lineWidth = 0.5
				context.moveTo(mouse.x, mouse.y)
				context.lineTo(point.x, point.y)
				context.strokeStyle="#495A80"
				context.stroke()
				context.closePath()
				var next = i + 1
				if (next >= nearPoints.length) {
					next = 0
				}
				context.beginPath()
				context.lineWidth = 0.3
				context.moveTo(point.x, point.y)
				context.lineTo(nearPoints[next].x, nearPoints[next].y)
				context.strokeStyle="#495A80"
				context.stroke()
				context.closePath()
			})
		}

		RAF(render)
	}

	function clear () {
		context.clearRect(0, 0, canvas.width, canvas.height)
	}

	canvas.addEventListener("mousemove", function (e) {
		mouse = {
			x: e.clientX,
			y: e.clientY
		}
	})

	canvas.addEventListener("touchmove", function (e) {
		mouse = {
			x: e.clientX,
			y: e.clientY
		}
	})

	canvas.addEventListener("mouseout", function (e) {
		mouse = null
	})

	canvas.addEventListener("mouseleave", function (e) {
		mouse = null
	})

	render()
})()