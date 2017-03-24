$(document).ready(function () {
    ProductApp.init();
    ProductApp.load();
});

var regex_ids = /(\d+)(?!.*\d)/;

var ProductApp = {
    category: {},
    product: {},
    helper: {},
    validation: {}
};

// MARK: - Categories

ProductApp.category.list = function () {
    $.get("/SpringMvcFtlWlogic/api/category", function (data) {
        // if there is data and not empty
        if ((_embedded = data["_embedded"]) != null
                && (category = _embedded["category"]) != null
                && (category.length > 0)) {
            // arrays
            var categories = [];
            var categories_combo = [
                {
                    id: "0",
                    name: "Select --"
                }
            ];

            // list contents
            $.each(category, function (ix, c) {
                var link = c["_links"]["self"]["href"];
                categories.push({
                    id: ProductApp.helper.urlId(link),
                    name: c["name"]
                });
            });

            // table templates
            var categoriesTableTmpl = $.templates("#categoriesTableTmpl");
            html = categoriesTableTmpl.render(categories);
            $("#categories_table > tbody").html(html);
            // table actions
            $(".category_edit").click(ProductApp.category.edit);
            $(".category_delete").click(ProductApp.category.delete);

            // combo templates
            var categoryComboTmpl = $.templates("#categoryComboTmpl");
            categories_combo = categories_combo.concat(categories);
            html = categoryComboTmpl.render(categories_combo);
            $("#product_category").html(html);
        } else {
            // empty list
            ProductApp.category.empty();
        }
    });
};

ProductApp.category.empty = function () {
    var categoriesTableEmptyTmpl = $.templates("#categoriesTableEmptyTmpl");
    html = categoriesTableEmptyTmpl.render();
    $("#categories_table > tbody").html(html);
};

