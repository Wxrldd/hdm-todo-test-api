import { Injectable } from '@nestjs/common';
import { PrismaService } from '../PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export default class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.task.findMany();
  }

  async delete(id: number) {
    return this.prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async save(
    data:
      | Prisma.XOR<Prisma.TaskCreateInput, Prisma.TaskUncheckedCreateInput>
      | Prisma.XOR<Prisma.TaskUpdateInput, Prisma.TaskUncheckedUpdateInput>,
  ) {
    if ('id' in data) {
      const id = typeof data.id === 'number' ? data.id : undefined;
  
      if (!id) {
        throw new Error("ID is invalid");
      }
  
      return this.prisma.task.update({
        where: { id },
        data: data as Prisma.TaskUpdateInput,
      });
    }
    return this.prisma.task.create({
      data: data as Prisma.TaskCreateInput,
    });
  }
}  