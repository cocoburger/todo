import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  targetDate: Date;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt?: Date;

  @Field()
  completed: boolean;
}
