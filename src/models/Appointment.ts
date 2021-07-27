import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import User from "./Users";

@Entity('appointments')//o nome da nossa tabela criada na migration
class Appointment { // a model Appoint sera salvo a partir da entity na tabela appointment
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    provider_id: string;

    @ManyToOne(()=>User)
    @JoinColumn({ name : 'provider_id'})
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    /* quando cria uma entity o constructor eh criado nele, n precisa mais fazer manualmente
        constructor({provider, date}: Omit<Appointment, 'id'>){ //método para criar e iniciar um objeto criado pela classe
        this.id = v4();//criado de forma fixa, entao n passo como parametro pelo construtor. De forma estática.
        this.provider = provider;
        this.date =  date;
    }
    */
}
export default Appointment;