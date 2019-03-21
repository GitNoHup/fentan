package com.zhang.fentan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/import")
public class PreviewController {

    @RequestMapping("/preview")
    public String index() {
        return "common/preview";
    }

    @RequestMapping("/detail")
    public String detail() {
        return "common/detail";
    }

}
