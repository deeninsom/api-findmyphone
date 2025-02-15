import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsersDto } from './dto/create-users.dto';
import { UpdateUsersDto } from './dto/update-users.dto';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async createUsers(dto: CreateUsersDto) {
        const existingUsers = await this.prisma.users.findFirst({
            where: { email: dto.email },
        });

        if (existingUsers) {
            throw new ConflictException('Email already exists');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.users.create({
            data: { ...dto, password: hashedPassword },
        });
    }

    async getUsers(userId: string) {
        return this.prisma.users.findFirst({
            where: {
                id: userId
            },
            include: {
                devices: true
            }
        });
    }

    async getUsersById(id: string) {
        const users = await this.prisma.users.findUnique({ where: { id } });
        if (!users) throw new NotFoundException('users not found');
        return users;
    }

    async updateUsers(id: string, dto: UpdateUsersDto) {
        if (dto.password) {
            dto.password = await bcrypt.hash(dto.password, 10);
        }

        return this.prisma.users.update({
            where: { id },
            data: dto,
        });
    }

    async deleteUsers(id: string) {
        const users = await this.prisma.users.findUnique({ where: { id } });
        if (!users) throw new NotFoundException('users not found');

        return this.prisma.users.delete({ where: { id } });
    }
}