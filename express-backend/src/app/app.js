const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const dotenv = require('dotenv-extended');

dotenv.load({silent: true});
log4js.configure('log4js.json');
const logger = log4js.getLogger('app');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
const Project = mongoose.model('Project', {_id: Number, name: String, offer: Number});

const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8081;

app.get('/', (req, res) => {
    Project.find({}, (err, docs) => {
        if (err) {
            logger.error(err);
        } else {
            res.send(mapId(docs));
        }
    })
});

app.post('/', (req, res) => {
    Project.findOne().sort('-_id').exec((err, doc) => {
        let newId = doc == null ? 1 : doc._id + 1;
        const project = new Project(req.body);
        project._id = newId;
        project.save().then(() => {
            logger.info('project saved');
            res.send(mapId(project));
        });
    });
});

app.put('/:id', (req, res) => {
    let project = new Project(req.body);
    project._id = req.params.id;
    project.updateOne().then(() => {
        logger.info('project updated');
        res.send(mapId(project));
    });
});

app.delete('/:id', (req, res) => {
    Project.deleteOne({_id: req.params.id}).exec(() => res.sendStatus(200));
});

mapId = docs => JSON.parse(JSON.stringify(docs).replace(/"_id":/g, "\"id\":"));

app.listen(PORT, () => logger.info(`Express backend listening on port ${PORT}!`));