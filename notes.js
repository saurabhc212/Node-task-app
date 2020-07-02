const fs = require('fs');
const chalk = require('chalk');


const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNotes = notes.filter(item => item.title === title);
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        });
    }else{
        console.log('Duplicate note')
    }
   

    saveNotes(notes);
}

const saveNotes = (notes) => {
  const dataJson = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJson );
}
const removeNotes = (title) =>{
  const notes = loadNotes();
  const newNotes = notes.filter(item => item.title !== title);
  if(newNotes.length === notes.length){
      console.log(chalk.red('No notes removed'))
  }else{
      console.log(chalk.green('Note removed successfully'))
  }
  saveNotes(newNotes);
}
const loadNotes = () => {
    try{
      const dataBuffer = fs.readFileSync('notes.json');
      const dataJson = dataBuffer.toString();
      return JSON.parse(dataJson);
    }catch(e){
       return []
    }
}

const listNotes = () => {
   const notes = loadNotes();
   console.log(chalk.inverse('Your notes'));

   notes.forEach(item => console.log(item.title))
}
const readNotes = (title) => {
    const notes = loadNotes();
    const note = notes.find(item => item.title === title);
    if(note){
        console.log(chalk.green(note.body))
    }else{
        console.log(chalk.red('No note found'))
    }
}
module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNotes:readNotes
};