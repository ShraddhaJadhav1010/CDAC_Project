package com.quickrent.service;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.quickrent.dao.UserDao;
import com.quickrent.dto.GetUserDetailsDto;
import com.quickrent.pojo.User;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	@Autowired
	UserDao dao;
	@Autowired
	ModelMapper mapper;

	@Override
	public GetUserDetailsDto getUserData(int userid) {
		// TODO Auto-generated method stub
		User user = dao.findById(userid).orElseThrow();
		GetUserDetailsDto dto = mapper.map(user, GetUserDetailsDto.class);
		return dto;
	}

}
