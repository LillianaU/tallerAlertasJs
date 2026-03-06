const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API: Ejecutar procesamiento de datos
app.get('/api/procesar', (req, res) => {
    try {
        const jsonRuta = path.join(__dirname, 'data', 'recetas.json');
        const contenido = fs.readFileSync(jsonRuta, 'utf-8');
        const data = JSON.parse(contenido);
        
        let recetas = data.recetas;
        
        // MAP - Normalizar nombres
        recetas = recetas.map(r => ({
            ...r,
            nombre: r.nombre.toUpperCase()
        }));
        
        // FILTER - Limpiar vacíos
        recetas = recetas.filter(r => r.nombre && r.tiempo > 0);
        
        // SORT - Ordenar
        recetas.sort((a, b) => a.nombre.localeCompare(b.nombre));
        
        // REDUCE - Estadísticas
        const stats = {
            tiempoTotal: recetas.reduce((acum, r) => acum + r.tiempo, 0),
            porCategoria: recetas.reduce((acc, r) => {
                acc[r.categoria] = (acc[r.categoria] || 0) + 1;
                return acc;
            }, {}),
            porDificultad: recetas.reduce((acc, r) => {
                acc[r.dificultad] = (acc[r.dificultad] || 0) + 1;
                return acc;
            }, {})
        };
        
        // Guardar binario simulado
        const buffer = Buffer.from(JSON.stringify(recetas));
        fs.writeFileSync(path.join(__dirname, 'data', 'recetas.bin'), buffer);
        
        res.json({ recetas, stats, message: 'Datos procesados correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API: Obtener recetas procesadas
app.get('/api/recetas', (req, res) => {
    try {
        const ruta = path.join(__dirname, 'data', 'recetas_procesadas.json');
        if (fs.existsSync(ruta)) {
            const contenido = fs.readFileSync(ruta, 'utf-8');
            res.json(JSON.parse(contenido));
        } else {
            const jsonRuta = path.join(__dirname, 'data', 'recetas.json');
            const contenido = fs.readFileSync(jsonRuta, 'utf-8');
            res.json(JSON.parse(contenido));
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log('='.repeat(50));
    console.log('🍳 App de Recetas - Servidor corriendo');
    console.log('='.repeat(50));
    console.log(`📍 http://localhost:${PORT}`);
    console.log(`📍 http://localhost:${PORT}/app-recetas.html`);
    console.log('');
    console.log('Para ejecutar el procesador de datos:');
    console.log('  node index.js');
});