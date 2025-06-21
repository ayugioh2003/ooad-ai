import { Animal } from './Animal';
import { Skill } from './Skill';
import { Location } from './Location';

/**
 * 表演實體類別
 * 代表動物的一次表演
 */
export class Performance {
    private id: string;
    private animal: Animal;
    private skill: Skill;
    private startTime: Date;
    private endTime: Date | null;
    private duration: number; // 秒數
    private location: Location;
    private isActiveFlag: boolean;
    
    constructor(
        id: string,
        animal: Animal,
        skill: Skill,
        startTime: Date,
        location: Location,
        duration: number = 300 // 預設5分鐘
    ) {
        this.id = id;
        this.animal = animal;
        this.skill = skill;
        this.startTime = startTime;
        this.endTime = null;
        this.duration = duration;
        this.location = location;
        this.isActiveFlag = true;
        
        // 自動設定結束時間
        setTimeout(() => {
            this.end();
        }, duration * 1000);
    }
    
    // 業務方法
    
    /**
     * 開始表演
     */
    public start(): void {
        this.isActiveFlag = true;
        this.startTime = new Date();
        this.endTime = null;
    }
    
    /**
     * 結束表演
     */
    public end(): void {
        this.isActiveFlag = false;
        this.endTime = new Date();
    }
    
    /**
     * 檢查表演是否進行中
     * @returns 是否進行中
     */
    public isActive(): boolean {
        return this.isActiveFlag && this.endTime === null;
    }
    
    /**
     * 獲取實際表演時長（秒）
     * @returns 表演時長，如果還在進行中則返回到目前為止的時長
     */
    public getActualDuration(): number {
        const endTime = this.endTime || new Date();
        return Math.floor((endTime.getTime() - this.startTime.getTime()) / 1000);
    }
    
    // Getters 和 Setters
    
    public getId(): string {
        return this.id;
    }
    
    public getAnimal(): Animal {
        return this.animal;
    }
    
    public setAnimal(animal: Animal): void {
        this.animal = animal;
    }
    
    public getSkill(): Skill {
        return this.skill;
    }
    
    public setSkill(skill: Skill): void {
        this.skill = skill;
    }
    
    public getStartTime(): Date {
        return this.startTime;
    }
    
    public setStartTime(startTime: Date): void {
        this.startTime = startTime;
    }
    
    public getEndTime(): Date | null {
        return this.endTime;
    }
    
    public getDuration(): number {
        return this.duration;
    }
    
    public setDuration(duration: number): void {
        this.duration = duration;
    }
    
    public getLocation(): Location {
        return this.location;
    }
    
    public setLocation(location: Location): void {
        this.location = location;
    }
    
    // 比較方法
    
    public equals(other: Performance): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Performance{` +
                `id='${this.id}', ` +
                `animal='${this.animal.getName()}', ` +
                `skill='${this.skill.getName()}', ` +
                `isActive=${this.isActive()}, ` +
                `duration=${this.getActualDuration()}s` +
                `}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            animal: {
                id: this.animal.getId(),
                name: this.animal.getName()
            },
            skill: {
                id: this.skill.getId(),
                name: this.skill.getName()
            },
            startTime: this.startTime.toISOString(),
            endTime: this.endTime?.toISOString() || null,
            duration: this.duration,
            actualDuration: this.getActualDuration(),
            location: this.location.toJSON(),
            isActive: this.isActive()
        };
    }
}
