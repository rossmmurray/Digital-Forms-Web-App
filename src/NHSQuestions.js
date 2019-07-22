// /client/App.js
import React, {Component} from 'react';
import './css/App.css';
import axios from "axios";

class NHSQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drugs: '',
            sexuality: 'heterosexual'
        };
        // todo: not need
        // this.handleChangeGeneric = this.handleChangeGeneric.bind(this);
    }

    handleChangeGeneric  = (event) => {
        //todo: delete the below field before releasing to production
        event.persist();
        this.setState({[event.target.name]: event.target.value});
    };


    putDataToDB = (message) => {
        let currentIds = this.state.data.map((data) => data.id);
        let idToBeAdded = 0;
        while (currentIds.includes(idToBeAdded)) {
            ++idToBeAdded;
        }

        axios.post(this.base_url + '/putData', {
            id: idToBeAdded,
            message: message,
        });
    };

    // here is our UI
    // it is easy to understand their functions when you
    // see them render into our screen
    render() {
        // const {data} = this.state;
        return (
            <div>
                <h1>NHS Unified Mental Health Triage Tool</h1>

                <form className="nhsuk-form-group">
                    <label>
                        Do you take any drugs?
                        <input
                            name="drugs"
                            type="text"
                            value={this.state.drugs}
                            className='nhsuk-input'
                            style={{ width: '200px' }}
                            onChange={this.handleChangeGeneric}
                            autoComplete="off"
                        />
                    </label>
                    <br/>
                    <label>
                        Sexual Orientation
                        <select name="sexuality" className="nhsuk-select" value={this.state.sexuality} onChange={this.handleChangeGeneric}>
                            <option value="homosexual">Homosexual</option>
                            <option value="heterosexual">Heterosexual</option>
                            <option value="bisexual">Bisexual</option>
                            <option value="other">Other</option>
                        </select>
                    </label>
                </form>
                <button type="submit" className='nhsuk-button'>
                    Submit
                </button>
            </div>

        );
    }


}

export default NHSQuestions;
