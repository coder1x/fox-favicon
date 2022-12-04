const fs = require('fs');
const favicons = require('favicons');

class FoxFavicon {
  constructor(options) {
    this.options = this.getConfig(options);

    if (!this.options.devMode) {
      this.createFavicons();
    }
  }

  getConfig(options) {
    return {
      src: false,
      path: '',
      urlIcon: '',
      pathManifest: '/',
      devMode: false,
      appName: 'null',
      appShortName: 'null',
      appDescription: 'null',
      developerName: 'null',
      developerURL: 'null',
      dir: 'auto',
      lang: 'en-US',
      background: '#fff',
      theme_color: '#fff',
      appleStatusBarStyle: 'black-translucent',
      display: 'standalone',
      orientation: 'any',
      start_url: '/?homescreen=1',
      version: '1.0',
      logging: false,
      pixel_art: false,
      loadManifestWithCredentials: false,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: true,
        favicons: true,
        firefox: true,
        windows: true,
        yandex: true,
      },
      ...options,
    };
  }

  createFavicons() {
    const callback = (error, response) => {
      if (error) {
        console.log(error.message);
        return false;
      }

      this.html = response.html;
      this.files = response.files;
      this.images = response.images;
    };

    favicons(this.options.src, this.options, callback);
  }

  setHeadLink(callback) {
    const urlManifest = `${this.options.pathManifest}manifest.json`;
    const urlBrowserConfig = `${this.options.pathManifest}browserconfig.xml`;
    const urlYandexBrowser = `${this.options.pathManifest}yandex-browser-manifest.json`;
    const manifest = `<link rel="manifest" href="${urlManifest}">`;
    const browserConfig = `<meta name="msapplication-config" content="${urlBrowserConfig}">`;
    const yandexBrowser = `<link rel="yandex-tableau-widget" href="${urlYandexBrowser}">`;
    const elements = [manifest, browserConfig, yandexBrowser];
    const nameSearch = [
      'rel="manifest"',
      'name="msapplication-config"',
      'rel="yandex-tableau-widget"',
    ];
    const list = [];

    for (const textHtml of this.html) {
      if (textHtml) {
        const attributes = textHtml.split(' ');
        let element = '';

        for (const attribute of attributes) {
          const index = nameSearch.indexOf(attribute, 0);

          if (index != -1) {
            element = elements[index];
            break;
          }
        }

        element ? list.push(element) : list.push(textHtml);
      }
    }

    callback(list);
  }

  setHtmlLink(compiler) {
    this.buildFiles((assets) => {
      Object.keys(assets).map((item) => {
        if (item.indexOf('.html') !== -1) {
          const HTML = assets[item]._value.toString();

          this.setHeadLink((strLink) => {
            assets[item]._value = HTML.replace(
              /<head>([\s\S]*?)<\/head>/,
              `<head>$1\r${strLink.join('\r')}</head>`,
            );
          });
        }
      });
    }, compiler, true);
  }

  createFiles(compiler) {
    this.buildFiles((assets) => {
      if (this.images) {
        Object.keys(this.images).map((item) => {

          const image = this.images[item];

          assets[`${this.options.path}${image.name}`] = {
            source: () => image.contents,
            size: () => image.contents.length,
          };
        });
      }

      if (this.files) {
        const reg = new RegExp(this.options.path, 'g');

        Object.keys(this.files).map((item) => {
          const file = this.files[item];

          assets[`${this.options.pathManifest}${file.name}`] = {
            source: () => file.contents.replace(reg, this.options.urlIcon),
            size: () => file.contents.length,
          };
        });
      }
    }, compiler);
  }

  buildFiles(callback, compiler, flag = false) {
    compiler.hooks.thisCompilation.tap(
      { name: 'FoxFavicon' },
      (compilation) => {
        const process = compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS;
        const additional = compilation.PROCESS_ASSETS_STAGE_ADDITIONAL;

        compilation.hooks.processAssets.tap(
          {
            name: 'FoxFavicon',
            stage: flag ? process : additional,
            additionalAssets: flag,
          },
          callback,
        );
      },
    );
  }

  apply(compiler) {
    if (this.options.devMode) {
      return false;
    }

    const { output } = compiler.options;

    if (!fs.existsSync(output.path)) {
      fs.mkdirSync(output.path);
    }

    if (this.options.src && output.path) {
      this.setHtmlLink(compiler);
      this.createFiles(compiler);
    }
  }
}

module.exports = FoxFavicon;
