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

#### **混合器@mixin**

如果你的网站中有几处小小的样式类似(例如一致的颜色和字体)，那么使用变量来统一处理这种情况时非常不错的选择。但是当你的样式变得越来越复杂，你就需要用到```sass```的新技能混合器```@mixin```来实现大段样式的重用。


举个栗子，下边的这段```sass```代码，定义了一个非常简单的混合器，然后通过```@include```来使用这个混合器，目的是添加跨浏览器的圆角边框。
``` css
@mixin rounded-corners {
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
notice {
  background-color: green;
  border: 2px solid #00aa00;
  @include rounded-corners;
}

//sass最终生成：

.notice {
  background-color: green;
  border: 2px solid #00aa00;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

##### **混合器的使用场景**

利用混合器，可以很容易地在样式表的不同地方共享样式。如果你发现自己在不停地重复一段样式，那就应该把这段样式构造成优良的混合器，尤其是这段样式本身就是一个逻辑单元，比如说是一组放在一起有意义的属性。

判断一组属性是否应该组合成一个混合器，一条经验法则就是你能否为这个混合器想出一个好的名字。就是你可以找到一个很好的短名字来描述这些属性修饰的样式。说白了混合器不同于```css```中的类名，它是一种展示性的描述，而类名更具语义化含义。

##### **混合器中也可以使用CSS规则**

混合器中不仅可以包含属性，也可以包含```css```规则，包含选择器和选择器中的属性，如下代码：
``` css
@mixin no-bullets {
  list-style: none;
  li {
    list-style-image: none;
    list-style-type: none;
    margin-left: 0px;
  }
}
ul.plain {
  color: #444;
  @include no-bullets;
}
```

编译后：
``` css
ul.plain {
  color: #444;
  list-style: none;
}
ul.plain li {
  list-style-image: none;
  list-style-type: none;
  margin-left: 0px;
}
```


##### **可以给混合器传参**

混合器并不一定总得生成相同的样式。可以通过在```@include```混合器时给混合器传参，来定制混合器生成的精确样式。当```@include```混合器时，参数其实就是可以赋值给```css```属性值的变量。这种方式跟```JavaScript```的```function```很像：

``` css
@mixin link-colors($normal, $hover, $visited) {
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```
当混合器被```@include```时，你可以把它当作一个```css```函数来传参。比如像下边的例子：
``` css
a {
  @include link-colors(blue, red, green);
}

//Sass最终生成的是：

a { color: blue; }
a:hover { color: red; }
a:visited { color: green; }
```

当你```@include```混合器时，有时候可能会很难区分每个参数是什么意思，参数之间是一个什么样的顺序。为了解决这个问题，```sass```允许通过语法```$name: value```的形式指定每个参数的值。这种形式的传参，参数顺序就不必再在乎了，只需要保证没有漏掉参数即可：

``` css
a {
    @include link-colors(
      $normal: blue,
      $visited: green,
      $hover: red
  );
}
```
##### **默认参数**

尽管给混合器加参数来实现定制很好，但是有时有些参数我们没有定制的需要，这时候也需要赋值一个变量就变成很痛苦的事情了。所以```sass```允许混合器声明时给参数赋默认值。

为了在```@include```混合器时不必传入所有的参数，我们可以给参数指定一个默认值。参数默认值使用```$name: default-value```的声明形式，默认值可以是任何有效的```css```属性值，甚至是其他参数的引用，如下代码：

``` css
@mixin link-colors(
    $normal,
    $hover: $normal,
    $visited: $normal
  )
{
  color: $normal;
  &:hover { color: $hover; }
  &:visited { color: $visited; }
}
```

#### sass 继承 @extend

混合器只是```sass```样式重用特性中的一个。但是如果我们想要重用语义化的类呢？这时候，就要祭出```sass```大杀器----选择器继承了。

使用```sass```的时候，最后一个减少重复的主要特性就是选择器继承。基于```Nicole Sullivan```面向对象的css的理念，选择器继承是说一个选择器可以继承为另一个选择器定义的所有样式。
``` css
//通过选择器继承继承样式
.error {
  border: 1px red;
  background-color: #fdd;
}
.seriousError {
  @extend .error;
  border-width: 3px;
}
```
但是，以这种方式继承的话，```.seriousError```
不仅会继承```.error```自身的所有样式，任何跟```.error```有关的组合选择器样式也会被```.seriousError```以组合选择器的形式继承， 比如：
``` css
//.seriousError从.error继承样式
.error a{  //应用到.seriousError a
  color: red;
  font-weight: 100;
}
h1.error { //应用到hl.seriousError
  font-size: 1.2rem;
}
```
#####  **sass继承的最佳实践**

这里只举出一个```sass```继承的最佳实践，其中的坑如果遇到的话请参考文末的参考链接。

这里说说继承的使用场景。```sass```混合器主要用于展示性样式的重用，而类名用于语义化样式的重用。因为继承是基于类的（有时是基于其他类型的选择器），所以继承应该是建立在语义化的关系上。当一个元素拥有的类（比如说```.seriousError```）表明它属于另一个类（比如说```.error```），这时使用继承再合适不过了。

但是，有一些细微的区别需要自己在用到这个预编译器的时候才能慢慢体会出来，比如像```#main .error```这种选择器序列是不能被继承的。因为从```#main .error```中继承的样式一般情况下会跟直接从```.error```中继承的样式基本一致。

在这里简单的写写```@extend```的基本思想，如果```.seriousError @extend .error```， 那么样式表中的任何一处```.error```都用```.error  .seriousError```这一选择器组进行替换。这就意味着相关样式会如预期那样应用到```.error```和```.seriousError```。当```.error```出现在复杂的选择器中，比如说```h1.error```,```.error a```或者```#main .sidebar input.error[type="text"]```，那情况就变得复杂多了。但是```sass```里面已经考虑到这些，请自行查阅。

在这里，```@extend```有两个要点，一个是与```@mixin```相比，```@extend```生成的代码相对更少，因为继承仅仅是重复选择器，而不是重复属性；另一个要点是，继承遵从```css```层叠的规则。当两个不同的```css```规则应用到同一个html元素上时，并且这两个不同的```css```规则对同一属性的修饰存在不同的值，```css```层叠规则会决定应用哪个样式。相当直观：通常权重更高的选择器胜出，如果权重相同，定义在后边的规则胜出。


因为···@extend```会在生成```css```时复制选择器，所以使用···@extend```的最好办法就是不用在```css```规则中使用后代选择器（比如```.foo .bar```）去继承```css```规则。如果你这么做，同时被继承的```css```规则有通过后代选择器修饰的样式(```.bip .baz```中的```.baz```)，生成```css```中的选择器的数量很快就会失控：

``` css
.foo .bar { @extend .baz; }
.bip .baz { background: blue; }
```

``` css
/* 编译后会出现的情况 */
.foo .bip .bar{
     background: blue;
}

.bip .foo .bar{
     background: blue;
}

/* 此处的.foo与.bip在一个标签里面 */
.foo/.bip .bar{
     background: blue;
}
```

在上边的例子中，```sass```必须保证应用到```.baz```的样式同时也要应用到```.foo .bar```（位于```class="foo"```的元素内的```class="bar"```的元素）。例子中有一条应用到```.bip .baz```（位于```class="bip"```的元素内的```class="baz"```的元素）的```css```规则。当这条规则应用到```.foo .bar```时，就可能存在三种情况。

值得一提的是，只要你想，你完全可以放心地继承有后代选择器修饰规则的选择器，不管后代选择器多长，但有一个前提就是，不要用后代选择器去继承。


#### **总结**


帝都的培训之旅，或者说是探索未知的旅行也好，对于我来说是一个新的起点，在学到新的技术，结交到新的朋友的同时，带给我的，是一种全新的认知。我第一次体会到，保持年轻的心态以及持续学习的能力，保有足够的体力以及好奇心，才能让自己更加感激这个社会，感恩遇到的你们。我希望我可以更加努力，让我可以在未来遇到更多的深情款款的你们。

#### **文末链接**

[HTML5的新技术-WebSocket](http://www.cnblogs.com/wei2yi/archive/2011/03/23/1992830.html)

[Sass中文学习指南](http://www.sasschina.com/guide/)

    
