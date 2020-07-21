import React from 'react';

import './Post.css';

const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        {/* We can make sure that we can click on one of these posts and then load the post data
            sp fetch the data for the selected post when we select it
            For this, we need to make sure that we can click our single post here*/}
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);

export default post;