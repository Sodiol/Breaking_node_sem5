const fs = require('fs');


function countWordsInFile(filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }

    
    const words = data.split(/\s+/).filter(word => word.length > 0);

    
    const wordCount = words.length;

    
    console.log(`El archivo contiene ${wordCount} palabras.`);
  });
}


const filePath = 'archivo.txt';


countWordsInFile(filePath);
