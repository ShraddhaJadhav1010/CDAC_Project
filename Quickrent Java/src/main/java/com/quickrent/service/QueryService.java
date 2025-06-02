package com.quickrent.service;

import java.util.List;

import com.quickrent.dto.ContactQueryDTO;
import com.quickrent.pojo.Query;

public interface QueryService {

	void addQuery(ContactQueryDTO dto);

	List<Query> getAllQueries();

	void resolveQuery(int id);

}
