package com.poc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UIcontroller {

	@RequestMapping(value="/index")
	public String getIndex() {
		return "index";
	}
}
