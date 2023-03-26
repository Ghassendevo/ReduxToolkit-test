import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { nanoid } from "@reduxjs/toolkit";
import axios from "axios"
const POST_URL = 'http://localhost:9006/api/v1/categorys'
const initialState = {
    posts: [{ id: 1, titre: "my first post" }],
    status: 'idle',
    error: null,
}
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async() => {
    try {
        const response = await axios.get(POST_URL)
        return response.data
    } catch (err) {
        return err.message;
    }
})

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload)
            },
            prepare(title, content) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content
                    }
                }
            }
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'laoding'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = "succeeded"
                console.log(action.payload)
                state.posts.splice(0, 0, ...action.payload);
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message
            })
    }
})

export const getAllPosts = (state) => state.posts.posts;
export const getPostsStatus = (state) => state.posts.status;
export const getPostsErr = (state) => state.posts.err;
export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;