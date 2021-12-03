import Navbar from "../components/Navbar"
import { DatasQueryDocument, useDatasQueryQuery } from "../generated/graphql"
import { addApolloState, initializeApollo } from "../lib/apolloClient"

const Index = () => {
    const { data, loading } = useDatasQueryQuery()
    return (
        <>
            <Navbar />
            {loading ? (
                'Loading...'
            ) : (
                <ul>
                    {data?.datas?.map(post => (
                        <li>
                            <div className="flex flex-col justify-center items-center p-8">
                                <div className="bg-blue-500 text-white w-full max-w-md flex flex-col rounded-xl shadow-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-md font-bold">{post.title}</div>
                                        </div>
                                        <div className="flex items-center space-x-4">
                                            <div className="cursor-pointer">
                                                Updated Date: {post.updatedAt}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 text-white font-bold text-sm">
                                        <div className="flex items-center justify-between"><p>Infected: </p> {post.infected} <br/></div>
                                        <div className="flex items-center justify-between"><p>Healed: </p> {post.healed} <br/></div>
                                        <div className="flex items-center justify-between"><p>Death: </p> {post.death} <br/></div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </>
    )
}


                            

export const getStaticProps = async () => {
    const apolloClient = initializeApollo()

    await apolloClient.query({
        query: DatasQueryDocument
    })

    return addApolloState(apolloClient, {
        props: {}
    })
}

export default Index