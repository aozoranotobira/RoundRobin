
# ���[�O��i���������j������


## �v�Z
---
�Q���l���ƃR�[�g���ɉ������A���������ƃ��[�O�\���v�Z���܂��B


## �Ή��u���E�U
---
�J������ѓ���m�F��Chrome�Ŏ��{���Ă��܂��B

�u���E�U�݊����iMDN Web Docs���Q�Ɓj���ȉ��Ɏ����܂����A����m�F�͖����{�ł��B

�Ή��u���E�U
- Chrome
- Edge
- Firefox
- Opera
- Safari
- WebView Android
- Chrome Android
- Firefox for Android
- Opera Android
- Safari on iOS
- Samsung Internet

��Ή��u���E�U
- Internet Explorer


## ���[�J���ł̊m�F���@
---
1. SSL���ihttp��https�j�̂��߁AOpenSSL���C���X�g�[�����āA���ȏؖ������쐬
```
openssl req -x509 -newkey rsa:4096 -sha256 -nodes -keyout vscode_live_server.key.pem -out vscode_live_server.cert.pem  -subj "//CN=example.com" -days 3650
```
2. VSCode �g���@�\ Live Server �� https �ݒ�ɁA1.�ō쐬���� pem ��ǉ�
3. ���ȏؖ����� Service Worker �𓮂������߁AChrome �̋N���I�v�V������ǉ����ċN��
```
C:\Program Files\Google\Chrome\Application\chrome.exe" ^
     --user-data-dir=C:\Users\ty331831\Documents\src\ChromeUserData ^
     --unsafely-treat-insecure-origin-as-secure=https://localhost ^
     --allow-insecure-localhost ^
     --ignore-certificate-errors
```
4. index.html �� Live Server �ŋN�����Ahttps://127.0.0.1:5500/index.html �ɃA�N�Z�X


## �Q�l����
---
1�`�[���Œ�̏z����
- http://www.fungoal.com/doc/wp/?p=754

�J�[�N�}���̏��w��������
- https://salon-hiyake.hatenablog.com/entry/2014/08/14/091103
