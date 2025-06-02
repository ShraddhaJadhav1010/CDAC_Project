package com.quickrent.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import com.quickrent.dao.QueryDao;
import com.quickrent.dto.ContactQueryDTO;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class QueryServiceImpl implements QueryService {
	@Autowired
	QueryDao dao;
	
	@Autowired
	ModelMapper mapper;

	@Override
	public void addQuery(ContactQueryDTO dto) {
		// TODO Auto-generated method stub
		com.quickrent.pojo.Query query = mapper.map(dto, com.quickrent.pojo.Query.class);
		dao.save(query);
	}

	@Override
	public List<com.quickrent.pojo.Query> getAllQueries() {
		// TODO Auto-generated method stub
		List<com.quickrent.pojo.Query> queries = dao.findAll();
		return queries;
	}

	@Override
	public void resolveQuery(int id) {
		// TODO Auto-generated method stub
		dao.resolveQuery(id);
	}

}