ProductApp.category.save = function () {
    var category_name = $('#category_name').val();
    var data = JSON.stringify({name: category_name});
    $.ajax({
        type: "POST",
        url: "/SpringMvcFtlWlogic/api/category",
        data: data,
        success: function (r) {
            console.log("success", r);
        },
        error: function (e) {
            console.log("error", e);
            ProductApp.category.clear();
            ProductApp.category.list();
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.category.update = function () {
    var category_id = $('#category_id').val();
    var category_name = $('#category_name').val();
    var data = JSON.stringify({
        name: category_name
    });
    $.ajax({
        type: "PUT",
        url: "/SpringMvcFtlWlogic/api/category/" + category_id,
        data: data,
        success: function (r) {
            console.log(r);
            ProductApp.category.clear();
            ProductApp.category.list();
        },
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.category.saveUpdate = function () {
    if ($('#category_form').valid()) {
        var category_id = $('#category_id').val();
        if (category_id.length != "") {
            ProductApp.category.update();
        } else {
            ProductApp.category.save();
        }
    }
};

ProductApp.category.edit = function () {
    var category_id = $(this).attr("id").replace("category_edit_", "");
    $("#category_id").val(category_id);
    $("#category_name").val($("#category_name_" + category_id).text());
};

ProductApp.category.delete = function () {
    var category_id = $(this).attr("id").replace("category_delete_", "");
    // TODO: add alert
    $.ajax({
        type: "DELETE",
        url: "/SpringMvcFtlWlogic/api/category/" + category_id,
        success: function (r) {
            console.log(r);
            ProductApp.category.clear();
            ProductApp.category.list();
        },
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.category.clear = function () {
    $('#category_form').trigger("reset");

    ProductApp.product.list();
    ProductApp.product.clear();
};

// MARK: - Products

ProductApp.product.list = function () {
    $.get("/SpringMvcFtlWlogic/api/product", function (data) {
        // if there is data and not empty
        if ((_embedded = data["_embedded"]) != null
                && (product = _embedded["product"]) != null
                && (product.length > 0)) {
            // array
            var products = [];

            // list contents
            $.each(product, function (ix, p) {
                //console.log(ix, c);
                var link = p["_links"]["self"]["href"];
                products.push({
                    id: ProductApp.helper.urlId(link),
                    name: p["name"],
                    description: p["description"],
                    category_url: p["_links"]["category"]["href"]
                });
            });

            // table templates
            var productsTableTmpl = $.templates("#productsTableTmpl");
            html = productsTableTmpl.render(products);
            $("#products_table > tbody").html(html);
            // table actions
            $(".product_edit").click(ProductApp.product.edit);
            $(".product_delete").click(ProductApp.product.delete);

            // resolve products' categories detail. (async)
            ProductApp.product.categoryDetail(products);
        } else {
            // empty list
            ProductApp.product.empty();
        }
    });
};

ProductApp.product.empty = function () {
    var productsTableEmptyTmpl = $.templates("#productsTableEmptyTmpl");
    html = productsTableEmptyTmpl.render();
    $("#products_table > tbody").html(html);
};

ProductApp.product.categoryDetail = function (products) {
    $.each(products, function (ix, p) {
        $.get(p.category_url, function (data) {
            var product_url = this.url.replace("/category", "");
            var product_id = ProductApp.helper.urlId(product_url);
            var link = data["_links"]["self"]["href"];
            category_id = ProductApp.helper.urlId(link);
            $("#product_category_" + product_id)
                    .attr("category_id", category_id).text(data["name"]);
        });
    });
};

ProductApp.product.save = function () {
    var product_name = $('#product_name').val();
    var product_description = $('#product_description').val();
    var product_category = $("#product_category").val();
    var data = JSON.stringify({
        name: product_name,
        description: product_description,
        category: "/SpringMvcFtlWlogic/api/category/" + product_category
    });
    $.ajax({
        type: "POST",
        url: "/SpringMvcFtlWlogic/api/product",
        data: data,
        success: function (r) {
            console.log("success", r);
        },
        error: function (e) {
            console.log("error", e);
            ProductApp.product.clear();
            ProductApp.product.list();
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.product.update = function () {
    var product_id = $('#product_id').val();
    var product_name = $('#product_name').val();
    var product_description = $('#product_description').val();
    var product_category = $("#product_category").val();
    var data = JSON.stringify({
        name: product_name,
        description: product_description,
        category: "/SpringMvcFtlWlogic/api/category/" + product_category
    });
    $.ajax({
        type: "PUT",
        url: "/SpringMvcFtlWlogic/api/product/" + product_id,
        data: data,
        success: function (r) {
            console.log(r);
            ProductApp.product.clear();
            ProductApp.product.list();
        },
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.product.saveUpdate = function () {
    if ($('#product_form').valid()) {
        var product_id = $('#product_id').val();
        if (product_id.length != "") {
            ProductApp.product.update();
        } else {
            ProductApp.product.save();
        }
    }
};

ProductApp.product.edit = function () {
    var product_id = $(this).attr("id").replace("product_edit_", "");
    $("#product_id").val(product_id);
    $("#product_name").val($("#product_name_" + product_id).text());
    $("#product_description").val($("#product_description_" + product_id).text());
    $("#product_category").val($("#product_category_" + product_id).attr("category_id"));
};

ProductApp.product.delete = function () {
    var product_id = $(this).attr("id").replace("product_delete_", "");
    // TODO: add alert
    $.ajax({
        type: "DELETE",
        url: "/SpringMvcFtlWlogic/api/product/" + product_id,
        success: function (r) {
            console.log(r);
            ProductApp.product.clear();
            ProductApp.product.list();
        },
        error: function (e) {
            console.log(e);
        },
        dataType: "json",
        contentType: "application/json"
    });
};

ProductApp.product.clear = function () {
    $('#product_form').trigger("reset");
};

// MARK: - Validations
ProductApp.validation.input = function () {
    // input validation
    $('#category_name').attr("maxlength", "15");
    $('#product_name').attr("maxlength", "15");
    $('#product_description').attr("maxlength", "45");
};

ProductApp.validation.categoryForm = function () {
    // form validation
    $("#category_form").validate({
        rules: {
            category_name: {
                minlength: 3,
                maxlength: 15,
                required: true
            }
        },
        highlight: function (element) {
            $(element).closest('fieldset').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('fieldset').removeClass('has-error');
        }
    }).form();
};

ProductApp.validation.productForm = function () {
    // rule for select category
    $.validator.addMethod("valueNotEquals", function (value, element, arg) {
        return arg != value;
    }, "Value must not equal arg.");

    // form validation
    $("#product_form").validate({
        rules: {
            product_name: {
                minlength: 3,
                maxlength: 15,
                required: true
            },
            product_description: {
                minlength: 0,
                maxlength: 45,
                required: false
            },
            product_category: {
                valueNotEquals: "0"
            }
        },
        messages: {
            product_category: {
                valueNotEquals: "Please, select one"
            }
        },
        highlight: function (element) {
            $(element).closest('fieldset').addClass('has-error');
        },
        unhighlight: function (element) {
            $(element).closest('fieldset').removeClass('has-error');
        }
    }).form();
};

// MARK: - Helper

ProductApp.helper.urlId = function (url) {
    var matches = regex_ids.exec(url);
    if (matches) {
        id = matches[0];
    }
    return id;
};

// MARK: - Inits

ProductApp.init = function () {
    ProductApp.validation.input();
    $("#category_submit").click(ProductApp.validation.categoryForm);
    $("#category_submit").click(ProductApp.category.saveUpdate);
    $("#product_submit").click(ProductApp.validation.productForm);
    $("#product_submit").click(ProductApp.product.saveUpdate);
};

ProductApp.load = function () {
    ProductApp.category.list();
    ProductApp.category.clear();
};
