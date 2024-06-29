import React, { useEffect } from 'react';
import { Field,FormikProvider,useFormik} from 'formik';
import * as Yup from 'yup';
import { Avatar, Box, Button, Container, CssBaseline, Link, Paper, TextField, Typography } from '@mui/material';
import { User, loginDetails } from '../../types';
import { LockOutlined } from '@mui/icons-material';
import { login } from '../../redux/User/UserActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';

const LoginSchema = Yup.object().shape({
  username: Yup.string().required('Required'),
  password: Yup.string().required('Required'),
});

const LoginPage: React.FC = () => {
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
        initialValues:{ username: '', password: '' },
        validationSchema:LoginSchema,
        onSubmit:(values:loginDetails) => {
            console.log("Json value for the login details submitted: ", JSON.stringify(values, null, 2))
            dispatch(login({id:1,username:values.username}))
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
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <form className="flex-col items-center" onSubmit={formik.handleSubmit}>
            <TextField
                name="username"
                placeholder="john8642@gmail.com"
                fullWidth
                variant='outlined'
                value = {formik.values.username}
                onChange = {formik.handleChange}
                error={formik.touched.username && !!formik.errors.username}
                helperText={formik.touched.username && formik.errors.username}
                margin="normal"
                // autoComplete="email"
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
                // autoComplete="current-password"
            />
            <Button type="submit" fullWidth color="primary"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}>
                Login
            </Button>
            <Typography variant = 'body2'>
                Don't have an account? <Link variant='body2' href="/signup">Sign up</Link>
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
