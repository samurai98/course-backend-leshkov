import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { Course } from './entities/course.entity';
import { UpdateCourseDto } from './dto/update-course.dto';


@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {
  }

  async getAll(): Promise<Course[]> {
    return this.coursesRepository.find();
  }

  async getById(id: string): Promise<Course> {
    return this.coursesRepository.findOne(id);
  }

  async create(courseDto: CreateCourseDto): Promise<Course> {
    return this.coursesRepository.save(courseDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.coursesRepository.delete(id);
  }

  async update(courseDto: UpdateCourseDto): Promise<Course> {
    return this.coursesRepository.save(courseDto);
  }
}
