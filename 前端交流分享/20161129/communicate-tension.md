# 泱泱九州 悠悠千年 故国十都 独荣京城
                                                         ---- 记帝都培训之旅

------

公元2016年9月21日，根据成哥的意思，希望派两名前端人员出差北京支援项目，同时在北京参与一些培训，感受公司文化氛围，见证自身成长。然后，就没有然后了。我在北京总部呆了一个半月左右的时间，觉得这次的分享，或者叫交流，可以分成以下三个方面(第一个方面请自行阅读)：

## 一、项目运营情况

对于公司来说，无论**京城**还是在**渝**，做项目所遵循的一整套项目运行的基本规范应该是一样的，比如需求确认、PSD文件、单元测试、需求变更。相比于**京城**，**重庆**公司的项目运营就完善的多，起码有比较详细的需求文档，当然**京城**也有，如果文件名也算的话；除此之外，单单从我所参与的的项目来说，**京城**的项目运营有点像维修部门，可能是因为没有测试人员参与过我所接触过的那几个项目吧。另一个方面是，在**京城**做项目要轻松、要缓和，可能是因为**京城**的项目部没有建立多久，还没有形成一套稍微健全的项目管理、项目运营规范，所以这里的项目经理都是各显神通，有的就厉害了，自执一词(***某PM***)。

