// application/userService.ts
import { type User, validateUsername } from '../domain/User';
import type { UserRepository } from './ports/UserRepository';

export const createUserService = (userRepo: UserRepository) => {
  return {
    // 1. Convertimos la función en async porque ahora hará una llamada al backend
    login: async (
      username: string,
      password: string,
      remember: boolean
    ): Promise<User> => {
      if (!validateUsername(username)) {
        throw new Error('Nombre de usuario inválido');
      }
      // 2. Llamamos a la nueva función de login del UserRepository que se conecta al backend
      const userFromBackend = await userRepo.login(username, password);
      // 3. Le agregamos el flag de 'remember' para tu lógica local
      const finalUser: User = { ...userFromBackend, remember };
      // 4. Guardamos la sesión (localStorage/sessionStorage)
      userRepo.save(finalUser);

      return finalUser;
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
