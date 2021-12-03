import { Formik, Form, FormikHelpers } from 'formik'
import { useRouter } from 'next/router'
import { UpdateDataInput, useUpdateDataMutation } from '../../../generated/graphql'
import Wrapper from "../../../components/Wrapper"
import { useCheckAuth } from "../../../utils/useCheckAuth"
const EditData = () => {

    const router = useRouter()

    const {data: authData, loading: authLoading}  = useCheckAuth()

    const initialValues:UpdateDataInput = {infected: '', healed:'', death: '' }
    const [updateData, {data, error}] = useUpdateDataMutation()
    const onUpdateSubmit = async (values: UpdateDataInput, {setErrors}: FormikHelpers<UpdateDataInput>) => {
        const response = await updateData({
            variables: {
                updateDataInput: values
            } 
        })
    }
    
    return (
        <>
            {
               
                <Formik initialValues={initialValues} onSubmit={onUpdateSubmit}>
                    {({values, handleChange}) => (
                        <Form>
                            <Wrapper>
                                {error && <p>Failed to login</p>}
                                {data && data.updateData?.success && <p>login successfually</p>}
                                <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                                <input 
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    id='username'
                                    placeholder="Infected"
                                    value={values.infected} 
                                    onChange={handleChange}
                                />
                                <input 
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    id='username'
                                    placeholder="Healed"
                                    value={values.healed} 
                                    onChange={handleChange}
                                />
                                <input 
                                    className="block border border-grey-light w-full p-3 rounded mb-4"
                                    id='username'
                                    placeholder="Death"
                                    value={values.death} 
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


export default EditData
