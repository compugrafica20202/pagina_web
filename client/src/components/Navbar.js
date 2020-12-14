import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { Menu } from "@material-ui/icons";

export const Navbar = () => {
  const [redirectTo, setRedirectTo] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer()}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Nuestra empresa
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawer} onClose={() => toggleDrawer()}>
        <List>
          <ListItem>
            {/*<ListItemText primary="Cotizaciones" />*/}
            <Typography variant="subtitle1">Cotizaciones</Typography>
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setRedirectTo("/cotizacion");
              toggleDrawer();
            }}
          >
            <ListItemText primary="Nueva cotización" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Consultar estado" />
          </ListItem>
        </List>
      </Drawer>
      {redirectTo && <Redirect to={redirectTo} />}
    </>
  );
};

export default Navbar;
