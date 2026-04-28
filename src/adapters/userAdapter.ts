// Adaptador para guardar y obtener el userId del usuario
//src/adapters/userAdapter.ts
export const userAdapter = {
  saveUserId: (username: string, remember = true): void => {
    if (remember) {
      localStorage.setItem('studyroom_user', username);
    } else {
      sessionStorage.setItem('studyroom_user', username);
    }
  },

  getUserId: (): string | null => {
    return (
      localStorage.getItem('studyroom_user') ??
      sessionStorage.getItem('studyroom_user')
    );
  },

  clearUserId: (): void => {
    localStorage.removeItem('studyroom_user');
    sessionStorage.removeItem('studyroom_user');
  },
};
