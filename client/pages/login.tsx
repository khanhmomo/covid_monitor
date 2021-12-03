import { Formik, Form, FormikHelpers } from "formik"
import { useRouter } from 'next/router'
import Wrapper from "../components/Wrapper"

import { LoginInput, MeDocument, MeQuery, useLoginMutation } from "../generated/graphql"
import { useCheckAuth } from "../utils/useCheckAuth"
import Swal from 'sweetalert2'


const Login = () => {
    const router = useRouter()

    const {data: authData, loading: authLoading}  = useCheckAuth()

    const initialValues:LoginInput = {username: '', password: ''}

    const [loginUser, {data, error}] = useLoginMutation()
    
    const onLoginSubmit = async (values: LoginInput, {setErrors}: FormikHelpers<LoginInput>) => {
        const response = await loginUser({
            variables: {
                loginInput: values
            },
            update(cache, {data}) {
                console.log('Data login', data)
                // const meData = cache.readQuery({query: MeDocument})
                // console.log('MEDATA: ', meData)
                if (data?.login.success) {
                    Swal.fire(
                        'Logged in',
                        `Welcome user: ${data.login.user?.username}`,
                        'success'
                    )
                    cache.writeQuery<MeQuery>({query: MeDocument, data: {me: data.login.user}})
                }
            }
        })
        if(response.data?.login?.errors) {
            setErrors ({
                
            }) 
        } else if (response.data?.login?.user) {
            router.push('/')
        }
    }
    
    return (
        <>
            {
                authLoading || (!authLoading && authData?.me) ? console.log("spin") : 
                <Formik initialValues={initialValues} onSubmit={onLoginSubmit}>
                    {({values, handleChange}) => (
                        <Form>
                            <Wrapper>
                                {error && <p>Failed to login</p>}
                                {data && data.login?.success && <p>login successfually</p>}
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
                                    type='password'
                                    id='password'
                                    placeholder="Password"
                                    value={values.password} 
                                    onChange={handleChange}
                                />
                                <button className="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue" type="submit">
                                    Login
                                </button>
                            </Wrapper>
                        </Form>
                    )}
                </Formik>
            }
        </>
        
    )
}
export default Login

