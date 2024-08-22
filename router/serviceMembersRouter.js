import express from "express";
import { members } from '../data/members.js'
import { servicesData } from '../data/servicesData.js'



export const serviceMembersRouter = express.Router({ mergeParams: true });

serviceMembersRouter.get('/', (req, res) => {
    if (servicesData.includes(req.params.serviceName)) {

        return res.send(`Services "${req.params.serviceName}" member list`);
    }

    return res.send('Such service not found because no params provided');
});

serviceMembersRouter.get('/:memberName', (req, res) => {
    const { serviceName, memberName } = req.params;

    if (!servicesData.includes(serviceName)) {
        return res.send('Such service not found');
    }

    if (!members.includes(memberName)) {
        return res.send(`Service "${serviceName}" member "${memberName}" not found`);
    }

    return res.send(`Service "${serviceName}" member "${memberName}" info `);
});