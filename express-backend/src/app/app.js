const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});

const Project = mongoose.model('Project', {_id: Number, name: String, offer: Number});

const app = express();
app.use(bodyParser.json());
const port = 8081;

app.use(cors());

app.get('/', (req, res) => {
    Project.find({}, (err, docs) => {
        if (err) {
            console.log(err);
        } else {
            res.send(mapId(docs));
        }
    })
});

app.post('/', (req, res) => {
    Project.findOne().sort('-_id').exec((err, doc) => {
        let newId = doc == null ? 1 : doc._id + 1;
        console.log(req);
        const project = new Project(req.body);
        project._id = newId;
        project.save().then(() => {
            console.log('project saved');
            res.send(mapId(project));
        });
    });
});

app.put('/:id', (req, res) => {
    let project = new Project(req.body);
    project._id = req.params.id;
    project.update().then(() => {
        console.log('project updated');
        res.send(mapId(project));
    });
});

app.delete('/:id', (req, res) => {
    console.log(req.params);
    Project.deleteOne({_id: req.params.id}).exec(() => res.send(200));
});

mapId = docs => JSON.parse(JSON.stringify(docs).replace(/"_id":/g, "\"id\":"));

app.listen(port, () => console.log(`Express backend listening on port ${port}!`));