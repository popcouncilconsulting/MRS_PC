// import lib
import Loadable from 'react-loadable'

// import components
import LoadingComponent from '../../components/common/loader'

const routes = [
  {
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('./pages/home'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard_Manthan',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard_Manthan'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard_Aravali',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard_Aravali'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard_Saptagiri',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard_Saptagiri'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard_Vindhyanchal',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard_Vindhyanchal'),
      loading: LoadingComponent,
    }),
  },

  {
    path: '/dashboard_HuddleRoom',
    exact: true,
    auth: true,
    component: Loadable({
      loader: () => import('./pages/dashboard_HuddleRoom'),
      loading: LoadingComponent,
    }),
  },

]

export default routes
