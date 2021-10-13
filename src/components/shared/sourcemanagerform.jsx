import React, { Component } from 'react';
import SourceFile from './sourcefile';
import { Button } from 'reactstrap/lib';
import SourceContacts from './sourcecontacts';
import FileFrequency from './filefrequency';
import './sourcemanagerform.css';


class SourcemanagerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false, 
            data: {}, 
            contacts: [""],

            // autofill 
            url: "", 
            filepath: ""
            
        };
    }

    componentDidMount() {
        if (sessionStorage.getItem("create") === "1") {
            this.setState({
                edit: true
            });
            sessionStorage.removeItem("create");
        }
    }

    editForm = () => {
        this.setState({
            edit: !this.state.edit
            // data: this.props.data
        });
    }


    handleInputChange = (event) => {
        this.setState({
			data: {
				...this.state.data, 
				[event.target.name]: event.target.value
			}
		})
    }

    formatObj = () => {
        // Fix format of Object 
        let tempObj = this.state.data; 
        delete tempObj.sourceId;

        for (let property in tempObj) {
            let newName = property.charAt(0).toUpperCase() + property.slice(1);

            let tempVal = tempObj[property]; 

            if (newName === "Contacts") {
                let tempContactArr = []; 
                
                for (let i = 0; i < tempObj["contacts"]; i++) {
                    let tempContactObj = {}; 
                    for (let field in tempObj["contacts"][i]) {
                        let newContactField = field.charAt(0).toUpperCase() + field.slice(1);
                        tempContactObj[newContactField] = tempObj["contacts"][i][field];
                    }
                    tempContactArr.push(tempContactObj);
                }
                delete tempObj.contacts; 
                tempObj.Contacts = tempContactArr; 
            } else {
                delete tempObj[property]; 
                tempObj[newName] = tempVal;
            }

        }
        return tempObj; 
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        let tempObj = this.formatObj();


        try {
            var bearer = "Bearer " + localStorage.getItem("accessToken");
            var headers = new Headers();
            headers.append("Authorization", bearer);
            headers.append("Content-Type", "application/json");

            const response = await fetch('https://apim-sourcemanager-dev-001.azure-api.net/sources/PutSources', {
                headers: headers,
                //credentials: 'include',
                method: "POST",
                body: JSON.stringify(tempObj), 
                mode: 'cors'
            });
            //const parsedResponse = await response.json(); 
            console.log(response);
        } catch (err) {
            //console.log('err', err)
            return err; 
        };
    }


    generateOptions = (fieldItem) => {
        return Object.keys(fieldItem).map((key, index) => {
            return (<option value={key} key={index}>{key}</option> )})
    }

    addContact = () => {
        this.setState({
            contacts: [...this.state.contacts, ""]
        })
    }

    handleInputAutofill = (e) => {
        console.log("autofill", e.target.value);
        let urlInput, filePathInput; 
        switch(e.target.value) {
            case "FTP": 
                urlInput = "/FTP"; 
                filePathInput = "/FTP";
                break; 
            case "SFTP": 
                urlInput = "/SFTP"; 
                filePathInput = "/SFTP";
                break; 
            case "GMR FTP": 
                urlInput = "/GMR/FTP"; 
                filePathInput = "/GMR/FTP";
                break; 
            case "MRI FTP": 
                urlInput = "/MRI/FTP"; 
                filePathInput = "/MRI/FTP";
                break; 
            case "Email": 
                urlInput = "blank@email.com"; 
                filePathInput = "/EmailAddress";
                break; 
            case "Hightail- like box": 
                urlInput = "/Hightail"; 
                filePathInput = "/Box/Hightail";
                break; 
            case "Box.com": 
                urlInput = "box.com"; 
                filePathInput = "/box";
                break; 
            case "Google Docs": 
                urlInput = "drive.google.com"; 
                filePathInput = "/GoogleDocs";
                break; 
            case "Index BI": 
                urlInput = "/Index/BI"; 
                filePathInput = "/Index/BI";
                break;
            case "BMAT Cloud": 
                urlInput = "/BMAT/Cloud"; 
                filePathInput = "/BMAT";
                break;
            default: 
                break;
        }
        this.setState({
            url: urlInput, 
            filepath: filePathInput
        });
    }

    deleteContact = (index) => {
// give each contact unique ID

        console.log("contact index", index);
        
        let temp = this.state.contacts.splice(index, 1); 
        this.setState({
            contacts: temp
        });
    }

    render() { 
        console.log("Current State", this.state, this.props); 

        return (
            <div className="mt-5 gmr-edit-container">
       
                <form onSubmit={this.handleSubmit}>
                    <section className="gmr-edit-section">
                        
                            <h1> {!this.state.edit ? <span>{this.props.data.ServiceProvider ? this.props.data.ServiceProvider :
                                <div>
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only"></span>
                                    </div>
                                </div>
                            }</span>  : <input name="sourceName" placeholder={this.props.data.ServiceProvider} /> } </h1>
                            
                        <div className="button-container">
                        <Button className={this.state.edit ? "gmr-save-changes moreright" : "gmr-save-changes bluebackground" } onClick={this.editForm}>{!this.state.edit ? "Edit" : "Save"}</Button> 
                        {this.state.edit ? <Button className="gmr-save-changes" onClick={this.editForm} color="secondary">Cancel</Button>  : ""}
                        </div>
                    </section>
                    <div className="row ml-5 mr-5 gmr-flex-1 p-2">
                        <section className="gmr-edit-section col-xs-12 col-sm-6"> 
                            
                            <h1 className="gmr-section-title-edit">Source File</h1>
                            <SourceFile sourceObj={this.props.data} edit={this.state.edit} /> 

                        </section> 
                        <section className="gmr-edit-section col-xs-12 col-sm-6"> 
                            <h1 className="gmr-section-title-edit">File Frequency</h1>
                            <FileFrequency sourceObj={this.props.data} edit={this.state.edit} />
                        </section>
                    </div>
                    <div className="row ml-5 mr-5 gmr-flex-1 p-2">
                            <h1 className="gmr-section-title-edit col-12">CONTACTS <span className="add-contact" onClick={this.addContact}>{this.state.edit ? "+" : ""}  </span></h1>

                            {<SourceContacts edit={this.state.edit} contactList={this.props.data.Contacts} />  }
                        

                    </div>
                </form>

            </div>
        );
    }
}
 
export default SourcemanagerForm;