import React, {useEffect} from 'react';
import {CircularProgress, Grid, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectPosts, selectPostsLoading} from "./postsSlice";
import {fetchPosts} from "./postsThunk";
import PostBlock from "./components/PostBlock";
const Posts = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(selectPosts);
    const loading = useAppSelector(selectPostsLoading);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    return (
        <>
            <Grid container direction="column" spacing={2}>
                <Grid item container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h4">
                            Posts
                        </Typography>
                    </Grid>
                </Grid>
                {loading ? (
                    <Grid item container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid container item spacing={2}>
                        {posts.map((el) => (
                            <PostBlock key={el._id} id={el._id} title={el.title} author={el.author.username} date={el.date} image={el.image} />
                        ))}
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Posts;