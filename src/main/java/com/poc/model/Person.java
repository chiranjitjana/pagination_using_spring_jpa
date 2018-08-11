package com.poc.model;

import java.io.Serializable;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

/**
 * The persistent class for the person database table.
 * 
 */
@Entity
public class Person implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	private int personId;

	private String mobile;

	private String personName;

	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL,mappedBy="personId")
	private List<Address> addList;

	public Person() {
	}

	public int getPersonId() {
		return this.personId;
	}

	public void setPersonId(int personId) {
		this.personId = personId;
	}

	public String getMobile() {
		return this.mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getPersonName() {
		return this.personName;
	}

	public void setPersonName(String personName) {
		this.personName = personName;
	}

	public List<Address> getAddList() {
		return addList;
	}

	public void setAddList(List<Address> addList) {
		this.addList = addList;
	}

}