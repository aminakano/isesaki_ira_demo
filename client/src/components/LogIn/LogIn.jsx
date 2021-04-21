import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { MessageToast } from "../../components";
import { setInStorage } from "../../util/storage";
import { TextField, Button, CircularProgress, Grid, Typography, Paper } from "@material-ui/core";
import styles from "./LogIn.module.css";


export class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      errors: {},
      loading: false,
      token: "",
      open: false
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    this.setState({
      loading: true,
    });

    try {
      const params = {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      }
      const response = await fetch("/api/users/login", params);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        const json = await response.json();
        console.log(`json: ${JSON.stringify(json)}`);
        if(json.success) {
          setInStorage("the_main_app", { token: json.token, userData: json.userData });
          this.setState({
            email: "",
            password: "",
            errors: json.message,
            loading: false,
            token: json.token,
            open: true
          });
          setTimeout(() => { window.location = "/" }, 1000);

        } else {
          this.setState({
            errors: json.message,
            loading: false,
          })
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    const { errors, loading, open } = this.state;

    return (
      <div>
        <MessageToast 
          open={open}
          severity="success"
          message="Successfully logged in!"
        />
        <Grid container className={styles.form}>
          <Grid item sm />
          <Grid item sm md={9}>
            <Paper elevation={window.innerWidth < 1024 ? 0 : 1} className={styles.paper}>
              <Typography variant="h2" className={styles.pageTitle}>
                Log In
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  className={styles.TextField}
                  value={this.state.email}
                  onChange={this.handleChange}
                  fullWidth
                />
                <TextField
                  id="password"
                  name="password"
                  type="password"
                  label="Password"
                  helperText={errors.password}
                  error={errors.password ? true : false}
                  className={styles.TextField}
                  value={this.state.password}
                  onChange={this.handleChange}
                  fullWidth
                />
                {errors.general && (
                  <Typography variant="body2" className={styles.customError}>
                    {errors.general}
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  className={styles.button}
                  disabled={loading}
                >
                  Log In
                  {loading && (
                    <CircularProgress className={styles.progress} size={30} />
                  )}
                </Button>
                <br />
                <small>
                  No account yet? <Link to="/signup">Sign Up</Link>
                </small>
              </form>
            </Paper>
          </Grid>
          <Grid item sm />
        </Grid>
      </div>
    )
  }
}

export default LogIn
