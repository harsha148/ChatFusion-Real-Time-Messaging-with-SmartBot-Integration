import React, { useEffect } from 'react';
import { FormikProvider,useFormik} from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Container, CssBaseline, Link, Paper, TextField, Typography } from '@mui/material';
import { SignUpDetails } from '../../types';
import { AppRegistration, LockOutlined } from '@mui/icons-material';
import { useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { loginActions } from '../../redux/Authentication/reducers';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';

const LoginSchema = Yup.object().shape({
  email: Yup.string().required('Required').email(),
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
  profile: Yup.string()
});

const LoginPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.login.isAuthenticated)
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const navigate = useNavigate();
  const formik = useFormik({
        initialValues:{ email: '', password: '',username:'', profile:''},
        validationSchema:LoginSchema,
        onSubmit:(values:SignUpDetails) => {
            console.log("Json value for the signup details submitted: ", JSON.stringify(values, null, 2))
            dispatch(loginActions.signup({email:values.email,password:values.password,profile:values.profile,username:values.username}))
        }
    })
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (  
    <FormikProvider value={formik}>
      <Container maxWidth='xs' component="main" sx={{margin:'auto'}}>
      <Paper sx={{padding:'20px'}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom:8,
            padding:5
          }}
        >
          <Typography component='h3' variant='h4'>ChatFusion</Typography>
          <Avatar sx={{ m: 1, bgcolor: 'grey' }}>
            <AppRegistration />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form className="flex-col items-center" onSubmit={formik.handleSubmit}>
            <TextField
                name="email"
                placeholder="john8642@gmail.com"
                fullWidth
                variant='outlined'
                value = {formik.values.email}
                onChange = {formik.handleChange}
                error={formik.touched.email && !!formik.errors.email}
                helperText={formik.touched.email && formik.errors.email}
                margin="normal"
            />
            <TextField
                name="username"
                placeholder="John"
                fullWidth
                variant='outlined'
                value = {formik.values.username}
                onChange = {formik.handleChange}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
                margin="normal"
            />
            <TextField
                name="password"
                type="password"
                fullWidth
                variant='outlined'
                placeholder='John@213'
                value={formik.values.password}
                onChange = {formik.handleChange}
                className="mb-4"
                error={formik.touched.password && !! formik.errors.password}
                helperText={formik.touched.password && formik.errors.password}
                margin="normal"
            />
            <TextField
                name="profile"
                placeholder="Can't talk chat only!"
                fullWidth
                variant='outlined'
                value = {formik.values.profile}
                onChange = {formik.handleChange}
                error={formik.touched.profile && !!formik.errors.profile}
                helperText={formik.touched.profile && formik.errors.profile}
                margin="normal"
            />
            <Button type="submit" fullWidth color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                Sign Up
            </Button>
            <Typography variant = 'body2'>
                Already have an account? <Link variant='body2' href="/login">Sign In</Link>
            </Typography>
            </form>
          </Box>
        </Box>
        </Paper>
      </Container>
    </FormikProvider>
  );
};

export default LoginPage;