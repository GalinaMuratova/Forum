import React, {useEffect} from 'react';
import {CircularProgress, Container, Grid} from "@mui/material";
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
            <Container>
                <Grid container direction="column" spacing={2}>
                    {loading ? (
                        <Grid item container justifyContent="center">
                            <CircularProgress />
                        </Grid>
                    ) : (
                        <Grid style={{margin:'15px 0'}}>
                            {posts.map((el) => (
                                <PostBlock key={el._id} id={el._id} title={el.title} author={el.author.username} date={el.date} image={el.image} />
                            ))}
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    );
};

export default Posts;