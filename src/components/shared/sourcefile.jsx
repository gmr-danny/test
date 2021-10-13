import React, {Component} from 'react';
import SourceSelect from './sourceselect';
var select = require('../data/select.json');

 
class SourceFile extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    // props: sourceObj, edit
    render() {
        return (
            <div className="fieldsection">
                <SourceFields type="select" name="SourceFileDeliveryMethod" value={this.props.sourceObj.SourceFileDeliveryMethod.Name} edit={this.props.edit} /> 
                <SourceFields type="select" name="SourceType" value={this.props.sourceObj.SourceType.Name} edit={this.props.edit}/>
                <SourceFields type="switch" name="ProvidesRevenueReport" value={this.props.sourceObj.ProvidesRevenueReport} edit={this.props.edit} />
                <SourceFields type="switch" name="ProvidesCueSheets" value={this.props.sourceObj.ProvidesCueSheets} edit={this.props.edit} />
            </div>
        );
    }
}

class SourceFields extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    render() {
        let tempname = this.props.name.split(/(?=[A-Z])/);
        let fieldname = tempname[0] + " " + tempname[1]; 

        // If input is type "select", generate options
        let selectOptions = null; 
        if( this.props.name === "SourceFileDeliveryMethod") {
            fieldname = "Delivery Method"; 
            selectOptions = select.inputType; 
        } else {
            selectOptions = select.sourceType;
        }
        // Determine type of input
        let inputObj = null; 
        if (this.props.type === "select") {
            inputObj = () => {
                return (
                    <SourceSelect options={selectOptions} />
                );
            }
        } else if (this.props.type === "switch") {
            inputObj = () => {
                return (
                    <input className="form-check-input" type="checkbox" name={this.props.name} value={this.props.value} />
                );
            }
        }

        return (
            <div className="gmr-edit-header row">
                <div className="col-4">{fieldname}</div>
                <div className={this.props.type === "switch" && this.props.edit ? "form-check form-switch col-8" : "col-8"}>
                {
                    this.props.edit ? 
                    inputObj()
                    :   
                    <div className="gmr-bluefont"> {`${this.props.value}`} </div>
                }
                </div>
            </div>
            );
    }
    
}

export default SourceFile;