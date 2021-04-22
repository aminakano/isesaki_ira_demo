import styles from "./Settings.module.css";
import { TextField, Button, CircularProgress, Grid, Typography, Paper } from "@material-ui/core";

const Settings = () => {
  return (
    <div>
      <Grid container>
        <Grid item sm />
        <Paper elevation={window.innerWidth < 1024 ? 0 : 1} className={styles.paper}>
          <Grid item sm md={9}>
            <Typography variant="h2">Settings</Typography>
            <h3>Crypto Holdlings</h3>
            <TextField
              id="holdings"
              name="holdings"
              type="text"
              label="Crypto Holdings"
              variant="outlined"
              // helperText={errors.email}
              // error={errors.email ? true : false}
              // className={styles.TextField}
              // value={this.state.email}
              // onChange={this.handleChange}
              fullWidth
            />
            <h3>Price chart to Follow</h3>
            <TextField
              id="price"
              name="price"
              type="text"
              label="Type your crypto"
              variant="outlined"
              // helperText={errors.email}
              // error={errors.email ? true : false}
              // className={styles.TextField}
              // value={this.state.email}
              // onChange={this.handleChange}
              fullWidth
            />
            <h3>Twitter to Follow</h3>
            <TextField
              id="twitter"
              name="twitter"
              type="text"
              label="What's your favourite Twitter account?"
              variant="outlined"
              // helperText={errors.email}
              // error={errors.email ? true : false}
              // className={styles.TextField}
              // value={this.state.email}
              // onChange={this.handleChange}
              fullWidth
            />
          </Grid>
        </Paper>
        <Grid item sm />
      </Grid>
    </div>
  )
}

export default Settings
