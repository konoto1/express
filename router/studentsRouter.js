import express from 'express';
import { students } from '../data/students.js'

export const studentsRouter = express.Router();

studentsRouter.get('/', (req, res) => {
    // const names = Object.keys(students).map(key => students[key].name)
    const names = Object.values(students).map(student => student.name)
    if (names.length === 0) {
        return res.send(`Nesimoko nei vienas studentas`);
    }
    if (names.length === 1) {
        return res.send(`Mokosi ${names.length} studentas: ${names[0]}`);
    }
    const str = names.slice(0, -1).join(', ') + ' ir ' + names.at(-1);
    return res.send(`Mokosi ${names.length} studentai: ${str}`);
});

studentsRouter.get('/:studentName', (req, res) => {
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