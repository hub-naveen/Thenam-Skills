export interface ISkill {
  id?: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  icon: string;
  isActive: boolean;
  createdAt?: any;
  updatedAt?: any;
}

export type Skill = ISkill;
