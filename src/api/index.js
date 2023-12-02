import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' }); // create axios instance

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchBlogs = () => API.get('/blogs'); // fetch blogs from backend
export const fetchBlogsBySearch = (searchQuery) => API.get(`/blogs/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`); // fetch blogs from backend by search query
export const createBlog = (newBlog) => API.post('/blogs', newBlog); // create blog in backend
export const updateBlog = (id, updatedBlog) => API.patch(`/blogs/${id}`, updatedBlog); // update blog in backend
export const deleteBlog = (id) => API.delete(`/blogs/${id}`); // delete blog in backend
export const likeBlog = (id) => API.patch(`/blogs/${id}/likeBlog`); // like blog in backend

export const signIn = (formData) => API.post('/user/signin', formData); // sign in user in backend
export const signUp = (formData) => API.post('/user/signup', formData); // sign up user in backend
