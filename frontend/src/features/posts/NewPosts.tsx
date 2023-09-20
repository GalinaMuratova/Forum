import React, {useEffect} from 'react';
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../users/usersSlice";
import {useNavigate} from "react-router-dom";
import {Container, Typography} from "@mui/material";
import PostForm from "./components/PostForm";

const NewPosts = () => {
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(()=> {
        if (!user) {
            navigate('/login');
        }
    }, [user])

    return (
        <Container maxWidth='md' >
            <Typography variant='h4' sx={{mb:3}}>
                Add new product
            </Typography>
            <PostForm />
        </Container>
    );
};

export default NewPosts;