import { getRepository, Repository } from 'typeorm';

import { ICreateUserTokenDTO } from '@modules/users/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/users/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserToken';

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>;

  constructor() {
    this.repository = getRepository(UserTokens);
  }

  async create({ userId, accessToken, accessTokenExpiresDate }: ICreateUserTokenDTO): Promise<UserTokens | null> {
    const userToken = this.repository.create({
      userId,
      accessToken,
      accessTokenExpiresDate,
    });

    await this.repository.save(userToken);

    return userToken ? userToken : null;
  }

  async findByUserId(userId: string): Promise<UserTokens[]> {
    const usersTokens = await this.repository.find({
      userId,
    });
    return usersTokens;
  }

  async findByAccessToken(accessToken: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({
      accessToken,
    });
    return userToken ? userToken : null;
  }

  async findByUserIdAndAccessToken(userId: string, accessToken: string): Promise<UserTokens | null> {
    const userToken = await this.repository.findOne({
      userId,
      accessToken,
    });
    return userToken ? userToken : null;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}

export { UsersTokensRepository };
