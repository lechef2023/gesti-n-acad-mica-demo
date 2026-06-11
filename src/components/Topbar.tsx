import React from 'react';
import { LogOut, Bell, User as UserIcon, Menu } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ user, logout, onOpenSidebar }: { user: any, logout: () => void, onOpenSidebar: () => void }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="topbar flex-between" style={{ padding: '0 1rem 0 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
                <button onClick={onOpenSidebar} className="sidebar-toggle-btn" aria-label="Abrir menú">
                    <Menu size={22} />
                </button>
                <h3 className="gradient-text-vinotinto" style={{ margin: 0, fontSize: '1.15rem' }}>
                    <span className="hidden-mobile">Sistema de Control de Estudios</span>
                    <span className="show-mobile-only">Control de Estudios</span>
                </h3>
            </div>

            <div className="flex-center" style={{ gap: '1rem' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute', top: -2, right: -2, background: 'var(--color-red)',
                        width: 6, height: 6, borderRadius: '50%'
                    }}></span>
                </button>

                <div className="flex-center" style={{ gap: '0.75rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(26, 35, 126, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)', flexShrink: 0 }}>
                        <UserIcon size={18} color="var(--color-yellow)" />
                    </div>
                    <div className="hidden-mobile" style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user?.name}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'capitalize' }}>{user?.role}</span>
                    </div>
                </div>

                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%', width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
