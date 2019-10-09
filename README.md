# dd-msg

## 介绍

用 `ts` 写的，对 dingding-robot 的一个封装，一般机器人都是在服务器或者后端使用，使用方法很简单，如下即可

```js
const DMsg = require('dd-msg');

const robot = new DMsg('此处填写你的 token');

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

robot
  .link({
    title: '测试 link',
    msgUrl: 'https://github.com/jsjzh',
    picUrl: 'https://avatars2.githubusercontent.com/u/22976711',
    text: '测试文案',
  })
  .then(res => console.log(res));

robot
  .markDown({
    atAll: true,
    title: '测试 markDown',
    mdText: '# 测试 markdown',
  })
  .then(res => console.log(res));

robot
  .text({
    atAll: true,
    text: '测试 text',
  })
  .then(res => console.log(res));
```
