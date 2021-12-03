import { ReactNode } from "react"

interface IWrapperProps {
    children: ReactNode
}

const Wrapper = ({children}: IWrapperProps) => {
    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Wrapper
