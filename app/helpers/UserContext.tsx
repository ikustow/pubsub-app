import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Создаём контекст
const UserContext = createContext<UserContextType | undefined>(undefined);

// Хук для использования контекста
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Провайдер контекста
export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Инициализация данных из Telegram
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (window.Telegram?.WebApp) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const initDataUnsafe = window.Telegram.WebApp.initDataUnsafe;
      setUser({
        id: initDataUnsafe?.user?.id,
        firstName: initDataUnsafe?.user?.first_name,
        lastName: initDataUnsafe?.user?.last_name,
        username: initDataUnsafe?.user?.username,
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
