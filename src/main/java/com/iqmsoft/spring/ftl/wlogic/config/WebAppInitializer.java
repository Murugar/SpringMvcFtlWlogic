package com.iqmsoft.spring.ftl.wlogic.config;

import java.nio.charset.StandardCharsets;
import javax.servlet.Filter;
import javax.servlet.ServletRegistration;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;


public class WebAppInitializer extends AbstractAnnotationConfigDispatcherServletInitializer {

    /**
     * customize servlet registration.
     * @param registration  the registration.
     */
    @Override
    protected void customizeRegistration(ServletRegistration.Dynamic registration) {
        registration.setInitParameter("dispatchOptionsRequest", "true");
        registration.setAsyncSupported(true);
    }

    /**
     * get the root config classes
     * @return the config classes
     */
    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class<?>[]{AppConfig.class};
    }

    /**
     * get servlet config classes
     * @return the config classes
     */
    @Override
    protected Class<?>[] getServletConfigClasses() {
        return new Class<?>[]{WebConfig.class};
    }

    /**
     * get servlet mappings
     * @return the mappings
     */
    @Override
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    /**
     * get servlet filters
     * @return the filters
     */
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
        characterEncodingFilter.setEncoding(StandardCharsets.UTF_8.name());
        return new Filter[]{characterEncodingFilter};
    }

}
