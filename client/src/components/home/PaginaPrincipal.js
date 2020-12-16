import { Grid } from "@material-ui/core";
import React from "react";
import imgInvTipo0 from "../../assets/invTipo0.jpg";
import imgInvTipo1 from "../../assets/invTipo1.jpg";
import imgCodornices from "../../assets/Codornices.jpg";

const PaginaPrincipal = () => {
  return (
    <Grid container justify="space-evenly" alignItems="center" spacing={3}>
      <Grid container justify="center" item xs={10} sm={6} md={4}>
        <img
          src={imgInvTipo0}
          style={{ width: "100%" }}
          alt="Invernadero Tipo 0"
        />
      </Grid>
      <Grid container justify="center" item xs={10} sm={6} md={4}>
        <img
          src={imgInvTipo1}
          style={{ width: "100%" }}
          alt="Invernadero Tipo 1"
        />
      </Grid>
      <Grid container justify="center" item xs={10} sm={6} md={4}>
        <img
          src={imgCodornices}
          style={{ width: "100%" }}
          alt="Codornices"
        />
      </Grid>
    </Grid>
  );
};

export default PaginaPrincipal;
