//src/aplication/userService.ts
import type { UserRepository } from './ports/UserRepository';
import type { User } from '../domain/User';

export interface UserService {
  login(email: string, password: string, remember: boolean): Promise<User>;
  register(
    username: string,
    email: string,
    password: string,
    remember: boolean
  ): Promise<User>;
  updateUsername(username: string): Promise<User>;
  logout(): void;
  getCurrentUser(): User | null;
}

export function createUserService(repo: UserRepository): UserService {
  return {
    async login(email, password, remember) {
      return repo.login(email, password, remember);
    },
    async register(username, email, password, remember) {
      return repo.register(username, email, password, remember);
    },
    async updateUsername(username) {
      return repo.updateUsername(username);
    },
    logout() {
      repo.clear();
    },
    getCurrentUser() {
      return repo.get();
    },
  };
}
