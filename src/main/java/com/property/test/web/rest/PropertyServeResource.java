package com.property.test.web.rest;
import com.property.test.domain.PropertyServe;
import com.property.test.service.PropertyServeService;
import com.property.test.web.rest.errors.BadRequestAlertException;
import com.property.test.web.rest.util.HeaderUtil;
import com.property.test.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing PropertyServe.
 */
@RestController
@RequestMapping("/api")
public class PropertyServeResource {

    private final Logger log = LoggerFactory.getLogger(PropertyServeResource.class);

    private static final String ENTITY_NAME = "propertyServe";

    private final PropertyServeService propertyServeService;

    public PropertyServeResource(PropertyServeService propertyServeService) {
        this.propertyServeService = propertyServeService;
    }

    /**
     * POST  /property-serves : Create a new propertyServe.
     *
     * @param propertyServe the propertyServe to create
     * @return the ResponseEntity with status 201 (Created) and with body the new propertyServe, or with status 400 (Bad Request) if the propertyServe has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/property-serves")
    public ResponseEntity<PropertyServe> createPropertyServe(@Valid @RequestBody PropertyServe propertyServe) throws URISyntaxException {
        log.debug("REST request to save PropertyServe : {}", propertyServe);
        if (propertyServe.getId() != null) {
            throw new BadRequestAlertException("A new propertyServe cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropertyServe result = propertyServeService.save(propertyServe);
        return ResponseEntity.created(new URI("/api/property-serves/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /property-serves : Updates an existing propertyServe.
     *
     * @param propertyServe the propertyServe to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated propertyServe,
     * or with status 400 (Bad Request) if the propertyServe is not valid,
     * or with status 500 (Internal Server Error) if the propertyServe couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/property-serves")
    public ResponseEntity<PropertyServe> updatePropertyServe(@Valid @RequestBody PropertyServe propertyServe) throws URISyntaxException {
        log.debug("REST request to update PropertyServe : {}", propertyServe);
        if (propertyServe.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropertyServe result = propertyServeService.save(propertyServe);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, propertyServe.getId().toString()))
            .body(result);
    }

    /**
     * GET  /property-serves : get all the propertyServes.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of propertyServes in body
     */
    @GetMapping("/property-serves")
    public ResponseEntity<List<PropertyServe>> getAllPropertyServes(Pageable pageable) {
        log.debug("REST request to get a page of PropertyServes");
        Page<PropertyServe> page = propertyServeService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/property-serves");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /property-serves/:id : get the "id" propertyServe.
     *
     * @param id the id of the propertyServe to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the propertyServe, or with status 404 (Not Found)
     */
    @GetMapping("/property-serves/{id}")
    public ResponseEntity<PropertyServe> getPropertyServe(@PathVariable Long id) {
        log.debug("REST request to get PropertyServe : {}", id);
        Optional<PropertyServe> propertyServe = propertyServeService.findOne(id);
        return ResponseUtil.wrapOrNotFound(propertyServe);
    }

    /**
     * DELETE  /property-serves/:id : delete the "id" propertyServe.
     *
     * @param id the id of the propertyServe to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/property-serves/{id}")
    public ResponseEntity<Void> deletePropertyServe(@PathVariable Long id) {
        log.debug("REST request to delete PropertyServe : {}", id);
        propertyServeService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
