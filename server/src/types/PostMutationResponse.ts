import { Field, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
import { FieldError } from "./FieldError";
import { Data } from "../entities/Data";

@ObjectType({implements: IMutationResponse})
export class PostMutationResponse implements IMutationResponse {
    code: number
    success: boolean
    message?: string

    @Field({nullable: true})
    post?: Data

    @Field(_type => [FieldError], {nullable: true})
    errors?: FieldError[]
}