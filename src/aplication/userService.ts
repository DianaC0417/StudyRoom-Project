import type { UserRepository } from './ports/UserRepository';
import type { User } from '../domain/User';

export interface UserService {
  login(username: string, password: string, remember: boolean): Promise<User>;
  register(username: string, email: string, password: string, remember: boolean): Promise<User>;
  logout(): void;
  getCurrentUser(): User | null;
}

export function createUserService(repo: UserRepository): UserService {
  return {
    async login(username, password, remember) {
      return repo.login(username, password, remember);
    },
    async register(username, email, password, remember) {
      return repo.register(username, email, password, remember);
    },
    logout() {
      repo.clear();
    },
    getCurrentUser() {
      return repo.get();
    },
  };
}