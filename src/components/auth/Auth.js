import { Avatar, Button, CircularProgress, Grid, Paper, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import LockOutLinedIcon from '@mui/icons-material/LockOutlined';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { signUpUser } from '../../features/user/userSlice'
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const [isSignUp, setIsSignUp] = useState(true);
    const dispatch = useDispatch();
    // const { loading } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const initialState = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" };

    const [formData, setFormData] = useState(initialState);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO handle validations first if success run below code



        dispatch(signUpUser({email: "testEmail", password: "testPassword"}));

        // if (isSignUp) {
        //     dispatch(signUp(formData)).then(() => {
        //         navigate("/");
        //     });
        // } else {
        //     dispatch(signIn(formData)).then(() => {
        //         navigate("/");
        //     })
        // }
    }


    


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignUp((prevState) => !prevState);
    }

    return (
        <Container maxWidth="xs" component="main" sx={{ mt: "60px" }}>
            <Paper elevation={6} sx={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Avatar sx={{ backgroundColor: "red", }}>
                    <LockOutLinedIcon />
                </Avatar>
                <Typography variant='h5' sx={{ mb: "20px" }}>
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                    <Grid container spacing={2} >
                        {isSignUp && (
                            <>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='firstName' label="First Name" onChange={handleChange} autoFocus fullWidth />

                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField name='lastName' label="Last Name" onChange={handleChange} fullWidth />
                                </Grid>
                            </>
                        )}
                        <Grid item xs={12}>
                            <TextField name='email' label="Email" onChange={handleChange} type="email" fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name='password' label="Password" onChange={handleChange} type="password" fullWidth />
                        </Grid>
                        {isSignUp &&
                            <Grid item xs={12}>
                                <TextField name='confirmPassword' label="Confirm Password" onChange={handleChange} type="password" fullWidth />
                            </Grid>
                        }
                    </Grid>

                    <Button type='submit' variant='contained' fullWidth sx={{ mt: "20px" }}>
                        {isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <Container>
                        <Button onClick={switchMode}>
                            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign up"}
                        </Button>
                    </Container>
                    <Container>
                        {/* {loading ? <CircularProgress /> : null} */}
                    </Container>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth;