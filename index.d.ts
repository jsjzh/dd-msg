declare namespace D {
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
}

declare class DingMsg {
  token: string;
  url: string;
  constructor(token: string);
  _sendData(msgBody: any): Promise<unknown>;
  feedCard(params: D.IFeedCard): Promise<unknown>;
  aloneAction(params: D.IAloneAction): Promise<unknown>;
  wholeAction(params: D.IWholeAction): Promise<unknown>;
  link(params: D.ILinkMsg): Promise<unknown>;
  markDown(params: D.IMarkDown): Promise<unknown>;
  text(params: D.IText): Promise<unknown>;
}
