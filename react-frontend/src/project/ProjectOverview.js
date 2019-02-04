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

    createProject = (project) => {
        let projects = this.state.projects;
        projects.push({id: projects.length, name: project.name, offer: project.offer});
        this.setState({projects: projects})
    };

    updateProject = (project) => {
        let tmp = this.state.projects.find(it => it.id === project.id);
        tmp.name = project.name;
        tmp.offer = project.offer;
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

export default ProjectOverview;
