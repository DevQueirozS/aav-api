export class UserEntity {
  id!: number;
  username!: string;
  role!: string;
  createdAt!: Date;
  lastLogin?: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
