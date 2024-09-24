import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppResolver } from './app.resolver';
import { join } from 'path';
import { TodoService } from './todo/todo.service';
import { TodoResolver } from './todo/todo.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      include: [TodoModule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver, TodoService, TodoResolver],
})
export class AppModule {}
