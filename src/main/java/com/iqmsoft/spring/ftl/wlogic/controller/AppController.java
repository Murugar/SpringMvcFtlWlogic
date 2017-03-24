package com.iqmsoft.spring.ftl.wlogic.controller;

import java.util.Date;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
@RequestMapping("/")
public class AppController {

    /**
     * view root application.
     *
     * @param model the spring model attributes map.
     * @return the index view
     */
    @RequestMapping(method = RequestMethod.GET)
    public String viewApplication(@ModelAttribute("model") ModelMap model) {
        model.addAttribute("thedate", new Date());
        return "index";
    }

}
