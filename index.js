import express from 'express';
import { servicesData } from './data/servicesData.js';
import { members } from './data/members.js';
import { students } from './data/students.js';

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

app.get('/students', (req, res) => {
    const keys = Object.keys(students);
    let str = '';
    keys.map((name, index) => index === (keys.length - 1)
        ? str += `,ir ${students[name].name}.`
        : str += `${students[name].name}, `);
    return res.send(`Mokosi ${keys.length} studentai: ${str.replaceAll(', ,', ' ')}`);
});

app.get('/students/:studentName', (req, res) => {
    const originalStudentName = req.params.studentName;
    const studentName = originalStudentName.toLowerCase();
    if (students[studentName] === undefined) {
        return res.send(`Studento, vardu ${originalStudentName} nera.`)
    } else {
        const { name, age, isMarried } = students[studentName];
        const gender = name.endsWith('s');
        const man = isMarried ? 'vedes.' : 'nevedes.';
        const woman = isMarried ? 'istekejusi.' : 'neistekejusi.';
        return res.send(`${gender ? 'Studentas' : 'Studente'}, vardu ${name} yra ${age} metu ir yra ${gender ? man : woman}`);
    }
});

app.get('*', (req, res) => {
    return res.send('Ups... 404 page 😵');
});

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});