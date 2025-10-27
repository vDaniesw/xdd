import React, { useContext, useEffect, useState } from 'react';
import Portfolio from './components/Portfolio';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import ToastContainer from './components/ToastContainer';

const AppRouter: React.FC = () => {
    const { isAuthenticated, isLoading } = useContext(AuthContext);
    const [path, setPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname);
        };
        window.addEventListener('popstate', onLocationChange);
        
        // Custom event for programmatic navigation
        window.addEventListener('pushstate', onLocationChange);

        return () => {
            window.removeEventListener('popstate', onLocationChange);
            window.removeEventListener('pushstate', onLocationChange);
        };
    }, []);

    if (isLoading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-accent"></div>
        </div>
      );
    }
    
    if (path === '/admin') {
        return isAuthenticated ? <AdminDashboard /> : <Login />;
    }
    
    if (path === '/login-55') {
        if (isAuthenticated) {
            window.history.pushState({}, '', '/admin');
            window.dispatchEvent(new Event('pushstate'));
            return <AdminDashboard />;
        }
        return <Login />;
    }

    return <Portfolio />;
};


const App: React.FC = () => {
  return (
    <AuthProvider>
        <ThemeProvider>
            <ToastProvider>
                <AppRouter />
                <ToastContainer />
            </ToastProvider>
        </ThemeProvider>
    </AuthProvider>
  );
};

export default App;