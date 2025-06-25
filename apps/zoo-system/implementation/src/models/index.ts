// 模型類別統一匯出
export { Animal } from './Animal';
export { Visitor } from './Visitor';
export { Wow, WowDetails } from './Wow';
export { WowCategory, WowCategoryUtils, WowCategoryInfo } from './WowCategory';
export { Skill, SkillCategory } from './Skill';
export { Performance } from './Performance';
export { Location } from './Location';

// 引入型別
import { WowCategory } from './WowCategory';

// 型別定義
export interface AnimalData {
    id: string;
    name: string;
    species: string;
    age: number;
    description: string;
    wowGenerationAbility: number;
}

export interface VisitorData {
    id: string;
    name: string;
}

export interface WowData {
    animalId: string;
    visitorId: string;
    locationId: string;
    category: WowCategory;
    intensity: number;
    description?: string;
    performanceId: string;
}

export interface PerformanceData {
    id: string;
    animalId: string;
    skillId: string;
    locationId: string;
    duration?: number;
}
