import React, {Component} from 'react';
// NavLink - do plan on styling the active post
// Switch tells React Router only load one of the routers
// the 1st router that matches a given path will be loaded & thereafter, it'll be just stop analyzing the routes, it won't render any route.
import {Route, NavLink, Switch} from 'react-router-dom';
import './Blog.css';
import Posts from './Posts/Posts';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

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
                                    to='/'
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
                <Switch>
                    {/* component property need to be a reference to the func or class we want to use*/}
                    <Route path='/' exact component={Posts} />
                    <Route path='/new-post' component={NewPost} />
                    {/*":" will be replaced dyanmically*/}
                    <Route path='/:id' exact component={FullPost}/>
                </Switch>
            </div>
        );
    }
}

export default Blog;