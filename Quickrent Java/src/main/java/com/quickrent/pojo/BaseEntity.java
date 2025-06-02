package com.quickrent.pojo;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@MappedSuperclass // class level annotation to specify following is a base class from which other
// entities will inherit , no separate table !
@Getter
@Setter
@ToString
public class BaseEntity {
	@CreationTimestamp
	@Column(name="created_on")
	private LocalDateTime createdOn;
	@UpdateTimestamp
	@Column(name="updated_on")
	private LocalDateTime updatedOn;
}