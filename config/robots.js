var robotsConfig = {
  production:`
  User-Agent: *
  Disallow: /admin
  Disallow: /recipe/order
  `,
  development:`
  User-Agent: *
  Disallow: /
  `
}

module.exports.robots = {
  ...robotsConfig
}
