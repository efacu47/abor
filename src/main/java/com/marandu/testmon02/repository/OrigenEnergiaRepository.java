package com.marandu.testmon02.repository;

import com.marandu.testmon02.domain.OrigenEnergia;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the OrigenEnergia entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OrigenEnergiaRepository extends JpaRepository<OrigenEnergia, Long> {

}
