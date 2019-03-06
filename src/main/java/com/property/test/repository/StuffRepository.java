package com.property.test.repository;

import com.property.test.domain.Stuff;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Stuff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StuffRepository extends JpaRepository<Stuff, Long> {

}
