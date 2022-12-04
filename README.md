# Fox favicon

Webpack plugin to generate favicons

* NPM:
  ```
  npm i fox-favicon
  ```

## Сonnection:
  ```
const FoxFavicon = require('fox-favicon');
  ```
## usage:
  ```
new FoxFavicon({
  src: 'src/assets/images/icon/favicon.png',
  path: 'assets/favicons/',
  urlIcon: 'assets/favicons/',
  devMode: env.isDev,
  appName: 'Frontend для прагматиков',
  appShortName: 'Frontend для прагматиков',
  appDescription: 'Узнайте, как использовать Range Slider Fox',
  developerName: 'coder1',
  developerURL: 'https://github.com/coder1x/',
  icons: {
    android: [
      'android-chrome-36x36.png',
      'android-chrome-48x48.png',
      'android-chrome-144x144.png',
      'android-chrome-192x192.png',
      'android-chrome-256x256.png',
    ],
    appleIcon: [
      'apple-touch-icon-180x180.png',
      'apple-touch-icon-precomposed.png',
      'apple-touch-icon.png',
    ],
    appleStartup: [],
    coast: true, // Create Opera Coast icon.
    favicons: true, // Create regular favicons.
    firefox: [
      'firefox_app_60x60.png',
      'firefox_app_128x128.png',
    ],
    opengraph: true, // Create Facebook OpenGraph image.
    twitter: true, // Create Twitter Summary Card image.
    windows: true, // Create Windows tile icons.
    yandex: true, // Create Yandex browser icon.
  },
})
  ```

## Settings:

| Option | Default value (possible values) | Type | Description |
| --- | --- | --- | --- |
| src | false | boolean | address to the icon from which the set will be generated |
| path | '' | string | Address where to generate icons |
| urlIcon | '' | string | Address to the catalog of icons on the hosting |
| pathManifest | '/' | string | The address where the browser will look for manifest files. (default root) |
| devMode | false | boolean | Assembly mode |
| appName | 'null' | string | Your application's name |
| appShortName | 'null' | string | Your application's short_name. Optional. If not set, appName will be used |
| appDescription | 'null' | string | Your application's description |
| developerName | 'null' | string | Your (or your developer's) name |
| developerURL | 'null' | string | Your (or your developer's) URL |
| dir | 'auto' | string | Primary text direction for name, short_name, and description |
| lang | 'en-US' | string | Primary language for name and short_name |
| background | '#fff' | string | Background colour for flattened icons |
| theme_color | '#fff' | string | Theme color user for example in Android's task switcher |
| appleStatusBarStyle | 'black-translucent' ("black-translucent", "default", "black") | string | Style for Apple status bar |
| display | 'standalone' ("fullscreen", "standalone", "minimal-ui" , "browser") | string | Preferred display mode |
| orientation | 'any' ("any", "natural", "portrait" or "landscape") | string | Default orientation |
| start_url | '/?homescreen=1' | string | Start URL when launching the application from a device |
| version | '1.0' | string | Your application's version string |
| logging | false | boolean | Print logs to console |
| pixel_art | false | boolean | Keeps pixels "sharp" when scaling up, for pixel art.  Only supported in offline mode |
| loadManifestWithCredentials | false | boolean | Browsers don't send cookies when fetching a manifest, enable this to fix that |
| icons | Object | object | types of icons |


## Icons property:
| Option | Default value (possible values) | Type | Description |
| --- | --- | --- | --- |
| android | true | boolean, object, array | Create Android homescreen icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| appleIcon | true | boolean, object, array | Create Apple touch icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| appleStartup | true | boolean, object, array | Create Apple startup images. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| coast | true | boolean, object, array | Create Opera Coast icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| favicons | true | boolean, object, array | Create regular favicons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| firefox | true | boolean, object, array | Create Firefox OS icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| windows | true | boolean, object, array | Create Windows 8 tile icons. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
| yandex | true | boolean, object, array | Create Yandex browser icon. `boolean` or `{ offset, background, mask, overlayGlow, overlayShadow }` or an array of sources |
