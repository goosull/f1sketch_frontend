package com.example.f1sketch.domain;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Track {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;     // 예: "Monaco"
    private String region;   // 예: "Monte Carlo"

    @Column(columnDefinition = "text")
    private String pathJson; // "[{\"x\":0,\"y\":0}, ...]" 형태의 JSON 문자열
}
