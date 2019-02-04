import 'bootswatch/dist/pulse/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {Component} from 'react';
import Header from './components/Header'
import Footer from './components/Footer'
import ProjectOverview from './components/ProjectOverview'
import './App.css';

class App extends Component {

    fetchProjects = () => {
        return [
            {title: "p1"},
            {title: "p2"}
        ];
    };

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className='container'>
                    <ProjectOverview/>
                </div>
                <Footer projectCount={0}/>
            </div>
        );
    }
}

export default App;
