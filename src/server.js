import express from 'express';
import path from 'path';
import { createRenderer } from 'vue-server-renderer';
import { PUBLIC_PATH } from './consts';
import App from './App';

const renderer = createRenderer({ runInNewContext: false });
const ASSETS_DIRECTORY = path.resolve(__dirname, './assets');

const renderPage = ({
  metaInfo: {
    title,
    link,
    htmlAttrs,
  },
  main,
}) => `<!DOCTYPE html>
<html data-vue-meta-server-rendered ${htmlAttrs.text()}>
<head>
  ${[title.text(), link.text()].join('')}
</head>
<body>
  ${main}
  <script type="application/javascript" src="${PUBLIC_PATH}main.js"></script>
</body>
</html>`;


express()
  .use(PUBLIC_PATH, express.static(ASSETS_DIRECTORY))
  .use((req, res, next) => {
    const app = new App();
    return renderer.renderToString(app)
      .then(main => res.send(renderPage({
        metaInfo: app.$meta().inject(),
        main,
      })))
      .catch(next);
  })
  .listen(3000);
