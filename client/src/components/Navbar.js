import {
  AppBar,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Facebook, Instagram, Menu, Twitter } from "@material-ui/icons";

import logoEmpresa from "../assets/Logo_QuailHouse.png";

const useStyles = makeStyles((theme) => ({
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    maxHeight: "50px",
    margin: "2px auto",
    marginRight: "10px",
  },
}));

export const Navbar = () => {
  const classes = useStyles();

  const [redirectTo, setRedirectTo] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  // Solo para moviles
  const elDrawer = (
    <>
      <IconButton edge="start" color="inherit" onClick={() => toggleDrawer()}>
        <Menu />
      </IconButton>
      <Drawer anchor="left" open={drawer} onClose={() => toggleDrawer()}>
        <List>
          <ListItem
            button
            onClick={() => {
              setRedirectTo("/cotizacion");
              toggleDrawer();
            }}
          >
            <ListItemText primary="Cotizaciones" />
          </ListItem>
          <Divider />
          <ListItem button >
            <ListItemIcon><Instagram /></ListItemIcon>
            <ListItemText primary="Instagram" />
          </ListItem>
          <ListItem button >
            <ListItemIcon><Facebook /></ListItemIcon>
            <ListItemText primary="Facebook" />
          </ListItem>
          <ListItem button >
            <ListItemIcon><Twitter /></ListItemIcon>
            <ListItemText primary="Twitter" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );

  // Solo para escritorios
  const buttonBar = (
    <>
      <Button color="inherit" onClick={() => setRedirectTo("/cotizacion")}>
        Cotizaciones
      </Button>
      <Divider orientation="vertical" />
      <IconButton color="inherit">
        <Instagram />
      </IconButton>
      <IconButton color="inherit">
        <Facebook />
      </IconButton>
      <IconButton color="inherit">
        <Twitter />
      </IconButton>
    </>
  );

  return (
    <div style={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <div className={classes.sectionMobile}>{elDrawer}</div>
          <div onClick={() => setRedirectTo("/")}>
            <Typography variant="h6" color="inherit" className={classes.title}>
              <img
                src={logoEmpresa}
                className={classes.logo}
                alt="QuailHouse Logo"
              />
              QuailHouse
            </Typography>
          </div>
          <div
            style={{ marginLeft: "auto" }}
            className={classes.sectionDesktop}
          >
            {buttonBar}
          </div>
        </Toolbar>
      </AppBar>

      {redirectTo && <Redirect to={redirectTo} />}
    </div>
  );
};

export default Navbar;
