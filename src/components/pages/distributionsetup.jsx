import React, { Component } from 'react';

import "react-datepicker/dist/react-datepicker.css";
import './distributionsetup.css';

class DistributionSetup extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            monthly: true,
            selectall: true
        };
    }

    handleSelectAll = () => {
        this.setState({
            selectall: !this.state.selectall
        })
    }


    render() { 
        console.log("states", this.state.clicked)

        const sampleData = ["AMAZON", "AMAZONFREE", "AMAZONMUSIC", "APPLE", "AMI", "BMAT", "DISNEYPLUS", "HULU", "LIVETOURS", "PELETON", "PRS", "RADIO", "SIRUS", "SOCAN", "SOUNDCLOUD", "SPOTIFY"];
        
        
        const fields = sampleData.map((val, index) => {
            return (
                    <DSRow selectall={this.state.selectall} val={val} key={index} />
                
            );
        });
        return (
            <div className="pt-5">
                <div className="form-header">
                    <div className="form-group">
                        <label for="exampleFormControlInput1">Distribution Id</label>
                        <input type="text" class="form-control" id="exampleFormControlInput1" value="341D12"/>
                    </div>
                    <div className="form-group distribution-date">
                        <label for="exampleFormControlInput1">Distribution Date</label>
                        <input type="date" class="form-control" id="exampleFormControlInput1" placeholder="09/22/2021"/>
                    </div>
                    
                </div>
                <table className="table table-hover table-striped mt-5">
                        <thead>
                            <tr>
                                <th scope="col"><span className="form-header"> Data Source <i onClick={this.handleSelectAll} className={this.state.selectall ? "bi bi-check-all select-all": "bi bi-check-all unselect-all"}></i> </span></th>
                                <th scope="col">Usage</th>
                                <th scope="col">Frequency</th>
                                <th scope="col">Months</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields}
                        </tbody>
                </table>
            </div>
        );
    }
}



class DSRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: null,
            monthly: true, 
            monthsClicked: []
        }
    }

    handleClick = () => {
        this.setState({
            clicked: this.state.clicked == null? !this.props.selectall : !this.state.clicked
        });
    }

    handleClickFreq = (monthlyBool) => {
        this.setState({
            monthly: monthlyBool
        })
    }

    handleClickMonths = (months) => {
        if (!this.state.monthly) {
            
        }
    }

    render() { 
        console.log("clicked",this.state.clicked, this.props.selectall)
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthButtons = months.map((val, index) => {
            return (
                
                <button onClick={this.handleClickMonths.bind(null, index+1)} key={index} type="button" className="btn btn-outline-secondary">{val}</button>

            );
        });

        return (
            <tr >
                <td className="col-md-2">
                    {/* <i class={this.state.clicked ? "bi bi-check-circle" : "bi bi-check-circle check-unclicked"} onClick={this.handleClick}></i> */}
                    <input className="form-check-input" onClick={this.handleClick} type="checkbox" checked={this.state.clicked == null ? this.props.selectall : this.state.clicked } id="flexCheckDefault"/>

                </td>
                <td className="col-md-2 padding-top-row">{this.props.val}</td>
                    
                <td className="col-md-2">
                    <div className="form-group col-md-6 btn-group">
                        <button className={this.state.monthly ? "btn btn-outline-secondary freqClicked" : "btn btn-outline-secondary"} onClick={this.handleClickFreq.bind(null, true)}>Monthly</button>
                        <button className={!this.state.monthly ? "btn btn-outline-secondary freqClicked" : "btn btn-outline-secondary"} onClick={this.handleClickFreq.bind(null, false)}>Quarterly</button>
                    </div>
                </td>
                <td className="col-md-6">
                    <div className="input-group">
                        <span className="btn-group">{monthButtons}</span>
                    </div>
                </td>



            </tr>
        );
    }
}



 
export default DistributionSetup;