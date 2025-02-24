
const routes = [
  {
    path: '/',
    component: () => import('src/layouts/EMSLayout.vue'),
    meta: {requiresAuth: true},
    children: [
      { path: '*', component: () => import('../pages/errors/ErrorNotFound.vue') },
      { path: 'attan_report',  component: () => import('src/pages/component/attandence/attan_report') },
      { path: 'Empl-list', component: () => import('src/pages/component/employee/employeeTable.vue') },
      { path: 'leavePage', component: () => import('src/pages/component/Leave/leavePage.vue') },
      { path: 'LeaveDetailsDialog', component: () => import('src/pages/component/Leave/LeaveDetailsDialog.vue') },
      { path: 'new_attandence', component: () => import('src/pages/component/attandence/new_attandence') },
      { path: 'list_dep', component: () => import('src/pages/component/categories/categaryTable') },
      { path: 'add_form', component: () => import('src/pages/component/categories/addCategary') },
      { path: 'imageUploader', component: () => import('src/pages/component/imageUploader.vue') },
      { path: 'emp-dashboard', component: () => import('src/pages/component/dashboard/emp-dashboard.vue') },
      { path: 'Approver_leaves', component: () => import('src/pages/component/Leave/Approver_leaves.vue') },
      { path: 'camera', component: () => import('src/pages/component/attandence/camera.vue')},
      { path: 'add_employee', component: () => import('src/pages/component/employee/add_employee.vue')},
      { path: 'attandenceForm', component: () => import('src/pages/component/attandence/attandenceForm.vue')},
      { path: 'productTable', component: () => import('src/pages/component/products/productTable.vue') },
      { path: 'new_product', component: () => import('src/pages/component/products/new_product.vue') },
      { path: 'AccountSettings', component: () => import('src/pages/component/AccountSettings.vue') },
      { path: 'bill_model', component: () => import('src/pages/component/bilTable/bill_model.vue') },
      { path: 'inventory', component: () => import('src/pages/component/Inventory/inventory') },
      { path: 'carTable', component: () => import('src/pages/component/carModel/carTable.vue') },

    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/blanck.vue'),
    children: [
      { path: 'SignUp', component: () => import('src/pages/authentication/SignUp.vue') },
      { path: 'LoginPage', component: () => import('src/pages/authentication/LoginPage.vue') },
    ]
  },

  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/errors/ErrorNotFound.vue')
  }
]

export default routes
