package com.poc.service;

import java.util.Map;

public interface MyService {
	Object fetch(Map<String,String> searchMap);
	Object fetchName();
	Object fetchMobile();
}
