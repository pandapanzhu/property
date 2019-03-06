package com.property.test.web.rest;

import com.property.test.PropertyApp;

import com.property.test.domain.PropertyServe;
import com.property.test.repository.PropertyServeRepository;
import com.property.test.service.PropertyServeService;
import com.property.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.property.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PropertyServeResource REST controller.
 *
 * @see PropertyServeResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PropertyApp.class)
public class PropertyServeResourceIntTest {

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_REASON = "AAAAAAAAAA";
    private static final String UPDATED_REASON = "BBBBBBBBBB";

    private static final String DEFAULT_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_REMARK = "BBBBBBBBBB";

    private static final Integer DEFAULT_DLT = 1;
    private static final Integer UPDATED_DLT = 2;

    private static final String DEFAULT_CREATE_USER = "AAAAAAAAAA";
    private static final String UPDATED_CREATE_USER = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_UPDATE_USER = "AAAAAAAAAA";
    private static final String UPDATED_UPDATE_USER = "BBBBBBBBBB";

    private static final Instant DEFAULT_UPDATE_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATE_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PropertyServeRepository propertyServeRepository;

    @Autowired
    private PropertyServeService propertyServeService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restPropertyServeMockMvc;

    private PropertyServe propertyServe;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropertyServeResource propertyServeResource = new PropertyServeResource(propertyServeService);
        this.restPropertyServeMockMvc = MockMvcBuilders.standaloneSetup(propertyServeResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static PropertyServe createEntity(EntityManager em) {
        PropertyServe propertyServe = new PropertyServe()
            .userId(DEFAULT_USER_ID)
            .reason(DEFAULT_REASON)
            .type(DEFAULT_TYPE)
            .remark(DEFAULT_REMARK)
            .dlt(DEFAULT_DLT)
            .create_user(DEFAULT_CREATE_USER)
            .createDate(DEFAULT_CREATE_DATE)
            .update_user(DEFAULT_UPDATE_USER)
            .update_date(DEFAULT_UPDATE_DATE);
        return propertyServe;
    }

    @Before
    public void initTest() {
        propertyServe = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropertyServe() throws Exception {
        int databaseSizeBeforeCreate = propertyServeRepository.findAll().size();

        // Create the PropertyServe
        restPropertyServeMockMvc.perform(post("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyServe)))
            .andExpect(status().isCreated());

        // Validate the PropertyServe in the database
        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeCreate + 1);
        PropertyServe testPropertyServe = propertyServeList.get(propertyServeList.size() - 1);
        assertThat(testPropertyServe.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testPropertyServe.getReason()).isEqualTo(DEFAULT_REASON);
        assertThat(testPropertyServe.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testPropertyServe.getRemark()).isEqualTo(DEFAULT_REMARK);
        assertThat(testPropertyServe.getDlt()).isEqualTo(DEFAULT_DLT);
        assertThat(testPropertyServe.getCreate_user()).isEqualTo(DEFAULT_CREATE_USER);
        assertThat(testPropertyServe.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testPropertyServe.getUpdate_user()).isEqualTo(DEFAULT_UPDATE_USER);
        assertThat(testPropertyServe.getUpdate_date()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createPropertyServeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propertyServeRepository.findAll().size();

        // Create the PropertyServe with an existing ID
        propertyServe.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropertyServeMockMvc.perform(post("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyServe)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyServe in the database
        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = propertyServeRepository.findAll().size();
        // set the field null
        propertyServe.setUserId(null);

        // Create the PropertyServe, which fails.

        restPropertyServeMockMvc.perform(post("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyServe)))
            .andExpect(status().isBadRequest());

        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkReasonIsRequired() throws Exception {
        int databaseSizeBeforeTest = propertyServeRepository.findAll().size();
        // set the field null
        propertyServe.setReason(null);

        // Create the PropertyServe, which fails.

        restPropertyServeMockMvc.perform(post("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyServe)))
            .andExpect(status().isBadRequest());

        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPropertyServes() throws Exception {
        // Initialize the database
        propertyServeRepository.saveAndFlush(propertyServe);

        // Get all the propertyServeList
        restPropertyServeMockMvc.perform(get("/api/property-serves?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propertyServe.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].reason").value(hasItem(DEFAULT_REASON.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK.toString())))
            .andExpect(jsonPath("$.[*].dlt").value(hasItem(DEFAULT_DLT)))
            .andExpect(jsonPath("$.[*].create_user").value(hasItem(DEFAULT_CREATE_USER.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].update_user").value(hasItem(DEFAULT_UPDATE_USER.toString())))
            .andExpect(jsonPath("$.[*].update_date").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPropertyServe() throws Exception {
        // Initialize the database
        propertyServeRepository.saveAndFlush(propertyServe);

        // Get the propertyServe
        restPropertyServeMockMvc.perform(get("/api/property-serves/{id}", propertyServe.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(propertyServe.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.reason").value(DEFAULT_REASON.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK.toString()))
            .andExpect(jsonPath("$.dlt").value(DEFAULT_DLT))
            .andExpect(jsonPath("$.create_user").value(DEFAULT_CREATE_USER.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.update_user").value(DEFAULT_UPDATE_USER.toString()))
            .andExpect(jsonPath("$.update_date").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPropertyServe() throws Exception {
        // Get the propertyServe
        restPropertyServeMockMvc.perform(get("/api/property-serves/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropertyServe() throws Exception {
        // Initialize the database
        propertyServeService.save(propertyServe);

        int databaseSizeBeforeUpdate = propertyServeRepository.findAll().size();

        // Update the propertyServe
        PropertyServe updatedPropertyServe = propertyServeRepository.findById(propertyServe.getId()).get();
        // Disconnect from session so that the updates on updatedPropertyServe are not directly saved in db
        em.detach(updatedPropertyServe);
        updatedPropertyServe
            .userId(UPDATED_USER_ID)
            .reason(UPDATED_REASON)
            .type(UPDATED_TYPE)
            .remark(UPDATED_REMARK)
            .dlt(UPDATED_DLT)
            .create_user(UPDATED_CREATE_USER)
            .createDate(UPDATED_CREATE_DATE)
            .update_user(UPDATED_UPDATE_USER)
            .update_date(UPDATED_UPDATE_DATE);

        restPropertyServeMockMvc.perform(put("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropertyServe)))
            .andExpect(status().isOk());

        // Validate the PropertyServe in the database
        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeUpdate);
        PropertyServe testPropertyServe = propertyServeList.get(propertyServeList.size() - 1);
        assertThat(testPropertyServe.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testPropertyServe.getReason()).isEqualTo(UPDATED_REASON);
        assertThat(testPropertyServe.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testPropertyServe.getRemark()).isEqualTo(UPDATED_REMARK);
        assertThat(testPropertyServe.getDlt()).isEqualTo(UPDATED_DLT);
        assertThat(testPropertyServe.getCreate_user()).isEqualTo(UPDATED_CREATE_USER);
        assertThat(testPropertyServe.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testPropertyServe.getUpdate_user()).isEqualTo(UPDATED_UPDATE_USER);
        assertThat(testPropertyServe.getUpdate_date()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPropertyServe() throws Exception {
        int databaseSizeBeforeUpdate = propertyServeRepository.findAll().size();

        // Create the PropertyServe

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropertyServeMockMvc.perform(put("/api/property-serves")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyServe)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyServe in the database
        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropertyServe() throws Exception {
        // Initialize the database
        propertyServeService.save(propertyServe);

        int databaseSizeBeforeDelete = propertyServeRepository.findAll().size();

        // Delete the propertyServe
        restPropertyServeMockMvc.perform(delete("/api/property-serves/{id}", propertyServe.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PropertyServe> propertyServeList = propertyServeRepository.findAll();
        assertThat(propertyServeList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropertyServe.class);
        PropertyServe propertyServe1 = new PropertyServe();
        propertyServe1.setId(1L);
        PropertyServe propertyServe2 = new PropertyServe();
        propertyServe2.setId(propertyServe1.getId());
        assertThat(propertyServe1).isEqualTo(propertyServe2);
        propertyServe2.setId(2L);
        assertThat(propertyServe1).isNotEqualTo(propertyServe2);
        propertyServe1.setId(null);
        assertThat(propertyServe1).isNotEqualTo(propertyServe2);
    }
}
