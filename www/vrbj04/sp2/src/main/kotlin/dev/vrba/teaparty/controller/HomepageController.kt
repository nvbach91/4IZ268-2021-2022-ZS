package dev.vrba.teaparty.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.GetMapping

@Controller
class HomepageController {
    @GetMapping("/")
    fun index() = "index"
}