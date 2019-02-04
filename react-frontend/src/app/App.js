import 'bootswatch/dist/pulse/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import ProjectOverview from '../project/ProjectOverview'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Header/>
                <div className='container'>
                    <ProjectOverview url='http://localhost:8080'/>
                </div>
                <Footer/>
            </div>
        );
    }

}

export default App;
