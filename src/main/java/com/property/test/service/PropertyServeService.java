package com.property.test.service;

import com.property.test.domain.PropertyServe;
import com.property.test.repository.PropertyServeRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PropertyServe.
 */
@Service
@Transactional
public class PropertyServeService {

    private final Logger log = LoggerFactory.getLogger(PropertyServeService.class);

    private PropertyServeRepository propertyServeRepository;

    public PropertyServeService(PropertyServeRepository propertyServeRepository) {
        this.propertyServeRepository = propertyServeRepository;
    }

    /**
     * Save a propertyServe.
     *
     * @param propertyServe the entity to save
     * @return the persisted entity
     */
    public PropertyServe save(PropertyServe propertyServe) {
        log.debug("Request to save PropertyServe : {}", propertyServe);
        return propertyServeRepository.save(propertyServe);
    }

    /**
     * Get all the propertyServes.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PropertyServe> findAll(Pageable pageable) {
        log.debug("Request to get all PropertyServes");
        return propertyServeRepository.findAll(pageable);
    }


    /**
     * Get one propertyServe by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PropertyServe> findOne(Long id) {
        log.debug("Request to get PropertyServe : {}", id);
        return propertyServeRepository.findById(id);
    }

    /**
     * Delete the propertyServe by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PropertyServe : {}", id);
        propertyServeRepository.deleteById(id);
    }
}
