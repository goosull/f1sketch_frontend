package com.example.f1sketch.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Submission {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;       // 로그인 기능이 없다면 "Anonymous" 사용
    private Double score;          // 0 ~ 100
    private Double hausdorff;      // 계산된 거리
    private LocalDateTime createdAt;

    @Column(columnDefinition = "text")
    private String userPathJson;

    @Column(columnDefinition = "text")
    private String normalizedUserPathJson;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "track_id")
    private Track track;
}
