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

app.get('/api/group/:teacher', (req, res) => {
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

const getCarMarket = (num) => {
  try {
    const dataBuffer = fs.readFileSync(`./db/carsObj${num}.json`);
    console.log('dataBuffer');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
//! Car object 1 | 2
// app.get('/api/carMarket/:num', (req, res) => {
//   try {
//     res.status(200).send(getCarMarket(req.params.num));
//   } catch (e) {
//     res.status(400).send({ error: e.message });
//   }
// });

const getCarImage = (brand, model) => {
  try {
    const dataBuffer = fs.readFileSync(`./db/carImages.json`);
    const dataJSON = dataBuffer.toString();
    const dataObj = JSON.parse(dataJSON);
    const searchField = `${brand}_${model}`;
    const res = { brand, model, image: dataObj[searchField] };
    return dataObj[searchField] ? res : Error('No image for that model name');
  } catch (e) {
    return e.message;
  }
};
app.get('/api/carMarket/img/:brand/:model', (req, res) => {
  const brand = req.params.brand.toLocaleLowerCase();
  const model = req.params.model.toLocaleLowerCase();
  try {
    res.status(200).send(getCarImage(brand, model));
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.get('/api/carMarket/agencies', (req, res) => {
  try {
    const agencies = getCarMarket(2).sellers;
    const ress = agencies.map(({ agencyName, agencyId }) => {
      return { agencyName, agencyId };
    });

    res.status(200).send(ress);
  } catch (e) {
    res.status(400).send({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log('listening...');
});
