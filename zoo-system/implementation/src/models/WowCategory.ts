/**
 * Wow 分類列舉
 * 定義不同類型的 Wow 驚嘆反應
 */
export enum WowCategory {
    /**
     * 可愛類 - 動物展現可愛行為時的驚嘆
     */
    CUTE = "可愛類",
    
    /**
     * 技能類 - 動物表演技能時的驚嘆
     */
    SKILL = "技能類",
    
    /**
     * 互動類 - 遊客與動物互動時的驚嘆
     */
    INTERACTION = "互動類",
    
    /**
     * 驚喜類 - 意外驚喜行為的驚嘆
     */
    SURPRISE = "驚喜類"
}

/**
 * Wow 分類詳細資訊介面
 */
export interface WowCategoryInfo {
    displayName: string;
    description: string;
    scoreMultiplier: number;
}

/**
 * Wow 分類工具類別
 */
export class WowCategoryUtils {
    
    /**
     * 獲取 Wow 分類的詳細資訊
     */
    private static readonly categoryInfoMap: Map<WowCategory, WowCategoryInfo> = new Map([
        [WowCategory.CUTE, {
            displayName: "可愛類",
            description: "動物展現可愛行為",
            scoreMultiplier: 1.0
        }],
        [WowCategory.SKILL, {
            displayName: "技能類",
            description: "動物表演特殊技能",
            scoreMultiplier: 1.2
        }],
        [WowCategory.INTERACTION, {
            displayName: "互動類",
            description: "遊客與動物互動",
            scoreMultiplier: 1.1
        }],
        [WowCategory.SURPRISE, {
            displayName: "驚喜類",
            description: "意外的驚喜行為",
            scoreMultiplier: 1.5
        }]
    ]);
    
    /**
     * 獲取顯示名稱
     * @param category Wow 分類
     * @returns 中文顯示名稱
     */
    public static getDisplayName(category: WowCategory): string {
        return this.categoryInfoMap.get(category)?.displayName || category;
    }
    
    /**
     * 獲取描述
     * @param category Wow 分類
     * @returns 類型描述
     */
    public static getDescription(category: WowCategory): string {
        return this.categoryInfoMap.get(category)?.description || '';
    }
    
    /**
     * 獲取分數倍數
     * @param category Wow 分類
     * @returns 此類型的分數計算倍數
     */
    public static getScoreMultiplier(category: WowCategory): number {
        return this.categoryInfoMap.get(category)?.scoreMultiplier || 1.0;
    }
    
    /**
     * 根據字串獲取對應的 WowCategory
     * @param name 類型名稱（英文或中文）
     * @returns 對應的 WowCategory，如果找不到則返回 CUTE
     */
    public static fromString(name: string): WowCategory {
        if (!name || name.trim().length === 0) {
            return WowCategory.CUTE;
        }
        
        const upperName = name.toUpperCase().trim();
        
        // 嘗試直接值匹配
        const values = Object.values(WowCategory);
        for (const value of values) {
            if (value.toUpperCase() === upperName) {
                return value as WowCategory;
            }
        }
        
        // 嘗試枚舉名稱匹配
        const keys = Object.keys(WowCategory) as Array<keyof typeof WowCategory>;
        for (const key of keys) {
            if (key === upperName) {
                return WowCategory[key];
            }
        }
        
        // 嘗試中文名稱匹配
        for (const [category, info] of this.categoryInfoMap.entries()) {
            if (info.displayName === name.trim()) {
                return category;
            }
        }
        
        // 如果都不匹配，返回預設值
        return WowCategory.CUTE;
    }
    
    /**
     * 獲取所有可用的類型
     * @returns 類型陣列
     */
    public static getAllCategories(): WowCategory[] {
        return Object.values(WowCategory);
    }
    
    /**
     * 檢查是否為高價值類型
     * @param category Wow 分類
     * @returns 是否為高價值類型（分數倍數 > 1.0）
     */
    public static isHighValue(category: WowCategory): boolean {
        return this.getScoreMultiplier(category) > 1.0;
    }
    
    /**
     * 獲取分類的完整資訊
     * @param category Wow 分類
     * @returns 分類詳細資訊
     */
    public static getCategoryInfo(category: WowCategory): WowCategoryInfo | undefined {
        return this.categoryInfoMap.get(category);
    }
    
    /**
     * 格式化顯示 Wow 分類
     * @param category Wow 分類
     * @returns 格式化字串
     */
    public static toString(category: WowCategory): string {
        const info = this.categoryInfoMap.get(category);
        return info ? `${info.displayName} (${info.description})` : category;
    }
    
    /**
     * 將分類轉換為 JSON 物件
     * @param category Wow 分類
     * @returns JSON 表示
     */
    public static toJSON(category: WowCategory): object {
        const info = this.categoryInfoMap.get(category);
        return {
            value: category,
            displayName: info?.displayName || category,
            description: info?.description || '',
            scoreMultiplier: info?.scoreMultiplier || 1.0,
            isHighValue: this.isHighValue(category)
        };
    }
}
