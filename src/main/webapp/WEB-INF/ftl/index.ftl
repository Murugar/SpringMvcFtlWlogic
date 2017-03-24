<#import "macros.ftl" as u>

<@u.page>

<div class="container">
    <h3 class="text-success">The date is: ${model.thedate?date} - ${model.thedate?time}</h3>
    </div>

<div class="container">
    <section id="categories">
        <div class="row">
            <div class="span6">

                 <h4 class="text-primary">Categories</h4>
                <table id="categories_table" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                    </table>
                <script id="categoriesTableTmpl" type="text/x-jsrender">
                    <tr>
                    <td>{{:id}}</td>
                    <td id="category_name_{{:id}}">{{:name}}</td>
                    <td>
                    <button id="category_edit_{{:id}}" class="category_edit btn">Edit</button>
                    <button id="category_delete_{{:id}}" class="category_delete btn btn-danger">Delete</button>
                    </td>
                    </tr>
                    </script>
                <script id="categoriesTableEmptyTmpl" type="text/x-jsrender">
                    <tr>
                    <td colspan="3">No categories.</td>
                    </tr>
                    </script>
                </div>
            </div>
        </section>

    <section id="category">
        <form id="category_form">
            <fieldset class="well">
                <label class="text-warning" >ID</label>
                <input type="text" id="category_id" class="input-small" readonly="readonly"/>
                <label class="text-warning" >Name</label>
                <input type="text" id="category_name" name="category_name" placeholder="CategoryName" data-required="true" />
                <div>
                    <button type="button" id="category_submit" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-info">Reset</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </div>
<div class="container">
    <section id="products">
    
    
        <div class="row">
            <div class="span10">
               <h4 class="text-primary">Products</h4>
               

                        <!-- TODO: Search products -->
                <table id="products_table" class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Action</th>
                            </tr>
                        </thead>
                    <tbody></tbody>
                    </table>
                <script id="productsTableTmpl" type="text/x-jsrender">
                    <tr>
                    <td>{{:id}}</td>
                    <td id="product_name_{{:id}}">{{:name}}</td>
                    <td id="product_description_{{:id}}">{{:description}}</td>
                    <td id="product_category_{{:id}}"></td>
                    <td>
                    <button id="product_edit_{{:id}}" class="product_edit btn">Edit</button>
                    <button id="product_delete_{{:id}}" class="product_delete btn btn-danger">Delete</button>
                    </td>
                    </tr>
                    </script>
                <script id="productsTableEmptyTmpl" type="text/x-jsrender">
                    <tr>
                    <td colspan="5">No products.</td>
                    </tr>
                    </script>
                </div>
            </div>
        </section>
    <section id="product">
        <form id="product_form">
            <fieldset class="well"> 
                
                <label class="text-warning">ID</label>
                <input type="text" id="product_id" class="input-small" readonly="readonly"/>
                <label class="text-warning">Name</label>
                <input type="text" id="product_name" name="product_name" placeholder="product name"/>
                <label class="text-warning">Description</label>
                <input type="text" id="product_description" name="product_description" placeholder="product descr" class="input-xxlarge"/>
                <label class="text-warning">Category</label>
                <select id="product_category" name="product_category"></select>
                <script id="categoryComboTmpl" type="text/x-jsrender">
                    <option value="{{:id}}">{{:name}}</option>
                    </script>
                <div>
                    <button type="button" id="product_submit" class="btn btn-primary">Save</button>
                    <button type="button" class="btn btn-info">Reset</button>
                    </div>
                </fieldset>
            </form>
        </section>
    </div>

</@u.page> 