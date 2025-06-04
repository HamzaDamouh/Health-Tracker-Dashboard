package com.mytracker.sleep_service.controller;


import com.mytracker.sleep_service.model.SleepEntry;
import com.mytracker.sleep_service.service.SleepEntryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("api/sleep")
@CrossOrigin(origins = "http://localhost:3000")
public class SleepEntryController {

    private final SleepEntryService service;

    @Autowired
    public SleepEntryController(SleepEntryService service) {
        this.service = service;
    }

    // GET /api/sleep -> return all sleep entries

    @GetMapping
    public List<SleepEntry> getAll() {
        return service.findAll();
    }

    // GET /api/sleep/{id} -> return the entry with a given ID
    @GetMapping("/{id}")
    public ResponseEntity<SleepEntry> getById(@PathVariable long id) {
        return service.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // GET /api/sleep/by-date?date=YYYY-MM-DD -> return all entries on that date
    @GetMapping("/by-date")
    public ResponseEntity<List<SleepEntry>> getByDate(@RequestParam("date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        return (ResponseEntity<List<SleepEntry>>) service.findByDate(date);
    }

    // POST / api/sleep -> create a new sleep entry (body = JSON SleepEntry)
    @PostMapping
    public ResponseEntity<SleepEntry> create(@RequestBody SleepEntry entry) {
        SleepEntry saved = service.saveEntry(entry);
        return ResponseEntity.ok(saved);
    }

    // PUT /api/sleep/{id} -> Update an existing entry by ID (body = JSON SleepEntry)
    @PutMapping("/{id}")
    public ResponseEntity<SleepEntry> update(
            @PathVariable Long id,
            @RequestBody SleepEntry updatedEntry
    ) {
        try {
            SleepEntry updated = service.updateEntry(id, updatedEntry);
            return ResponseEntity.ok(updated);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // DELETE api/sleep/{id} -> delete entry by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.deleteEntry(id);
        return ResponseEntity.noContent().build();
    }

}
