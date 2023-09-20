import {IPost} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {createPosts, fetchOnePost, fetchPosts} from "./postsThunk";

interface PostsState {
    items: IPost[],
    item: IPost | null,
    fetchLoading: boolean;
    fetchOneLoading: boolean;
    createLoading: boolean;
}

const initialState: PostsState = {
    items:[],
    item: null,
    fetchLoading: false,
    fetchOneLoading: false,
    createLoading: false,
}

export const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchPosts.pending, (state) => {
            state.fetchLoading = true;
        });
        builder.addCase(fetchPosts.fulfilled, (state, {payload: posts}) => {
            state.fetchLoading = false;
            state.items = posts;
        });
        builder.addCase(fetchPosts.rejected, (state) => {
            state.fetchLoading = false;
        });

        builder.addCase(fetchOnePost.pending, (state) => {
            state.fetchOneLoading = true;
        });
        builder.addCase(fetchOnePost.fulfilled, (state, {payload: post}) => {
            state.fetchOneLoading = false;
            state.item = post;
        });
        builder.addCase(fetchOnePost.rejected, (state) => {
            state.fetchOneLoading = false;
        });

        builder.addCase(createPosts.pending, (state) => {
            state.createLoading = true;
        });
        builder.addCase(createPosts.fulfilled, (state) => {
            state.createLoading = false;
        });

        builder.addCase(createPosts.rejected, (state) => {
            state.createLoading = false;
        });

    }
});

export const postsReducer = postsSlice.reducer;
export const selectPosts = (state: RootState) => state.posts.items;
export const selectOnePost = (state: RootState) => state.posts.item;
export const selectPostsLoading = (state: RootState) => state.posts.fetchLoading;
export const selectOnePostLoading =(state: RootState) => state.posts.fetchOneLoading;
export const selectCreateLoading = (state:RootState) => state.posts.createLoading;