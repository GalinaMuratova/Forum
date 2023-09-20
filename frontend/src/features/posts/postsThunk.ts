import {createAsyncThunk} from "@reduxjs/toolkit";
import {RootState} from "../../app/store";
import {IPost, PostMutation} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchPosts  =createAsyncThunk<IPost[]>(
    'posts/fetchAll',
    async () => {
        const postResponse = await axiosApi.get<IPost[]>('/posts');
        return postResponse.data;
    }
);

export const fetchOnePost = createAsyncThunk<IPost,string>(
    'posts/fetchOne',
    async (id) => {
        const post = await axiosApi.get<IPost>(`/posts/${id}`);
        return post.data;
    }
)

export const createPosts = createAsyncThunk<void, PostMutation, {state: RootState}>(
    'posts/create',
    async (postMutation, thunkAPI) => {
        const userState = thunkAPI.getState().users;

        let formData = new FormData();

        const keys = Object.keys(postMutation) as (keyof PostMutation)[];

        keys.forEach(key => {
            const value = postMutation[key];
            if (value !== null) {
                formData.append(key,value);
            }
        });

        await axiosApi.post('/posts', formData, {headers: {'Authorization': userState.user?.token}});
    }
);