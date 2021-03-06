import React, {Component} from 'react';
// import axios from 'axios';
import axios from '../../../axios';
// import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';
import FullPost from '../FullPost/FullPost';

class Posts extends Component {
    state = {
        posts: [],
    }
    
    // componentDidMount() will be excuted eacch time we changed a page
    // because the component is removed & added to the DOM all the time.
    componentDidMount() {
        console.log(this.props);
        axios.get('/posts')
            .then(Response => {
                // Actually we fetched them all but we only store 4 of them in that 'Posts' const
                const posts = Response.data.slice(0, 4);
                // create 'updatedPosts', because we want to add an 'author' field to own posts.
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Hai Trieu',
                    }
                });
                this.setState({posts: updatedPosts})
            })
            .catch(error => {
                console.log(error);
            });
            // this.setState();            
            // If we could call it outside of this (after this axios get() method)
            // We wouldn't have the post yet because the code JS doesn't wait for this to finish
            // So if you're immediately calling this.setState after the get() method, the date won't have been fetched yet.
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
    }

    render() {
        // call the map() method to map it into an array of JSX elements
        // and the map() method will returns a new array which we store in the "posts" const.
        // We get my individual "post" as an input in that function we're passing to the map() method
        let posts = <p style={{textAlign: 'center'}}>Something went wrong...</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return (
                    // <Link to={'/' + post.id} key={post.id}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} />
                    // </Link>);
                 );
            })
        }

        return (
            <div>
                <section className='Posts'>
                    {posts}
                </section>
                {/*":" will be replaced dyanmically*/}
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
        );
    }
}

export default Posts;