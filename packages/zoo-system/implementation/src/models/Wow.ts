import { Animal } from './Animal';
import { Visitor } from './Visitor';
import { Location } from './Location';
import { Performance } from './Performance';
import { WowCategory } from './WowCategory';

/**
 * Wow 詳細資訊介面
 */
export interface WowDetails {
    id: string;
    animalName: string;
    visitorName: string;
    locationName: string;
    category: WowCategory;
    intensity: number;
    description: string;
    timestamp: Date;
    skillName: string;
}

/**
 * Wow 實體類別
 * 代表遊客對動物表演的驚嘆記錄
 */
export class Wow {
    private id: string;
    private timestamp: Date;
    private animal: Animal;
    private visitor: Visitor;
    private location: Location;
    private category: WowCategory;
    private intensity: number; // 1-10
    private description: string;
    private performance: Performance;
    
    constructor(
        id: string,
        animal: Animal,
        visitor: Visitor,
        location: Location,
        category: WowCategory,
        intensity: number,
        performance: Performance,
        description?: string
    ) {
        this.id = id;
        this.timestamp = new Date();
        this.animal = animal;
        this.visitor = visitor;
        this.location = location;
        this.category = category;
        this.intensity = Math.max(1, Math.min(10, intensity));
        this.performance = performance;
        this.description = description || '';
    }
    
    // 業務方法
    
    /**
     * 生成分享連結
     * @returns 分享連結字串
     */
    public generateShareLink(): string {
        return `https://zoo.example.com/wow/${this.id}?share=${Date.now()}_${this.visitor.getId()}`;
    }
    
    /**
     * 檢查是否由指定遊客評分
     * @param visitor 遊客物件
     * @returns 是否由此遊客評分
     */
    public isRatedBy(visitor: Visitor): boolean {
        return this.visitor.equals(visitor);
    }
    
    /**
     * 獲取 Wow 詳細資訊
     * @returns Wow 詳細資訊物件
     */
    public getDetails(): WowDetails {
        return {
            id: this.id,
            animalName: this.animal.getName(),
            visitorName: this.visitor.getName(),
            locationName: this.location.getName(),
            category: this.category,
            intensity: this.intensity,
            description: this.description,
            timestamp: this.timestamp,
            skillName: this.performance.getSkill().getName()
        };
    }
    
    /**
     * 計算此 Wow 的點數價值
     * 根據強度和動物的 Wow 產生能力計算
     * @returns Wow 點數
     */
    public calculateWowPoints(): number {
        // 基礎點數 = 強度
        const basePoints = this.intensity;
        
        // 動物能力加成 (1-10 對應 1.0-2.0 倍數)
        const animalMultiplier = 1.0 + (this.animal.getWowGenerationAbility() - 1) * 0.1;
        
        // 類型加成
        const categoryMultiplier = this.getCategoryMultiplier();
        
        return Math.round(basePoints * animalMultiplier * categoryMultiplier);
    }
    
    /**
     * 獲取 Wow 類型的點數倍數
     * @returns 類型倍數
     */
    private getCategoryMultiplier(): number {
        switch (this.category) {
            case WowCategory.SKILL:
                return 1.2;  // 技能類有較高加成
            case WowCategory.SURPRISE:
                return 1.5;  // 驚喜類有最高加成
            case WowCategory.INTERACTION:
                return 1.1;  // 互動類有少量加成
            case WowCategory.CUTE:
            default:
                return 1.0;  // 可愛類基礎倍數
        }
    }
    
    /**
     * 驗證 Wow 資料是否有效
     * @returns 是否有效
     */
    public isValid(): boolean {
        return !!(
            this.id && this.id.trim().length > 0 &&
            this.animal &&
            this.visitor &&
            this.location &&
            this.category &&
            this.intensity >= 1 && this.intensity <= 10 &&
            this.performance &&
            this.timestamp
        );
    }
    
    // Getters 和 Setters
    
    public getId(): string {
        return this.id;
    }
    
    public getTimestamp(): Date {
        return this.timestamp;
    }
    
    public setTimestamp(timestamp: Date): void {
        this.timestamp = timestamp;
    }
    
    public getAnimal(): Animal {
        return this.animal;
    }
    
    public setAnimal(animal: Animal): void {
        this.animal = animal;
    }
    
    public getVisitor(): Visitor {
        return this.visitor;
    }
    
    public setVisitor(visitor: Visitor): void {
        this.visitor = visitor;
    }
    
    public getLocation(): Location {
        return this.location;
    }
    
    public setLocation(location: Location): void {
        this.location = location;
    }
    
    public getCategory(): WowCategory {
        return this.category;
    }
    
    public setCategory(category: WowCategory): void {
        this.category = category;
    }
    
    public getIntensity(): number {
        return this.intensity;
    }
    
    public setIntensity(intensity: number): void {
        this.intensity = Math.max(1, Math.min(10, intensity));
    }
    
    public getDescription(): string {
        return this.description;
    }
    
    public setDescription(description: string): void {
        this.description = description;
    }
    
    public getPerformance(): Performance {
        return this.performance;
    }
    
    public setPerformance(performance: Performance): void {
        this.performance = performance;
    }
    
    // 比較方法
    
    public equals(other: Wow): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Wow{` +
                `id='${this.id}', ` +
                `animal=${this.animal.getName()}, ` +
                `visitor=${this.visitor.getName()}, ` +
                `category=${this.category}, ` +
                `intensity=${this.intensity}, ` +
                `points=${this.calculateWowPoints()}, ` +
                `timestamp=${this.timestamp.toISOString()}` +
                `}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            timestamp: this.timestamp.toISOString(),
            animal: {
                id: this.animal.getId(),
                name: this.animal.getName()
            },
            visitor: {
                id: this.visitor.getId(),
                name: this.visitor.getName()
            },
            location: {
                id: this.location.getId(),
                name: this.location.getName()
            },
            category: this.category,
            intensity: this.intensity,
            description: this.description,
            wowPoints: this.calculateWowPoints(),
            performance: {
                id: this.performance.getId(),
                skillName: this.performance.getSkill().getName()
            }
        };
    }
}
