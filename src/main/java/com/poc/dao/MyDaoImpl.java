package com.poc.dao;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.poc.model.Person;
import com.poc.repository.PersonRepo;
import com.poc.utils.Constant;

@Repository
public class MyDaoImpl implements MyDao {

	@PersistenceContext(unitName = "pocUnit")
	EntityManager em;
	
	@Autowired
	PersonRepo personRepo;

	public Object fetch(Map<String, String> searchMap) {
		// TODO Auto-generated method stub
		TypedQuery<Person> query = em.createQuery(createCriteriaQuery(searchMap));

		query.setFirstResult((Integer.parseInt(searchMap.get(Constant.GET_CURRENT_PAGE_NUMBER)) - 1)
				* Integer.parseInt(searchMap.get(Constant.GET_PAGE_SIZE)));

		query.setMaxResults(Integer.parseInt(searchMap.get(Constant.GET_PAGE_SIZE)));

		List<Person> resultList = query.getResultList();
		return resultList;
	}

	public CriteriaQuery<Person> createCriteriaQuery(Map<String, String> searchMap) {
		CriteriaBuilder cb = em.getCriteriaBuilder();
		CriteriaQuery<Person> cq = cb.createQuery(Person.class);
		Root<Person> person = cq.from(Person.class);
		cq.distinct(true);

		ArrayList<Predicate> predicates = new ArrayList<Predicate>();

		if (searchMap.get(Constant.PERSON_NAME) != null && !Constant.isEmpty(searchMap.get(Constant.PERSON_NAME))) {
			predicates.add(cb.equal(person.<String>get(Constant.PERSON_NAME), searchMap.get(Constant.PERSON_NAME)));
		}

		if (searchMap.get(Constant.PERSON_MOBILE) != null && !Constant.isEmpty(searchMap.get(Constant.PERSON_MOBILE))) {
			predicates.add(cb.equal(person.<String>get(Constant.PERSON_MOBILE), searchMap.get(Constant.PERSON_MOBILE)));
		}

		if (predicates.isEmpty()) {
			cq.select(person);
		} else {

			if (predicates.size() == 1) {
				cq.where(cb.and(predicates.get(0)));
			} else {
				cq.where(cb.and(predicates.toArray(new Predicate[predicates.size()])));
			}
		}

		/*
		 * Query createQuery = em.
		 * createQuery("SELECT DISTINCT c FROM Person c JOIN FETCH c.addList as p where (p.addType = 'H' OR p.addType = 'O') and p.isActive='Y'"
		 * ); List<Object> resultList = createQuery.getResultList();
		 */
		return cq;
	}

	public Integer getTotalNumberOfPages(Map<String, String> searchMap) {
		
		TypedQuery<Person> query = em.createQuery(createCriteriaQuery(searchMap));
		float totalNumberResultSet = query.getResultList().size();
		return (int) Math.ceil(totalNumberResultSet/(Float.parseFloat(searchMap.get(Constant.GET_PAGE_SIZE))));

	}

	public Object fetchName() {
		// TODO Auto-generated method stub
		return personRepo.fetchDistinctPersonName();
	}

	public Object fetchMobile() {
		// TODO Auto-generated method stub
		return personRepo.fetchDistinctPersonMobile();
	}

}
