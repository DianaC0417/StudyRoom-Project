// application/ports/UserRepository.ts
import type { User } from '../../domain/User';

export interface UserRepository {
  save(user: User): void;
  get(): User | null;
  clear(): void;
  //  línea para definir la función de login que se conectará al backend:
  login(username: string, password: string): Promise<User>;
}
