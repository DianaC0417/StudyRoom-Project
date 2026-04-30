// application/ports/UserRepository.ts
// application/ports/UserRepository.ts
import type { User } from '../../domain/User';

export interface UserRepository {
  save(user: User): void;
  get(): User | null;
  clear(): void;
}
