import { Arg, ID, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { PostMutationResponse } from "../types/PostMutationResponse";
import { CreatePostInput } from "../types/CreatePostInput";
import { Data } from "../entities/Data";
import { UpdateDataInput } from "../types/UpdateDataInput";
import { checkAuth } from "../middleware/checkAuth";


@Resolver()
export class PostResolver {
    
    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async createPost(
        @Arg('createPostInput') {title, infected, healed, death}: CreatePostInput
    ): Promise<PostMutationResponse> {
        try {
            const newPost = Data.create({
                title,
                infected,
                healed,
                death
            })

            await newPost.save()

            return {
                code: 200,
                success: true,
                message: 'Data created!',
                post: newPost
            }
        } catch (error) {
            console.log(error)
            return {
                code: 500,
                success: false,
                message: `Internal server error ${error.message}`
            }
        }
    }

    @Query(_return => [Data], {nullable: true}) 
    async datas(): Promise<Data[] | null> {
        try {
            return await Data.find()
        } catch (error) {
            console.log(error)
            return null
        }
        
    }

    @Query(_return => Data, {nullable: true})
    async data(
        @Arg('id', _type => ID) id: number
    ): Promise<Data | undefined>    
    {
        try {
            const data = await Data.findOne(id)
            return data
        } catch (error) {
            console.log(error)
            return undefined
        }
        
    }

    @Mutation(_return => PostMutationResponse)
    @UseMiddleware(checkAuth)
    async updateData(
        @Arg('updateDataInput') {id, title, infected, healed, death}: UpdateDataInput,
    ): Promise<PostMutationResponse> {

        const existingData = await Data.findOne(id)
        if (!existingData)
        return {
            code: 400,
            success: false,
            message: 'Post not found'
        }

        existingData.title = title
        existingData.infected = infected
        existingData.healed = healed
        existingData.death = death

        await existingData.save()

        return {
            code: 200,
            success: true,
            message: 'Data updated successfully',
            post: existingData
        }
    }
}