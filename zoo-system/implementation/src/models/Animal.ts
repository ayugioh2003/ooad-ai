import { Skill } from './Skill';
import { Location } from './Location';
import { Performance } from './Performance';

/**
 * 動物實體類別
 * 代表動物園中的一隻動物
 */
export class Animal {
    private id: string;
    private name: string;
    private species: string;
    private age: number;
    private description: string;
    private wowGenerationAbility: number; // 1-10
    private skills: Skill[];
    private location: Location;
    private performances: Performance[];
    
    constructor(
        id: string,
        name: string,
        species: string,
        age: number,
        description: string,
        wowGenerationAbility: number,
        location?: Location
    ) {
        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.description = description;
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
        this.skills = [];
        this.performances = [];
        this.location = location || new Location('default', '預設位置', '預設展區');
    }
    
    // 業務方法
    
    /**
     * 表演技能
     * @param skill 要表演的技能
     * @returns 表演物件
     */
    public performSkill(skill: Skill): Performance {
        if (!this.skills.includes(skill)) {
            throw new Error("Animal does not have this skill");
        }
        
        const performance = new Performance(
            this.generatePerformanceId(),
            this,
            skill,
            new Date(),
            this.location
        );
        
        this.performances.push(performance);
        return performance;
    }
    
    /**
     * 隨機表演技能
     * @returns 表演物件，如果沒有技能則返回 null
     */
    public performRandomSkill(): Performance | null {
        if (this.skills.length === 0) {
            return null;
        }
        
        const randomIndex = Math.floor(Math.random() * this.skills.length);
        const randomSkill = this.skills[randomIndex];
        if (!randomSkill) {
            return null;
        }
        
        return this.performSkill(randomSkill);
    }
    
    /**
     * 添加技能
     * @param skill 要添加的技能
     */
    public addSkill(skill: Skill): void {
        if (skill && !this.skills.includes(skill)) {
            this.skills.push(skill);
        }
    }
    
    /**
     * 移除技能
     * @param skillId 技能ID
     * @returns 是否成功移除
     */
    public removeSkill(skillId: string): boolean {
        const index = this.skills.findIndex(skill => skill.getId() === skillId);
        if (index !== -1) {
            this.skills.splice(index, 1);
            return true;
        }
        return false;
    }
    
    /**
     * 檢查是否正在表演
     * @returns 是否正在表演
     */
    public isPerforming(): boolean {
        return this.performances.some(performance => performance.isActive());
    }
    
    /**
     * 獲取當前表演
     * @returns 當前表演，如果沒有則返回 null
     */
    public getCurrentPerformance(): Performance | null {
        return this.performances.find(performance => performance.isActive()) || null;
    }
    
    /**
     * 更新動物資訊
     * @param name 名稱
     * @param description 描述
     * @param wowGenerationAbility Wow產生能力
     */
    public updateInfo(name: string, description: string, wowGenerationAbility: number): void {
        if (name && name.trim().length > 0) {
            this.name = name;
        }
        if (description !== undefined) {
            this.description = description;
        }
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
    }
    
    /**
     * 生成表演ID
     * @returns 唯一的表演ID
     */
    private generatePerformanceId(): string {
        return `PERF_${this.id}_${Date.now()}`;
    }
    
    // Getters 和 Setters
    
    public getId(): string {
        return this.id;
    }
    
    public getName(): string {
        return this.name;
    }
    
    public setName(name: string): void {
        this.name = name;
    }
    
    public getSpecies(): string {
        return this.species;
    }
    
    public setSpecies(species: string): void {
        this.species = species;
    }
    
    public getAge(): number {
        return this.age;
    }
    
    public setAge(age: number): void {
        this.age = age;
    }
    
    public getDescription(): string {
        return this.description;
    }
    
    public setDescription(description: string): void {
        this.description = description;
    }
    
    public getWowGenerationAbility(): number {
        return this.wowGenerationAbility;
    }
    
    public setWowGenerationAbility(wowGenerationAbility: number): void {
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
    }
    
    public getSkills(): Skill[] {
        return [...this.skills];
    }
    
    public setSkills(skills: Skill[]): void {
        this.skills = skills ? [...skills] : [];
    }
    
    public getLocation(): Location {
        return this.location;
    }
    
    public setLocation(location: Location): void {
        this.location = location;
    }
    
    public getPerformances(): Performance[] {
        return [...this.performances];
    }
    
    // 比較方法
    
    public equals(other: Animal): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Animal{` +
                `id='${this.id}', ` +
                `name='${this.name}', ` +
                `species='${this.species}', ` +
                `age=${this.age}, ` +
                `wowGenerationAbility=${this.wowGenerationAbility}, ` +
                `skillsCount=${this.skills.length}, ` +
                `isPerforming=${this.isPerforming()}` +
                `}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            species: this.species,
            age: this.age,
            description: this.description,
            wowGenerationAbility: this.wowGenerationAbility,
            skills: this.skills.map(skill => skill.toJSON()),
            location: this.location.toJSON(),
            isPerforming: this.isPerforming(),
            performancesCount: this.performances.length
        };
    }
}
