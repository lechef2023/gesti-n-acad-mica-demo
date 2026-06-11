import React from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { TrendingUp, PieChart, BarChart2, Calendar, Award } from 'lucide-react';

const Estadisticas = ({ user }: { user: any }) => {
    const total = 1245; // Simulated big number
    const solventes = 1020;
    const deudores = 225;

    const percentageSolventes = Math.round((solventes / total) * 100);
    const percentageDeudores = Math.round((deudores / total) * 100);

    return (
        <div className="page-container animate-fade-in">
            <h1 className="gradient-text-vinotinto">Análisis y Estadísticas</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Métricas detalladas del rendimiento y estado del alumnado.</p>

            <div className="grid grid-2">
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                        <PieChart size={20} color="var(--color-yellow)" /> Distribución de Solvencias
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div>
                            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Estudiantes Solventes ({solventes})</span>
                                <span style={{ fontWeight: 600, color: '#00e676' }}>{percentageSolventes}%</span>
                            </div>
                            <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${percentageSolventes}%`, height: '100%', background: 'linear-gradient(90deg, #00c853, #b2ff59)' }} />
                            </div>
                        </div>

                        <div>
                            <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                                <span style={{ fontWeight: 500, color: 'var(--text-primary)' }}>Con Deuda Administrativa ({deudores})</span>
                                <span style={{ fontWeight: 600, color: '#ff5252' }}>{percentageDeudores}%</span>
                            </div>
                            <div style={{ height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                                <div style={{ width: `${percentageDeudores}%`, height: '100%', background: 'linear-gradient(90deg, #d50000, #ff5252)' }} />
                            </div>
                        </div>

                        <div className="glass-card" style={{ padding: '1.25rem', marginTop: '1rem', background: 'rgba(26, 35, 126, 0.1)', border: '1px solid rgba(26, 35, 126, 0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <TrendingUp size={24} color="#8c9eff" />
                            <div>
                                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Proyección Próximo Mes</div>
                                <div style={{ fontWeight: 600 }}>Mejora del 3.5% en la solvencia general estipulada.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                        <BarChart2 size={20} color="var(--color-vinotinto-light)" /> Rendimiento por Nivel Educativo
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {[
                            { grado: '1er Año', avg: 14.8, max: 20 },
                            { grado: '2do Año', avg: 15.2, max: 20 },
                            { grado: '3er Año', avg: 15.9, max: 20 },
                            { grado: '4to Año', avg: 16.4, max: 20 },
                            { grado: '5to Año', avg: 17.1, max: 20 }
                        ].map((nivel) => (
                            <div key={nivel.grado} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '80px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{nivel.grado}</div>
                                <div style={{ flex: 1, height: '24px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', position: 'relative', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            width: `${(nivel.avg / 20) * 100}%`,
                                            height: '100%',
                                            background: 'linear-gradient(90deg, rgba(26, 35, 126, 0.7), rgba(128, 0, 32, 0.8))',
                                            borderRadius: '4px'
                                        }}
                                    />
                                    <div style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontSize: '0.8rem', fontWeight: 600, textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                                        {nivel.avg} pts
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel col-span-2" style={{ padding: '2rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={20} color="var(--color-yellow)" /> Resumen Consolidado del Período
                    </h3>
                    <div className="grid grid-4" style={{ gap: '1rem' }}>
                        <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>1,245</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Matrícula Activa</div>
                        </div>
                        <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#00e676' }}>98.5%</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Asistencia Promedio</div>
                        </div>
                        <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-yellow)' }}>42</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Secciones Activas</div>
                        </div>
                        <div className="glass-card flex-center" style={{ flexDirection: 'column', padding: '1.5rem', textAlign: 'center' }}>
                            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-vinotinto-light)' }}>15.9</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Mediana de Notas (20)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Estadisticas;
