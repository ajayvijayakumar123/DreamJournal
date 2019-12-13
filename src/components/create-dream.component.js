import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class CreateDream extends Component {
    constructor(props) {
        super(props);

        //makes sure this refers to the right thing
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeWeird = this.onChangeWeird.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        //properties related to the mongodb
        this.state = {
            username: '',
            description: '',
            weird: 0,
            date: new Date(),
            users: []
        }
    }

    //lifecycle method - auto called right before anything is displayed
    componentDidMount() {
        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username), //returns username for each user in db
                        username: response.data[0].username //set to first user
                    })
                }
            })
    }

    onChangeUsername(e) {
        // dont do this: this.state.username = "ajay"
        this.setState({ //can update one prop of state
            username: e.target.value //e.target is textbox, .value is the value of the textbox
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onChangeWeird(e) {
        this.setState({
            weird: e.target.value
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date
        });
    }

    onSubmit(e) {
        e.preventDefault(); //defaults default html form submit

        const dream = {
            username: this.state.username,
            description: this.state.description,
            weird: this.state.weird,
            date: this.state.date
        }
        
        console.log(dream);
        
        axios.post('http://localhost:5000/dreams/add', dream)
            .then(res => console.log(res.data));

        window.location = '/'; //home page
    }

    render() {
        return (
            <div>
                <h3>Create New Dream Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user) {
                                    return <option
                                        key={user}
                                        value={user}>{user}
                                        </option>;
                                }) 
                            }
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                            />
                    </div>

                    <div className="form-group">
                        <label>Weirdness factor: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.weird}
                            onChange={this.onChangeWeird}
                            />
                    </div>

                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                                />
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Dream Log" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}