PM决定着程序员的幸福指数。这句话真的真的真的一点都没错！**京城**项目中心有4个PM，带着我和小伟做项目的是这几个PM里面最极品的一个。活久见，***此PM***三十有六，此前听说干了十几年PM，依稀记得第一天去总部刚接触项目就递过来一张白纸(Excuse me？？？)，上面画了几个圈圈，又画了几根线，这就是我接的第一个需求(我R你个孙悟空)。如下图：
![第一个需求](https://raw.githubusercontent.com/piecefly/cq-hyfe-share/master/img/pmgoodjob.jpg)



但是，抛开项目上的诸多问题，**京城**的公司氛围要好些，比如15块三荤一素加水果加汤的工作餐，比如每周五的例行扫码零食会，比如每天下午一点可能会有的眼保健操，以及仲秋新鲜的雾霾。

## 二、新接触的技术

### Web Socket

HTML5规范中新增的一个API，用于代替我们过去几年一直在用的Ajax技术，可用于客户端和服务器端；此外，该技术还有一个优秀的第三方API----Socket.IO。

WebSocket API是下一代客户端-服务器端的异步通信方法。该通信取代了单个的TCP套接字，使用ws/wss协议，可用于任意的客户端和服务器程序。WebSocket目前由W3C进行标准化。该技术的兼容性为FireFox 4+、Chrome 4+、Opera 10.70+、Safari 5+。

WebSocket API最伟大之处在于服务器和客户端可以在给定的时间范围内的任意时刻，相互推送信息。WebSocket并不限于以Ajax(或XHR)方式通信，因为Ajax技术需要客户端发起请求，而WebSocket可以让服务器和客户端相互推送信息；此外，相对于XHR受到同源策略限制不同，WebSocket允许跨域通信。

但是，Ajax技术设计得很聪明的一点是没有定死要使用的方式。WebSocket为指定目标创建，用于双向推送信息。

#### WebSocket API用法

只专注于客户端的API，因为每个服务器端语言有自己的API。下面的代码片段是打开一个连接，为连接创建时间监听器，断开连接，消息时间，发送消息返回到服务器，关闭连接。


```  javascript
// 创建一个Socket实例
var socket = new WebSocket('ws://localhost:8080'); 

// 打开Socket 
socket.onopen = function(event) { 

  // 发送一个初始化消息
  socket.send('I am the client and I\'m listening!'); 

  // 监听消息
  socket.onmessage = function(event) { 
    console.log('Client received a message',event); 
  }; 

  // 监听Socket的关闭
  socket.onclose = function(event) { 
    console.log('Client notified socket has closed',event); 
  }; 

  // 关闭Socket.... 
  //socket.close() 
};
```

ws代表WebSocket协议。onopen、onclose、onmessage方法把事件连接到Socket实例上。每个方法都提供了一个事件，以表示Socket的状态。

onmessage事件提供了一个data属性，它可以包含消息的body部分。但是该部分必须是字符串，可以进行序列化/反序列化操作，以便传递更多的数据。

如果，我是说如果，你非要用IE实现类似的方案，可以考虑**Flash**以及**Ajax Long-Polling**。


#### Socket.IO

Socket.IO使用检测功能来判断是否建立WebSocket连接/Ajax Long-Polling/Flash，可快速构建实时的应用程序。Socket.IO还提供了一个NodeJS API，使得其看起来非常像客户端API。


引入socket.io.js
``` javascript
<script src="http://cdn.socket.io/stable/socket.io.js"></script>
```

``` javascript
// 创建Socket.IO实例，建立连接
var socket= new io.Socket('localhost',{ 
  port: 8080 
}); 
socket.connect(); 

// 添加一个连接监听器
socket.on('connect',function() { 
  console.log('Client has connected to the server!'); 
});

// 添加一个连接监听器
socket.on('message',function(data) { 
  console.log('Received a message from the server!',data); 
});

// 添加一个关闭连接的监听器
socket.on('disconnect',function() { 
  console.log('The client has disconnected!'); 
}); 

// 通过Socket发送一条消息到服务器
function sendMessageToServer(message) { 
  socket.send(message); 
}
```


Socket.IO简化了WebSocket API，统一了返回运输的API。传输包括WebSocket、Flash Socket、Ajax Long-Polling、Ajax multiple streaming、Iframe、JSONP polling。

除此之外，还可以设置任意的Socket.IO构造器的第二个选项，选项参数包括：
> * port - 待连接的端口
> * transports - 一个数组，包含不同的传输类型
> * transportOptions - 传输的参数使用的对象，带附加属性

Socket.IO还提供了由本地WebSocket API提供的普通连接、断开连接、消息事件。Socket还提供了封装每个事件类型的方法。


## 三、CSS预编译器 sass

### sass开发环境

因为sass依赖于ruby环境，所以装sass之前先确认装了ruby。官网下载地址**[ruby](http://rubyinstaller.org/downloads)**。

 
安装完ruby之后，在安装的文件中找到Start Command Prompt with Ruby，输入

```
gem install sass

```

如果被墙了，可以使用淘宝RubyGems镜像安装sass
```
$ gem sources --remove https://rubygems.org/

$ gem sources -a https://ruby.taobao.org/

# 如果你的系统不支持https，请将淘宝源更换成：
$ gem sources -a http://gems.rubychina.org/

$ gem sources -1

# 请确保只有 ruby.taobao.org
$ gem install sass
```

这样，sass的开发环境就配置好了。

### sass常用命令行编译

单文件转换命令
```
sass style.scss style.css
```
单文件监听命令
```
sass --watch style.scss"style.css
```
```
sass --watch sassFileDirectory:csFileDirectory
```


### sass 常用语法


sass的文件后缀名有两种：一种是```.sass```，不使用大括号和分号；另一种是```.scss```，使用大括号和分号。为了避免```.sass```在严格格式要求下会报错的问题，建议使用```.scss```后缀名。


#### 变量声明

使用```$```符号来标识变量

``` css
$nav-color: #F90;
nav {
  $width: 100px;
  width: $width;
  color: $nav-color;
}

//编译后

nav {
  width: 100px;
  color: #F90;
}
```


#### 嵌套CSS规则


``` css
#content {
  article {
    h1 { color: #333 }
    p { margin-bottom: 1.4em }
  }
  aside { background-color: #EEE }
}

 /* 编译后 */
#content article h1 { color: #333 }
#content article p { margin-bottom: 1.4em }
#content aside { background-color: #EEE }
```

当你同时要为一个容器元素及其子元素编写特定样式时，这种能力就非常有用了。

##### **父选择器```&```**
当你在为链接之类的元素写```.hover```这种伪类时，你并不希望以后代选择器的方式连接。比如下面这种情况：
``` css
article a {
  color: blue;
  :hover { color: red }
}
```
这意味着```article```元素内链接的所有子元素在被```hover```时都会变成红色。


所以此时你需要一个特殊的```sass```选择器，即父选择器```&```
``` css
article a {
  color: blue;
  &:hover { color: red }
}

//编译如下
article a { color: blue }
article a:hover { color: red }
```

##### **群组选择器的嵌套**

``` css
.container {
  h1, h2, h3 {margin-bottom: .8em}
}

//编译后
.container h1, .container h2, .container h3 { margin-bottom: .8em }
```


##### **自组合选择器>和同层选择器+、~**

``` css
article {
  ~ article { border-top: 1px dashed #ccc }
  > section { background: #eee }
  dl > {
    dt { color: #333 }
    dd { color: #555 }
  }
  nav + & { margin-top: 0 }
}

//编译后
article ~ article { border-top: 1px dashed #ccc }
article > footer { background: #eee }
article dl > dt { color: #333 }
article dl > dd { color: #555 }
nav + article { margin-top: 0 }
```

##### **嵌套属性**
把属性名从中划线```-```的地方断开，在根属性后边添加一个冒号:，紧跟一个```{}```块，把子属性部分写在这个```{}```块中。就像```css```选择器嵌套一样，```sass```会把你的子属性一一解开，把根属性和子属性部分通过中划线-连接起来，最后生成的效果与你手动一遍遍写的```css```样式一样：
``` css
nav {
  border: {
  style: solid;
  width: 1px;
  color: #ccc;
  }
}

//编译后
nav {
  border: 1px solid #ccc {
  left: 0px;
  right: 0px;
  }
}
```

##### **默认变量值!default**

一般情况下，你反复声明一个变量，只有最后一处声明有效且它会覆盖前边的值。例如：
``` css
$link-color: blue;
$link-color: red;
a {
color: $link-color;
}
```
这可能并不是你想要的结果，假如你写了一个可被他人通过```@import```导入的```sass```库文件，你可能希望导入者可以定制修改```sass```库文件中的某些值，这时候可以使用一个很像```css```属性中```!important```标签的对立面```!default```，只不过```!default```用于变量。例如：
``` css
/* @import */
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```
在上例中，如果用户导入你的```sass```局部文件之前声明了一个```$fancybox-width```变量，那么你的局部文件中对```$fancybox-width```赋值```400px```的操作就无效。

##### **混合器**




