import React from 'react';

const PlaceholderPage = ({ title }: { title: string }) => {
    return (
        <div className="container animate-fade-in" style={{ padding: '2rem' }}>
            <h1 className="gradient-text-vinotinto">{title}</h1>
            <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginTop: '2rem' }}>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>Módulo en construcción.</p>
                <p style={{ color: 'var(--color-yellow)', marginTop: '1rem' }}>Esta área está siendo desarrollada para el sistema de control de estudios.</p>
            </div>
        </div>
    );
};

export default PlaceholderPage;
