import React, { Component } from 'react';
import SourceSelect from './sourceselect';
import SourceInput from './sourceinput';
var select = require('../data/select.json');


class FileFrequency extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() { 
        return (
            <div className="fieldsection">
                <FileFreqField edit={this.props.edit} type="select" name="Delivery Frequency" value={this.props.sourceObj.Frequency.FrequencyName}  /> 
                <FileFreqField edit={this.props.edit} type="input" name="Expected Delivery" value={this.props.sourceObj.ExpectedDelivery.Name} subVal={this.props.sourceObj.ExpectedDeliveryDays} /> 
                <FileFreqField edit={this.props.edit} type="select" name="Source Lag" value={this.props.sourceObj.SourceLag.Name}  /> 
                <FileFreqField type="switch" name="IsActive" value={this.props.sourceObj.IsActive} edit={this.props.edit} />

            </div>
        );
    }
}

 
class FileFreqField extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() { 
        let tempname = this.props.name.split(/(?=[A-Z])/);
        let fieldname = tempname[0] + " " + tempname[1]; 

        // If input is type "select", generate options
        let selectOptions = null; 
        if( this.props.name === "Delivery Frequency") { 
            selectOptions = select.deliveryFrequency; 
        } else if (this.props.name === "Source Lag"){
            selectOptions = select.sourceLag;
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
        } else if (this.props.type==="input") {
            inputObj = () => {
                return (
                    <SourceInput name={this.props.name} type="text"  value={this.props.value} />
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
                    <div className="gmr-bluefont"> {typeof this.props.subVal !== "undefined" ? this.props.subVal : null } {`${this.props.value}`} </div>
                }
                </div>
            </div>
        );
    }
}
 

export default FileFrequency;