import React, { useState, useContext, FormEvent } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login: React.FC = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError('');
        const success = login(password);
        if (success) {
             window.history.pushState({}, '', '/admin');
             window.dispatchEvent(new Event('pushstate'));
        } else {
            setError('Contraseña incorrecta. Inténtalo de nuevo.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <form 
                    onSubmit={handleSubmit}
                    className="bg-secondary/30 backdrop-blur-lg border border-gray-700/50 rounded-2xl shadow-2xl p-8 space-y-6"
                >
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-text-primary">Acceso de Administrador</h1>
                        <p className="text-text-secondary mt-2">Ingresa para gestionar el portafolio.</p>
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-text-secondary block mb-2">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-primary/50 border border-gray-600/50 rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-accent transition"
                            required
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button 
                        type="submit"
                        className="w-full bg-accent text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-accent"
                    >
                        Iniciar Sesión
                    </button>
                     <p className="text-xs text-center text-text-secondary">Pista: la contraseña es 'password'</p>
                </form>
            </div>
        </div>
    );
};

export default Login;
