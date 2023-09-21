import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import { useParams} from "react-router-dom";
import {CommentMutation} from "../../../types";
import {selectCreateCommentLoading} from "../commentsSlice";
import {Grid, TextField} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SendIcon from "@mui/icons-material/Send";
import {createComment, fetchComments} from "../commentsThunk";

const CommentsForm = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const loading = useAppSelector(selectCreateCommentLoading);
    const [state, setState] = useState<CommentMutation>({
        post: id || '',
        text:''
    });

    const submitFormHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await dispatch(createComment(state)).unwrap();
            setState(prevState => ({
                ...prevState,
                text: '',
            }));
            await dispatch(fetchComments());
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

    return (
        <div style={{backgroundColor:'aliceblue', padding:' 10px 20px 20px', borderRadius:'8px', margin:'20px 0'}}>
            <h2>Add your comment</h2>
            <form
                autoComplete="on"
                onSubmit={submitFormHandler}
            >
                <Grid container direction="row" spacing={2}>
                    <Grid item xs>
                        <TextField
                            id="text"
                            label="Text"
                            value={state.text}
                            onChange={inputChangeHandler}
                            name="text"
                            required
                            style={{backgroundColor:'white', borderRadius:'8px'}}
                        />
                    </Grid>
                    <Grid item xs style={{margin:'10px 0 0 20px'}}>
                        <LoadingButton
                            type="submit"
                            size="medium"
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
        </div>
    );
};

export default CommentsForm;