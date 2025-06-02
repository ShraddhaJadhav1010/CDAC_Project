package com.quickrent.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BaseDTO {
	//=> use this property only during serialization(skipped during de-serial)
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime createdOn;
	
	@JsonProperty(access = Access.READ_ONLY)
	private LocalDateTime updatedOn;
}

