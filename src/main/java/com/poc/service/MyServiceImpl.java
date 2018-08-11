package com.poc.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.poc.dao.MyDao;
import com.poc.utils.Constant;
import com.poc.utils.SearchView;

@Service
public class MyServiceImpl implements MyService {

	@Autowired
	MyDao dao;

	public Object fetch(Map<String, String> searchMap) {
		// TODO Auto-generated method stub
		SearchView sv = new SearchView();

		if (Integer.parseInt(searchMap.get(Constant.GET_CURRENT_PAGE_NUMBER)) < 1) {
			sv.setMessage("Page Number Should be greater the 0");
			sv.setTotalPages(null);
			sv.setContent(null);

			return sv;
		}

		Object fetch = dao.fetch(searchMap);
		if (Integer.parseInt(searchMap.get(Constant.GET_CURRENT_PAGE_NUMBER)) == 1) {
			sv.setTotalPages(dao.getTotalNumberOfPages(searchMap));
			sv.setContent(fetch);
		} else {
			sv.setContent(fetch);
			sv.setTotalPages(null);
		}

		return sv;
	}

	public Object fetchName() {
		// TODO Auto-generated method stub
		return dao.fetchName();
	}

	public Object fetchMobile() {
		// TODO Auto-generated method stub
		return dao.fetchMobile();
	}

}
