import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './modules/courses/courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './modules/todo/todo.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    ConfigModule.forRoot(),
    CoursesModule,
    TodoModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
