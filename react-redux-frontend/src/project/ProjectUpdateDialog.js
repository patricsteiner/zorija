import React from 'react';
import {Form} from 'reactstrap';
import Button from "reactstrap/es/Button";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import FormGroup from "reactstrap/es/FormGroup";
import Label from "reactstrap/es/Label";
import Input from "reactstrap/es/Input";

class ProjectUpdateDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            name: props.project.name,
            offer: props.project.offer
        }
    }

    open = () => {
        this.setState({isOpen: true});
    };

    close = () => {
        this.setState({isOpen: false});
    };

    save = () => {
        this.props.updateHandler({id: this.props.project.id, name: this.state.name, offer: this.state.offer});
        this.setState({isOpen: false});
    };

    handleChange = (event) => {
        this.setState({[event.target.id]: event.target.value})
    };

    render() {
        return (
            <div className="float-right">
                <Button color="secondary" onClick={this.open}><i className="fa fa-edit"/></Button>
                <Modal isOpen={this.state.isOpen} toggle={this.close} size="lg">
                    <ModalHeader toggle={this.close}>
                        Edit Project
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>
                                    Project name
                                    <Input type="text" id="name"
                                           value={this.state.name} onChange={this.handleChange}/>
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>
                                    Offer
                                    <Input type="number" id="offer"
                                           value={this.state.offer} onChange={this.handleChange}/>
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" className="float-right" onClick={this.save}>Save</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }

}

export default ProjectUpdateDialog;