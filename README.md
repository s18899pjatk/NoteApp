# NoteApp

# a) Required tools:

# To run the project you should have node.js installed on yor pc (https://nodejs.org/en/),

# for the database mongoDB is requred (https://www.mongodb.com/).

# !!! After instalation, using integrated terminal, go to 'frontend/noteapp' and 'backend' folders and run 'npm i' scripts to install all the needed Node dependencies.

# b) Setup database:

# First to init database open an integrated terminal and type 'mongo' command.

# After seed some data in the database, go to 'backend' folder and run the script 'npm run seed'.

# c) Build and run project:

# In 'backend' folder run the webserver using command 'npm start'.

# To run frontend go to 'frontend/noteapp' and use command 'npm start'.

# To run the integration tests go to 'backend' folder and run 'npm test'

# d) Example of usage:

# To create note - press appropriate button and fill the form, by clicking 'Save' button, the instance of note it's version history

# will be added to the database. Pressing 'Edit' button, you will need to modify your fields, the old version of the note will be added

# to the version control of the specific Note and the new one will be shown on the list of notes. 'Delete' button deletes the note and it's

# version history. To get the information about specific note, click on it's title and you will be able to see the detailed information about

# the note and it's version history. You can sort the notes by title, dates of creation, modification.
