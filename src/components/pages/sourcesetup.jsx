import React, {Component} from 'react';

import SourcemanagerForm from '../shared/sourcemanagerform';

import './sourcesetup.css';



export default class SourceSetup extends Component {

    constructor(props) {
        super(props);

        this.state = {
            responseObj: null
        }
    }


    componentDidMount() {
        let parameters = this.props.match.params;
        let id = Object.values(parameters)[0];

        this.getDetails(id); 
    }

    getDetails = async (id) => {
        try {
            var bearer = "Bearer " + sessionStorage.getItem("accessToken");
            var headers = new Headers();
            headers.append("Authorization", bearer);
            const response = await fetch(process.env.REACT_APP_API + "sources/" + id, {
                headers: headers, 
                mode: 'cors'
            });
            const parsed = await response.json();
            console.log("api url", process.env.REACT_APP_API, parsed)
            this.setState({

                responseObj: parsed
            });
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        // swap between Edit and Detailed View
        console.log("Response Object", this.state.responseObj)
        return (
            <div>{this.state.responseObj != null ? <SourcemanagerForm data={this.state.responseObj} /> :
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
            } </div>
        );
    }


}



