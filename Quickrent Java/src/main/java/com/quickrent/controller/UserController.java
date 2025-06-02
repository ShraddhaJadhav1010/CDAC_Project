package com.quickrent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.quickrent.dto.GetUserDetailsDto;
import com.quickrent.service.UserService;

@RestController
//@RequestMapping("api/product")
@CrossOrigin(origins = "*")
public class UserController {
	@Autowired
	UserService userService;
	
	@GetMapping("/api/user/{userid}")
	public ResponseEntity<?> getUserData(@PathVariable int userid){
		GetUserDetailsDto dto = userService.getUserData(userid);
		return ResponseEntity.ok(dto);
	}
	
}
