package com.property.test.repository;

import com.property.test.domain.PropertyServe;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PropertyServe entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyServeRepository extends JpaRepository<PropertyServe, Long> {

}
