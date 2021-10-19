import React, {FC} from 'react'
import {Input} from '../../components/UI/Input/Input'
import {Button} from '../../components/UI/Button/Button'
import {useFormik} from 'formik'
import {Checkbox} from '../../components/UI/Checkbox/Checkbox'
import {useDispatch} from 'react-redux'
import {useAppSelector} from '../../hooks/hooks'
import {Redirect} from 'react-router-dom'
import {PATH} from '../../routes/routes'
import {login} from '../../store/reducers/auth-reducer/auth-reducer'

type FormInitValues = {
    email: string
    password: string
    rememberMe: boolean
}

export const Login: FC = () => {
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const dispatch = useDispatch()

    const validate = (values: FormInitValues) => {
        const errors = {} as FormInitValues
        if (!values.email) errors.email = 'Email is required'
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) errors.email = 'Invalid email address'
        if (!values.password || values.password.length < 3 || values.password.length > 20) errors.password = 'Must be 3-20 characters'
        return errors
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate,
        onSubmit: values => {
            dispatch(login(values))
            formik.resetForm()
        }
    })

    if (isLoggedIn) return <Redirect to={PATH.TODOLIST}/>

    return (
        <div style={{marginTop: 40}}>
            <form onSubmit={formik.handleSubmit}
                  style={{display: 'flex', flexDirection: 'column', gap: 24}}>

                <Input type={'text'}
                       placeholder={'Email'}
                       {...formik.getFieldProps('email')}/>
                {formik.errors.email && formik.touched.email &&
				<div style={{color: 'red'}}>{formik.errors.email}</div>}

                <Input type={'password'}
                       placeholder={'Password'}
                       {...formik.getFieldProps('password')}/>
                {formik.errors.password && formik.touched.password &&
				<div style={{color: 'red'}}>{formik.errors.password}</div>}

                <label htmlFor='rememberMe' style={{display: 'flex', alignItems: 'center', gap: 8}}>
                    <Checkbox id={'rememberMe'}
                              checked={formik.values.rememberMe}
                              {...formik.getFieldProps('rememberMe')}/>
                    <span>Remember Me</span>
                </label>

                <Button type={'submit'}>Login</Button>
            </form>

            <div style={{margin: '40px 0'}}>
                <p>To login, you can register <a href={'https://social-network.samuraijs.com/'} target={'_blank'}>here</a></p>
                <p>or use my account:</p>
                <p>Email: free@samuraijs.com</p>
                <p>Password: free</p>
            </div>
        </div>
    )
}