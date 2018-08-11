package com.poc.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;


/**
 * The persistent class for the address database table.
 * 
 */
@Entity
public class Address implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int addId;

	@Lob
	private String address;

	private String addType;

	private String isActive;

	private int personId;

	
	
	public Address() {
	}

	public int getAddId() {
		return this.addId;
	}

	public void setAddId(int addId) {
		this.addId = addId;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getAddType() {
		return this.addType;
	}

	public void setAddType(String addType) {
		this.addType = addType;
	}

	public String getIsActive() {
		return this.isActive;
	}

	public void setIsActive(String isActive) {
		this.isActive = isActive;
	}

	public int getPersonId() {
		return this.personId;
	}

	public void setPersonId(int personId) {
		this.personId = personId;
	}


	

}