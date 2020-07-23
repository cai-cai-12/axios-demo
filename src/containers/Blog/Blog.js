import React, {Component} from 'react';
// NavLink - do plan on styling the active post
// Switch tells React Router only load one of the routers
// the 1st router that matches a given path will be loaded & thereafter, it'll be just stop analyzing the routes, it won't render any route.
import {Route, NavLink, Switch, Redirect} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';

class Blog extends Component {
    render () {
        return (
            <div className='Blog'>
                <header>
                    <nav>
                        <ul>
                            {/* It looks exactly like before but now simply react is re-rendering parts of the page which need to be re-rendered
                                we're not loading a new page && not loading the same page again
                                Notes: when loading the same page again, it's still react rendering the JScode to the DOM
                                and therefore lose our state*/}
                            <li><NavLink 
                                    to='/posts/'
                                    exact
                                    activeClassName='my-active'
                                    activeStyle={{
                                        color: '#fa923f',
                                        textDecoration: 'underline'
                                    }}>Posts</NavLink></li>
                            <li><NavLink to={{
                                pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* component property need to be a reference to the func or class we want to use*/}
                <Switch>
                    <Route path='/new-post' component={NewPost} />
                    <Route path='/posts' component={Posts} />
                    <Redirect from='/' to='/posts' />
                </Switch>
            </div>
        );
    }
}

export default Blog;