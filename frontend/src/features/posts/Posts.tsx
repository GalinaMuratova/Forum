import React from 'react';
import { Grid, Typography} from "@mui/material";
const Posts = () => {
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
            </Grid>
        </>
    );
};

export default Posts;