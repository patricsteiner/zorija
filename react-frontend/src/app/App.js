import 'bootswatch/dist/pulse/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import ProjectOverview from '../project/ProjectOverview'
import Alert from "reactstrap/es/Alert";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false
        };
    }

    errorHandler = error => {
        this.setState({alertOpen: true, alert: error});
    };

    dismissAlert = () => {
        this.setState({alertOpen: false});
    };

    render() {
        return (
            <div className="App">
                <Header/>
                <div className='container'>
                    <Alert color="danger" isOpen={this.state.alertOpen} toggle={this.dismissAlert}>{this.state.alert}</Alert>
                    <ProjectOverview url='http://localhost:8080' errorHandler={this.errorHandler}/>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default App;
