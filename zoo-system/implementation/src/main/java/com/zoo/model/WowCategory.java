package com.zoo.model;

/**
 * Wow 分類列舉
 * 定義不同類型的 Wow 驚嘆反應
 */
public enum WowCategory {
    /**
     * 可愛類 - 動物展現可愛行為時的驚嘆
     */
    CUTE("可愛類", "動物展現可愛行為", 1.0),
    
    /**
     * 技能類 - 動物表演技能時的驚嘆
     */
    SKILL("技能類", "動物表演特殊技能", 1.2),
    
    /**
     * 互動類 - 遊客與動物互動時的驚嘆
     */
    INTERACTION("互動類", "遊客與動物互動", 1.1),
    
    /**
     * 驚喜類 - 意外驚喜行為的驚嘆
     */
    SURPRISE("驚喜類", "意外的驚喜行為", 1.5);
    
    private final String displayName;
    private final String description;
    private final double scoreMultiplier;
    
    WowCategory(String displayName, String description, double scoreMultiplier) {
        this.displayName = displayName;
        this.description = description;
        this.scoreMultiplier = scoreMultiplier;
    }
    
    /**
     * 獲取顯示名稱
     * @return 中文顯示名稱
     */
    public String getDisplayName() {
        return displayName;
    }
    
    /**
     * 獲取描述
     * @return 類型描述
     */
    public String getDescription() {
        return description;
    }
    
    /**
     * 獲取分數倍數
     * @return 此類型的分數計算倍數
     */
    public double getScoreMultiplier() {
        return scoreMultiplier;
    }
    
    /**
     * 根據字串獲取對應的 WowCategory
     * @param name 類型名稱（英文或中文）
     * @return 對應的 WowCategory，如果找不到則返回 CUTE
     */
    public static WowCategory fromString(String name) {
        if (name == null || name.trim().isEmpty()) {
            return CUTE;
        }
        
        String upperName = name.toUpperCase().trim();
        
        // 嘗試英文名稱匹配
        try {
            return WowCategory.valueOf(upperName);
        } catch (IllegalArgumentException e) {
            // 如果英文名稱不匹配，嘗試中文名稱匹配
            for (WowCategory category : WowCategory.values()) {
                if (category.getDisplayName().equals(name.trim())) {
                    return category;
                }
            }
        }
        
        // 如果都不匹配，返回預設值
        return CUTE;
    }
    
    /**
     * 獲取所有可用的類型
     * @return 類型陣列
     */
    public static WowCategory[] getAllCategories() {
        return WowCategory.values();
    }
    
    /**
     * 檢查是否為高價值類型
     * @return 是否為高價值類型（分數倍數 > 1.0）
     */
    public boolean isHighValue() {
        return scoreMultiplier > 1.0;
    }
    
    @Override
    public String toString() {
        return displayName + " (" + description + ")";
    }
}
