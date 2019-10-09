import moduleUrl from 'url';
import moduleQuerystring from 'querystring';
import https, { RequestOptions as httpsRequestOptions } from 'https';
import http, {
  IncomingHttpHeaders,
  RequestOptions as httpRequestOptions,
  IncomingMessage,
} from 'http';

export type IMethod = 'post' | 'get';

export type IObj = { [key: string]: string };

export interface IAjax {
  url: string;
  method?: IMethod;
  data?: IObj;
  options?: httpsRequestOptions & {
    headers?: IncomingHttpHeaders;
  };
}

export interface IResponse {
  config: {
    httpVersion: IncomingMessage['httpVersion'];
    headers: IncomingMessage['headers'];
    statusCode: IncomingMessage['statusCode'];
    statusMessage: IncomingMessage['statusMessage'];
  };
  data: { [key: string]: any };
}

function ajax({
  url = '',
  data = {},
  method = 'get',
  options = {},
}: IAjax): Promise<IResponse> {
  let {
    protocol = 'http:',
    hostname,
    query,
    port,
    path,
    pathname,
  } = moduleUrl.parse(url);

  let sendData = moduleQuerystring.stringify(data);

  if (method === 'get') {
    const realData = <IObj>{
      ...moduleQuerystring.parse(query || ''),
      ...data,
    };
    sendData = moduleQuerystring.stringify(realData);
    path = sendData ? `${pathname}?${sendData}` : path;
  }

  const configs = {
    method,
    protocol,
    hostname,
    port,
    path,
    ...options,
  };
  return protocol === 'https:'
    ? httpsRequest(configs, sendData)
    : httpRequest(configs);
}

function httpsRequest(
  options: httpsRequestOptions,
  data: string,
): Promise<IResponse> {
  return new Promise((resolve, reject) => {
    let body: any = '';
    const req = https.request(options, res => {
      res.setEncoding('utf8');
      const { httpVersion, headers, statusCode, statusMessage } = res;
      res.on('data', chunk => (body += chunk));
      res.on('end', () =>
        resolve({
          config: { httpVersion, headers, statusCode, statusMessage },
          data: body,
        }),
      );
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function httpRequest(options: httpRequestOptions): Promise<IResponse> {
  let body: any = '';
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      res.setEncoding('utf8');
      const { httpVersion, headers, statusCode, statusMessage } = res;
      res.on('data', chunk => (body += chunk));
      res.on('end', () =>
        resolve({
          config: { httpVersion, headers, statusCode, statusMessage },
          data: body,
        }),
      );
    });
    req.on('error', reject);
    req.end();
  });
}

export default ajax;

let demo = {
  msgtype: 'text',
  text: { content: '测试自建 http 请求库' },
  at: { atMobiles: [], isAtAll: false },
};
console.log(moduleQuerystring.stringify(demo));
