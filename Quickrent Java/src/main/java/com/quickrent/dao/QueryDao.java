package com.quickrent.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.quickrent.pojo.Query;

@Repository
public interface QueryDao extends JpaRepository<Query, Integer> {
	@Modifying
	@org.springframework.data.jpa.repository.Query("UPDATE Query q SET q.isResolved = true WHERE q.queryId = :id")
	int resolveQuery(@Param("id") Integer id);

}
