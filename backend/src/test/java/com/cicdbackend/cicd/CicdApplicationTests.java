package com.cicdbackend.cicd;

import static org.assertj.core.api.Assertions.*;

import java.util.HashMap;
import java.util.Map;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class CicdApplicationTests {

	@LocalServerPort
	private int port;

	@Autowired
	private TestRestTemplate restTemplate;

	private final ParameterizedTypeReference<Map<String, String>> responseType = 
		new ParameterizedTypeReference<Map<String, String>>() {};

	@Test
	void contextLoads() {
		// Verify Spring Application Context loads successfully
	}

	@Test
	void helloEndpointShouldReturnExpectedMessage() {
		// Given
		String url = "http://localhost:" + port + "/hello";

		// When
		ResponseEntity<Map<String, String>> response = restTemplate.exchange(url, HttpMethod.GET, null, responseType);

		// Then
		assertThat(response.getStatusCode().value()).isEqualTo(200);
		assertThat(response.getBody()).containsEntry("msg", "Hello from Spring Boot!");
	}

	@Test
	void greetEndpointShouldReturnPersonalizedMessageWithName() {
		// Given
		String url = "http://localhost:" + port + "/greet";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		Map<String, String> requestBody = new HashMap<>();
		requestBody.put("name", "John");
		HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

		// When
		ResponseEntity<Map<String, String>> response = restTemplate.exchange(url, HttpMethod.POST, request, responseType);

		// Then
		assertThat(response.getStatusCode().value()).isEqualTo(200);
		assertThat(response.getBody()).containsEntry("message", "Hello, John! Welcome to Spring Boot!");
	}

	@Test
	void greetEndpointShouldHandleEmptyName() {
		// Given
		String url = "http://localhost:" + port + "/greet";
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.APPLICATION_JSON);
		Map<String, String> requestBody = new HashMap<>();
		HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

		// When
		ResponseEntity<Map<String, String>> response = restTemplate.exchange(url, HttpMethod.POST, request, responseType);

		// Then
		assertThat(response.getStatusCode().value()).isEqualTo(200);
		assertThat(response.getBody()).containsEntry("message", "Hello, stranger! Welcome to Spring Boot!");
	}

	@Test
	void corsConfigurationShouldBePresent() {
		// Given
		String url = "http://localhost:" + port + "/hello";
		HttpHeaders headers = new HttpHeaders();
		headers.add("Origin", "http://localhost:3000");
		HttpEntity<String> request = new HttpEntity<>(null, headers);

		// When
		ResponseEntity<Map<String, String>> response = restTemplate.exchange(url, HttpMethod.GET, request, responseType);

		// Then
		assertThat(response.getHeaders().getAccessControlAllowOrigin())
			.isEqualTo("http://localhost:3000");
	}
}
