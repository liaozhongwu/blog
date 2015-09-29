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

insert into notice(title) values('<a href="/about">lzw</a>创建了这个网站');
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