package com.quickrent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.quickrent.dto.ContactQueryDTO;
import com.quickrent.service.QueryService;

@RestController
@CrossOrigin(origins = "*")
public class QueryController {
	@Autowired
	QueryService queryService;
	
	@PostMapping("api/query/add")
	public ResponseEntity<?> addQuery(@RequestBody ContactQueryDTO dto){
		queryService.addQuery(dto);
		return ResponseEntity.ok("Query Added Successfully");
	}
	
	@GetMapping("api/query/getall")
	public ResponseEntity<?> getAllQueries(){
		return ResponseEntity.ok(queryService.getAllQueries());
	}
	
	@PutMapping("api/query/resolve/{id}")
	public ResponseEntity<?> resolveQuery(int id){
		queryService.resolveQuery(id);
		return ResponseEntity.ok("Query resolved");
	}
}
