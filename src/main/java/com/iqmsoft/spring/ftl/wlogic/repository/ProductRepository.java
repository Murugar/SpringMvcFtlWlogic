package com.iqmsoft.spring.ftl.wlogic.repository;

import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.iqmsoft.spring.ftl.wlogic.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

@RepositoryRestResource(collectionResourceRel = "product", path = "product")
public interface ProductRepository extends JpaRepository<Product, Integer> {

}
