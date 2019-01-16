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
  // Groups
  '/groups': {
    component: loadable(() => import('pages/authen/Groups')),
  },
  '/groups/create': {
    component: loadable(() => import('pages/authen/Groups/CreatePage')),
  },
  '/groups/detail/:id': {
    component: loadable(() => import('pages/authen/Groups/DetailPage')),
  },
  // users
  '/users': {
    component: loadable(() => import('pages/authen/Users')),
  },
  '/users/create': {
    component: loadable(() => import('pages/authen/Users/CreatePage')),
  },
  '/users/detail/:id': {
    component: loadable(() => import('pages/authen/Users/DetailPage')),
  },
  // permissions
  '/permissions': {
    component: loadable(() => import('pages/authen/Permissions')),
  },
  '/permissions/create': {
    component: loadable(() => import('pages/authen/Permissions/CreatePage')),
  },
  '/permissions/detail/:id': {
    component: loadable(() => import('pages/authen/Permissions/DetailPage')),
  },
  // projects
  '/projects': {
    component: loadable(() => import('pages/iot/projects')),
  },
  '/projects/create': {
    component: loadable(() => import('pages/iot/projects/CreatePage')),
  },
  '/projects/:id': {
    component: loadable(() => import('pages/iot/projects/DetailPage')),
  },
  // policies
  '/policies': {
    component: loadable(() => import('pages/iot/policies')),
  },
  '/policies/create': {
    component: loadable(() => import('pages/iot/policies/CreatePage')),
  },
  '/policies/:id': {
    component: loadable(() => import('pages/iot/policies/DetailPage')),
  },
  // templates
  '/templates': {
    component: loadable(() => import('pages/iot/templates')),
  },
  '/templates/create': {
    component: loadable(() => import('pages/iot/templates/CreatePage')),
  },
  '/alerts/:property': {
    component: loadable(() => import('pages/iot/alerts/create')),
  },
  '/templates/:id': {
    component: loadable(() => import('pages/iot/templates/DetailPage')),
  },

  // priority
  '/priorities': {
    component: loadable(() => import('pages/iot/priorities')),
  },
  '/priorities/create': {
    component: loadable(() => import('pages/iot/priorities/CreatePage')),
  },
  '/priorities/:id': {
    component: loadable(() => import('pages/iot/priorities/DetailPage')),
  },
  // properties
  '/properties': {
    component: loadable(() => import('pages/iot/properties')),
  },
  '/properties/create': {
    component: loadable(() => import('pages/iot/properties/CreatePage')),
  },
  '/properties/:id': {
    component: loadable(() => import('pages/iot/properties/DetailPage')),
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
        <Route exact path="/" component={DashboardAlphaPage} />
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
