## 本期分享：React项目实战

### 前期准备
```
$ cd count
$ npm install
$ npm start
```

然后访问```localost:3000```。

### 完成以下任务
- 将redux添加进来
- app下面需要包括actions、reducers和store等目录
- action的type单独存放到一个文件中，如app/constants/constant.js
- 整个应用的所有数据都存放到store中
- 所有更新state的操作都必须通过dispatch(action)
- 打印每步操作的日志，使用redux-logger中间件