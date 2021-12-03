import { Field, ID, InputType } from "type-graphql";

@InputType()
export class UpdateDataInput {
    @Field(_type => ID)
    id: number

    @Field()
    title: string

    @Field()
    infected: number

    @Field()
    healed: number

    @Field()
    death: number
}