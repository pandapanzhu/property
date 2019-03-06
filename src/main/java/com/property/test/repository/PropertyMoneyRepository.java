package com.property.test.repository;

import com.property.test.domain.PropertyMoney;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the PropertyMoney entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyMoneyRepository extends JpaRepository<PropertyMoney, Long> {

}
