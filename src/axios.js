// If you actually don't want to use the same baseURL for your entire app 
// but only for parts of it & for other part
// You have a different URL & the same for the headers...
// In such a case, you can do a half measure by creating a feature provided by axios is called 'instances'

import axios from 'axios';

// this create a instance of axios, like a copy of the axios obj
// you can create multiple such copies.
const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com/'
});

instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default instance;