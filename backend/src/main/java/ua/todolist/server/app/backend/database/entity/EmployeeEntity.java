package ua.todolist.server.app.backend.database.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "employee_detailed_data")
@Getter @Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "examinee_id")
    private String examineeId;

    @Column(name = "group_id")
    private String groupId;

    @Column(nullable = false)
    private String name;

    @Column(name = "assessment_date")
    private String assessmentDate;

    private String company;
    private String position;

    @Column(name = "behavior_type_class", length = 1000)
    private String behaviorTypeClass;

    @Column(name = "behavior_type_comment", length = 2000)
    private String behaviorTypeComment;

    @Column(name = "ai_summary_comment", length = 5000)
    private String aiSummaryComment;

    @Column(name = "ai_stress_motive_comment", length = 3000)
    private String aiStressMotiveComment;

    @Column(name = "ai_relate_to_others_comment", length = 3000)
    private String aiRelateToOthersComment;

    private String time;

    @Column(name = "analyzer_logical")
    private Double analyzerLogical;

    @Column(name = "controller_assertive")
    private Double controllerAssertive;

    @Column(name = "expressive_social")
    private Double expressiveSocial;

    @Column(name = "supporter_empathy")
    private Double supporterEmpathy;

    @Column(name = "attention_to_detail")
    private Double attentionToDetail;

    private Double organization;

    @Column(name = "confront_paperwork")
    private Double confrontPaperwork;

    private Double assertive;
    private Double competitive;

    @Column(name = "self_esteem")
    private Double selfEsteem;

    @Column(name = "confront_people")
    private Double confrontPeople;

    @Column(name = "warm_and_sociable")
    private Double warmAndSociable;

    private Double talking;
    private Double listening;
    private Double appreciation;
    private Double patience;

    @Column(name = "social_initiative")
    private Double socialInitiative;
}