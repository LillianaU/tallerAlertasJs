const fs = require('fs');
const yaml = require('js-yaml');

/**
 * Parser de YAML para configuraciones
 */
class YAMLParser {
  constructor(filePath) {
    this.filePath = filePath;
  }

  parse() {
    const content = fs.readFileSync(this.filePath, 'utf-8');
    return yaml.load(content);
  }

  // Convertir objeto a YAML
  stringify(obj) {
    return yaml.dump(obj, {
      indent: 2,
      lineWidth: -1,
      noRefs: true
    });
  }
}

module.exports = YAMLParser;