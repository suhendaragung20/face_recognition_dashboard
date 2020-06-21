export const navigationRoutes = {
  root: {
    name: '/',
    displayName: 'navigationRoutes.home',
  },
  routes: [
    {
      name: 'dashboard',
      displayName: 'menu.dashboard',
      meta: {
        iconClass: 'vuestic-iconset vuestic-iconset-dashboard',
      },
    },
    {
      name: 'Face Access',
      displayName: 'Face Access',
      meta: {
        iconClass: 'va-icon fa fa-address-book-o',
      },
      disabled: true,
      children: [
        {
          name: 'loca',
          displayName: 'Lokasi A',
        },
        {
          name: 'locb',
          displayName: 'Lokasi B',
        },
      ],
    },
    // {
    //   name: 'Data Siswa',
    //   displayName: 'Data Siswa',
    //   meta: {
    //     iconClass: 'va-icon fa fa-book',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'form-elements',
    //       displayName: 'menu.formElements',
    //     },
    //     {
    //       name: 'medium-editor',
    //       displayName: 'menu.mediumEditor',
    //     },
    //     {
    //       name: 'buttons',
    //       displayName: 'menu.buttons',
    //     },
    //   ],
    // },
    // {
    //   name: 'Data Siswa',
    //   displayName: 'Data Siswa',
    //   meta: {
    //     iconClass: 'va-icon fa fa-book',
    //   },
    //   children: [
    //     {
    //       name: 'markup',
    //       displayName: 'menu.markupTables',
    //     },
    //     {
    //       name: 'data',
    //       displayName: 'menu.dataTables',
    //     },
    //   ],
    // },
    {
      name: 'siswa',
      displayName: 'Siswa',
      meta: {
        iconClass: 'va-icon fa fa-book',
      },
      disabled: true,
      children: [
        {
          name: 'tambah_siswa',
          displayName: 'Tambah',
        },
        {
          name: 'data_siswa',
          displayName: 'List',
        },
      ],
    },
    {
      name: 'collect_data',
      displayName: 'Collect Data',
      meta: {
        iconClass: 'va-icon fa fa-users',
      },
      disabled: true,
    },
    // {
    //   name: 'buttons',
    //   displayName: 'Analisis',
    //   meta: {
    //     iconClass: 'va-icon fa fa-bar-chart',
    //   },
    //   disabled: true,
    // },
    // {
    //   name: 'pages',
    //   displayName: 'menu.pages',
    //   meta: {
    //     iconClass: 'vuestic-iconset vuestic-iconset-files',
    //   },
    //   disabled: true,
    //   children: [
    //     {
    //       name: 'login',
    //       displayName: 'Login/Signup',
    //     },
    //     {
    //       name: '404-pages',
    //       displayName: '404 Pages',
    //     },
    //   ],
    // },
  ],
}
