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

insert into blog(title, content) values('Promise的理解', '在Promise产生之前，由于JS的异步特性，一般的异步操作是通过回调来处理的

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

insert into blog(title, content) values('V8 C++代码总结', '# Overview
V8是由谷歌开发的开源高性能Javascript引擎，源码由C++编写而成，被谷歌用于chrome浏览器，也是node构建的Javascript引擎。

官网：<https://developers.google.com/v8/?hl=zh-CN>

github：<https://github.com/v8/v8>

官网好像没有提供详细的document，详细API可以参见<http://izs.me/v8-docs/>

# Features
## Isolate
Isolate可以看成V8引擎的一个实例，不同Isolate不能获取到其他isolate中的变量

V8会创建一个默认的Isolate，可以通过Isolate::getCurrent()获取当前实例(默认)

也可以通过Isolate::new()来创建实例，注意要使用HandleScope来进入Isolate，这时Isolate::getCurrent()将返回该isolate
## Context
Context是V8引擎的上下文环境(类似于js的Global变量)，同样一个Isolate对应一个Context

可以通过isolate->getCurrentContext()获取当前isolate的上下文环境，也可以通过Context::new()来创建
## Value
V8封装了很多的基本类型，有最基本的Number、String、Boolean，也有复杂的Array、Object、RegExp，还有与node直接关联的Function、Script等等

这些类型都继承自共同的父类Value

Value类中封装了类型判断和转换的成员函数，例如IsNumber和ToNumber，满足对变量类型的需要
# Usage
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

insert into notice(title) values('<a href="/about">lzw</a>创建了这个网站');
insert into notice(title) values('<a href="/about">lzw</a>发表了一篇博客<a href="/blog/1">《Promise的理解》</a>');
insert into notice(title) values('<a href="/about">lzw</a>发表了一篇博客<a href="/blog/2">《V8 C++代码总结》</a>');
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