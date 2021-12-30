import {useFormik} from "formik";
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {login} from "../../state/auth-reducer/auth-reducer";
import {useAppSelector} from "../../store/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length < 3) {
                errors.password = 'Too short. Password should be minimum 3 symbols.'
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(login(values));
            formik.resetForm();
        },
    })
    const isLoggedIn = useAppSelector<boolean>(state=> state.auth.isLoggedIn);
    if (isLoggedIn){
        return <Navigate to='/' />
    }
    return (
        <StyledFormContainer>
            <StyledInfo>
                <p>To log in get registered
                    <a href={'https://social-network.samuraijs.com/'}
                       target={'_blank'} rel={'noreferrer'}> here
                    </a> or use
                    common test account credentials:
                </p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </StyledInfo>
            <form onSubmit={formik.handleSubmit}>
                <StyledLabel htmlFor="email">
                    Email
                    <input type="email" {...formik.getFieldProps('email')}/>
                </StyledLabel>
                {formik.touched.email && formik.errors.email
                    ? <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                <StyledLabel htmlFor="password">
                    Password
                    <input type="password" {...formik.getFieldProps('password')}/>
                </StyledLabel>
                {formik.touched.password && formik.errors.password
                    ? <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                <StyledCheckboxLabel htmlFor="rememberMe">
                    <input type="checkbox" {...formik.getFieldProps('rememberMe')}/>
                    remember me
                </StyledCheckboxLabel>
                <button type='submit'>LOGIN</button>
            </form>
        </StyledFormContainer>
    )
}

export const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 300px;
  margin: 50px auto;
  gap: 10px;
  border: none;
  border-radius: 8px;
  box-shadow: 0 5px 10px 2px rgba(34, 60, 80, 0.2);
  padding: 10px 8px;
`
export const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
`
export const StyledCheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`
export const StyledInfo = styled.div`
  background: lightblue;
  border-radius: 5px;
  padding: 3px 5px;
`
type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

// export const Login2 = () => {
//     return <Grid container justifyContent='center'>
//         <Grid item justifyContent={'center'}>
//             <FormControl>
//                 <FormLabel>
//                     <p>To log in get registered
//                         <a href={'https://social-network.samuraijs.com/'}
//                            target={'_blank'} rel={'noreferrer'}> here
//                         </a>
//                     </p>
//                     <p>or use common test account credentials:</p>
//                     <p>Email: free@samuraijs.com</p>
//                     <p>Password: free</p>
//                 </FormLabel>
//                 <FormGroup>
//                     <TextField label="Email" margin="normal"/>
//                     <TextField type="password" label="Password"
//                                margin="normal"
//                     />
//                     <FormControlLabel label={'Remember me'} control={<Checkbox/>}/>
//                     <Button type={'submit'} variant={'contained'} color={'primary'}>
//                         Login
//                     </Button>
//                 </FormGroup>
//             </FormControl>
//         </Grid>
//     </Grid>
// }