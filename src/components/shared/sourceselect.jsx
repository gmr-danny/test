import React, { Component } from 'react';
 
class SourceSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    
    render() { 
        const options = Object.entries(this.props.options).map((value, index) => {
            
            return (
                <option key={index} value={value[1]}>{value[0]}</option>
            );
        });
        return (
            <select className="form-select">
                {options}
            </select>
        );
    }
}
 
export default SourceSelect;