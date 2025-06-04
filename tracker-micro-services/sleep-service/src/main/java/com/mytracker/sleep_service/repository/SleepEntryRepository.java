package com.mytracker.sleep_service.repository;


import com.mytracker.sleep_service.model.SleepEntry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface SleepEntryRepository extends JpaRepository<SleepEntry, Long> {
    List<SleepEntry> findByEntryDate(LocalDate entryDate);
}
