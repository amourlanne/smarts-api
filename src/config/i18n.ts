export default {
  cookie: 'app_locale',
  directory: __dirname + '/../locales',
  // query parameter to switch locale (ie. /home?lang=ch) - defaults to NULL
  queryParameter: 'lang',
  defaultLocale: 'en',
  // api: {
  //   '__': '$t',
  //   '__n': '$tn'
  // }
}
