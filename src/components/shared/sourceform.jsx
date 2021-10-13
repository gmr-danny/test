import React, { Component } from 'react';
import {Form, FormGroup, Label, Input, Row, Col} from 'reactstrap'; 

// var select = require('../data/select.json');
// var mockData = require('../data/mockdata.json');
// var fields = require('../data/fields.json');


class Sourceform  extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            contacts: [], 
            edit: false, 


        }
    }

    editForm = () => {
        this.setState({
            edit: !this.state.edit
        });
    }



    generateOptions = (fieldItem) => {
        return Object.keys(fieldItem).map((key, index) => {
            return (<option value={key} key={index}>{key}</option>)})
    }

    generateInput = () => {

    }


    generateAllInputs = () => {
        return (
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                    </FormGroup>
                </Col>
                <Col md={4}>
                    <FormGroup>
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                    </FormGroup>
                </Col>
            </Row>
        );
    }

    render() { 
        return (
            <Form>
                <h3>{this.props.data.serviceProvider}</h3>
                <h5>Source File</h5>
                {this.generateAllInputs()}
            </Form>
        );
    }
}
 
export default Sourceform;
//         <div className="mt-5 gmr-edit-container">
// {
//     this.state.data.serviceProvider ? 
//     <div className="gmr-handle-spinner">
//         <div className="spinner-border" role="status">
//             <span className="sr-only"></span>
//         </div>
//     </div> 
//     :
//     <Sourceform handleInputAutofill={this.handleInputAutofill} data={this.props.data}  />
// }

// </div>