package com.poc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.poc.model.Person;

public interface PersonRepo extends CrudRepository<Person, Integer>{
	
	@Query("select DISTINCT(p.personName) from Person p")
	List<Person> fetchDistinctPersonName();
	
	@Query("select DISTINCT(p.mobile) from Person p")
	List<Person> fetchDistinctPersonMobile();
}
