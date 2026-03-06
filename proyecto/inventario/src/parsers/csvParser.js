const fs = require('fs');
const csv = require('csv-parser');

/**
 * Parser de CSV con soporte para limpieza de datos
 */
class CSVParser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async parse() {
    return new Promise((resolve, reject) => {
      const results = [];
      
      fs.createReadStream(this.filePath)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
  }

  // Método síncrono alternativo usando fs.readFile + manual parsing
  parseSync() {
    const content = fs.readFileSync(this.filePath, 'utf-8');
    const lines = content.split('\n').filter(line => line.trim() !== '');
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
      const values = line.split(',');
      const obj = {};
      headers.forEach((header, index) => {
        let value = values[index]?.trim();
        
        // Conversión de tipos
        if (value === 'true') value = true;
        else if (value === 'false') value = false;
        else if (!isNaN(value) && value !== '') value = Number(value);
        else if (value === '') value = null;
        
        obj[header] = value;
      });
      return obj;
    });
  }
}

module.exports = CSVParser;