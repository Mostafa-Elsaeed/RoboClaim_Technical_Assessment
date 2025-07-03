import { BaseEntity } from '../database/base-entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class UploadedFileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

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
