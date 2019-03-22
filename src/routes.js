import React from 'react'
import { Route } from 'react-router-dom'
import { ConnectedSwitch } from 'reactRouterConnected'
import Loadable from 'react-loadable'
import Page from 'components/LayoutComponents/Page'
import NotFoundPage from 'pages/DefaultPages/NotFoundPage'
import DashboardAlphaPage from 'pages/Dashboard/DashboardAlphaPage'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  // Default Pages
  '/register': {
    component: loadable(() => import('pages/DefaultPages/RegisterPage')),
  },
  '/login': {
    component: loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/customers/activate': {
    component: loadable(() => import('pages/DefaultPages/ConfirmPage')),
  },
  '/profile': {
    component: loadable(() => import('pages/DefaultPages/ProfilePage')),
  },
  '/empty': {
    component: loadable(() => import('pages/DefaultPages/EmptyPage')),
  },
  // Dashboards
  '/home': {
    component: loadable(() => import('pages/Dashboard/DashboardAlphaPage')),
  },
  // users
  '/users': {
    component: loadable(() => import('pages/authen/Users')),
  },
  '/users/create': {
    component: loadable(() => import('pages/authen/Users/CreatePage')),
  },
  '/users/:name': {
    component: loadable(() => import('pages/authen/Users/DetailPage')),
  },
  // things
  '/things': {
    component: loadable(() => import('pages/iot/things')),
  },
  '/things/register': {
    component: loadable(() => import('pages/iot/things/registerPage')),
  },
  '/things/:name': {
    component: loadable(() => import('pages/iot/things/DetailPage')),
  },
  '/things/:name/users': {
    component: loadable(() => import('pages/iot/things/DetailPage/attach')),
  },

}

class Routes extends React.Component {
  timeoutId = null

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000, // load after 5 sec
    )
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
  }

  render() {
    return (
      <ConnectedSwitch>
        <Route exact path='/' component={DashboardAlphaPage} />
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path]
          props.exact = exact === void 0 || exact || false // set true as default
          return <Route key={path} path={path} {...props} />
        })}
        <Route
          render={() => (
            <Page>
              <NotFoundPage />
            </Page>
          )}
        />
      </ConnectedSwitch>
    )
  }
}

export { loadableRoutes }
export default Routes
