# 理解JavaScript原型

## 创建对象
+ 工厂模式：在一个函数内创建一个对象，把函数参数作为属性添加给对象，最后返回对象。
    + 解决问题：轻松创建多个相似对象，将对象封装起来
    + 缺点：无法识别一个对象的类型（构造函数都是Object）
    ```javascript
    //工厂模式
    function Person (name, age){
        var newPerson = new Object()
        newPerson.name = name
        newPerson.age = age
        newPerson.getName = function() {
            console.log('this Object\'s name : ',name)
        }
        return newPerson
    }
    var bangzhu = Person('bangzhu', 18)
    ```
+ 构造函数模式：函数中不new对象，不返回对象，而是在使用时new Function()
    + 解决问题：实例有了相应的构造函数
    + 缺点：构造函数内方法在每个实例上都要重新创建一遍（虽然可以在外部定义全局函数，但这样封装性不好）
    ```javascript
    //构造函数模式
    function Person (name, age){
    this.name = name
    this.age = age
    this.getName = function() {
        console.log('this Object\'s name : ', this.name)
    }
    }
    var json = new Person('Json', 18)
    ```
+ 原型模式：将所有属性和方法都放到构造函数原型对象内
    + 解决问题：所有实例共享原型对象内方法
    + 缺点：原型对象内的属性也被各个实例共享
    ```javascript
    //原型式
    function Person () {
        Person.prototype.name = 'wumama'
        Person.prototype.age = 16
        Person.prototype.getName = function() {
            console.log('this Object\'s name : ', this.prototype.name)
        }
    }
    var wumama = new Person()
    ```
+ 组合使用构造函数模式和原型模式
    + 解决问题：属性由实例自身拥有，方法共享构造函数原型对象内方法
    ```javascript
    function Person (name, age) {
        this.name = name
        this.age = age
        Person.prototype.getName = function() {
            console.log('this Object\'s name : ', this.name)
        }
    }
    var wumama = new Person('wumama', 16)
    ```
+ 动态原型模式
    + 解决问题：根据实例属性动态的设置原型对象内方法
    ```javascript
    function Person (name, age) {
        this.name = name
        this.age = age
        Person.prototype.getName = function() {
            console.log('this Object\'s name : ', this.name)
        }
        if(this.age > 18) {
            Person.prototype.getBf = function() {
                console.log('she has a bf')
            }
        }
    }
    var wumama = new Person('wumama', 16)
    ```
+ 寄生构造函数模式
    + 解决问题：仅仅用于封装创建对象的代码（可以用于在不影响内置对象的前提下扩展它们）
    ```javascript
    function SelfArray() {
        var values = new Array()
        values.push.apply(values, arguments)
        values.toPipedString = function() {
            return this.join('|')
        }
        return values
    }
    var colors = new SelfArray('red','green','blue')
    colors.toPipedString() //"red|green|blue"
    ```
## 原型与实例的一些方法
 ```javascript
//检测某对象是否为一实例原型
Person.prototype.isPrototypeOf( wumama )
//获取实例原型对象
Object.getPrototypeOf( wumama )
//检测实例中是否有某属性
wumama.hasOwnProperty( 'name' )
//对象可枚举属性和方法的遍历
for (each in wumama){
    console.log(each)
}//name,age,getName

//！！！！注意，重写原型对象会造成现有原型对象与之前实例的断开，因为引用类型的变量只是一个指针
```
## 继承
+ 原型链继承
    + 基本思想：利用原型让一个引用类型继承另一个引用类型的属性和方法
    + 实现：``Son.prototype = new Father()``（将子类默认的原型替换成父类的实例）
    + 确定实例与原型关系：``wumama instanceof Person//true``
    + 给原型添加方法的代码一定要放在替换原型的语句之后（``Son.prototype = new Father()``之后）
    + 缺点：
        + 通过原型来实现继承时，原型实际上会变成另一个类型的实例，于是原先实例的属性也就成了现在原型的属性，而原型中不应有属性（所有实例共享原型）
        + 在创建子类的实例时，不能向父类的构造函数中传递参数
+ 借用构造函数
    + 基本思想：在子类构造函数的内部调用父类的构造函数
    + 实现：``function Son(){Father.call(this, arguments)}``
    + 解决问题：可以向父类的构造函数传参
    + 缺点：子类不能访问父类原型上的方法
+ 组合继承
    + 结合原型继承和借用构造函数继承
    + 实现：
    ```javascript
    function Father (name) {
        this.name = name
        Father.prototype.getName = function() {
            console.log( this.name )
        }
    }
    function Son(name, age) { 
        Father.call(this, name)
        this.age = age
    }
    Son.prototype = new Father()
    Son.prototype.getAge = function() {
        console.log( this.age )
    }
    var son = new Son('test', 24)
    ```
+ 寄生式继承
    + 思路：创建一个仅用于封装继承过程的函数
    + 实现：
    ```javascript
    father = {
        name: 'test'
    }
    function son(father){
        var clone = Object(father)
        clone.getName = function(){
            console.log(this.name)
        }
        return clone
    }
    var son = son(father)
    ```
+ 寄生式组合继承
    + 组合式继承需要实例化父类两次，这里只用一次，避免在子类的原型上创建不必要的属性
    + 避免重写原型而导致实例的constructor属性改变
    ```javascript
    function selfExtends (son, father){
        var prototype = Object(father.prototype)//创建原型对象
        prototype.constructor = son//增强对象
        son.prototype = prototype//指定对象
    }
    function Father(name) {
        this.name = name
        Father.prototype.getName = function() {
            console.log( this.name )
        }
    }
    function Son(name, age) {
        Father.call(this, name)
        this.age = age
    }
    selfExtends(Son, Father)
    var son = new Son('test', 24)
    ```