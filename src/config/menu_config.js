//项目的菜单配置
export default[
  {
    title: '首页', // 菜单标题名称
    key: 'home', // 对应的path
    icon: 'home', // 图标名称
    path: '/admin/home'//对应路径
  },
  {
    title: '菜品管理',
    key: 'product',
    icon: 'appstore',
    path: '/admin/prod_about/product'
    // children: [ // 子菜单列表
    //   {
    //     title: '分类管理',
    //     key: 'category',
    //     icon: 'unordered-list',
    //     path: '/admin/prod_about/category'
    //   },
    //   {
    //     title: '商品管理',
    //     key: 'product',
    //     icon: 'tool',
    //     path: '/admin/prod_about/product'
    //   },
    // ]
  },

  {
    title: '厨师管理',
    key: 'user',
    icon: 'user',
    path: '/admin/user'
  },
  {
    title: '订单管理',
    key: 'role',
    icon: 'safety',
    path: '/admin/role'
  },

  // {
  //   title: '图形图表',
  //   key: 'charts',
  //   icon: 'area-chart',
  //   children: [
  //     {
  //       title: '柱形图',
  //       key: 'bar',
  //       icon: 'bar-chart',
  //       path: '/admin/charts/bar'
  //     },
  //     {
  //       title: '折线图',
  //       key: 'line',
  //       icon: 'line-chart',
  //       path: '/admin/charts/line'
  //     },
  //     {
  //       title: '饼图',
  //       key:  'pie',
  //       icon: 'pie-chart',
  //       path: '/admin/charts/pie'
  //     },
    // ]
  // },
]
