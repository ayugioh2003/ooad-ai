/**
 * 技能分類列舉
 */
export enum SkillCategory {
    ACROBATIC = "雜技類",
    CUTE = "可愛類",
    INTELLIGENT = "智慧類",
    SOCIAL = "社交類"
}

/**
 * 技能實體類別
 * 代表動物可以表演的技能
 */
export class Skill {
    private id: string;
    private name: string;
    private description: string;
    private difficulty: number; // 1-10
    private category: SkillCategory;
    
    constructor(
        id: string,
        name: string,
        description: string,
        difficulty: number,
        category: SkillCategory
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.difficulty = Math.max(1, Math.min(10, difficulty));
        this.category = category;
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
    
    public getDescription(): string {
        return this.description;
    }
    
    public setDescription(description: string): void {
        this.description = description;
    }
    
    public getDifficulty(): number {
        return this.difficulty;
    }
    
    public setDifficulty(difficulty: number): void {
        this.difficulty = Math.max(1, Math.min(10, difficulty));
    }
    
    public getCategory(): SkillCategory {
        return this.category;
    }
    
    public setCategory(category: SkillCategory): void {
        this.category = category;
    }
    
    // 比較方法
    
    public equals(other: Skill): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Skill{id='${this.id}', name='${this.name}', difficulty=${this.difficulty}, category=${this.category}}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            difficulty: this.difficulty,
            category: this.category
        };
    }
}
