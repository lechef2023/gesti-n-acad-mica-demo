import React from 'react';
import { LogOut, Bell, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ user, logout }: { user: any, logout: () => void }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <header className="topbar flex-between" style={{ padding: '0 2rem' }}>
            <div style={{ flex: 1 }}>
                <h3 className="gradient-text-vinotinto" style={{ margin: 0, fontSize: '1.25rem' }}>
                    Sistema de Control de Estudios
                </h3>
            </div>

            <div className="flex-center" style={{ gap: '1.5rem' }}>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', position: 'relative' }}>
                    <Bell size={20} />
                    <span style={{
                        position: 'absolute', top: -4, right: -4, background: 'var(--color-red)',
                        width: 8, height: 8, borderRadius: '50%'
                    }}></span>
                </button>

                <div className="flex-center" style={{ gap: '0.75rem', borderLeft: '1px solid var(--border-subtle)', paddingLeft: '1.5rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(26, 35, 126, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
                        <UserIcon size={18} color="var(--color-yellow)" />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>{user?.name}</span>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', textTransform: 'capitalize' }}>{user?.role}</span>
                    </div>
                </div>

                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.5rem', borderRadius: '50%' }}>
                    <LogOut size={18} />
                </button>
            </div>
        </header>
    );
};

export default Topbar;
