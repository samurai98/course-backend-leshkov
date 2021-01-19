import {
  Controller, Get, Param, Post, Delete,
  Put, Header, Body, Redirect, HttpCode,
  HttpStatus, NotFoundException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('course')
@Controller('courses')
export class CoursesController {

  constructor(private readonly coursesService: CoursesService) {

  }

  @Get()
  //@Redirect('https://google.com', 301)
  getAll(): Promise<Course[]> {
    return this.coursesService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Course> {
    return this.coursesService.getById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cache-Control', 'none')
  create(@Body() createCourseDto: CreateCourseDto): Promise<Course> {
    const course = new Course()
    course.firstName = createCourseDto.firstName
    course.lastName = createCourseDto.lastName
    course.isActive = createCourseDto.isActive
    return this.coursesService.create(course);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    return this.coursesService.remove(id);
  }

  @Put(':id')
  async update(@Body() updateCourseDto: UpdateCourseDto,
         @Param('id') id: string): Promise<Course> {
    const course = await this.coursesService.getById(id);
    if (course === undefined) {
      throw new NotFoundException(`Todo with id=${id} not exists`);
    }
    course.firstName = updateCourseDto.firstName
    course.lastName = updateCourseDto.lastName
    course.isActive = updateCourseDto.isActive
    return this.coursesService.update(course);
  }
}
