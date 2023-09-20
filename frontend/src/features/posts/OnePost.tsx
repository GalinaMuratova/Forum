import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useParams} from "react-router-dom";
import {fetchOnePost} from "./postsThunk";
import {selectOnePost, selectOnePostLoading} from "./postsSlice";
import dayjs from "dayjs";
import {Card, CardActionArea, CardContent, CircularProgress, Grid, Typography} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

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
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <span>{dayjs(post?.date).format('DD.MM.YYYY HH:mm:ss')}</span>
                            <Typography gutterBottom variant="h5" component="div">
                                { post?.author.username }
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                { post?.title }
                            </Typography>
                            <Grid container justifyContent="space-between" alignItems="center">
                                <Typography variant="h6" color="text.secondary">
                                    { post?.description }
                                </Typography>
                                <ArrowForwardIosIcon/>
                            </Grid>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}

        </>
    );
};

export default OnePost;