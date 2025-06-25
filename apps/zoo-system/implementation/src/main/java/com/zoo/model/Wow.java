package com.zoo.model;

import java.time.LocalDateTime;

/**
 * Wow 實體類別
 * 代表遊客對動物表演的驚嘆記錄
 */
public class Wow {
    private String id;
    private LocalDateTime timestamp;
    private Animal animal;
    private Visitor visitor;
    private Location location;
    private WowCategory category;
    private int intensity; // 1-10
    private String description;
    private Performance performance;
    
    // 建構子
    public Wow() {
        this.timestamp = LocalDateTime.now();
    }
    
    public Wow(String id, Animal animal, Visitor visitor, Location location, 
               WowCategory category, int intensity, Performance performance) {
        this();
        this.id = id;
        this.animal = animal;
        this.visitor = visitor;
        this.location = location;
        this.category = category;
        this.intensity = Math.max(1, Math.min(10, intensity));
        this.performance = performance;
    }
    
    public Wow(String id, Animal animal, Visitor visitor, Location location,
               WowCategory category, int intensity, String description, Performance performance) {
        this(id, animal, visitor, location, category, intensity, performance);
        this.description = description;
    }
    
    // 業務方法
    
    /**
     * 生成分享連結
     * @return 分享連結字串
     */
    public String generateShareLink() {
        return "https://zoo.example.com/wow/" + this.id + "?share=" + 
               System.currentTimeMillis() + "_" + visitor.getId();
    }
    
    /**
     * 檢查是否由指定遊客評分
     * @param visitor 遊客物件
     * @return 是否由此遊客評分
     */
    public boolean isRatedBy(Visitor visitor) {
        return this.visitor != null && this.visitor.equals(visitor);
    }
    
    /**
     * 獲取 Wow 詳細資訊
     * @return Wow 詳細資訊物件
     */
    public WowDetails getDetails() {
        return new WowDetails(
            this.id,
            this.animal.getName(),
            this.visitor.getName(),
            this.location.getName(),
            this.category,
            this.intensity,
            this.description,
            this.timestamp,
            this.performance.getSkill().getName()
        );
    }
    
    /**
     * 計算此 Wow 的點數價值
     * 根據強度和動物的 Wow 產生能力計算
     * @return Wow 點數
     */
    public int calculateWowPoints() {
        // 基礎點數 = 強度
        int basePoints = this.intensity;
        
        // 動物能力加成 (1-10 對應 1.0-2.0 倍數)
        double animalMultiplier = 1.0 + (animal.getWowGenerationAbility() - 1) * 0.1;
        
        // 類型加成
        double categoryMultiplier = getCategoryMultiplier();
        
        return (int) Math.round(basePoints * animalMultiplier * categoryMultiplier);
    }
    
    /**
     * 獲取 Wow 類型的點數倍數
     * @return 類型倍數
     */
    private double getCategoryMultiplier() {
        switch (category) {
            case SKILL:
                return 1.2;  // 技能類有較高加成
            case SURPRISE:
                return 1.5;  // 驚喜類有最高加成
            case INTERACTION:
                return 1.1;  // 互動類有少量加成
            case CUTE:
            default:
                return 1.0;  // 可愛類基礎倍數
        }
    }
    
    /**
     * 驗證 Wow 資料是否有效
     * @return 是否有效
     */
    public boolean isValid() {
        return id != null && !id.trim().isEmpty() &&
               animal != null &&
               visitor != null &&
               location != null &&
               category != null &&
               intensity >= 1 && intensity <= 10 &&
               performance != null &&
               timestamp != null;
    }
    
    // Getters 和 Setters
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public Animal getAnimal() {
        return animal;
    }
    
    public void setAnimal(Animal animal) {
        this.animal = animal;
    }
    
    public Visitor getVisitor() {
        return visitor;
    }
    
    public void setVisitor(Visitor visitor) {
        this.visitor = visitor;
    }
    
    public Location getLocation() {
        return location;
    }
    
    public void setLocation(Location location) {
        this.location = location;
    }
    
    public WowCategory getCategory() {
        return category;
    }
    
    public void setCategory(WowCategory category) {
        this.category = category;
    }
    
    public int getIntensity() {
        return intensity;
    }
    
    public void setIntensity(int intensity) {
        this.intensity = Math.max(1, Math.min(10, intensity));
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public Performance getPerformance() {
        return performance;
    }
    
    public void setPerformance(Performance performance) {
        this.performance = performance;
    }
    
    // equals 和 hashCode
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Wow wow = (Wow) o;
        return id != null ? id.equals(wow.id) : wow.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Wow{" +
                "id='" + id + '\'' +
                ", animal=" + (animal != null ? animal.getName() : "null") +
                ", visitor=" + (visitor != null ? visitor.getName() : "null") +
                ", category=" + category +
                ", intensity=" + intensity +
                ", points=" + calculateWowPoints() +
                ", timestamp=" + timestamp +
                '}';
    }
}
