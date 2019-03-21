package com.zhang.fentan.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value = "import")
public class PreviewController {

    @RequestMapping(value = "preview")
    public String index() {
        return "/common/preview";
    }

    @RequestMapping(value = "detail")
    public String detail() {
        return "/common/detail";
    }

}
