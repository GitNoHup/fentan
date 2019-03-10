package com.zhang.fentan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "index")
public class IndexController {

    @RequestMapping(value = "welcome")
    public String index() {
        return "index";
    }
}
