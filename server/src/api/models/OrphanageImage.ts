import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Orphanage from './Orphanage';

@Entity('orphanage_images')
class OrphanageImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  path: string;

  @ManyToOne(() => Orphanage, orphanage => orphanage.images)
  @JoinColumn({ name: 'orphanageId' })
  orphanage?: Orphanage;
}

export default OrphanageImage;
