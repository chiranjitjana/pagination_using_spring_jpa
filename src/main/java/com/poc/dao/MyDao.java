package com.poc.dao;

import java.util.Map;

public interface MyDao {
	Object fetch(Map<String,String> searchMap);
	Integer getTotalNumberOfPages(Map<String,String> searchMap);
	Object fetchName();
	Object fetchMobile();
}
