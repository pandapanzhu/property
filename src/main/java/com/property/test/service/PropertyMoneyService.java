package com.property.test.service;

import com.property.test.domain.PropertyMoney;
import com.property.test.repository.PropertyMoneyRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing PropertyMoney.
 */
@Service
@Transactional
public class PropertyMoneyService {

    private final Logger log = LoggerFactory.getLogger(PropertyMoneyService.class);

    private PropertyMoneyRepository propertyMoneyRepository;

    public PropertyMoneyService(PropertyMoneyRepository propertyMoneyRepository) {
        this.propertyMoneyRepository = propertyMoneyRepository;
    }

    /**
     * Save a propertyMoney.
     *
     * @param propertyMoney the entity to save
     * @return the persisted entity
     */
    public PropertyMoney save(PropertyMoney propertyMoney) {
        log.debug("Request to save PropertyMoney : {}", propertyMoney);
        return propertyMoneyRepository.save(propertyMoney);
    }

    /**
     * Get all the propertyMonies.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Transactional(readOnly = true)
    public Page<PropertyMoney> findAll(Pageable pageable) {
        log.debug("Request to get all PropertyMonies");
        return propertyMoneyRepository.findAll(pageable);
    }


    /**
     * Get one propertyMoney by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Transactional(readOnly = true)
    public Optional<PropertyMoney> findOne(Long id) {
        log.debug("Request to get PropertyMoney : {}", id);
        return propertyMoneyRepository.findById(id);
    }

    /**
     * Delete the propertyMoney by id.
     *
     * @param id the id of the entity
     */
    public void delete(Long id) {
        log.debug("Request to delete PropertyMoney : {}", id);
        propertyMoneyRepository.deleteById(id);
    }
}
