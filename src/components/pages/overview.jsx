import React, {Component} from 'react';
import DataTable from 'react-data-table-component';

import './overview.css';
var titles = require('../data/data.json');


export default class Overview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            datapoints:[],
        };
    }

    componentDidMount() {
        this.getData(); 
    }

    getData = async () => {
        try {
            var bearer = "Bearer " + sessionStorage.getItem("accessToken");
            var headers = new Headers();
            headers.append("Authorization", bearer);

            const response = await fetch(process.env.REACT_APP_API + 'sources', {
                mode: "cors",
                headers: headers
            });

            const parsed = await response.json();
            // let temp = []; 
            // for (let i in parsed) {
            //     temp.push({
            //         "comments": parsed[i].comments, 
            //         "frequency": parsed[i].deliveryFrequencyId, 
            //         "serviceProvider": parsed[i].serviceProvider
            //     });
            // }
            console.log("parsed", parsed)
            this.setState({
                
                datapoints: parsed
            });
        } catch (err) {
            console.log(err);
        }
    }

    goToEditPage = (id) => {

    }

    goToViewDetailPage = (id) => {
        window.location.href = '/sources/' + id;
    }

    render() {
        console.log("Environment:", process.env.REACT_APP_ENV);
        return (
            <div>
                {
                    this.state.datapoints.length === 0 ? 
                        <div className="gmr-handle-spinner">
                            <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                            </div>
                        </div>
                        :
                        <Table datapoints={this.state.datapoints} goToViewDetailPage={this.goToViewDetailPage} goToEditPage={this.goToEditPage} />

                }

            </div>
        );
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
}


const Table = (props) => {
    const data = props.datapoints;
    console.log("datapoints: ", data, "title:" , titles.Response)

    return (
        <DataTable className="datatable"  fixedHeader={true} dense={true} keyField="id" striped={true} highlightOnHover={true} pointerOnHover={true} onRowClicked={(e)=>{window.location.href = '/sources/' + e.SourceId;}} responsive={true} columns={titles.Response} data={data}/> 
        
        );
};