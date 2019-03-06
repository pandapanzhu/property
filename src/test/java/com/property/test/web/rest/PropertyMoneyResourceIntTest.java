package com.property.test.web.rest;

import com.property.test.PropertyApp;

import com.property.test.domain.PropertyMoney;
import com.property.test.repository.PropertyMoneyRepository;
import com.property.test.service.PropertyMoneyService;
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
import java.math.BigDecimal;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;


import static com.property.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the PropertyMoneyResource REST controller.
 *
 * @see PropertyMoneyResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PropertyApp.class)
public class PropertyMoneyResourceIntTest {

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

    private static final BigDecimal DEFAULT_SHOULD = new BigDecimal(1);
    private static final BigDecimal UPDATED_SHOULD = new BigDecimal(2);

    private static final Boolean DEFAULT_IS_PAY = false;
    private static final Boolean UPDATED_IS_PAY = true;


    private static final Integer DEFAULT_YEAR = 2019;
    private static final Integer UPDATED_YEAR = 2010;

    private static final Integer DEFAULT_MONTH = 1;
    private static final Integer UPDATED_MONTH = 2;

    private static final String DEFAULT_REMARK = "AAAAAAAAAA";
    private static final String UPDATED_REMARK = "BBBBBBBBBB";

    private static final Integer DEFAULT_DLT = 1;
    private static final Integer UPDATED_DLT = 2;

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private PropertyMoneyRepository propertyMoneyRepository;

    @Autowired
    private PropertyMoneyService propertyMoneyService;

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

    private MockMvc restPropertyMoneyMockMvc;

    private PropertyMoney propertyMoney;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropertyMoneyResource propertyMoneyResource = new PropertyMoneyResource(propertyMoneyService);
        this.restPropertyMoneyMockMvc = MockMvcBuilders.standaloneSetup(propertyMoneyResource)
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
    public static PropertyMoney createEntity(EntityManager em) {
        PropertyMoney propertyMoney = new PropertyMoney()
            .address(DEFAULT_ADDRESS)
            .should(DEFAULT_SHOULD)
            .isPay(DEFAULT_IS_PAY)
            .year(DEFAULT_YEAR)
            .month(DEFAULT_MONTH)
            .remark(DEFAULT_REMARK)
            .dlt(DEFAULT_DLT)
            .createdBy(DEFAULT_CREATED_BY)
            .createdDate(DEFAULT_CREATED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE);
        return propertyMoney;
    }

