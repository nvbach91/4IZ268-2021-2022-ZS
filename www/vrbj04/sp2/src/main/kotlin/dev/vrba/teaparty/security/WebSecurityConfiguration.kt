package dev.vrba.teaparty.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
class WebSecurityConfiguration(private val filter: TokenAuthenticationFilter) : WebSecurityConfigurerAdapter() {

    override fun configure(http: HttpSecurity) {
       http.cors().and()
           .csrf().disable()
           .authorizeRequests()
           .antMatchers("/api/authentication/**").permitAll()
           .antMatchers("/api/**").hasRole("PLAYER")
           .antMatchers("/websocket").permitAll()
           .anyRequest().permitAll().and()
           .addFilterBefore(filter, UsernamePasswordAuthenticationFilter::class.java)
           .formLogin().disable()
           .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    }

    override fun configure(auth: AuthenticationManagerBuilder) {
        auth.inMemoryAuthentication() // This will disable the built-in user account
    }

}