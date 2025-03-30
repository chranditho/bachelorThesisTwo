import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto, UserRole } from '@conidea/model';
import { User } from './user.schema';

@Injectable()
export class UserService implements OnModuleInit {
  private REVIEWER: User = {
    email: 'reviewer@reviewer.test',
    firstname: 'Ronald',
    lastname: 'Reviewer',
    role: UserRole.Reviewer,
    isLoggedIn: false,
  };

  private DEFAULT_USER: User = {
    email: 'user@user.test',
    firstname: 'Udo',
    lastname: 'User',
    role: UserRole.User,
    isLoggedIn: true,
  };

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    Logger.warn(
      'User collection only consists of mocked data until an Identity Provider is supplied',
      UserService.name,
    );
    await this.insertManyIfNotExist([this.DEFAULT_USER, this.REVIEWER]);
  }

  async findAll() {
    const users = await this.userModel.find().exec();

    return users.map(
      (user): UserDto => ({
        _id: user.id as string,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        isLoggedIn: user.isLoggedIn,
      }),
    );
  }

  getLoggedIn() {
    return this.userModel.findOne<User>({ isLoggedIn: true }).exec();
  }

  async logIn(_id: string) {
    await this.userModel
      .findOneAndUpdate<User>({ isLoggedIn: true }, { isLoggedIn: false })
      .exec();
    return this.userModel
      .findByIdAndUpdate<User>(_id, { isLoggedIn: true }, { new: true })
      .exec();
  }

  async switchUserRole(
    userId: string,
    newRole: UserRole,
  ): Promise<User | null> {
    return this.userModel
      .findByIdAndUpdate<User>(userId, { role: newRole }, { new: true })
      .exec();
  }

  private async insertManyIfNotExist(users: User[]): Promise<void> {
    for (const user of users) {
      const uniqueEmails = user.email;

      const existingUser = await this.userModel.findOneAndUpdate<User>(
        { email: uniqueEmails },
        { $setOnInsert: user },
        { upsert: true, new: true },
      );

      Logger.log(
        `Started conidea-api with user: ${existingUser}`,
        UserService.name,
      );
    }
  }
}
