import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserRole } from '@conidea/model';

@Injectable()
export class UserService implements OnModuleInit {
  private REVIEWER: Omit<User, '_id'> = {
    email: 'reviewer@reviewer.test',
    firstname: 'Ronald',
    lastname: 'Reviewer',
    role: UserRole.Reviewer,
    isLoggedIn: false,
  };
  private DEFAULT_USER: Omit<User, '_id'> = {
    email: 'user@user.test',
    firstname: 'Udo',
    lastname: 'User',
    role: UserRole.User,
    isLoggedIn: true,
  };

  constructor(@InjectModel('User') private userModel: Model<User>) {}

  async onModuleInit() {
    Logger.warn(
      'User collection only consists of mocked data until an Identity Provider is supplied',
      UserService.name,
    );
    await this.insertManyIfNotExist([this.DEFAULT_USER, this.REVIEWER]);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  getLoggedIn(): Promise<User> {
    return this.userModel.findOne({ isLoggedIn: true }).exec();
  }

  async logIn(_id: string) {
    await this.userModel
      .findOneAndUpdate({ isLoggedIn: true }, { isLoggedIn: false })
      .exec();
    return this.userModel
      .findByIdAndUpdate(_id, { isLoggedIn: true }, { new: true })
      .exec();
  }

  async switchUserRole(userId: string, newRole: UserRole): Promise<User> {
    return this.userModel
      .findByIdAndUpdate(userId, { role: newRole }, { new: true })
      .exec();
  }

  private async insertManyIfNotExist(
    users: Omit<User, '_id'>[],
  ): Promise<void> {
    for (const user of users) {
      const uniqueEmails = user.email;

      const existingUser = await this.userModel.findOneAndUpdate(
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
