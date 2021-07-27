import Appointment from  '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

import { getCustomRepository } from 'typeorm';
import { startOfHour} from 'date-fns';

interface Request{ // tipo a DTO
    provider_id: string;
    date: Date;
}

class CreateAppointmentService{//todo service tem um unico metodo, e eh publico e pode ser chamado fora da classe
    
    public async execute({ provider_id, date}: Request):Promise<Appointment>{

        const appointmentsRepository = getCustomRepository(AppointmentsRepository);
        const appointmentDate = startOfHour(date);
    
        const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

        if(findAppointmentInSameDate){
            throw Error('This is appointment is alred booked');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        }); //Cria a intancia do banco de dados, e n salva

        await appointmentsRepository.save(appointment);

        return appointment;
    }
}
export default CreateAppointmentService;