import React from 'react';
import ProjectCreateDialog from "./ProjectCreateDialog";
import Button from "reactstrap/es/Button";
import Table from "reactstrap/es/Table";
import ProjectUpdateDialog from "./ProjectUpdateDialog";

class ProjectOverview extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: []
        };
    }

    componentDidMount() {
        this.fetchProjects();
    }

    fetchProjects = () => {
        fetch(this.props.url)
            .then(result => result.json())
            .then(result => this.setState({projects: result}));
    };

    createProject = (project) => {
        let request = new Request(this.props.url, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(project)
        });
        fetch(request)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Validation error")
                }
                return response.json();
            })
            .then(project => {
                this.state.projects.push(project);
                this.setState(this.state.projects);
            })
            .catch(error => this.props.errorHandler(error.toString()));
    };

    updateProject = (project) => {
        let request = new Request(this.props.url + '/' + project.id, {
            method: 'PUT',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify(project)
        });
        fetch(request)
            .then(response => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error("Validation error");
                }
                return response.json();
            })
            .then(project => {
                let tmp = this.state.projects.find(it => it.id === project.id);
                tmp.name = project.name;
                tmp.offer = project.offer;
                this.setState({projects: this.state.projects});
            })
            .catch(error => this.props.errorHandler(error.toString()));
    };

    deleteProject = (id) => {
        let request = new Request(this.props.url + '/' + id, {
            method: 'DELETE',
        });
        fetch(request)
            .then(response => {
                if (response.ok) {
                    let projects = this.state.projects.filter(project => project.id !== id);
                    this.setState({projects: projects})
                } else {
                    throw new Error("cannot delete");
                }
            })
            .catch(error => this.props.errorHandler(error.toString()));
    };

    render() {
        let projects = this.state.projects.map(project =>
            <tr key={project.id}>
                <td>{project.id}</td>
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
                        <th>Id</th>
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
