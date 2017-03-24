
<#macro page_head>
        <head>
        <title>FreeMarker Spring MVC Product Catalog</title>
        <link rel="stylesheet" href="/SpringMvcFtlWlogic/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/SpringMvcFtlWlogic/assets/css/bootstrap-responsive.min.css" />
        <link rel="stylesheet" href="/SpringMvcFtlWlogic/app/js/index.js" />
        </head>
 </#macro>

<#macro page>
<!DOCTYPE html>
<html lang="en">
    
    <head> 
      <@page_head/> 
    </head>
    <body>
        <div class="navbar navbar-danger navbar-fixed-top">
            <div class="navbar-inner">
                <div class="container">
                    <button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        </button>
                    <a class="brand" href="#">Products App</a>
                    <div class="nav-collapse collapse">
                        <ul class="nav">
                            <li class="active"><a href="#">Home</a></li>
                            <li><a href="#about">About</a></li>
                            <li><a href="#contact">Contact</a></li>
                            </ul>
                          </div><!--/.nav-collapse -->
                    </div>
                </div>
            </div>
        <div class="container">
            <p>&nbsp;</p>
            </div>
        <div class="container">
            <br/>
            <h2 class="text-info">FreeMarker Spring MVC Product Catalog</h2>
            </div>

        <#-- This processes the enclosed content:  -->
        <#nested>
        
        <footer class="footer">
            <div class="container">
                </div>
            </footer>
        <script src="/SpringMvcFtlWlogic/libs/js/jquery-1.11.3.min.js"></script>
        <script src="/SpringMvcFtlWlogic/libs/js/jquery.validate.min.js"></script>
        <script src="/SpringMvcFtlWlogic/libs/js/jsrender.min.js"></script>
        <script src="/SpringMvcFtlWlogic/app/js/index.js"></script>
        </body>
    </html>
</#macro>