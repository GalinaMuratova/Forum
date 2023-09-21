import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectComments, selectCommentsLoading} from "./commentsSlice";
import {fetchComments} from "./commentsThunk";
import {CircularProgress, Grid} from "@mui/material";
import CommentBlock from "./components/CommentBlock";
import {useParams} from "react-router-dom";

const Comments = () => {
    const dispatch = useAppDispatch();
    const { id } = useParams();
    const comments = useAppSelector(selectComments);
    const loading = useAppSelector(selectCommentsLoading);
    const reverse = [...comments].reverse();

    useEffect(() => {
        dispatch(fetchComments());
    }, [dispatch]);

    return (
        <>
           <h2>Comments</h2>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Grid style={{margin:'15px 0'}}>
                    {reverse.map((el) => {
                        if (id === el.post) {
                           return <CommentBlock key={el._id} author={el.author.username} text={el.text}/>
                        }
                    })}
                </Grid>
            )}
        </>
    );
};

export default Comments;