import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {fetchOnePost} from "./postsThunk";
import {selectOnePost, selectOnePostLoading} from "./postsSlice";
import dayjs from "dayjs";
import {Card, CardActionArea, CardContent, CircularProgress, Container, Grid, Typography} from "@mui/material";

const OnePost = () => {


    const dispatch = useAppDispatch();
    const { id } = useParams();
    const post = useAppSelector(selectOnePost);
    const loading = useAppSelector(selectOnePostLoading);

    useEffect(() => {
        if (id) {
            dispatch(fetchOnePost(id));
        }
    }, [dispatch, id]);

    return (
        <>
            {loading ? (
                <Grid item container justifyContent="center">
                    <CircularProgress />
                </Grid>
            ) : (
                <Container>
                    <Card >
                        <CardActionArea>
                            <CardContent>
                                <div style={{display:'flex'}}>
                                    <Typography style={{margin:'0 10px 0 0', color: 'gray'}} variant='h6' component='div'>{dayjs(post?.date).format('DD.MM.YYYY HH:mm:ss')}</Typography>
                                    <Typography gutterBottom variant="h6" component="div">
                                        by : { post?.author.username }
                                    </Typography>
                                </div>
                                <div style={{margin:'0 0 20px 20px'}}>
                                    <Typography gutterBottom variant="h4" component="div">
                                        { post?.title }
                                    </Typography>
                                    <Grid container justifyContent="space-between" alignItems="center">
                                        <Typography variant="h5" color="text.secondary">
                                            { post?.description }
                                        </Typography>
                                    </Grid>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Container>
            )}

        </>
    );
};

export default OnePost;