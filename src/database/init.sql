create schema if not exists blog default character set utf8 collate utf8_general_ci;

use blog;

create table if not exists blog (
	id int primary key auto_increment,
	title varchar(64) not null,
	content text not null,
	createTime timestamp default current_timestamp,
	index(title)
);

create table if not exists notice (
	id int primary key auto_increment,
	title varchar(128) not null,
	createTime timestamp default current_timestamp,
	index(title)
);

create table if not exists about (
	id int primary key auto_increment,
	title varchar(64) not null,
	content varchar(64) not null,
	createTime timestamp default current_timestamp,
	index(title)
);

insert into blog(title, content) values("雪颂", 
'雪花肆意飘洒
大地银装素裹
世界变得纯净而寂寞

刺骨的冷风倚着枝头曼舞
古老的音调如同神秘咒语

在飘零的雪花间依洄
在流浪的思潮里汹涌
汹涌着淡淡的欣愉
欣愉与你此刻的相逢

你是优雅的精灵
从不掩饰自己的美

雄伟的山川是你华丽的舞姿
潺潺的流水是你深情的密语
笔下的文字是你迷人的微笑

静谧的倩影
迷人的暗香
冗长的寒夜里格外动人

你是冷艳的精灵
自深邃的高空缓缓滑落
奔向这片未知的土地

冰冷足以冻结四海
艳丽迫使百花蒙羞

哪怕落地的瞬间便是融化
也不辜负歌咏你的诗篇

你是纯洁的精灵
上天将纯洁的你洒向人间
净化茫茫浮躁的尘世

无边无际的洁白是你灵魂的色彩
如月华般的光亮是你甜美的面庞
精心雕刻的轮廓是你傲人的身形

黯淡的大地不再凋零
灰败的枫叶不再哭泣

站在你柔软的手心里无声的呐喊
向纯洁的冰雪女神倾诉不能诉说的心境

世事变化
沧海桑田
唯有你不识人间烟火
唯有你依然美丽记忆
永恒的纯白
不老的容颜

感谢倾情陪伴
直到生命终结');
insert into blog(title, content) values("Promise的理解", 
'## Overview

在Promise产生之前，由于JS的异步特性，一般的异步操作是通过回调来处理的

于是在复杂的代码逻辑就出现传说中的回调大坑

    step1(function (value1) {
        // do something with value1
        step2(function (value2) {
            // do something with value2
            step3(function (value3) {
                // do something with value3
                step4(function (value4) {
                    ...
                })
            })
        });
    });

Promise则很好的解决了这个问题，用Promise可以写出这样优雅的代码
    
    step1() 
    .then(step2)
    .then(step3)
    .then(step4)
    .catch(function (err) { 
        // handle error
    })
    .done()
    
异步操作的处理决定了Promise必须是有状态的，一般来说有等待、解决、拒绝三种状态

等待态一般是等待请求数据，这时Promise会延迟直到数据返回

解决态一般为Promise执行成功，此时把数值通过正常处理函数返回

拒绝态一般为Promise发生错误，此时把错误通过异常处理函数抛出

由此创建Promise对象一般需要一个决定解决或拒绝的函数

该函数在对象创建时被执行以获得当前状态，接着Promise等待处理函数

    var promise = new Promise(function (reslove, reject) {
        // do something
        if (...) {
            resolve(value);
        } else {
            reject(error);  
        }
    });
    
Promise的then是Promise的处理函数，对应于Promise状态then必须有相应的处理函数onResolve和onReject

规范约定了then第一个参数表示onResolve，第二个参数表示onReject，不处理某状态可为空或null

    promise.then(function (value) {
        // handle value
    }, function (error) {
        // handle error
    });

Promise会根据当前状态决定执行onResolve或者onReject，一般onResolve处理数据，onReject处理异常

为了实现优雅的链式调用，then同样返回Promise对象

并且当前then处理函数onResolve/onReject的返回值被保存在Promise对象中

以便Promise提供给下一个then处理函数onResolve/onReject使用

    promise.then(function (value1) {
        // handle value1
        return value2;
    }).then(function (value2) {
        // handle value2
        return value3;
    }).then(function (value3) {
        // handle value3
    });

因为链式调用的关系，如果Promise为拒绝态，那么链式调用所有的onResolve都不会被调用，所以可以在最后捕获异常

    promise.then(...).then(...).then(..., function (error) {
        // handle error
    });

为了符合语义化，Promise使用catch专门处理错误，catch只接受onReject处理函数
    
    promise.then(...).then(...).catch(function (error) {
        // handle error
    });
    
基于返回值的链式调用也决定了Promise只能有一个值，如果想处理多个变量可以使用数组或对象

当然Promise也提供了all方法解决这一问题

Promise.all(iterable) 接受一个可迭代对象参数，一般为promise数组，返回一个promise对象，该对象会在参数中所有promise处理完之后才会处理，此时该promise处理的值应为之前所有返回值的数组

    var p1 = Promise.resolve(1);
    var p2 = Promise.resolve(2);
    
    Promise.all([p1, p2])
    .then(function (value) {
        // [1, 2]
    });

综上所述，Promise至少有的闭包变量为：state状态、Value/Error值、onResolve/OnReject处理函数');

insert into blog(title, content) values("ESMAScript6笔记", 
'## 1. let
在ECMAScript5中变量是没有块级作用域的，函数体中所有用到的，也即变量提升，ECMAScript新增的let允许声明块级作用于，使得变量只在块级内生效

	for (var i = 0; i < array.length; i++) {
		(function (index) {
			// do something with index
		})(i);
	}
	for (let i = 0; i< array.length; i++) {
		// do something with i
	}

## 2. const
熟悉C++的知道const表示变量不能被修改，但是对于对象其属性还是可以更改，书中建议使用Object.freeze(obj)和Object.deepFreeze(obj)来使得对象的属性不能被更改
 
	const a = "a";
	a = "b"; // fail
	const obj = Object.freeze({a: "a"});
	obj.a = "b"; // fail
	const obj2 = Object.deepFreeze({a: {value: "a"}};
	obj2.a.value = "b"; // fail
 
## 3. 解构赋值
ES6允许批量地从对象或者数组中提取值赋予一组变量

	var [a, b] = [1, 2]; // var a = 1, b = 2
	var {a, b} = {a: 1, b: 2}; // var a = 1, b = 2

## 4. 字符串扩展
	boolean include(str); // 是否能找到字符串
	boolean startsWith(str); // 是否以字符串开始
	boolean endsWidth(str); // 是否以字符串结束

## 5. 函数扩展

	// 可以设置默认值
	function (x = 1) {
		console.log(x); // 1
	}
	// 箭头函数
	() => {} // function () {}

## 6. Set
类似于数组，但元素不能重复，有如下成员函数

	add(value);
	delete(value);
	has(value);
	clear();
	keys();
	values();
	entries();
	forEach(func);
	
## 7. Map
类似与对象，但键可以为任何值，成员函数与Set一致

## 8. 原生Promise对象

	var promise = new Promise(function (resolve, reject) {
		if (...) {
			resolve(value);
		} else {
			reject(error);
		}
	});
	promise.then(function (value) {}, function (error) {})

## 9. generator函数
使用function*声明，函数内部使用yield标注状态，外部使用next()，yield可用于同步操作、控制流

	// callback
	step1(function (value1) {
		step2(function (value2) { 
    	    	
		})
	});
 
	//Promise
	step1()
	.then(step2)
	.catch()
	.done()
 
	// generator
	function* () {
		var value1 = yield step1();
		var value2 = yield step2();
	}

## 10. Class getter setter

	// ES5
	function Point (x, y) {
		this.x = x;
		this.y = y;
	}
	Point.prototype.toString = function () {
		return "(" + this.x + "," + this.y + ")";
	}
	// ES6
	Class Point {
		constructor(x, y) {
			this.x = x;
			this.y = y;
		}
		toString () {
			return "(" + this.x + "," + this.y + ")";
		} 
		set x(x) {this.x = x;}
		get x() {return this.x;}
		set y(y) {this.y = y;}
		get y() {}
	}');
insert into blog(title, content) values('Node Addon开发指南', 
'#一. 技术支持
Node实现跨平台和语言扩展的核心技术有：

在0.8版本中，node决定采用一种跨平台效果明显的项目生成器 - GYP(generate your project)，可以帮助开发者生成各个平台下的项目文件，node源码就是用GYP编译的。

V8引擎是Node的动力来源之一。它自身由C++写成，可以实现JavaScript与C++的互相调用。

libuv库是Node的动力来源之二。Node能够实现跨平台的一个诀窍就是它的libuv库，这个库是跨平台的一层封装，通过它去调用一些底层操作，比自己在各个平台下编写实现要高效得多。libuv封装的功能包括事件循环、文件操作等。

node-gyp和node-ffi是两个可以实现node调用C代码的模块，实例如下：

以下所有代码的运行环境为

system: OS X

node version: V0.12.2

npm version: V2.12.1

# 二. GYP
## 2.1. 依赖包：
node-gyp：<https://www.npmjs.com/package/node-gyp>（全局安装）

nan：<https://www.npmjs.com/package/nan>

bindings：<https://www.npmjs.com/package/bindings> （可选）

## 2.2. 步骤：
### 2.2.1. 创建binding.gyp文件

	{
		"targets": [
			{
				"target_name": "arithmetic",
				"sources": [ "lib.c", "arithmetic.cc" ]
			}
		]
	}
	
详细字段请见https://chromium.googlesource.com/external/gyp/+/master/docs/UserDocumentation.md

### 2.2.2. 创建lib.h头文件和lib.c实现文件

	// lib.h 运算库头文件
	#ifndef ARITHMETIC_H
	#define ARITHMETIC_H
	extern int add(int a, int b);
	extern int subtract(int a, int b);
	extern int multiply(int a, int b);
	extern int divide(int a, int b);
	extern int factorial(int max);
	#endif
 
	// lib.c 运算库的C代码实现
	#include "lib.h"
	int add(int a, int b) {
		return a + b;
	}
	int subtract(int a, int b) {
		return a - b;
	}
	int multiply(int a, int b) {
		return a * b;
	}
	int divide(int a, int b) {
		return a / b;
	}
	int factorial(int max) {
		int i = max;
		int result = 1;
		while (i >= 2) {
			result *= i--;
		}
		return result;
	}
	
### 2.2.3. 创建arichmetic.cc文件引入头文件并创建node模块

	#include <node.h>
	#include <v8.h>
	using namespace v8;
	// 引入运算库头文件
	extern "C" {
		#include "lib.h"
	}
	// 声明参数检查函数
	extern bool checkArgs(const v8::FunctionCallbackInfo<Value>& args, int maxLength);
	// 封装C函数为node可识别的函数
	void Node_Add(const v8::FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = Isolate::GetCurrent();
		HandleScope scope(isolate);
		if (checkArgs(args, 2)) {
			int value = add(args[0]->NumberValue(), args[1]->NumberValue());
			args.GetReturnValue().Set(Number::New(isolate, value));
		}
	}
	void Node_Subtract(const v8::FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = Isolate::GetCurrent();
		HandleScope scope(isolate);
		if (checkArgs(args, 2)) {
			int value = subtract(args[0]->NumberValue(), args[1]->NumberValue());
			args.GetReturnValue().Set(Number::New(isolate, value));
		}
	}
	void Node_Multiply(const v8::FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = Isolate::GetCurrent();
		HandleScope scope(isolate);
		if (checkArgs(args, 2)) {
			int value = multiply(args[0]->NumberValue(), args[1]->NumberValue());
			args.GetReturnValue().Set(Number::New(isolate, value));
		}
	}
	void Node_Divide(const v8::FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = Isolate::GetCurrent();
		HandleScope scope(isolate);
		if (checkArgs(args, 2)) {
			int value = divide(args[0]->NumberValue(), args[1]->NumberValue());
			args.GetReturnValue().Set(Number::New(isolate, value));
		}
	}
	void Node_Factorial(const v8::FunctionCallbackInfo<Value>& args) {
		Isolate* isolate = Isolate::GetCurrent();
		HandleScope scope(isolate);
		if (checkArgs(args, 1)) {
			int value = factorial(args[0]->NumberValue());
			args.GetReturnValue().Set(Number::New(isolate, value));
		}
	}
	// 检查参数长度和数据类型
	bool checkArgs(const v8::FunctionCallbackInfo<Value>& args, int maxLength) {
		Isolate* isolate = Isolate::GetCurrent();
		if (args.Length() < maxLength) {
			isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong number of arguments")));
			return false;
		}
		for (int i = 0; i < maxLength; i++) {
			if (!args[i]->IsNumber()) {
				isolate->ThrowException(Exception::TypeError(
				String::NewFromUtf8(isolate, "Wrong arguments")));
				return false;
			}
		}
		return true;
	}
	// 定义node模块
	void Init(Handle<Object> exports, Handle<Object> module) {
		NODE_SET_METHOD(exports, "add", Node_Add);
		NODE_SET_METHOD(exports, "subtract", Node_Subtract);
		NODE_SET_METHOD(exports, "multiply", Node_Multiply);
		NODE_SET_METHOD(exports, "divide", Node_Divide);
		NODE_SET_METHOD(exports, "factorial", Node_Factorial);
	}
	NODE_MODULE(arithmetic, Init)
	
### 2.2.4. 创建arithmetic.js文件调用该模块

	// 没有安装bindings的加载方式
	// var addon = require("./build/Release/arithmetic.node");
	// bindings的加载方式
	var addon = require("bindings")("arithmetic");
	console.log("the result of 5 add 5 is: " + addon.add(5, 5));
	console.log("the result of 5 subtract 5 is: " + addon.subtract(5, 5));
	console.log("the result of 5 multiply 5 is: " + addon.multiply(5, 5));
	console.log("the result of 5 divide 5 is: " + addon.divide(5, 5));
	console.log("the result of factorial 5 is: " + addon.factorial(5));
	
### 2.2.5. 执行命令

	node-gyp configure
	node-gyp build
	node arithmetic.js
	// 如找不到node-gyp命令，可全局安装node-gyp，或使用node_modules/node-gyp/bin/node-gyp.js代替
	// 可用node-gyp rebuild代替configure和build
	// output :
	// the result of 5 add 5 is: 10
	// the result of 5 subtract 5 is: 0
	// the result of 5 multiply 5 is: 25
	// the result of 5 divide 5 is: 1
	// the result of factorial 5 is: 120
## 2.3. 目录结构：

	-build（gyp生成目录，勿手动添加）
		-Release
			-...
			arithmetic.node（生成的node模块，二进制）
		...
	arithmetic.cc（C++文件）
	arithmetic.js（node执行js文件）
	binding.gyp （gyp配置文件）
	lib.h（C头文件）
	lib.c（C实现文件）
	package.json（npm配置文件）
	run.sh（执行脚本）
	
## 2.4. 备注：
1.如找不到node-gyp命令，可npm install -g node-gyp，或使用node_modules/node-gyp/bin/node-gyp.js代替

2.C代码实现的库文件不能与C++文件同名，否则会加载异常

# 三. node-ffi
## 3.1. 依赖包：
node-ffi: <https://www.npmjs.com/package/node-ffi>

## 3.2. 步骤：
### 3.2.1. 创建arithmetic.c库文件

	#if defined(WIN32) || defined(_WIN32)
	#define EXPORT __declspec(dllexport)
	#else
	#define EXPORT
	#endif
	EXPORT int add(int a, int b) {
		return a + b;
	}
	EXPORT int subtract(int a, int b) {
		return a - b;
	}
	EXPORT int multiply(int a, int b) {
		return a * b;
	}
	EXPORT int divide(int a, int b) {
		return a / b;
	}
	EXPORT int factorial(int max) {
		int i = max;
		int result = 1;
		while (i >= 2) {
			result *= i--;
		}
		return result;
	}
	
### 3.2.2. 创建arithmetic.js调用ffi模块加载库

	var ffi = require("ffi");
	var lib = ffi.Library("./arithmetic", {
		"add": ["int", ["int", "int"]],
		"subtract": ["int", ["int", "int"]],
		"multiply": ["int", ["int", "int"]],
		"divide": ["int", ["int", "int"]],
		"factorial": ["int", ["int"]]
	});
	console.log("the result of 5 add 5 is: " + lib.add(5, 5));
	console.log("the result of 5 subtract 5 is: " + lib.subtract(5, 5));
	console.log("the result of 5 multiply 5 is: " + lib.multiply(5, 5));
	console.log("the result of 5 divide 5 is: " + lib.divide(5, 5));
	console.log("the result of factorial 5 is: " + lib.factorial(5));
	
### 3.2.3. 执行命令

	gcc -dynamiclib -undefined suppress -flat_namespace arithmetic.c -o arithmetic.dylib
	node arithmetic.js
	// output :
	// the result of 5 add 5 is: 10
	// the result of 5 subtract 5 is: 0
	// the result of 5 multiply 5 is: 25
	// the result of 5 divide 5 is: 1
	// the result of factorial 5 is: 120
	
## 3.3. 目录结构：
	arithmetic.c（C文件）
	arithmetic.dylib（二进制动态库）
	arithmetic.js（node执行js文件）
	package.json（npm配置文件）
	run.sh（执行脚本）

# 四. 其他

node-ffi（foreign function interface）适用于简单的函数调用，使用相对方便

node-gyp（generate your project）功能更加完善，适用于复杂的应用场景

PS：以上所有代码的运行环境为

system: OS X

node version: V0.12.2

npm version: V2.12.1

linux和windows以及node版本较低的情况请参考

<https://github.com/nodejs/node-addon-examples>

<https://github.com/node-ffi/node-ffi/tree/master/example/factorial>');

insert into blog(title, content) values('V8 C++开发总结', 
'# 一. Overview
V8是由谷歌开发的开源高性能Javascript引擎，源码由C++编写而成，被谷歌用于chrome浏览器，也是node构建的Javascript引擎。

官网：<https://developers.google.com/v8/?hl=zh-CN>

github：<https://github.com/v8/v8>

官网好像没有提供详细的document，详细API可以参见<http://izs.me/v8-docs/>

# 二. Features
## 2.1. Isolate
Isolate可以看成V8引擎的一个实例，不同Isolate不能获取到其他isolate中的变量

V8会创建一个默认的Isolate，可以通过Isolate::getCurrent()获取当前实例(默认)

也可以通过Isolate::new()来创建实例，注意要使用HandleScope来进入Isolate，这时Isolate::getCurrent()将返回该isolate
## 2.2. Context
Context是V8引擎的上下文环境(类似于js的Global变量)，同样一个Isolate对应一个Context

可以通过isolate->getCurrentContext()获取当前isolate的上下文环境，也可以通过Context::new()来创建
## 2.3. Value
V8封装了很多的基本类型，有最基本的Number、String、Boolean，也有复杂的Array、Object、RegExp，还有与node直接关联的Function、Script等等

这些类型都继承自共同的父类Value

Value类中封装了类型判断和转换的成员函数，例如IsNumber和ToNumber，满足对变量类型的需要
# 三. Usage
V8编写一个可以被node识别的二进制module，需要使用指定的函数和遵循一定的规范。

在最新版本的V8代码中，编写一个node模块有如下几个步骤：

1.首先需要引入node和v8的C++头文件，一般情况下这两个头文件在node安装路径中的include目录下，include下还有一些其他特定功能的头文件按需使用

	#include <node.h>
	#include <v8.h>
	
2.然后编写函数代码

	// public function
	void Node_Add(const v8::FunctionCallbackInfo<Value>& args) {
    	Isolate* isolate = Isolate::GetCurrent();
    	HandleScope scope(isolate);
    	if (checkArgs(args, 2)) {
        	int value = add(args[0]->NumberValue(), args[1]->NumberValue());
        	args.GetReturnValue().Set(Number::New(isolate, value));
    	}
	}
	// private function
	int add(int a, int b) {
  		return a + b;
	}
	bool checkArgs(const v8::FunctionCallbackInfo<Value>& args, int maxLength) {
    	Isolate* isolate = Isolate::GetCurrent();
    	if (args.Length() < maxLength) {
      		isolate->ThrowException(Exception::TypeError(
            	String::NewFromUtf8(isolate, "Wrong number of arguments")));
        	return false;
    	}
    	for (int i = 0; i < maxLength; i++) {
        	if (!args[i]->IsNumber()) {
            	isolate->ThrowException(Exception::TypeError(
                	String::NewFromUtf8(isolate, "Wrong arguments")));
            	return false;
        	}
    	}
    	return true;
	}

这里Node_Add是要暴露给node的函数，这个函数需要有如下特性：

参数类型必须为const v8::FunctionCallbackInfo<Value>&，该类型为V8封装的参数处理类型(类似于js的arguments)，node传递的参数通过数组取值的方式获取

进入isolate以处理变量，通常做法是直接获取当前isolate使用

一般为void函数无返回值，node只能读取通过args.GetReturnValue().Set(return)设置的返回值

3.定义node模块

	// 定义node模块
	void Init(Handle<Object> exports, Handle<Object> module) {
    	NODE_SET_METHOD(exports, "add", Node_Add);
	}
	NODE_MODULE(arithmetic, Init)

NODE_MODULE是V8内建函数，用于定义node模块

第二个函数是定义函数，通常有两个参数exports和module(同于node定义模块)，如果不需要改变exports则不需要module参数

NODE_SET_METHOD也是V8内建函数，用于给exports添加属性

4.至此一个用V8定义的Node模块就完成了，接下来用node-gyp编译出二进制文件就可以给node使用

最后写个node代码测试一下成果~

	var addon = require("bindings")("arithmetic");
	console.log("the result of 5 add 5 is: "" + addon.add(5, 5));');
insert into notice(title) values('<a href="/about">lzw</a>create the site');
insert into notice(title) values('<a href="/about">lzw</a>published a blog <a href="/blog/1">雪颂</a>');
insert into notice(title) values('<a href="/about">lzw</a>published a blog <a href="/blog/2">Promise的理解</a>');
insert into notice(title) values('<a href="/about">lzw</a>published a blog <a href="/blog/3">ESMAScript6笔记</a>');
insert into notice(title) values('<a href="/about">lzw</a>published a blog <a href="/blog/4">Node Addon开发指南</a>');
insert into notice(title) values('<a href="/about">lzw</a>published a blog <a href="/blog/5">V8 C++开发总结</a>');
insert into notice(title) values('<a href="/about">lzw</a>create the site');
insert into notice(title) values('<a href="/about">lzw</a>create the site');
insert into notice(title) values('<a href="/about">lzw</a>create the site');
insert into notice(title) values('<a href="/about">lzw</a>create the site');
insert into about(title, content) values("name:", "廖仲武");
insert into about(title, content) values("birthday:", "1995-03-01");
insert into about(title, content) values("education:", "NanJing University");
insert into about(title, content) values("work:", "FrontEnd engineer @meituan");
insert into about(title, content) values("github:", "@liaozhongwu95");
insert into about(title, content) values("email:", "liaozhongwu95@163.com");
insert into about(title, content) values("weibo:", "@梦遥在何方");
insert into about(title, content) values("QQ:", "@840351238");
insert into about(title, content) values("facebook:", "@廖仲武");
insert into about(title, content) values("twitter:", "@liaozhongwu95");