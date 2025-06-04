package com.example.f1sketch.repository;

import com.example.f1sketch.domain.Track;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TrackRepository extends JpaRepository<Track, Long> {
}
