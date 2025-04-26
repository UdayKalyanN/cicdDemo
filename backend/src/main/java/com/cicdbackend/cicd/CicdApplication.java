package com.cicdbackend.cicd;

import java.util.Collections;
import java.util.Map;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000", originPatterns = "http://localhost")
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
