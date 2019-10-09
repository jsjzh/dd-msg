# dd-msg

对钉钉机器人发消息进行封装

## 介绍

用 `ts` 写的，对钉钉机器人发消息进行封装，一般机器人都是在服务器或者后端使用

使用时先要 `new` 一个 `dd-msg` 的实例，该实例有如下几种方式

- feedCard
- aloneAction
- wholeAction
- link
- markDown
- text

## 使用方式

```js
// 头部如下
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
