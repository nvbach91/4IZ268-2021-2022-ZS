package dev.vrba.teaparty.security

import dev.vrba.teaparty.repository.PlayersRepository
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Component
import org.springframework.web.filter.OncePerRequestFilter
import javax.servlet.FilterChain
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class TokenAuthenticationFilter(private val repository: PlayersRepository) : OncePerRequestFilter() {

    override fun doFilterInternal(request: HttpServletRequest, response: HttpServletResponse, chain: FilterChain) {
        request.getHeader("Authorization")?.let {
            val token = it.removePrefix("Bearer ")
            val player = repository.findByToken(token) ?: return@let

            val authorities = mutableListOf(SimpleGrantedAuthority("ROLE_PLAYER"))
            val authentication = UsernamePasswordAuthenticationToken(
                player,
                player.token,
                authorities
            )

            SecurityContextHolder.clearContext()
            SecurityContextHolder.getContext().authentication = authentication
        }

        return chain.doFilter(request, response)
    }
}