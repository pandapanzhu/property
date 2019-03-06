package com.property.test.web.rest;

import com.property.test.PropertyApp;

import com.property.test.domain.Stuff;
import com.property.test.repository.StuffRepository;
import com.property.test.service.StuffService;
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
 * Test class for the StuffResource REST controller.
 *
 * @see StuffResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = PropertyApp.class)
public class StuffResourceIntTest {

    private static final String DEFAULT_USER_ID = "AAAAAAAAAA";
    private static final String UPDATED_USER_ID = "BBBBBBBBBB";

    private static final String DEFAULT_STUFFNAME = "AAAAAAAAAA";
    private static final String UPDATED_STUFFNAME = "BBBBBBBBBB";

    private static final String DEFAULT_GENDER = "AAAAAAAAAA";
    private static final String UPDATED_GENDER = "BBBBBBBBBB";

    private static final String DEFAULT_PHONE = "87064996308";
    private static final String UPDATED_PHONE = "35792293115";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_IDCARD = "AAAAAAAAAA";
    private static final String UPDATED_IDCARD = "BBBBBBBBBB";

    private static final String DEFAULT_ADDRESS = "AAAAAAAAAA";
    private static final String UPDATED_ADDRESS = "BBBBBBBBBB";

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
    private StuffRepository stuffRepository;

    @Autowired
    private StuffService stuffService;

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

    private MockMvc restStuffMockMvc;

    private Stuff stuff;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StuffResource stuffResource = new StuffResource(stuffService);
        this.restStuffMockMvc = MockMvcBuilders.standaloneSetup(stuffResource)
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
    public static Stuff createEntity(EntityManager em) {
        Stuff stuff = new Stuff()
            .userId(DEFAULT_USER_ID)
            .stuffname(DEFAULT_STUFFNAME)
            .gender(DEFAULT_GENDER)
            .phone(DEFAULT_PHONE)
            .email(DEFAULT_EMAIL)
            .idcard(DEFAULT_IDCARD)
            .address(DEFAULT_ADDRESS)
            .remark(DEFAULT_REMARK)
            .dlt(DEFAULT_DLT)
            .create_user(DEFAULT_CREATE_USER)
            .createDate(DEFAULT_CREATE_DATE)
            .update_user(DEFAULT_UPDATE_USER)
            .update_date(DEFAULT_UPDATE_DATE);
        return stuff;
    }

    @Before
    public void initTest() {
        stuff = createEntity(em);
    }

    @Test
    @Transactional
    public void createStuff() throws Exception {
        int databaseSizeBeforeCreate = stuffRepository.findAll().size();

        // Create the Stuff
        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isCreated());

