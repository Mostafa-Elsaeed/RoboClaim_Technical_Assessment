import { UserEntity } from '../users/user.entity';
import { BaseEntity } from '../database/base-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('uploaded_files')
export class UploadedFileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.files)
  @JoinColumn()
  user: UserEntity;

  @Column()
  originalName: string;

  @Column()
  storedName: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @Column()
  mimetype: string;

  @Column({ type: 'text', nullable: true })
  extractedText?: string;
}
