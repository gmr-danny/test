import React, { Component } from 'react';
 
class SourceInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null
        };
    }

    handleChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    render() { 
        return (
            <input name={this.props.name} type={this.props.type} value={this.state.value === null ? this.props.originalValue : this.state.value} onChange={this.handleChange} />
        );
    }
}
 
export default SourceInput;