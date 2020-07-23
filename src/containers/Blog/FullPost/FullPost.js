import React, {Component} from 'react';
import axios from 'axios';
import './FullPost.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }

    componentDidMount() {
        console.log(this.props);
        this.loadData();
    }

    // it's important to understand that we need to handle changes in componentDidUpdate() if the post component in general is already loaded through routing
    // because the router will not unmount the old one and mount the same one again with different data
    // it will reuse the old one and just adjust the route param
    // It's your job to react to this new param and you can react to that in componentDidUpdate() which will be called because the props changed.
    // You recieve a new props with a new match obj/new params obj/new ID
    componentDidUpdate() {
        this.loadData();
    }

    loadData() {
        if (this.props.match.params.id) {
            // this.state.loadedPost && this.state.loadedPost.id !== this.props.match.params.id
            // it would still not work, because
            // 1. the ID (this.props.match.params.id) we're retrieving from the route params is going to be string
            // 2. the ID stored in the loadedPost (this.state.loadedPost.id) is a number
            // so we either have to convert '1' to a number (!= +this.props.match.params.id), or turn this into check where we've just check for the value (!=)

            if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id != +this.props.match.params.id)) {
                axios.get('/posts/' + this.props.match.params.id)
                    .then(Response => {
                        this.setState({loadedPost: Response.data});
                    });
            }
        }
    }
    
    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.match.params.id)
            .then(Response => {
                console.log(Response);
            });
    }

    render () {

        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.match.params.id) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
                    </div>
                </div>
            );
        };    
        return post;
    }
}

export default FullPost;