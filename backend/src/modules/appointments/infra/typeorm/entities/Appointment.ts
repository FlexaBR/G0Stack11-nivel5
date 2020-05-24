import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider_id: string; // além da coluna que recebe a chave estrangeria, abaixo

  @ManyToOne(() => User) // referencia o objeto User, pois depois posso acessar
  @JoinColumn({ name: 'provider_id' }) // todos os dados de User apartir do appointment.
  provider: User;
  // se for para buscar todos os agendamentos (appointments) de um usuário especifico,
  // no User.ts o => @OneToMany

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column('timestamp with time zone')
  date: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
