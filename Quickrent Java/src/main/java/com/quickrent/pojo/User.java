package com.quickrent.pojo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
@Table(name = "users")
public class User extends BaseEntity implements UserDetails{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="user_id")
	private Integer usersid;

	@Enumerated(EnumType.STRING)
    @Column(name="user_role")
    private UserRole userRole;

    @Column(name="first_name",length = 100, nullable = false)
    private String firstname;

    @Column(name="last_name",length = 100, nullable = false)
    private String lastname;

    @Column(name="email",length = 100, unique = true, nullable = false)
    private String email;

    @Column(name="password",length = 255, nullable = false)
    private String password;

    @Column(name="phone_no",length = 15)
    private String phoneNo;

    @Column(name="is_verified",nullable = false)
    private Boolean isVerified;

    /*@Column(name="aadhar_card_no",length = 20)
    private String aadharCardNo;

    @Column(name="aadhar_card_file",length = 255)
    private String aadharCardFile;

    @Column(name="pan_card_no",length = 20)
    private String panCardNo;

    @Column(name="pan_card_file",length = 255)
    private String panCardFile; */

    @OneToMany(mappedBy="user")
    private List<Product> products = new ArrayList<>();
    
    @OneToMany(mappedBy="user")
    private List<Order> orders = new ArrayList<>();
    
    //@OneToMany(mappedBy="user")
	//private List<Conflict> conflicts = new ArrayList<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority(userRole.name()));
    }

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.email;
	}
}
