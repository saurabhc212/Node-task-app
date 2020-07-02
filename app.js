const validator = require('validator');
const chalk = require('chalk');
const yargs = require('yargs');
const { addNotes, removeNotes, listNotes, readNotes } = require('./notes.js');

yargs.version('1.1.0');

//create add command
yargs.command({
  command: 'add',
  describe:'Add a new note',
  builder:{
      title:{
          describe:'Note title',
          demandOption: true,
          type:'string'
      },
      body:{
          describe:'Note body',
          demandOption: true,
          type:'string'
      }
  },
  handler: (argv) =>{
    addNotes(argv.title, argv.body)
  }

});

//create remove command

yargs.command({
    command: 'remove',
    describe:'Removing a  note',
    builder:{
      title:{
          describe:"title to be removed",
          demandOption: 'true',
          type: 'string'
      }
    },
    handler: function(argv) {
        removeNotes(argv.title)
    }
  
});

//create list command
yargs.command({
    command: 'list',
    describe:'List a  note',
    handler: function() {
        listNotes()
    }
  
});

//create read

yargs.command({
    command: 'read',
    describe:'Read a  note',
    builder:{
        title:{
            describe: 'notes title',
            type: 'string',
            demandOption: true
        }
    },
    handler: function(argv) {
       readNotes(argv.title)
    }
  
});

yargs.parse();
