import 'bootswatch/dist/pulse/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import Alert from "reactstrap/es/Alert";
import ProjectOverview from "../project/ProjectOverview";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alertOpen: false,
            loading: true
        };
    }

    async componentDidMount() {
        try {
            const response = await fetch('application.json');
            if (!response.ok) {
                throw Error(response.statusText);
            }
            const config = await response.json()
            this.serverUrl = config.serverUrl;
        } catch (ex) {
            this.errorHandler("cannot load config file");
        } finally {
            this.setState({loading: false})
        }
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
                    <Alert color="danger" isOpen={this.state.alertOpen}
                           toggle={this.dismissAlert}>{this.state.alert}</Alert>
                    {(this.state.loading) ? (
                        <i className="fa fa-spinner fa-spin"/>
                    ) : (
                        <ProjectOverview serverUrl={this.serverUrl} errorHandler={this.errorHandler}/>
                    )}
                </div>
                <Footer/>
            </div>
        );
    }

}

export default App;
