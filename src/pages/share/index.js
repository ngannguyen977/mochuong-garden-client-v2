import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Menu from './menu/menu';
import Routes from '../../routes';
import Footer from './footer/footer';

class App extends React.Component {
    render() {
        return (

            <div className="App">
                <Menu />
                 <Routes />
                <Footer />
            </div>

        );
    }
}

export default App;