    @Before
    public void initTest() {
        propertyMoney = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropertyMoney() throws Exception {
        int databaseSizeBeforeCreate = propertyMoneyRepository.findAll().size();

        // Create the PropertyMoney
        restPropertyMoneyMockMvc.perform(post("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyMoney)))
            .andExpect(status().isCreated());

        // Validate the PropertyMoney in the database
        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeCreate + 1);
        PropertyMoney testPropertyMoney = propertyMoneyList.get(propertyMoneyList.size() - 1);
        assertThat(testPropertyMoney.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testPropertyMoney.getShould()).isEqualTo(DEFAULT_SHOULD);
        assertThat(testPropertyMoney.isIsPay()).isEqualTo(DEFAULT_IS_PAY);
        assertThat(testPropertyMoney.getYear()).isEqualTo(DEFAULT_YEAR);
        assertThat(testPropertyMoney.getMonth()).isEqualTo(DEFAULT_MONTH);
        assertThat(testPropertyMoney.getRemark()).isEqualTo(DEFAULT_REMARK);
        assertThat(testPropertyMoney.getDlt()).isEqualTo(DEFAULT_DLT);
        assertThat(testPropertyMoney.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testPropertyMoney.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testPropertyMoney.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
        assertThat(testPropertyMoney.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void createPropertyMoneyWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propertyMoneyRepository.findAll().size();

        // Create the PropertyMoney with an existing ID
        propertyMoney.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropertyMoneyMockMvc.perform(post("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyMoney)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyMoney in the database
        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkShouldIsRequired() throws Exception {
        int databaseSizeBeforeTest = propertyMoneyRepository.findAll().size();
        // set the field null
        propertyMoney.setShould(null);

        // Create the PropertyMoney, which fails.

        restPropertyMoneyMockMvc.perform(post("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyMoney)))
            .andExpect(status().isBadRequest());

        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIsPayIsRequired() throws Exception {
        int databaseSizeBeforeTest = propertyMoneyRepository.findAll().size();
        // set the field null
        propertyMoney.setIsPay(null);

        // Create the PropertyMoney, which fails.

        restPropertyMoneyMockMvc.perform(post("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyMoney)))
            .andExpect(status().isBadRequest());

        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPropertyMonies() throws Exception {
        // Initialize the database
        propertyMoneyRepository.saveAndFlush(propertyMoney);

        // Get all the propertyMoneyList
        restPropertyMoneyMockMvc.perform(get("/api/property-monies?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propertyMoney.getId().intValue())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].should").value(hasItem(DEFAULT_SHOULD.intValue())))
            .andExpect(jsonPath("$.[*].isPay").value(hasItem(DEFAULT_IS_PAY.booleanValue())))
            .andExpect(jsonPath("$.[*].year").value(hasItem(DEFAULT_YEAR.toString())))
            .andExpect(jsonPath("$.[*].month").value(hasItem(DEFAULT_MONTH.toString())))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK.toString())))
            .andExpect(jsonPath("$.[*].dlt").value(hasItem(DEFAULT_DLT)))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getPropertyMoney() throws Exception {
        // Initialize the database
        propertyMoneyRepository.saveAndFlush(propertyMoney);

        // Get the propertyMoney
        restPropertyMoneyMockMvc.perform(get("/api/property-monies/{id}", propertyMoney.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(propertyMoney.getId().intValue()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.should").value(DEFAULT_SHOULD.intValue()))
            .andExpect(jsonPath("$.isPay").value(DEFAULT_IS_PAY.booleanValue()))
            .andExpect(jsonPath("$.year").value(DEFAULT_YEAR.toString()))
            .andExpect(jsonPath("$.month").value(DEFAULT_MONTH.toString()))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK.toString()))
            .andExpect(jsonPath("$.dlt").value(DEFAULT_DLT))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY.toString()))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPropertyMoney() throws Exception {
        // Get the propertyMoney
        restPropertyMoneyMockMvc.perform(get("/api/property-monies/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropertyMoney() throws Exception {
        // Initialize the database
        propertyMoneyService.save(propertyMoney);

        int databaseSizeBeforeUpdate = propertyMoneyRepository.findAll().size();

        // Update the propertyMoney
        PropertyMoney updatedPropertyMoney = propertyMoneyRepository.findById(propertyMoney.getId()).get();
        // Disconnect from session so that the updates on updatedPropertyMoney are not directly saved in db
        em.detach(updatedPropertyMoney);
        updatedPropertyMoney
            .address(UPDATED_ADDRESS)
            .should(UPDATED_SHOULD)
            .isPay(UPDATED_IS_PAY)
            .year(UPDATED_YEAR)
            .month(UPDATED_MONTH)
            .remark(UPDATED_REMARK)
            .dlt(UPDATED_DLT)
            .createdBy(UPDATED_CREATED_BY)
            .createdDate(UPDATED_CREATED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE);

        restPropertyMoneyMockMvc.perform(put("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropertyMoney)))
            .andExpect(status().isOk());

        // Validate the PropertyMoney in the database
        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeUpdate);
        PropertyMoney testPropertyMoney = propertyMoneyList.get(propertyMoneyList.size() - 1);
        assertThat(testPropertyMoney.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testPropertyMoney.getShould()).isEqualTo(UPDATED_SHOULD);
        assertThat(testPropertyMoney.isIsPay()).isEqualTo(UPDATED_IS_PAY);
        assertThat(testPropertyMoney.getYear()).isEqualTo(UPDATED_YEAR);
        assertThat(testPropertyMoney.getMonth()).isEqualTo(UPDATED_MONTH);
        assertThat(testPropertyMoney.getRemark()).isEqualTo(UPDATED_REMARK);
        assertThat(testPropertyMoney.getDlt()).isEqualTo(UPDATED_DLT);
        assertThat(testPropertyMoney.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testPropertyMoney.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testPropertyMoney.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
        assertThat(testPropertyMoney.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingPropertyMoney() throws Exception {
        int databaseSizeBeforeUpdate = propertyMoneyRepository.findAll().size();

        // Create the PropertyMoney

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropertyMoneyMockMvc.perform(put("/api/property-monies")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propertyMoney)))
            .andExpect(status().isBadRequest());

        // Validate the PropertyMoney in the database
        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropertyMoney() throws Exception {
        // Initialize the database
        propertyMoneyService.save(propertyMoney);

        int databaseSizeBeforeDelete = propertyMoneyRepository.findAll().size();

        // Delete the propertyMoney
        restPropertyMoneyMockMvc.perform(delete("/api/property-monies/{id}", propertyMoney.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PropertyMoney> propertyMoneyList = propertyMoneyRepository.findAll();
        assertThat(propertyMoneyList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropertyMoney.class);
        PropertyMoney propertyMoney1 = new PropertyMoney();
        propertyMoney1.setId(1L);
        PropertyMoney propertyMoney2 = new PropertyMoney();
        propertyMoney2.setId(propertyMoney1.getId());
        assertThat(propertyMoney1).isEqualTo(propertyMoney2);
        propertyMoney2.setId(2L);
        assertThat(propertyMoney1).isNotEqualTo(propertyMoney2);
        propertyMoney1.setId(null);
        assertThat(propertyMoney1).isNotEqualTo(propertyMoney2);
    }
}
