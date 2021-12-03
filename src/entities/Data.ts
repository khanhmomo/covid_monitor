import { Field, ID, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Data extends BaseEntity {
    @Field(_type => ID)
    @PrimaryGeneratedColumn()
    id!: string

    @Field()
    @Column()
    title!: string

    @Field()
    @Column()
    infected: number

    @Field()
    @Column()
    healed: number

    @Field()
    @Column()
    death: number

    @Field()
    @CreateDateColumn()
    createdAt: Date

    @Field()
    @UpdateDateColumn()
    updatedAt: Date
}