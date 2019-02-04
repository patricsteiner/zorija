import 'bootswatch/dist/pulse/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import React, {Component} from 'react';
import Header from './Header'
import Footer from './Footer'
import ProjectOverview from '../project/ProjectOverview'

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: [
                {id: 0, name: "p1", offer: 123},
                {id: 1, name: "p2", offer: 234}
            ]
        };
        this.fetchProjects();
    }

    fetchProjects = () => {
        // TODO
    };

    componentDidMount() {
    }

    render() {
        return (
            <div className="App">
                <Header/>
                <div className='container'>
                    <ProjectOverview projects={this.state.projects}/>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default App;
