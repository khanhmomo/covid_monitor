import { Formik, Form, FormikHelpers } from "formik"
import { useRouter } from 'next/router'
import Wrapper from "../components/Wrapper"

import { RegisterInput, useRegisterMutation } from "../generated/graphql"

const Register = () => {
    const router = useRouter()
    const initialValues:RegisterInput = {username: '', password: '', email: ''}

    const [registerUser, {data, error}] = useRegisterMutation()
    
    const onRegisterSubmit = async (values: RegisterInput, {setErrors}: FormikHelpers<RegisterInput>) => {
        const response = await registerUser({
            variables: {
                registerInput: values
            }
        })
        if(response.data?.register?.errors) {
            setErrors ({
                
            }) 
        } else if (response.data?.register?.user) {
            router.push('/')
        }
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onRegisterSubmit}>
            {({values, handleChange}) => (
                <Form>
                    <Wrapper>
                        {error && <p>Failed to register</p>}
                        {data && data.register?.success && <p>Registered successfually</p>}
                        <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                        <input 
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            id='username'
                            placeholder="Username"
                            value={values.username} 
                            onChange={handleChange}
                        />
                        <input 
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            id='email'
                            placeholder="Email"
                            value={values.email} 
                            onChange={handleChange}
                        />
                        <input 
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            type='password'
                            id='password'
                            placeholder="Password"
                            value={values.password} 
                            onChange={handleChange}
                        />
                        <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" type="submit">
                            Sign Up
                        </button>
                    </Wrapper>
                </Form>
            )}
        </Formik>
    )
}
export default Register

