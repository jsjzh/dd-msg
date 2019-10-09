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
