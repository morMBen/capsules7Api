const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const getStudents = (teacher) => {
  try {
    const dataBuffer = fs.readFileSync(`./db/${teacher}.json`);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
console.log('brr');
const getUser = (id) => {
  try {
    const dataBuffer = fs.readFileSync(`./db/users.json`);
    const dataJSON = dataBuffer.toString();
    const user = JSON.parse(dataJSON).find((e) => e.id === id);
    console.log(id);
    return user || Error('No user with that name');
  } catch (e) {
    return e.message;
  }
};

app.get('/api/teacher/:teacher', (req, res) => {
  try {
    res.status(200).send(getStudents(req.params.teacher));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});
app.get('/api/user/:id', (req, res) => {
  try {
    res.status(200).send(getUser(req.params.id));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log('listening...');
});
