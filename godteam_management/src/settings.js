module.exports = {
  title: '招联金融系统',

  /**
   * @type {boolean} true | false
   * @description 是否在右面板显示设置
   */
  showSettings: true,

  /**
   * @type {boolean} true | false
   * @description 是否需要tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description 是否修复标题
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏显示徽标
   */
  sidebarLogo: false,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description 需要显示err日志组件.
   * 默认值仅在生产环境中使用
   * 如果你也想在dev中使用它，你可以通过['production', 'development']
   */
  errorLog: 'production'
}
