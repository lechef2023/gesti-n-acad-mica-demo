import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { School, LogIn, Lock, Mail } from 'lucide-react';
import { DUMMY_USERS, getMockUser } from '../lib/supabase';

const Login = ({ setAuthUser }: { setAuthUser: (user: any) => void }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            const user = getMockUser(email);
            setAuthUser(user);
            navigate('/dashboard');
        }
    };

    const autofill = (userEmail: string) => {
        setEmail(userEmail);
        setPassword('password123');
    };

    return (
        <div className="flex-center animate-fade-in" style={{ minHeight: '100vh', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>

            {/* Decorative Orbs */}
            <div style={{ position: 'absolute', top: -100, left: -100, width: 400, height: 400, background: 'var(--color-vinotinto-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />
            <div style={{ position: 'absolute', bottom: -100, right: -100, width: 400, height: 400, background: 'var(--color-navy-glow)', filter: 'blur(100px)', borderRadius: '50%', zIndex: 0 }} />

            <div className="glass-panel login-panel">
                <div className="flex-center" style={{ flexDirection: 'column', marginBottom: '2.5rem', gap: '1rem' }}>
                    <div style={{ width: 80, height: 80, borderRadius: '20px', background: 'linear-gradient(135deg, rgba(128,0,32,0.2), rgba(26,35,126,0.3))', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-active)', boxShadow: 'var(--shadow-glow)' }}>
                        <School color="var(--color-yellow)" size={40} />
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <h1 className="gradient-text-vinotinto" style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>U.E. M.L.B.P.F.</h1>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Sistema de Control de Estudios</p>
                    </div>
                </div>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label className="form-label">Correo Electrónico</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="email"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="usuario@ejemplo.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label className="form-label flex-between">
                            Contraseña
                            <a href="#" style={{ color: 'var(--color-vinotinto-light)', textDecoration: 'none', fontSize: '0.8rem' }}>¿Olvidaste tu contraseña?</a>
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                type="password"
                                className="form-input"
                                style={{ paddingLeft: '2.5rem' }}
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.85rem' }}>
                        <span style={{ fontSize: '1rem' }}>Ingresar al Sistema</span>
                        <LogIn size={20} />
                    </button>
                </form>

                <div style={{ marginTop: '2.5rem', padding: '1rem', background: 'rgba(0,0,0,0.2)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', textAlign: 'center' }}>Usuarios de prueba (haz clic):</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {DUMMY_USERS.map(u => (
                            <button
                                key={u.id}
                                type="button"
                                onClick={() => autofill(u.email)}
                                style={{ background: 'transparent', border: 'none', textAlign: 'left', color: 'var(--color-yellow)', cursor: 'pointer', fontSize: '0.85rem' }}
                            >
                                → {u.role}: {u.email}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
