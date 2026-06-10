import React from 'react';
import { NavLink } from 'react-router-dom';
import { School, LayoutDashboard, FileText, CheckCircle, Users, FileBarChart } from 'lucide-react';

const Sidebar = ({ user }: { user: any }) => {
    const getNavItems = () => {
        switch (user?.role) {
            case 'representante':
                return [{ title: 'Inicio', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
                { title: 'Notas', path: '/notas', icon: <FileText size={20} /> }];
            case 'profesor':
                return [{ title: 'Inicio', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
                { title: 'Cargar Notas', path: '/cargar-notas', icon: <FileBarChart size={20} /> }];
            case 'administrativo':
                return [{ title: 'Inicio', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
                { title: 'Solvencias', path: '/solvencias', icon: <CheckCircle size={20} /> },
                { title: 'Reportes', path: '/reportes', icon: <FileText size={20} /> }];
            case 'coordinacion':
                return [{ title: 'Inicio', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
                { title: 'Estudiantes', path: '/estudiantes', icon: <Users size={20} /> },
                { title: 'Estadísticas', path: '/estadisticas', icon: <FileBarChart size={20} /> }];
            default:
                return [];
        }
    };

    return (
        <aside style={{ width: '250px', background: 'var(--bg-panel)', borderRight: '1px solid var(--border-subtle)', padding: '1.5rem', display: 'flex', flexDirection: 'column' }} className="glass-panel">
            <div className="flex-center" style={{ marginBottom: '2rem', gap: '0.75rem' }}>
                <School color="var(--color-vinotinto-light)" size={32} />
                <div>
                    <h2 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--color-yellow)' }}>U.E. M.L.B.P.F.</h2>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Control de Estudios</span>
                </div>
            </div>

            <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {getNavItems().map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        style={({ isActive }) => ({
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem',
                            padding: '0.75rem 1rem',
                            borderRadius: 'var(--radius-sm)',
                            color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                            background: isActive ? 'rgba(128, 0, 32, 0.2)' : 'transparent',
                            textDecoration: 'none',
                            transition: 'all 0.3s ease',
                            border: isActive ? '1px solid var(--border-active)' : '1px solid transparent'
                        })}
                    >
                        {item.icon}
                        <span style={{ fontWeight: 500 }}>{item.title}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Conectado como:</div>
                <div style={{ fontWeight: 600, color: 'var(--text-primary)', textTransform: 'capitalize' }}>{user?.role}</div>
            </div>
        </aside>
    );
};

export default Sidebar;
