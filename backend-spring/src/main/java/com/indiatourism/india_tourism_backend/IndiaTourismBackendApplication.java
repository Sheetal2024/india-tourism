package com.indiatourism.india_tourism_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan(basePackages = "com.indiatourism")
public class IndiaTourismBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(IndiaTourismBackendApplication.class, args);
        System.out.println("🚀 India Tourism Backend Started Successfully!");
        System.out.println("📍 API Documentation: http://localhost:8080/api/health");
        System.out.println("🌐 Frontend URL: http://localhost:3000");
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**")
                        .allowedOrigins("http://localhost:3000")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .allowCredentials(true);
            }
        };
    }
}