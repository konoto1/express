import express from 'express';

export const teamRouter = express.Router();

teamRouter.get('/', (req, res) => {
    return res.send('Team page');
});

teamRouter.get('/:name', (req, res) => {
    const members = ['chuck', 'lolo', 'prime', 'Jonas'];
    if (members.includes(req.params.name)) {
        return res.send(`Team member: ${req.params.name} all info`);
    }
    return res.send(`Team member with name ${req.params.name} not found`);
});