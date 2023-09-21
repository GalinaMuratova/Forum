import React from 'react';
import {
    Card,
    CardActionArea,
    CardContent,
    Grid,
    styled,
    Typography
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link as NavLink } from 'react-router-dom';
import dayjs from 'dayjs';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';

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
        block = <img style={{height:'150px', maxWidth:'200px', objectFit: 'cover'}} alt={title} src={productImage} />
    } else if (image === null) {
        block = <MessageRoundedIcon sx={{height:140, fontSize:100}} color="primary"/>;
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} component={Link} to={'/posts/' + id}>
            <Card style={{margin:'20px 0'}}>
                <CardActionArea>
                    <CardContent style={{display: 'flex'}}>
                        <div style={{ height:'150px', maxWidth:'200px' }}>
                            {block}
                        </div>
                        <div>
                            <div style={{display:'flex',  margin:'0 0 0 100px'}}>
                                <Typography style={{marginRight:'10px'}} variant="h6" color="text.secondary">
                                    {dayjs(date).format('DD.MM.YYYY HH:mm:ss')}
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div">
                                    by { author }
                                </Typography>

                            </div>
                            <Typography style={{margin:'0 0 0 120px', fontWeight:'bold'}} gutterBottom variant="h5" component="div">
                                { title }
                            </Typography>
                        </div>
                        <ArrowForwardIosIcon style={{margin:'30px 20px 0 auto'}}/>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>

    );
};

export default PostBlock;