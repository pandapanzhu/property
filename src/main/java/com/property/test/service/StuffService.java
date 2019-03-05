package com.property.test.service;

import com.property.test.domain.Stuff;
import com.property.test.repository.StuffRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing Stuff.
 */
@Service
@Transactional
public class StuffService {

    private final Logger log = LoggerFactory.getLogger(StuffService.class);

    private final StuffRepository stuffRepository;

    public StuffService(StuffRepository stuffRepository) {
        this.stuffRepository = stuffRepository;
    }

    /**
     * Save a stuff.
     *
     * @param stuff the entity to save
     * @return the persisted entity
     */
    public Stuff save(Stuff stuff) {
        log.debug("Request to save Stuff : {}", stuff);
        return stuffRepository.save(stuff);
    }

    /**
     * Get all the stuffs.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<Stuff> findAll(Pageable pageable) {
        log.debug("Request to get all Stuffs");
        return stuffRepository.findAll(pageable);
    }


    /**
     * Get one stuff by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<Stuff> findOne(Long id) {
        log.debug("Request to get Stuff : {}", id);
        return stuffRepository.findById(id);
    }

    /**
     * Delete the stuff by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete Stuff : {}", id);
        stuffRepository.deleteById(id);
    }
}
