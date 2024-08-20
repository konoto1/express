import express from 'express';
import { servicesData } from './data/servicesData.js';
import { members } from './data/members.js';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    return res.send('Home page');
});

app.get('/about', (req, res) => {
    return res.send('About page');
});

app.get('/services', (req, res) => {
    return res.send('Services page');
});

app.get('/services/:serviceName', (req, res) => {

    if (servicesData.includes(req.params.serviceName)) {
        return res.send(`About ${req.params.serviceName} service`)
    }
    return res.send('Such services page not found');
});

app.get('/services/:serviceName/members', (req, res) => {
    if (servicesData.includes(req.params.serviceName)) {
        return res.send(`Services "${req.params.serviceName}" member list`);
    }
    return res.send('Such service not found');
});

app.get('/services/:serviceName/members/:memberName', (req, res) => {
    const { serviceName, memberName } = req.params;

    if (!servicesData.includes(serviceName)) {
        return res.send('Such service not found');
    }

    if (!members.includes(memberName)) {
        return res.send(`Service "${serviceName}" member "${memberName}" not found`);
    }

    return res.send(`Service "${serviceName}" member "${memberName}" info `);
});

app.get('/team', (req, res) => {
    return res.send('Team page');
});

app.get('/team/:name', (req, res) => {
    const members = ['chuck', 'lolo', 'prime', 'Jonas'];
    if (members.includes(req.params.name)) {
        return res.send(`Team member: ${req.params.name} all info`);
    }
    return res.send(`Team member with name ${req.params.name} not found`);
});

app.get('*', (req, res) => {
    return res.send('Ups... 404 page 😵');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});