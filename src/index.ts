/// <reference path="../index.d.ts" />

import request from 'request';

function inputError(msg: string) {
  throw new Error(msg);
}

function getFeedCardMsgBody({ links }: D.IFeedCard) {
  if (!links.length) inputError('需要传入 links');
  return {
    feedCard: {
      links: links.map(item => ({
        title: item.title,
        messageURL: item.msgUrl,
        picURL: item.picUrl,
      })),
    },
    msgtype: 'feedCard',
  };
}

function getAloneActionMsgBody({
  title,
  mdText,
  btns,
  sort = 'vertical',
  hideAvatar = false,
}: D.IAloneAction) {
  if (!title || !mdText || !btns.length)
    inputError('需要传入 title 和 mdText 和 btns');
  return {
    msgtype: 'actionCard',
    actionCard: {
      title,
      text: mdText,
      btns: btns.map(item => ({ title: item.title, actionURL: item.url })),
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0',
    },
  };
}

function getWholeActionMsgBody({
  title,
  mdText,
  singleTitle,
  singleUrl,
  sort = 'vertical',
  hideAvatar = false,
}: D.IWholeAction) {
  if (!title || !mdText || !singleTitle || !singleUrl)
    inputError('需要传入 title 和 mdText 和 singleTitle 和 singleUrl');
  return {
    msgtype: 'actionCard',
    actionCard: {
      title,
      text: mdText,
      singleTitle,
      singleURL: singleUrl,
      hideAvatar: hideAvatar ? '1' : '0',
      btnOrientation: sort === 'horizontal' ? '1' : '0',
    },
  };
}

function getLinkMsgBody({ title, text, msgUrl, picUrl = '' }: D.ILinkMsg) {
  if (!title || !text || !msgUrl)
    inputError('需要传入 title 和 text 和 msgUrl');
  return { msgtype: 'link', link: { title, text, picUrl, messageUrl: msgUrl } };
}

function getMarkDownMsgBody({
  title,
  mdText,
  atAll = false,
  atMobiles = [],
}: D.IMarkDown) {
  if (!title || !mdText) inputError('需要传入 title 和 mdText');
  return {
    msgtype: 'markdown',
    markdown: { title, text: mdText },
    at: { atMobiles, isAtAll: atAll },
  };
}

function getTextMsgBody({ text, atAll = false, atMobiles = [] }: D.IText) {
  if (!text) inputError('需要传入 text');
  return {
    msgtype: 'text',
    text: { content: text },
    at: { atMobiles, isAtAll: atAll },
  };
}

class DingMsg {
  url: string;
  constructor(public token: string) {
    this.url = `https://oapi.dingtalk.com/robot/send?access_token=${this.token}`;
  }
  _sendData(msgBody: any) {
    return new Promise((resolve, reject) => {
      request(
        {
          url: this.url,
          method: 'post',
          body: JSON.stringify(msgBody),
          headers: {
            'Content-Type': 'application/json',
          },
        },
        (error, response, body) => {
          resolve(body);
        },
      );
    });
  }
  feedCard(params: D.IFeedCard) {
    return this._sendData(getFeedCardMsgBody(params));
  }
  aloneAction(params: D.IAloneAction) {
    return this._sendData(getAloneActionMsgBody(params));
  }
  wholeAction(params: D.IWholeAction) {
    return this._sendData(getWholeActionMsgBody(params));
  }
  link(params: D.ILinkMsg) {
    return this._sendData(getLinkMsgBody(params));
  }
  markDown(params: D.IMarkDown) {
    return this._sendData(getMarkDownMsgBody(params));
  }
  text(params: D.IText) {
    return this._sendData(getTextMsgBody(params));
  }
}

export default DingMsg;
