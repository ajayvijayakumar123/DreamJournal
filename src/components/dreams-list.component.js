import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dream = props => ( //functional react component: no lifecycle method or state
    <tr>
        <td>{props.dream.username}</td>
        <td>{props.dream.description}</td>
        <td>{props.dream.weird}</td>
        <td>{props.dream.date.substring(0,10)}</td>
        <td>
            <Link to={"edit/" + props.dream._id}>edit</Link> | <a href="#" onClick={() => { props.deleteDream(props.dream._id) }}>delete</a>
        </td>
    </tr>
)

export default class DreamsList extends Component { //class component
    constructor(props) {
        super(props);

        this.deleteDream = this.deleteDream.bind(this);
        this.state = {dreams: []};
    }

    //lifecycle method
    componentDidMount() {
        axios.get('http://localhost:5000/dreams/')
            .then(response => {
                this.setState({ dreams: response.data });
            })
            .catch((error) => {
                console.get(error);
            })
    }

    deleteDream(id) {
        axios.delete('http://localhost:5000/dreams/' + id)
            .then(res => console.log(res.data));
        this.setState({
            dreams: this.state.dreams.filter(el => el._id !== id) //only returns the id of dreams that have not been deleted
        })
    }

    dreamList() {
        //for every dream, return component that has dream data
        return this.state.dreams.map(currentDream => {
            return <Dream dream={currentDream} deleteDream={this.deleteDream} key={currentDream._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Logged Dreams</h3>
                <table className ="table">
                    <thread className="thread-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Weirdness</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thread>

                    <tbody>
                        { this.dreamList() }
                    </tbody>
                </table>
            </div>
        )
    }
}