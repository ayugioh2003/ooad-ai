/**
 * 地點實體類別
 * 代表動物園中的一個位置
 */
export class Location {
    private id: string;
    private name: string;
    private description: string;
    
    constructor(id: string, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
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
    
    // 比較方法
    
    public equals(other: Location): boolean {
        return this.id === other.id;
    }
    
    public toString(): string {
        return `Location{id='${this.id}', name='${this.name}', description='${this.description}'}`;
    }
    
    /**
     * 轉換為 JSON 物件
     * @returns JSON 表示
     */
    public toJSON(): object {
        return {
            id: this.id,
            name: this.name,
            description: this.description
        };
    }
}
