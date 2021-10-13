import React, { Component } from 'react';
import SourceInput from './sourceinput';
import './sourcemanagerform.css';


const SourceContacts = (props) => {
    let contacts = props.contactList.map((val, index) => {
        return (
            <span className="col-6" key={index}>
                <IndividualContact contactObj={val} edit={props.edit}  />
            </span>
        );
    });
    return (
        <div className="row">
            { 
                contacts
            }
        </div>
    );
}


class IndividualContact extends Component {
    
    renderContactFields = (contact) => {
        let fields = Object.entries(contact).map((val, index) => {
            if (val[0] === "SourceId" || val[0] === "ContactId" || (val[0] === "MiddleName" && val[1] === "")) {
                return null;
            }
            let fieldName = null; 

            if (val[0].toLowerCase().includes("name")) {
                fieldName = val[0].toLowerCase().split("name")[0] + " Name";
            } else {
                fieldName = val[0];
            }
            return (
                <div className="gmr-edit-header row" key={index}>
                    <div className="col-4">{fieldName}</div>
                    <div className="col-8">
                        {this.props.edit? 
                            <SourceInput name={`${val}_${index}`} type="text" originalValue={contact[val[0]]} />:
                            <div className="gmr-bluefont">{contact[val[0]]} </div>
                        }
                    </div>
                </div>
            );
        });
        return (<div className="fieldsection">{fields}</div>);
    }
    
    render() {
        return (
            <div> 
                {this.renderContactFields(this.props.contactObj)}
            </div>
        );
    }
}
 
export default SourceContacts;