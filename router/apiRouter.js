import express from "express";

export const apiRouter = express.Router();

// GET: /api/
apiRouter.get('/', (req, res) => {
    const data = {
        state: 'error',
        message: 'nurodyk konkretu API endpoint\'a'
    };
    return res.json(data);
});

const marks = [];

apiRouter.get('/my-marks', (req, res) => {
    return res.json(marks);
});

apiRouter.post('/my-marks', (req, res) => {
    console.log(req.body);

    marks.push(req.body.mark);
    return res.json({
        state: 'success',
        message: 'Pazymys pridetas',
    });
});

// apiRouter.delete('/my-marks', (req, res) => {
//     return res.json({
//         state: 'success',
//         message: 'Pazymys pasalintas',
//     });
// });

apiRouter.delete('/my-marks/:index', (req, res) => {
    const { index } = req.params;
    const position = parseFloat(index);

    if (!Number.isInteger(position) || position < 0) {
        return res.json({
            state: 'error',
            message: 'Pazymio pozicija (index) turi buti ne neigiamas sveikasis skaicius',
        });
    }

    if (marks.length === 0) {
        return res.json({
            state: 'error',
            message: 'Pazymys sarasas tuscias, nera ka pasalinti',
        });
    }

    if (position >= marks.length) {
        return res.json({
            state: 'error',
            message: `Norimo pasalinti pazymio indeksas negali virsyti leistino ribos (${marks.length - 1})`,
        });
    }

    marks.splice(position, 1);

    return res.json({
        state: 'success',
        message: 'Pazymys pasalintas',
    });
});

// /my-marks/:index/:newMark
// / my-marks -> {index: 0, newMark: 10}

// /my-marks/:index - {newMark: 10}
apiRouter.put('/my-marks/:index', (req, res) => {
    const { index } = req.params;
    const position = parseFloat(index);
    const newMarkValue = req.body.newMark;

    if (!Number.isInteger(position) || position < 0) {
        return res.json({
            state: 'error',
            message: 'Pazymio pozicija (index) turi buti ne neigiamas sveikasis skaicius',
        });
    }

    if (marks.length === 0) {
        return res.json({
            state: 'error',
            message: 'Pazymiu sarasas tuscias, nera ko redaguoti',
        });
    }

    if (position >= marks.length) {
        return res.json({
            state: 'error',
            message: `Norimo redaguoti pazymio indeksas negali virsyti leistinos ribos (${marks.length - 1})`,
        });
    }

    //newMark validacijos
    const validMarks = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (!validMarks.includes(newMarkValue)) {
        return res.json({
            state: 'error',
            message: `Norimo redaguoti pazymio nauja reiksme gali buti sveikasis skaicius nuo 0 iki 10 imtinai`,
        });
    }

    marks[position] = newMarkValue;
    console.log(newMarkValue);

    return res.json({
        state: 'success',
        message: 'Pazymys paredaguotas',
    });
});
// GET: /api/marks
// error: nes nenurodei kurio studento

// GET: /api/marks/:studentName
// GET: /api/marks/Jonas
// [10, 2]

// POST: /api/marks/ -> {mark: 10}
// error: o kuriam studentui??

// POST: /api/marks/ -> {mark: 10, name: 'Jonas'}
// ok

// POST: /api/marks/Jonas -> {mark: 10}
// ok

