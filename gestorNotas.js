const fs = require('fs');
const readline = require('readline');


const filePath = 'notas.json';


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function readNotes() {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log('No hay notas guardadas o el archivo no existe. Creando un archivo nuevo...');
      saveNotes([]);
      return;
    }
    
    const notes = JSON.parse(data);
    console.log('Notas actuales:');
    notes.forEach((note, index) => {
      console.log(`${index + 1}. ${note}`);
    });

    showMenu();
  });
}


function saveNotes(notes) {
  const notesJson = JSON.stringify(notes, null, 2);
  fs.writeFile(filePath, notesJson, (err) => {
    if (err) {
      console.error('Error al guardar las notas:', err);
    } else {
      console.log('Notas guardadas correctamente.');
    }
  });
}


function addNote() {
  rl.question('Escribe la nueva nota: ', (newNote) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      let notes = [];
      if (!err) {
        notes = JSON.parse(data);
      }

      notes.push(newNote);
      saveNotes(notes);
      showMenu();
    });
  });
}


function deleteNote() {
  rl.question('¿Qué nota deseas eliminar? Ingresa el número: ', (noteIndex) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.log('No hay notas para eliminar.');
        showMenu();
        return;
      }

      let notes = JSON.parse(data);
      noteIndex = parseInt(noteIndex) - 1;

      if (noteIndex >= 0 && noteIndex < notes.length) {
        notes.splice(noteIndex, 1);
        saveNotes(notes);
      } else {
        console.log('Índice inválido.');
      }
      
      showMenu();
    });
  });
}


function showMenu() {
  console.log('\nOpciones:');
  console.log('1. Ver notas');
  console.log('2. Agregar nota');
  console.log('3. Eliminar nota');
  console.log('4. Salir');

  rl.question('Selecciona una opción: ', (option) => {
    switch (option) {
      case '1':
        readNotes();
        break;
      case '2':
        addNote();
        break;
      case '3':
        deleteNote();
        break;
      case '4':
        rl.close();
        break;
      default:
        console.log('Opción inválida.');
        showMenu();
    }
  });
}


showMenu();
