import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentsService';

import ensureAuthenticated from '../middlewares/ensureAuthenticate';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async(req, res)=>{
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    
    return res.json(appointments);
})

appointmentsRouter.post('/', async(req, res)=>{

    const {provider_id, date} = req.body;

    const parseDate = parseISO(date);
       
    const CreateAppointment = new CreateAppointmentsService(); // faco a instanciacao, mandando para o construtor
       
    const appointment = await CreateAppointment.execute({provider_id, date:parseDate});

    return res.json(appointment);
   
    
})

export default appointmentsRouter;