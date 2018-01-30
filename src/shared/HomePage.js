import React, { Component } from 'react';
import Footer from "./template/footer/Footer";
import Header from "./template/header/Header";

class HomePage extends Component {
    render() {
        return (
            <div>
                <Header/>
                <Footer/>
            </div>
        );
    }
}
export default HomePage;
