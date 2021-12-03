import NextLink from 'next/link';
import { useMeQuery, useLogoutMutation, MeQuery, MeDocument, useUpdateDataMutation, UpdateDataInput, useDatasQueryQuery } from '../generated/graphql'
import Swal from 'sweetalert2'

const Navbar = () => {
    const {data, loading} = useMeQuery()

    const [logout, _] = useLogoutMutation()
    const logoutUser = async() => {
        await logout({
            update(cache, {data}){
                if (data?.logout) {
                    Swal.fire(
                        'Logged out!',
                        `You have logged out`,
                        'success'
                    )
                    cache.writeQuery<MeQuery>({
                        query: MeDocument,
                        data: {me: null}
                    })
                }
            }
        })
    }
    
    const popup = async() => {
        Swal.fire({
            title: `Update Data`,
            html: `<input type="number" id="upInfected" class="swal2-input" placeholder="Infected">
            <input type="number" id="upHealed" class="swal2-input" placeholder="Healed">
            <input type="number" id="upDeath" class="swal2-input" placeholder="Death">`,
            confirmButtonText: 'Update',
            focusConfirm: false,
            preConfirm: () => {
            const upInfected = Swal.getPopup().querySelector('#upInfected').value
            const upHealed = Swal.getPopup().querySelector('#upHealed').value
            const upDeath = Swal.getPopup().querySelector('#upDeath').value
            if (! upInfected|| !upHealed || !upDeath) {
                Swal.showValidationMessage(`Please insert full data`)
            }
            return { infected: upInfected, healed: upHealed, death: upDeath }
            }
        }).then((result) => {
            Swal.fire(`
            Update infected amount to: ${result.value?.infected}
            Update healed amoutnt to: ${result.value?.infected}
            Update death amout to:: ${result.value?.infected}
            `.trim())
        })
    }

    const editData = async() => {
        const nowID = data?.me?.username
        if (nowID === 'vietnam')
            await popup()
        else if (nowID === 'indonesia') {
            await popup()
        } else if (nowID === 'malaysia'){
            await popup()
        } else {
            await popup()
        }
    }



    let body 

    if (loading) {
        body = null
    }
    else if (!data?.me) {
        body = <>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div>
                        <a href="/login" className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Login</a>
                    </div>
                </div>
            </div>
        </>
    } else {

        body = <>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
                    <div>
                        <a onClick={logoutUser} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Logout: {data.me.username}</a>
                    </div>
                    '       '
                    <div>
                        <a onClick={editData} className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Update Data</a>
                    </div>
                </div>
            </div>
        </>
    }
    
    return (
        <nav className='flex items-center flex-wrap bg-blue-900 p-3 '>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
            <NextLink href='/'><span className="font-semibold text-xl tracking-tight">Asian Covid-19 Monitor</span></NextLink>
        </div>
        <div className="block lg:hidden">
            <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
            </button>
        </div>
        {body}
      </nav>   
    )
}

export default Navbar
