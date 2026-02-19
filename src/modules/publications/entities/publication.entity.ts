export class PublicationEntity {
  id!: number;
  type!: string;
  title!: string;
  description?: string;
  url?: string;
  link?: string;
  views!: number;
  clicks!: number;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(partial: Partial<PublicationEntity>) {
    Object.assign(this, partial);
  }
}