        // Validate the Stuff in the database
        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeCreate + 1);
        Stuff testStuff = stuffList.get(stuffList.size() - 1);
        assertThat(testStuff.getUserId()).isEqualTo(DEFAULT_USER_ID);
        assertThat(testStuff.getStuffname()).isEqualTo(DEFAULT_STUFFNAME);
        assertThat(testStuff.getGender()).isEqualTo(DEFAULT_GENDER);
        assertThat(testStuff.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testStuff.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testStuff.getIdcard()).isEqualTo(DEFAULT_IDCARD);
        assertThat(testStuff.getAddress()).isEqualTo(DEFAULT_ADDRESS);
        assertThat(testStuff.getRemark()).isEqualTo(DEFAULT_REMARK);
        assertThat(testStuff.getDlt()).isEqualTo(DEFAULT_DLT);
        assertThat(testStuff.getCreate_user()).isEqualTo(DEFAULT_CREATE_USER);
        assertThat(testStuff.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
        assertThat(testStuff.getUpdate_user()).isEqualTo(DEFAULT_UPDATE_USER);
        assertThat(testStuff.getUpdate_date()).isEqualTo(DEFAULT_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void createStuffWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stuffRepository.findAll().size();

        // Create the Stuff with an existing ID
        stuff.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        // Validate the Stuff in the database
        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkUserIdIsRequired() throws Exception {
        int databaseSizeBeforeTest = stuffRepository.findAll().size();
        // set the field null
        stuff.setUserId(null);

        // Create the Stuff, which fails.

        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStuffnameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stuffRepository.findAll().size();
        // set the field null
        stuff.setStuffname(null);

        // Create the Stuff, which fails.

        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPhoneIsRequired() throws Exception {
        int databaseSizeBeforeTest = stuffRepository.findAll().size();
        // set the field null
        stuff.setPhone(null);

        // Create the Stuff, which fails.

        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkIdcardIsRequired() throws Exception {
        int databaseSizeBeforeTest = stuffRepository.findAll().size();
        // set the field null
        stuff.setIdcard(null);

        // Create the Stuff, which fails.

        restStuffMockMvc.perform(post("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStuffs() throws Exception {
        // Initialize the database
        stuffRepository.saveAndFlush(stuff);

        // Get all the stuffList
        restStuffMockMvc.perform(get("/api/stuffs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(stuff.getId().intValue())))
            .andExpect(jsonPath("$.[*].userId").value(hasItem(DEFAULT_USER_ID.toString())))
            .andExpect(jsonPath("$.[*].stuffname").value(hasItem(DEFAULT_STUFFNAME.toString())))
            .andExpect(jsonPath("$.[*].gender").value(hasItem(DEFAULT_GENDER.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].idcard").value(hasItem(DEFAULT_IDCARD.toString())))
            .andExpect(jsonPath("$.[*].address").value(hasItem(DEFAULT_ADDRESS.toString())))
            .andExpect(jsonPath("$.[*].remark").value(hasItem(DEFAULT_REMARK.toString())))
            .andExpect(jsonPath("$.[*].dlt").value(hasItem(DEFAULT_DLT)))
            .andExpect(jsonPath("$.[*].create_user").value(hasItem(DEFAULT_CREATE_USER.toString())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())))
            .andExpect(jsonPath("$.[*].update_user").value(hasItem(DEFAULT_UPDATE_USER.toString())))
            .andExpect(jsonPath("$.[*].update_date").value(hasItem(DEFAULT_UPDATE_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getStuff() throws Exception {
        // Initialize the database
        stuffRepository.saveAndFlush(stuff);

        // Get the stuff
        restStuffMockMvc.perform(get("/api/stuffs/{id}", stuff.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(stuff.getId().intValue()))
            .andExpect(jsonPath("$.userId").value(DEFAULT_USER_ID.toString()))
            .andExpect(jsonPath("$.stuffname").value(DEFAULT_STUFFNAME.toString()))
            .andExpect(jsonPath("$.gender").value(DEFAULT_GENDER.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.idcard").value(DEFAULT_IDCARD.toString()))
            .andExpect(jsonPath("$.address").value(DEFAULT_ADDRESS.toString()))
            .andExpect(jsonPath("$.remark").value(DEFAULT_REMARK.toString()))
            .andExpect(jsonPath("$.dlt").value(DEFAULT_DLT))
            .andExpect(jsonPath("$.create_user").value(DEFAULT_CREATE_USER.toString()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()))
            .andExpect(jsonPath("$.update_user").value(DEFAULT_UPDATE_USER.toString()))
            .andExpect(jsonPath("$.update_date").value(DEFAULT_UPDATE_DATE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingStuff() throws Exception {
        // Get the stuff
        restStuffMockMvc.perform(get("/api/stuffs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateStuff() throws Exception {
        // Initialize the database
        stuffService.save(stuff);

        int databaseSizeBeforeUpdate = stuffRepository.findAll().size();

        // Update the stuff
        Stuff updatedStuff = stuffRepository.findById(stuff.getId()).get();
        // Disconnect from session so that the updates on updatedStuff are not directly saved in db
        em.detach(updatedStuff);
        updatedStuff
            .userId(UPDATED_USER_ID)
            .stuffname(UPDATED_STUFFNAME)
            .gender(UPDATED_GENDER)
            .phone(UPDATED_PHONE)
            .email(UPDATED_EMAIL)
            .idcard(UPDATED_IDCARD)
            .address(UPDATED_ADDRESS)
            .remark(UPDATED_REMARK)
            .dlt(UPDATED_DLT)
            .create_user(UPDATED_CREATE_USER)
            .createDate(UPDATED_CREATE_DATE)
            .update_user(UPDATED_UPDATE_USER)
            .update_date(UPDATED_UPDATE_DATE);

        restStuffMockMvc.perform(put("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedStuff)))
            .andExpect(status().isOk());

        // Validate the Stuff in the database
        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeUpdate);
        Stuff testStuff = stuffList.get(stuffList.size() - 1);
        assertThat(testStuff.getUserId()).isEqualTo(UPDATED_USER_ID);
        assertThat(testStuff.getStuffname()).isEqualTo(UPDATED_STUFFNAME);
        assertThat(testStuff.getGender()).isEqualTo(UPDATED_GENDER);
        assertThat(testStuff.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testStuff.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testStuff.getIdcard()).isEqualTo(UPDATED_IDCARD);
        assertThat(testStuff.getAddress()).isEqualTo(UPDATED_ADDRESS);
        assertThat(testStuff.getRemark()).isEqualTo(UPDATED_REMARK);
        assertThat(testStuff.getDlt()).isEqualTo(UPDATED_DLT);
        assertThat(testStuff.getCreate_user()).isEqualTo(UPDATED_CREATE_USER);
        assertThat(testStuff.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
        assertThat(testStuff.getUpdate_user()).isEqualTo(UPDATED_UPDATE_USER);
        assertThat(testStuff.getUpdate_date()).isEqualTo(UPDATED_UPDATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingStuff() throws Exception {
        int databaseSizeBeforeUpdate = stuffRepository.findAll().size();

        // Create the Stuff

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restStuffMockMvc.perform(put("/api/stuffs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(stuff)))
            .andExpect(status().isBadRequest());

        // Validate the Stuff in the database
        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteStuff() throws Exception {
        // Initialize the database
        stuffService.save(stuff);

        int databaseSizeBeforeDelete = stuffRepository.findAll().size();

        // Delete the stuff
        restStuffMockMvc.perform(delete("/api/stuffs/{id}", stuff.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Stuff> stuffList = stuffRepository.findAll();
        assertThat(stuffList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Stuff.class);
        Stuff stuff1 = new Stuff();
        stuff1.setId(1L);
        Stuff stuff2 = new Stuff();
        stuff2.setId(stuff1.getId());
        assertThat(stuff1).isEqualTo(stuff2);
        stuff2.setId(2L);
        assertThat(stuff1).isNotEqualTo(stuff2);
        stuff1.setId(null);
        assertThat(stuff1).isNotEqualTo(stuff2);
    }
}
