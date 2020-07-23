import React, {Component} from 'react';

// Once we clicked 'Add Post' submit btn & made our HTTP request
// We often wnat to change the page and not remain on that page -> using the Redirect component
import {Redirect} from 'react-router-dom';

import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: 'Hai Trieu',
        submitted: false,
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            body: this.state.body,
            author: this.state.author
        }
        axios.post('/posts/', data)
            .then(Response => {
                console.log(Response);
                this.setState({submitted: true});
                // Now we can use submitted to determine whether or not to render redirect
            });
    }

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to='/posts' />;
        }

        return (
            <div className="NewPost">
                {/* If we place redirect in JSX here (outside of a Switch statement) 
                    we always have to redirect with the 'to' property though, we can't use 'from'*/}
                {/* <Redirect to='/posts' /> */}
                {/* If we click on 'New Post', we're immediately redirected back to 'Posts'
                    because the Redirect component is rendered, and we have no change of entering content
                    -> we need to render this conditionally */}
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Body</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({body: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Hai Trieu">Hai Trieu</option>
                    <option value="Cai">Cai</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;