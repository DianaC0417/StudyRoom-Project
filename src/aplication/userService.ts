// application/userService.ts
import { type User, validateUsername } from '../domain/User';
import type { UserRepository } from './ports/UserRepository';

export const createUserService = (userRepo: UserRepository) => {
  return {
    login: (username: string, remember: boolean): User => {
      if (!validateUsername(username)) {
        throw new Error('Nombre de usuario inválido');
      }

      const user: User = { username, remember };
      userRepo.save(user);
      return user;
    },

    getCurrentUser: (): User | null => {
      return userRepo.get();
    },

    logout: (): void => {
      userRepo.clear();
    },
  };
};

export type UserService = ReturnType<typeof createUserService>;
