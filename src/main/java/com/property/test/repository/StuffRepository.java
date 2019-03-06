package com.property.test.repository;

import com.property.test.domain.Stuff;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.Optional;


/**
 * Spring Data  repository for the Stuff entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StuffRepository extends JpaRepository<Stuff, Long> {

    Optional<Stuff> findByEmail(String email);

    Optional<Stuff> findByUserId(String userId);
}
