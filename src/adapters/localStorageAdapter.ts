export const localStorageAdapter = {
  // Usuarios y Avatar
  saveUser: (username: string) => {
    localStorage.setItem('user_name', username);
  },
  getUser: () => {
    return localStorage.getItem('user_name');
  },
  // saveAvatar: (avatarConfig: any) => {
  //   localStorage.setItem('user_avatar', JSON.stringify(avatarConfig));
  // },

  // Pomodoro
  savePomodoro: (minutes: number) => {
    localStorage.setItem('pomodoro_time', minutes.toString());
  },
  getPomodoro: () => {
    const time = localStorage.getItem('pomodoro_time');
    return time ? parseInt(time) : 25; // 25 por defecto
  },

  // Limpiar sesión (logout falso)
  // clearAll: () => {
  //   localStorage.clear();
  // },
};
