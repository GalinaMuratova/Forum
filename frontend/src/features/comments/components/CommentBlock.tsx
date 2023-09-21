import React from 'react';
import {Card, CardActionArea, CardContent, Grid, Typography} from "@mui/material";

interface Props {
    author: string,
    text: string,
}

const CommentBlock: React.FC<Props> = ({text, author}) => {
    return (
        <>
            <Grid item xs={12} sm={6} md={4} lg={3} style={{margin:'20px 0'}} >
                <Card>
                    <CardActionArea>
                        <CardContent style={{display:'flex', flexDirection:'column'}}>
                            <Typography gutterBottom variant="h6" component="div" style={{color:'gray'}}>
                                { author } said :
                            </Typography>
                            <Typography variant="h5" component="div">
                                {text}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>

        </>
    );
};

export default CommentBlock;