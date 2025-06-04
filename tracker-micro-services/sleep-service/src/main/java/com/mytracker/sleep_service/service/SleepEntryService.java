package com.mytracker.sleep_service.service;


import com.mytracker.sleep_service.model.SleepEntry;
import com.mytracker.sleep_service.model.SleepFeeling;
import com.mytracker.sleep_service.model.SleepTag;
import com.mytracker.sleep_service.repository.SleepEntryRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class SleepEntryService {

    private final SleepEntryRepository sleepEntryRepository;

    @Autowired
    public SleepEntryService(SleepEntryRepository sleepEntryRepository) {
        this.sleepEntryRepository = sleepEntryRepository;
    }

    public List<SleepEntry> findAll() {
        return sleepEntryRepository.findAll();
    }

    public Optional<SleepEntry> findById(Long id) {
        return sleepEntryRepository.findById(id);
    }

    public List<SleepEntry> findByDate(LocalDate date) {
        return sleepEntryRepository.findByEntryDate(date);
    }

    @Transactional
    public SleepEntry saveEntry(SleepEntry sleepEntry) {
        validateEntry(sleepEntry);
        return sleepEntryRepository.save(sleepEntry);
    }

    @Transactional
    public SleepEntry updateEntry(Long id,SleepEntry sleepEntry) {
        SleepEntry existing = sleepEntryRepository.findById(id).orElseThrow(()->new RuntimeException("Sleep Entry Not Found" +id));
        validateEntry(sleepEntry);

        existing.setEntryDate(sleepEntry.getEntryDate());
        existing.setBedtime(sleepEntry.getBedtime());
        existing.setWakeTime(sleepEntry.getWakeTime());
        existing.setFeeling(sleepEntry.getFeeling());
        existing.setEnergyLevel(sleepEntry.getEnergyLevel());
        existing.setFocusLevel(sleepEntry.getFocusLevel());
        existing.setTags(sleepEntry.getTags());
        return sleepEntryRepository.save(existing);
    }

    @Transactional
    public void deleteEntry(Long id) {
        sleepEntryRepository.deleteById(id);
    }

    private void validateEntry(SleepEntry entry) {

        if (entry.getFeeling()!= null) {
            Set<SleepFeeling> validFeeling = EnumSet.allOf(SleepFeeling.class);
            if (!validFeeling.containsAll(Collections.singleton(entry.getFeeling()))) {
                throw new IllegalArgumentException("Contains invalid tag(s)");
            }
        }

        if (entry.getEnergyLevel() < 1 || entry.getEnergyLevel() > 10) {
            throw new IllegalArgumentException("Energy level must be between 1 and 10");
        }
        if (entry.getFocusLevel() < 1 || entry.getFocusLevel() > 10) {
            throw new IllegalArgumentException("Focus level must be between 1 and 10");
        }

        if (entry.getTags() != null) {
            Set<SleepTag> validTags = EnumSet.allOf(SleepTag.class);
            if (!validTags.containsAll(entry.getTags())) {
                throw new IllegalArgumentException("Contains invalid tag(s)");
            }
        }
    }



}
