export class GalleryEntity {
  id!: number;
  title!: string;
  description?: string;
  imageUrl!: string;
  thumbnailUrl!: string;
  position!: number;
  createdAt!: Date;

  constructor(partial: Partial<GalleryEntity>) {
    Object.assign(this, partial);
  }
}
