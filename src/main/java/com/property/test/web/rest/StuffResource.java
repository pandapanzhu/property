package com.property.test.web.rest;
import com.property.test.domain.Stuff;
import com.property.test.service.StuffService;
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
 * REST controller for managing Stuff.
 */
@RestController
@RequestMapping("/api")
public class StuffResource {

    private final Logger log = LoggerFactory.getLogger(StuffResource.class);

    private static final String ENTITY_NAME = "stuff";

    private final StuffService stuffService;

    public StuffResource(StuffService stuffService) {
        this.stuffService = stuffService;
    }

    /**
     * POST  /stuffs : Create a new stuff.
     *
     * @param stuff the stuff to create
     * @return the ResponseEntity with status 201 (Created) and with body the new stuff, or with status 400 (Bad Request) if the stuff has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/stuffs")
    public ResponseEntity<Stuff> createStuff(@Valid @RequestBody Stuff stuff) throws URISyntaxException {
        log.debug("REST request to save Stuff : {}", stuff);
        if (stuff.getId() != null) {
            throw new BadRequestAlertException("A new stuff cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Stuff result = stuffService.save(stuff);
        return ResponseEntity.created(new URI("/api/stuffs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /stuffs : Updates an existing stuff.
     *
     * @param stuff the stuff to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated stuff,
     * or with status 400 (Bad Request) if the stuff is not valid,
     * or with status 500 (Internal Server Error) if the stuff couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/stuffs")
    public ResponseEntity<Stuff> updateStuff(@Valid @RequestBody Stuff stuff) throws URISyntaxException {
        log.debug("REST request to update Stuff : {}", stuff);
        if (stuff.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Stuff result = stuffService.save(stuff);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, stuff.getId().toString()))
            .body(result);
    }

    /**
     * GET  /stuffs : get all the stuffs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of stuffs in body
     */
    @GetMapping("/stuffs")
    public ResponseEntity<List<Stuff>> getAllStuffs(Pageable pageable) {
        log.debug("REST request to get a page of Stuffs");
        Page<Stuff> page = stuffService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/stuffs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /stuffs/:id : get the "id" stuff.
     *
     * @param id the id of the stuff to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the stuff, or with status 404 (Not Found)
     */
    @GetMapping("/stuffs/{id}")
    public ResponseEntity<Stuff> getStuff(@PathVariable Long id) {
        log.debug("REST request to get Stuff : {}", id);
        Optional<Stuff> stuff = stuffService.findOne(id);
        return ResponseUtil.wrapOrNotFound(stuff);
    }

    /**
     * DELETE  /stuffs/:id : delete the "id" stuff.
     *
     * @param id the id of the stuff to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/stuffs/{id}")
    public ResponseEntity<Void> deleteStuff(@PathVariable Long id) {
        log.debug("REST request to delete Stuff : {}", id);
        stuffService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
