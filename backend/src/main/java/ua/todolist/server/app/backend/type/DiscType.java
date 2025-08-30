package ua.todolist.server.app.backend.type;

import lombok.Getter;

@Getter
public enum DiscType {
    DOMINANCE("dominance", "Dominance", "D"),
    INFLUENCE("influence", "Influence", "I"),
    STEADINESS("steadiness", "Steadiness", "S"),
    CONSCIENTIOUSNESS("conscientiousness", "Conscientiousness", "C");

    private final String key;
    private final String displayName;
    private final String abbreviation;

    DiscType(String key, String displayName, String abbreviation) {
        this.key = key;
        this.displayName = displayName;
        this.abbreviation = abbreviation;
    }

    public static DiscType fromKey(String key) {
        for (DiscType type : values()) {
            if (type.key.equals(key)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown DISC type: " + key);
    }
}
