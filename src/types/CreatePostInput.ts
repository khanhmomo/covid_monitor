import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePostInput {
    @Field()
    title: string

    @Field()
    infected: number

    @Field()
    healed: number

    @Field()
    death: number
}