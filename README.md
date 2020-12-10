# HTML5 Chatroom

For 資策會 前端工程師就業養成班MFEE13 - HTML5 JS API

## Environment

- nodejs
- express
  - pug


## Start website for dev

1. 下載專案
2. npm i
3. npm run devstart

### windows 安裝 sqlite3

1. 用管理員權限啟動 powershell
   npm install --global --production windows-build-tools

2. npm i -g node-gyp
   npm i -g node-pre-gyp

3. npm i sqlite3


- for mac or linux
```bash
DEBUG=html5-chatroom:* npm run devstart
```

- for windows
```bash
npm run devstart
```

## Demo DB

slite3

https://sqliteonline.com/

Table: 
  - room(id, name, subject, brief, adminer)
  - user(id, email, nickname)

