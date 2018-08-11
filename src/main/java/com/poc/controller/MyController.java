package com.poc.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.poc.service.MyService;

@Controller
public class MyController {

	@Autowired
	MyService service;
	
	@RequestMapping(value="/fetch",method=RequestMethod.POST)
	public @ResponseBody Object fetchEntity(@RequestBody Map<String,String> searchMap) {
		return service.fetch(searchMap);
	}
	
	@RequestMapping(value="/fetchName",method=RequestMethod.GET)
	public @ResponseBody Object fetchName() {
		return service.fetchName();
	}
	
	@RequestMapping(value="/fetchMobile",method=RequestMethod.GET)
	public @ResponseBody Object fetchMobile() {
		return service.fetchMobile();
	}
}
