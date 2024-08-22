import express from 'express';
import { servicesData } from '../data/servicesData.js';
import { serviceMembersRouter } from './serviceMembersRouter.js';
export const servicesRouter = express.Router();

servicesRouter.get('/', (req, res) => {
    return res.send('Services page');
});

servicesRouter.get('/:serviceName', (req, res) => {
    if (servicesData.includes(req.params.serviceName)) {
        return res.send(`About ${req.params.serviceName} service`)
    }
    return res.send('Such services page not found');
});

servicesRouter.use('/:serviceName/members', serviceMembersRouter);
// servicesRouter.get('/:serviceName/members', (req, res) => {
//     if (servicesData.includes(req.params.serviceName)) {
//         return res.send(`Services "${req.params.serviceName}" member list`);
//     }
//     return res.send('Such service not found');
// });

// servicesRouter.get('/:serviceName/members/:memberName', (req, res) => {
//     const { serviceName, memberName } = req.params;

//     if (!servicesData.includes(serviceName)) {
//         return res.send('Such service not found');
//     }

//     if (!members.includes(memberName)) {
//         return res.send(`Service "${serviceName}" member "${memberName}" not found`);
//     }

//     return res.send(`Service "${serviceName}" member "${memberName}" info `);
// });