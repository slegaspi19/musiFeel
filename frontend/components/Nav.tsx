import React, { useContext, useState } from "react";
import { AppBar, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, makeStyles, Toolbar, Typography } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import { AccountCircle, Home } from "@material-ui/icons";
import { useRouter } from "next/router";
import AuthenticationContext from "@/context/AuthenticationContext";
import logout from "@/pages/api/logout";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    list: {
        minWidth: '200px'
    }
}))

const Nav = (props: any) => {
    const classes = useStyles();
    const [toggle, setToggle] = useState(false);
    const router = useRouter();

    const { user, logout } = useContext(AuthenticationContext);

    const toggleDrawer = (value: any) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setToggle(value);
    }

    const handleLogout = async (e: any) => {
        e.preventDefault();
        await logout();
        router.push('/account/login')
    }
    return (
        <>
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge='start' className={classes.menuButton} color='inherit' aria-label='menu' onClick={toggleDrawer(true)}>
                        <MenuIcon />
                    </IconButton>
                        <Drawer
                            anchor="left"
                            open={toggle}
                            onClose={toggleDrawer(!toggle)}
                        >
                        <div className={classes.list}>
                            <List>
                                <ListItem button onClick={() => router.push('/')}>
                                    <ListItemIcon><Home /></ListItemIcon>
                                    <ListItemText primary='Home' />
                                </ListItem>
                                { user ? (
                                    <ListItem button onClick={handleLogout}>
                                        <ListItemIcon><AccountCircle /></ListItemIcon>
                                        <ListItemText primary='Sign Out'/>
                                    </ListItem>
                                ) : (
                                    <>
                                        <ListItem button onClick={() => router.push('/account/login')}>
                                            <ListItemIcon><AccountCircle /></ListItemIcon>
                                            <ListItemText primary='Sign In' />
                                        </ListItem>
                                        <ListItem button onClick={() => router.push('/account/register')}>
                                            <ListItemIcon><AccountCircle /></ListItemIcon>
                                            <ListItemText primary='Register' />
                                        </ListItem>
                                    </>
                                )}
                            </List>
                        </div>
                        </Drawer>
                    <Typography variant='h6' className={classes.title}>
                        Local Reviews 123
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Nav;