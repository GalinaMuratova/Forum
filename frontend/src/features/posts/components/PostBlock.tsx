import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, Grid, styled, Typography } from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as NavLink } from 'react-router-dom';
import dayjs from 'dayjs';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

interface Props {
    id: string;
    title: string;
    author: string;
    date: Date;
    image: string | null;
}

const PostBlock: React.FC<Props> = ({ id, title, image, author, date }) => {
    let productImage = '';
    let block = <></>;
    if (image) {
        productImage = 'http://localhost:8000' + '/images/' + image;
        block = <CardMedia
            sx={{height:140}}
            image={productImage}
            title={title}
        />;
    } else if (image === null) {
        block = <></>
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/posts/' + id}>
            <Card>
                <CardActionArea>
                    <CardContent>
                        {block}
                        <Typography gutterBottom variant="h5" component="div">
                            { author }
                        </Typography>
                        <Typography gutterBottom variant="h5" component="div">
                            { title }
                        </Typography>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" color="text.secondary">
                                {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
                            </Typography>
                            <ArrowForwardIosIcon/>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
};

export default PostBlock;