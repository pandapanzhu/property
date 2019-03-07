package com.property.test.service;

import com.property.test.domain.PropertyMoney;
import com.property.test.domain.PropertyServe;
import com.property.test.domain.Stuff;
import com.property.test.domain.User;
import com.property.test.repository.PropertyServeRepository;
import com.property.test.repository.StuffRepository;
import com.property.test.repository.UserRepository;
import com.property.test.security.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing PropertyServe.
 */
@Service
@Transactional
public class PropertyServeService {

    private final Logger log = LoggerFactory.getLogger(PropertyServeService.class);

    private final PropertyServeRepository propertyServeRepository;


    @Resource
    private UserDetailsService userDetailsService;

    @Resource
    private UserRepository userRepository;

    @Resource
    private StuffRepository stuffRepository;

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

        Optional<String> loginName = SecurityUtils.getCurrentUserLogin();
        Optional<User> userOptional = userRepository.findOneByLogin(loginName.get());
        Optional<Stuff> stuffOptional =  stuffRepository.findByUserId(userOptional.get().getId().toString());
        if(userOptional.isPresent() && stuffOptional.isPresent()) {
            propertyServe.setUserId(userOptional.get().getId().toString());
            propertyServe.setCreateDate(LocalDateTime.now().toInstant(ZoneOffset.of("+08:00")));
            propertyServe.setDlt(0);
        }else{
            return null;
        }

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

    public List<PropertyServe> findAllByUserId(String userId) {
        return propertyServeRepository.findAllByUserId(userId);
    }
}
