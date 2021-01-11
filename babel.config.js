module.exports = function(api) {
  let validEnv = ['development', 'test', 'production']
  let currentEnv = api.env()
  let isDevelopmentEnv = api.env('development')
  let isProductionEnv = api.env('production')
  let isTestEnv = api.env('test')

  if (!validEnv.includes(currentEnv)) {
    throw new Error(
      'Please specify a valid `NODE_ENV` or ' +
        '`BABEL_ENV` environment variables. Valid values are "development", ' +
        '"test", and "production". Instead, received: ' +
        JSON.stringify(currentEnv) +
        '.'
    )
  }

  return {
    presets: [
      isTestEnv && [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          },
          bugfixes: true,
        }
      ],
      (isProductionEnv || isDevelopmentEnv) && [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: '3.8',
          bugfixes: true,
          loose: true,
        }
      ],
    ].filter(Boolean),
    plugins: [
      '@babel/plugin-proposal-class-properties',
    ].filter(Boolean)
  }
}
