# dd-msg

对钉钉机器人发消息进行封装

## 介绍

该项目主要是十一期间在研究 `rollup`，然后就顺便做了一个结合 `typescript` 的钉钉机器人封装。

由于一般机器人是跑在后端的，所以用了 `request` 做发送请求（自己也尝试写了一个基于基础模块 `http` 和 `https` 的请求库，但是有点不放心，所以还是用了公共库），在浏览器端不能够直接使用。

另外，不要吐槽我给的图，这些图都是直接取的钉钉官方文档的图，当初会有想法封装个钉钉机器人，就是因为官方给的字段名有些奇怪，不是很习惯

在从零开始搭建项目的时候，看了很多 `babel`、`prettier`、`rollup.config.js`、`tsconfig.json` 等配置项，所以这个姑且也算是个最基本实践吧，把 src 里的代码删删，也可以当成一个 `typescript` + `rollup` 的脚手架，但是只支持服务端使用，如果想要浏览器端的脚手架，还需要修改一些配置

> 话说最近钉钉机器人在升级，要到 2019 年十月底来着

项目是用 `typescript` 写的，对钉钉机器人发消息进行封装，一般机器人都是在服务器或者后端使用

使用时先要 `new` 一个 `dd-msg` 的实例，该实例有如下几种方式

- feedCard
- aloneAction
- wholeAction
- link
- markDown
- text

## 使用方式

先安装

```cmd
# npm
npm install dd-msg
# yarn
yarn add dd-msg
```

使用方式如下

```js
const DMsg = require('dd-msg');
const robot = new DMsg('此处填写你的 token');
```

### text

```js
robot
  .text({
    atAll: true,
    text: '测试 text',
  })
  .then(res => console.log(res));
```

![效果图](https://img.alicdn.com/tfs/TB1jFpqaRxRMKJjy0FdXXaifFXa-497-133.png)

### markDown

```js
robot
  .markDown({
    atAll: true,
    title: '测试 markDown',
    mdText: '# 测试 markdown',
  })
  .then(res => console.log(res));
```

![效果图](https://img.alicdn.com/tfs/TB1yL3taUgQMeJjy0FeXXXOEVXa-492-380.png)

### link

```js
robot
  .link({
    title: '测试 link',
    msgUrl: 'https://github.com/jsjzh',
    picUrl: 'https://avatars2.githubusercontent.com/u/22976711',
    text: '测试文案',
  })
  .then(res => console.log(res));
```

![效果图](https://img.alicdn.com/tfs/TB1VfZtaUgQMeJjy0FeXXXOEVXa-498-193.png)

### wholeAction

```js
robot
  .wholeAction({
    title: '测试 wholeAction',
    mdText: '# 测试 markdown',
    singleTitle: '测试 single 标题',
    singleUrl: 'https://github.com/jsjzh',
    sort: 'vertical',
    hideAvatar: false,
  })
  .then(res => console.log(res));
```

![效果图](https://img.alicdn.com/tfs/TB1nhWCiBfH8KJjy1XbXXbLdXXa-547-379.png)

### aloneAction

```js
robot
  .aloneAction({
    title: '测试 aloneAction',
    mdText: '# 测试 markdown',
    btns: [
      { title: '测试按钮 1', url: 'https://github.com/jsjzh' },
      { title: '测试按钮 2', url: 'https://github.com/jsjzh' },
    ],
    sort: 'horizontal',
    hideAvatar: false,
  })
  .then(res => console.log(res));
```

![效果图](http://img01.taobaocdn.com/top/i1/LB1GgOFQVXXXXXnaXXXXXXXXXXX?x-oss-process=image/resize,w_1500)

### feedCard

```js
robot
  .feedCard({
    links: [
      {
        title: '测试 feedCard',
        msgUrl: 'https://github.com/jsjzh',
        picUrl: 'https://avatars2.githubusercontent.com/u/22976711',
      },
    ],
  })
  .then(res => console.log(res));
```

![效果图](http://img01.taobaocdn.com/top/i1/LB1R2evQVXXXXXDapXXXXXXXXXX)
