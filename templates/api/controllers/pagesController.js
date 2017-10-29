module.exports = {
  // HOME PAGE
  index: async function (ctx) {
    await ctx.render('index.ejs')
  }
}
