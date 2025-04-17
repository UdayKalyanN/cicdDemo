package com.cicdbackend.cicd;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000")
public class CicdApplication {

	public static void main(String[] args) {
		SpringApplication.run(CicdApplication.class, args);
	}

	@GetMapping("/hello")
	public Map<String, String> hello() {
		return Collections.singletonMap("msg", "Hello from Spring Boot!");
	 }

	@PostMapping("/greet")
	public Map<String, String> greet(@RequestBody Map<String, String> payload) {
		String name = payload.getOrDefault("name", "stranger");
		String msg  = "Hello, " + name + "! Welcome to Spring Boot!";
		return Collections.singletonMap("message", msg);
	}

}
