import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../lib/supabase';
import { FileText, Download, Filter } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Reportes = ({ user }: { user: any }) => {
    const [filter, setFilter] = useState<'todos' | 'solventes' | 'deudores'>('todos');

    const generateReport = () => {
        let list = MOCK_STUDENTS;
        let title = 'Reporte General de Estudiantes';
        if (filter === 'solventes') {
            list = MOCK_STUDENTS.filter(s => s.solvent);
            title = 'Reporte Alumnos Solventes';
        } else if (filter === 'deudores') {
            list = MOCK_STUDENTS.filter(s => !s.solvent);
            title = 'Reporte Alumnos con Deuda Administrativa';
        }

        const doc = new jsPDF();

        doc.setFillColor(128, 0, 32); // Vinotinto
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 215, 0); // Yellow
        doc.setFontSize(22);
        doc.text('U.E. Luis Beltrán Prieto Figueroa', 105, 18, { align: 'center' });
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(14);
        doc.text(title, 105, 28, { align: 'center' });

        doc.setTextColor(0, 0, 0);
        doc.setFontSize(10);
        doc.text(`Generado por: ${user.name} (${user.role})`, 14, 50);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 14, 56);
        doc.text(`Total de registros: ${list.length}`, 14, 62);

        const tableData = list.map(s => [
            s.id,
            s.name,
            `${s.grade} "${s.section}"`,
            s.solvent ? 'Solvente' : 'Con Deuda'
        ]);

        (doc as any).autoTable({
            startY: 70,
            head: [['ID', 'Estudiante', 'Grado y Sección', 'Estatus de Solvencia']],
            body: tableData,
            theme: 'grid',
            styles: { fontSize: 10, cellPadding: 3 },
            headStyles: { fillColor: [26, 35, 126], textColor: [255, 255, 255] },
            alternateRowStyles: { fillColor: [240, 240, 240] },
        });

        doc.save(`reporte_${filter}_${new Date().getTime()}.pdf`);
    };

    return (
        <div className="container animate-fade-in" style={{ padding: '2rem' }}>
            <h1 className="gradient-text-vinotinto">Generador de Reportes</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Cree listados y reportes institucionales en formato PDF listos para imprimir.</p>

            <div className="grid grid-2">
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ color: 'var(--color-yellow)', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                        <FileText size={24} /> Configurar Reporte
                    </h2>

                    <div className="form-group">
                        <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Filter size={16} /> Filtro de Solvencia Administrativa
                        </label>
                        <select
                            className="form-select"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value as any)}
                        >
                            <option value="todos">Todos los Estudiantes (General)</option>
                            <option value="solventes">Solo Estudiantes Solventes (Al día)</option>
                            <option value="deudores">Solo Estudiantes con Deuda Administrativa</option>
                        </select>
                    </div>

                    <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                        <button className="btn btn-primary" onClick={generateReport} style={{ flex: 1 }}>
                            <Download size={18} /> Generar Documento PDF
                        </button>
                    </div>
                </div>

                <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderLeft: '4px solid var(--color-vinotinto)' }}>
                    <h3 style={{ margin: 0, color: 'var(--text-primary)' }}>Vista Previa Rápida</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Total Estudiantes General</span>
                            <span style={{ fontWeight: 600 }}>{MOCK_STUDENTS.length}</span>
                        </div>
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Estudiantes Solventes</span>
                            <span style={{ fontWeight: 600, color: '#00e676' }}>{MOCK_STUDENTS.filter(s => s.solvent).length}</span>
                        </div>
                        <div className="flex-between" style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
                            <span style={{ color: 'var(--text-secondary)' }}>Estudiantes con Deuda</span>
                            <span style={{ fontWeight: 600, color: '#ff5252' }}>{MOCK_STUDENTS.filter(s => !s.solvent).length}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Reportes;
