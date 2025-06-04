package com.example.f1sketch.repository;

import com.example.f1sketch.domain.Submission;
import com.example.f1sketch.domain.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    // 특정 트랙(track)에 대해 점수가 높은 순으로 상위 10개 Submission을 조회하는 메소드
    List<Submission> findTop10ByTrackOrderByScoreDesc(Track track);
}
