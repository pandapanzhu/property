package com.property.test.repository;

import com.property.test.domain.PropertyMoney;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


/**
 * Spring Data  repository for the PropertyMoney entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PropertyMoneyRepository extends JpaRepository<PropertyMoney, Long> {

    Optional<PropertyMoney> findByUserId(String userId);

    List<PropertyMoney> findAllByUserId(String userId);

    Optional<PropertyMoney> findByUserIdAndYearAndMonth(String userId, int year, int monthValue);
}
