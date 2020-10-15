import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import OrphanageImage from './OrphanageImage';

@Entity('orphanage')
class Orphanage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @Column()
  about: string;

  @Column()
  contact: string;

  @Column()
  instructions: string;

  @Column()
  openOnWeekends: boolean;

  @Column()
  openingHours: string;

  @OneToMany(() => OrphanageImage, image => image.orphanage, { cascade: ['insert', 'update'] })
  @JoinColumn({ name: 'orphanageId' })
  images: OrphanageImage[];
}

export default Orphanage;
