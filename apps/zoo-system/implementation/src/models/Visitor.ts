/**
 * 遊客實體類別
 * 代表一位動物園遊客
 */
export class Visitor {
    private id: string;
    private name: string;
    private visitDate: Date;
    private totalWowPoints: number;
    
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
        this.visitDate = new Date();
        this.totalWowPoints = 0;
    }
    
    // 業務方法
    
    /**
     * 增加 Wow 點數
     * @param points 要增加的點數
     */
    public addWowPoints(points: number): void {
        this.totalWowPoints += Math.max(0, points);
    }
    
    /**
     * 重設 Wow 點數
     */
    public resetWowPoints(): void {
        this.totalWowPoints = 0;
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
    
    public getVisitDate(): Date {
        return this.visitDate;
    }
    
    public setVisitDate(visitDate: Date): void {
        this.visitDate = visitDate;
    }
    
    public getTotalWowPoints(): number {
        return this.totalWowPoints;
    }
    
    public setTotalWowPoints(totalWowPoints: number): void {
        this.totalWowPoints = Math.max(0, totalWowPoints);
    }
    
    // 比較方法
    
    public equals(other: Visitor): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Visitor{id='${this.id}', name='${this.name}', totalWowPoints=${this.totalWowPoints}}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            visitDate: this.visitDate.toISOString(),
            totalWowPoints: this.totalWowPoints
        };
    }
}
