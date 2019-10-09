import request from 'request';

type ISort = 'vertical' | 'horizontal';
interface IFeedCard {
  links: ILinkItem[];
}
interface ILinkItem {
  title: string;
  msgUrl: string;
  picUrl?: string;
}
interface IAloneAction {
  title: string;
  mdText: string;
  btns: IBtnItem[];
  sort?: ISort;
  hideAvatar?: boolean;
}
interface IBtnItem {
  title: string;
  url: string;
}
interface IWholeAction {
  title: string;
  mdText: string;
  singleTitle: string;
  singleUrl: string;
  sort?: ISort;
  hideAvatar?: boolean;
}
interface ILinkMsg extends ILinkItem {
  text: string;
}
interface IAt {
  atAll?: boolean;
  atMobiles?: string[];
}
interface IMarkDown extends IAt {
  title: string;
  mdText: string;
}
interface IText extends IAt {
  text: string;
}

function inputError(msg: string) {
  throw new Error(msg);
}

function getFeedCardMsgBody({ links }: IFeedCard) {
  if (!links.length) inputError('需要传入 links');
  return {
    feedCard: {
      msgtype: 'feedCard',
      links: links.map(item => ({
        title: item.title,
        messageURL: item.msgUrl,
        picURL: item.picUrl,
      })),
    },
  };
}

function getAloneActionMsgBody({
  title,
  mdText,
  btns,
  sort = 'vertical',
  hideAvatar = false,
}: IAloneAction) {
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
}: IWholeAction) {
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

function getLinkMsgBody({ title, text, msgUrl, picUrl = '' }: ILinkMsg) {
  if (!title || !text || !msgUrl)
    inputError('需要传入 title 和 text 和 msgUrl');
  return { msgtype: 'link', link: { title, text, picUrl, messageUrl: msgUrl } };
}

function getMarkDownMsgBody({
  title,
  mdText,
  atAll = false,
  atMobiles = [],
}: IMarkDown) {
  if (!title || !mdText) inputError('需要传入 title 和 mdText');
  return {
    msgtype: 'markdown',
    markdown: { title, text: mdText },
    at: { atMobiles, isAtAll: atAll },
  };
}

function getTextMsgBody({ text, atAll = false, atMobiles = [] }: IText) {
  if (!text) inputError('需要传入 text');
  return {
    msgtype: 'text',
    text: { content: text },
    at: { atMobiles, isAtAll: atAll },
  };
}

export default class DingMsg {
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
  feedCard(params: IFeedCard) {
    return this._sendData(getFeedCardMsgBody(params));
  }
  aloneAction(params: IAloneAction) {
    return this._sendData(getAloneActionMsgBody(params));
  }
  wholeAction(params: IWholeAction) {
    return this._sendData(getWholeActionMsgBody(params));
  }
  link(params: ILinkMsg) {
    return this._sendData(getLinkMsgBody(params));
  }
  markDown(params: IMarkDown) {
    return this._sendData(getMarkDownMsgBody(params));
  }
  text(params: IText) {
    return this._sendData(getTextMsgBody(params));
  }
}
