package dev.vrba.teaparty.security

import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class WebMvcConfiguration(@Value("\${cors.allowed-origins:http://localhost:3000}") origins: String) : WebMvcConfigurer {

    private val origins: Array<String> = origins.trim().split(",").toTypedArray()

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/api/**")
            .allowedOrigins(*origins)
            .allowedHeaders("*")
            .allowedMethods("*")
            .allowCredentials(false)
    }
}