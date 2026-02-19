export class SocialEntity {
  id!: number;
  platform!: string;
  displayName!: string;
  icon?: string;
  url!: string;
  isActive!: boolean;
  position!: number;

  constructor(partial: Partial<SocialEntity>) {
    Object.assign(this, partial);
  }
}
