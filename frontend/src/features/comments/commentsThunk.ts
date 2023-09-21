import {createAsyncThunk} from "@reduxjs/toolkit";
import {CommentMutation, IComment} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

export const fetchComments = createAsyncThunk<IComment[]>(
    'comments/fetchAll',
    async () => {
        const postResponse = await axiosApi.get<IComment[]>('/comments');
        return postResponse.data;
    }
);

export const createComment = createAsyncThunk<void, CommentMutation, {state: RootState}>(
    'comments/createComment',
    async (commentMutation, thunkAPI) => {
        const userState = thunkAPI.getState().users;

        await axiosApi.post('/comments', commentMutation, {headers: {'Authorization': userState.user?.token}});
    }
);