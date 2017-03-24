package com.iqmsoft.spring.ftl.wlogic.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.iqmsoft.spring.ftl.wlogic.model.Category;

@RepositoryRestResource(collectionResourceRel = "category", path = "category")
public interface CategoryRepository//
        extends JpaRepository<Category, Integer> {
    
}
