import React, {useState} from 'react';
import {PostMutation} from "../../../types";
import { Grid, TextField} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import FileInput from "../../../components/UI/FileInput/FileInput";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {createPosts} from "../postsThunk";
import {selectCreateLoading} from "../postsSlice";

const PostForm = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const loading = useAppSelector(selectCreateLoading);
    const [state, setState] = useState<PostMutation>({
        title: '',
        description: '',
        image: null
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createPosts(state)).unwrap();
            navigate('/');
        } catch (e) {
            alert('Invalid field');
        }
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => {
            return {...prevState, [name]: value};
        });
    };

    const filesInputChangeHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;
        if (files) {
            setState((prevState) => ({
                ...prevState,
                [name]: files[0]
            }));
        }
    };

    return (
        <>
            <form
                autoComplete="on"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="column" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="title"
                            label="Title"
                            value={state.title}
                            onChange={inputChangeHandler}
                            name="title"
                            required
                        />
                    </Grid>
                    <Grid item xs>
                        <TextField
                            multiline
                            rows={3}
                            id="description"
                            label="Description"
                            value={state.description}
                            onChange={inputChangeHandler}
                            name="description"
                        />
                    </Grid>
                    <Grid item xs>
                        <FileInput
                            onChange={filesInputChangeHandler}
                            name='image'
                            label='image' />
                    </Grid>
                    <Grid item xs>
                        <LoadingButton
                            type="submit"
                            size="small"
                            endIcon={<SendIcon />}
                            loading={loading}
                            loadingPosition="end"
                            variant="contained"
                        >
                            <span>Send</span>
                        </LoadingButton>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default PostForm;