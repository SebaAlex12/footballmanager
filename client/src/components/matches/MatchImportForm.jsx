import React, { Component } from "react";
// import { useDispatch } from 'react-redux';
import { connect } from "react-redux";

import { importMatches } from "../../actions/matchActions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class MatchImportForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            importList: ""
        }
    }

    // const [importList, setImportList] = useState("");
    // const dispatch = useDispatch();

    importsOnChangeHandler = (event) => {
        const { value } = event.target;
        // console.log("event handler", event.target);
        // setImportList(value);
        this.setState({
            importList: value
        })
    }
    importsSubmitHandler = () => {
        const { importMatches } = this.props;
        const { importList } = this.state;

        console.log("import list",importList);
        importMatches({imports:importList});
        // dispatch(importMatches(importList));
    }

    render(){
        const { importList } = this.state;
        return(
            <React.Fragment>
            <h1>Import</h1>
                <TextAreaFieldGroup
                        name="import"
                        placeholder="import list has to be in json format example [{line:11-cze-21;Turcja;21:00;Włchy}]"
                        value={importList}
                        onChange={(event) => this.importsOnChangeHandler(event)}
                />
                <button className="btn btn-success mb-2" onClick={this.importsSubmitHandler}>
                    importuj
                </button>
            </React.Fragment>
        )
    }

}

const mapStateToProps = () => {
    return {}
}

export default connect(mapStateToProps, { importMatches })(MatchImportForm);