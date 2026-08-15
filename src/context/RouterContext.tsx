import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface RouterContextType {
  currentPath: string;
  navigate: (path: string) => void;
  goBack: () => void;
}

const RouterContext = createContext<RouterContextType | undefined>(undefined);

export const RouterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Always default starting experience to /home
  const [currentPath, setCurrentPath] = useState<string>(() => {
    const hash = window.location.hash.replace(/^#/, '');
    const pathname = window.location.pathname;
    
    // Check hash or path
    if (hash && hash !== '/' && hash !== '/login' && hash !== '/register') {
      return hash.startsWith('/') ? hash : `/${hash}`;
    }
    if (pathname && pathname !== '/' && pathname !== '/login' && pathname !== '/register') {
      return pathname;
    }
    return '/home';
  });

  const [historyStack, setHistoryStack] = useState<string[]>(['/home']);

  useEffect(() => {
    // Sync browser hash with currentPath
    window.location.hash = currentPath;
  }, [currentPath]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (hash && hash !== currentPath) {
        // Prevent redirecting to auth routes
        if (hash === '/' || hash === '/login' || hash === '/register' || hash === '/auth') {
          setCurrentPath('/home');
        } else {
          setCurrentPath(hash.startsWith('/') ? hash : `/${hash}`);
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPath]);

  const navigate = (path: string) => {
    // Never allow auth gate
    if (path === '/' || path === '/login' || path === '/register' || path === '/auth' || path === '/onboarding') {
      path = '/home';
    }
    setHistoryStack(prev => [...prev, path]);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (historyStack.length > 1) {
      const nextStack = [...historyStack];
      nextStack.pop(); // remove current
      const previous = nextStack[nextStack.length - 1];
      setHistoryStack(nextStack);
      setCurrentPath(previous || '/home');
    } else {
      setCurrentPath('/home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <RouterContext.Provider value={{ currentPath, navigate, goBack }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): RouterContextType => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
