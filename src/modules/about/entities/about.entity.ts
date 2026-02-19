export class AboutEntity {
  id!: number;
  section!: string;
  content!: string;
  updatedAt!: Date;

  constructor(partial: Partial<AboutEntity>) {
    Object.assign(this, partial);
  }
}
