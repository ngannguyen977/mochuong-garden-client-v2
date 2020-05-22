import React from "react"
import { Route } from "react-router-dom"
import { ConnectedSwitch } from "reactRouterConnected"
import Loadable from "react-loadable"
import Page from "components/LayoutComponents/Page"
import NotFoundPage from "pages/DefaultPages/NotFoundPage"
import DashboardAlphaPage from "pages/home"

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  })

const loadableRoutes = {
  "/products": {
    component: loadable(() => import("pages/products")),
    
  },
  "/home": {
    component: loadable(() => import("pages/home")),
    
  },
  "/categories": {
    component: loadable(() => import("pages/categories")),
    
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
