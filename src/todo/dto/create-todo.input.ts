import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field({ nullable: false })
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  targetDate: Date;
}
