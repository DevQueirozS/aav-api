export class SiteSettingEntity {
  id!: number;
  settingKey!: string;
  settingValue!: string;
  settingType?: string;
  updatedAt!: Date;

  constructor(partial: Partial<SiteSettingEntity>) {
    Object.assign(this, partial);
  }
}
