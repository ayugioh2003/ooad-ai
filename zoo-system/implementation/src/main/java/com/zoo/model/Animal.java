package com.zoo.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 動物實體類別
 * 代表動物園中的一隻動物
 */
public class Animal {
    private String id;
    private String name;
    private String species;
    private int age;
    private String description;
    private int wowGenerationAbility; // 1-10
    private List<Skill> skills;
    private Location location;
    private List<Performance> performances;
    
    // 建構子
    public Animal() {
        this.skills = new ArrayList<>();
        this.performances = new ArrayList<>();
    }
    
    public Animal(String id, String name, String species, int age, String description, int wowGenerationAbility) {
        this();
        this.id = id;
        this.name = name;
        this.species = species;
        this.age = age;
        this.description = description;
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
    }
    
    // 業務方法
    
    /**
     * 表演技能
     * @param skill 要表演的技能
     * @return 表演物件
     */
    public Performance performSkill(Skill skill) {
        if (!skills.contains(skill)) {
            throw new IllegalArgumentException("Animal does not have this skill");
        }
        
        Performance performance = new Performance(
            generatePerformanceId(),
            this,
            skill,
            LocalDateTime.now(),
            this.location
        );
        
        performances.add(performance);
        return performance;
    }
    
    /**
     * 隨機表演技能
     * @return 表演物件，如果沒有技能則返回 null
     */
    public Performance performRandomSkill() {
        if (skills.isEmpty()) {
            return null;
        }
        
        int randomIndex = (int) (Math.random() * skills.size());
        Skill randomSkill = skills.get(randomIndex);
        return performSkill(randomSkill);
    }
    
    /**
     * 添加技能
     * @param skill 要添加的技能
     */
    public void addSkill(Skill skill) {
        if (skill != null && !skills.contains(skill)) {
            skills.add(skill);
        }
    }
    
    /**
     * 移除技能
     * @param skillId 技能ID
     * @return 是否成功移除
     */
    public boolean removeSkill(String skillId) {
        return skills.removeIf(skill -> skill.getId().equals(skillId));
    }
    
    /**
     * 檢查是否正在表演
     * @return 是否正在表演
     */
    public boolean isPerforming() {
        return performances.stream()
                .anyMatch(Performance::isActive);
    }
    
    /**
     * 獲取當前表演
     * @return 當前表演，如果沒有則返回 null
     */
    public Performance getCurrentPerformance() {
        return performances.stream()
                .filter(Performance::isActive)
                .findFirst()
                .orElse(null);
    }
    
    /**
     * 更新動物資訊
     * @param name 名稱
     * @param description 描述
     * @param wowGenerationAbility Wow產生能力
     */
    public void updateInfo(String name, String description, int wowGenerationAbility) {
        if (name != null && !name.trim().isEmpty()) {
            this.name = name;
        }
        if (description != null) {
            this.description = description;
        }
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
    }
    
    /**
     * 生成表演ID
     * @return 唯一的表演ID
     */
    private String generatePerformanceId() {
        return "PERF_" + id + "_" + System.currentTimeMillis();
    }
    
    // Getters 和 Setters
    
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSpecies() {
        return species;
    }
    
    public void setSpecies(String species) {
        this.species = species;
    }
    
    public int getAge() {
        return age;
    }
    
    public void setAge(int age) {
        this.age = age;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public int getWowGenerationAbility() {
        return wowGenerationAbility;
    }
    
    public void setWowGenerationAbility(int wowGenerationAbility) {
        this.wowGenerationAbility = Math.max(1, Math.min(10, wowGenerationAbility));
    }
    
    public List<Skill> getSkills() {
        return new ArrayList<>(skills);
    }
    
    public void setSkills(List<Skill> skills) {
        this.skills = skills != null ? new ArrayList<>(skills) : new ArrayList<>();
    }
    
    public Location getLocation() {
        return location;
    }
    
    public void setLocation(Location location) {
        this.location = location;
    }
    
    public List<Performance> getPerformances() {
        return new ArrayList<>(performances);
    }
    
    // equals 和 hashCode
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return id != null ? id.equals(animal.id) : animal.id == null;
    }
    
    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
    
    @Override
    public String toString() {
        return "Animal{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", species='" + species + '\'' +
                ", age=" + age +
                ", wowGenerationAbility=" + wowGenerationAbility +
                ", skillsCount=" + skills.size() +
                ", isPerforming=" + isPerforming() +
                '}';
    }
}
