import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './menu/menu';
import routes from './routes';
import Footer from './footer/footer';

class App extends React.Component {
    render() {
        return (

            <div className="App">
                <Menu />
                <Switch>
                    {this.showContentMenus(routes)}
                </Switch>
                <Footer />
            </div>

        );
    }
    showContentMenus = (routes) => {
        let result = null;
        if (routes.length > 0) {
            result = routes.map((route, index) => {
                return (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.main}
                    />
                )
            })
        }
        return result;

    }
}

export default App;
