import React from 'react';
import ProjectCreateDialog from "./ProjectCreateDialog";
import Button from "reactstrap/es/Button";
import Table from "reactstrap/es/Table";
import ProjectUpdateDialog from "./ProjectUpdateDialog";

class ProjectOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: this.props.projects
        };
    }

    createProject = (name, offer) => {
        let projects = this.state.projects;
        projects.push({id: projects.length, name: name, offer: offer});
        this.setState({projects: projects})
    };

    updateProject = (id, name, offer) => {
        let project = this.state.projects.find(project => project.id === id);
        project.name = name;
        project.offer = offer;
        this.setState({projects: this.state.projects});
    };

    deleteProject = (id) => {
        let projects = this.state.projects.filter(project => project.id !== id);
        this.setState({projects: projects})
    };

    render() {
        let projects = this.state.projects.map(project =>
            <tr key={project.id}>
                <td>{project.name}</td>
                <td>{project.offer}</td>
                <td>
                    <Button className="float-right" color='danger' onClick={() => this.deleteProject(project.id)}>
                        <i className='fa fa-trash'/></Button>
                    <ProjectUpdateDialog project={project} updateHandler={this.updateProject}/>
                </td>
            </tr>
        );
        return (
            <div>
                <ProjectCreateDialog createHandler={this.createProject}/>
                <h2>Projects</h2>
                <Table hover>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Offer</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>{projects}</tbody>
                </Table>
            </div>
        )
    }

}

ProjectOverview.defaultProps = {
    projects: [
        {id: 0, name: "asasdasddsasd", offer: 20},
        {id: 1, name: "qweqwwqw", offer: 30}
    ]
};

export default ProjectOverview;
