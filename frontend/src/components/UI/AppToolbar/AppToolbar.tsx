import React from 'react';
import { AppBar, Grid, styled, Toolbar, Typography } from '@mui/material';
import { Link as NavLink } from 'react-router-dom';
import UserMenu from './UserMenu';
import AnonymousMenu from './AnonymousMenu';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';

const Link = styled(NavLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    }
});

const AppToolbar = () => {
    const user = useAppSelector(selectUser);
    return (
        <AppBar position="sticky" sx={{ mb: 2 }}>
            <Toolbar>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    <Link to="/">FORUM OF ART LOVERS</Link>
                </Typography>
                <Grid item>
                    {user ? (
                        <UserMenu user={user}/>
                    ) : (
                        <AnonymousMenu/>
                    )}
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AppToolbar;