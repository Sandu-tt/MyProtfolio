document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("homePage").style.display = 'inline-block';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("home").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'block';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("items").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'none';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'block';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("customer").addEventListener("click", function () {
    document.getElementById("homePage").style.display = "none";
    document.getElementById("customerPage").style.display = 'block';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'none';
});

document.getElementById("orders").addEventListener("click", function () {
    document.getElementById("homePage").style.display = 'none';
    document.getElementById("customerPage").style.display = 'none';
    document.getElementById("itemPage").style.display = 'none';
    document.getElementById("orderPage").style.display = 'block';
    loadCustomerDetails();
    loadItemDetails();
});


/*---------------------------customer section--------------------------------------------------------------*/
let cusDB = [];

//save customer
/*add customer to table*/
/*bind event to save customer*/
$("#btnSaveCustomer").click(function () {

    /*get customer details from input fields*/
    let name = $("#customerName").val();
    let address = $("#addressCus").val();
    let nic = $("#nicCus").val();
    let tel = $("#tpNo").val();

    /*create new row*/
    //let tRow = "<tr>" + "<td>" + name + "</td>"
    // + "<td>" + address + "</td>" + "<td>" + nic + "</td>"
    // + "<td>" + tel + "</td>" + "</tr>";

    /*append to tbody*/
    // $("#tblCustomer").append(tRow);

    /*-----------------------------------------------*/
    /*using array*/
    //let cusArray = [name, address, nic, tel];
    //customer object
    /*let row = `<tr>
        <td>${cusArray[0]}</td>
        <td>${cusArray[1]}</td>
        <td>${cusArray[2]}</td>
        <td>${cusArray[3]}</td>
        </tr>`;

    $("#tblCustomer").append(row);*/

    if (searchCustomer(nic)) {
        alert("Customer already exists !")
    } else {
        let customer = {
            cusName: name,
            cusAddress: address,
            cusNic: nic,
            cusTele: tel
        }

        cusDB.push(customer);

        getAllCustomer();
        clearTextField();
    }

});


/*get all customers*/
$("#btnGetAllCustomers").click(function () {
    getAllCustomer();
});


function getAllCustomer() {
    //clear table data
    $("#tblCustomer").empty();

    for (let i = 0; i < cusDB.length; i++) {
        let name = cusDB[i].cusName;
        let address = cusDB[i].cusAddress;
        let nic = cusDB[i].cusNic;
        let tel = cusDB[i].cusTele;

        let row = `<tr>
        <td>${name}</td>
        <td>${address}</td>
        <td>${nic}</td>
        <td>${tel}</td>
        </tr>`;

        $("#tblCustomer").append(row);

        /*invoke every time when new customer add to table*/
        bindEventtoCustomer();
    }
}


// load customer details to place order form
/*set customer name to combo box*/
function loadCustomerDetails() {

    //clear combo box
    $("#cusId").empty();

    for (let i = 0; i < cusDB.length; i++) {
        let name = cusDB[i].cusName;
        $("#cusId").append(`<option>${name}</option>`);
    }
}


/*set customer detail when combo box click*/
$("#cusId").click(function () {

    let cusName = $("#cusId").val();

    for (let i = 0; i < cusDB.length; i++) {
        if (cusName === cusDB[i].cusName) {
            let address = cusDB[i].cusAddress;
            let nic = cusDB[i].cusNic;
            let tel = cusDB[i].cusTele;

            //set values
            $("#nic").val(nic);
            $("#cusName").val(cusName);
            $("#address").val(address);
            $("#cusContact").val(tel);
        }
    }
});


/*bind events to table*/
function bindEventtoCustomer() {
    /*get customer detail from table*/
    $("#tblCustomer>tr").click(function () {

        let col1 = $(this).children().eq(0).text();
        let col2 = $(this).children().eq(1).text();
        let col3 = $(this).children().eq(2).text();
        let col4 = $(this).children().eq(3).text();

        /*set values to input fields*/
        $("#customerName").val(col1);
        $("#addressCus").val(col2);
        $("#nicCus").val(col3);
        $("#tpNo").val(col4);

    });
}


/*delete customer*/
$("#btnDeleteCustomer").click(function () {
    let cusName = $("#customerName").val();
    deleteCustomer(cusName);
    getAllCustomer();
    clearTextField();
});


function deleteCustomer(id) {
    for (let i = 0; i < cusDB.length; i++) {
        if (cusDB[i].cusName === id) {
            cusDB.splice(i, 1);
        }
    }
}


/*update customer*/
$("#btnUpdateCustomer").click(function () {

    let name = $("#customerName").val();
    let address = $("#addressCus").val();
    let nic = $("#nicCus").val();
    let tel = $("#tpNo").val();

    deleteCustomer(name);

    let customer = {
        cusName: name,
        cusAddress: address,
        cusNic: nic,
        cusTele: tel
    }

    cusDB.push(customer);

    getAllCustomer();
    clearTextField();

});


/*clear text fields and focus on first text field*/
function clearTextField() {
    $("#customerName").val("");
    $("#addressCus").val("");
    $("#nicCus").val("");
    $("#tpNo").val("");

    $("#customerName").focus();
}


/*search customer*/
function searchCustomer(id) {
    return cusDB.find(function (customer) {
        //if the search id match with customer record
        //then return that object
        return customer.cusNic === id;
    });
}


/*disable press tab*/
$("#customerName,#addressCus,#nicCus,#tpNo").keydown(function (e) {
    if (e.key==="Tab") {
        e.preventDefault();
    }
});


/*move with enter*/
$("#customerName").keydown(function (e) {
    if(e.key==="Enter"){
        $("#addressCus").focus();
    }
});

$("#addressCus").keydown(function (e) {
    if(e.key==="Enter"){
        $("#nicCus").focus();
    }
});

$("#nicCus").keydown(function (e) {
    if(e.key==="Enter"){
        $("#tpNo").focus();
    }
});

$("#tpNo").keydown(function (e) {
    if(e.key==="Enter"){
        $("#btnSaveCustomer").focus();
    }
});




/*--------------------------------------------- item section----------------------------------------------------------*/

let itemDB = [];

/*add item to table*/
$("#btnSaveItem").click(function () {

    /*get item details from input fields*/
    let code = $("#itemCode1").val();
    let name = $("#itemName1").val();
    let price = $("#price").val();
    let qty = $("#qty").val();

    let itemObj = {
        itemCode: code,
        itemName: name,
        itemPrice: price,
        itemQty: qty
    }

    itemDB.push(itemObj);

    getAllItems();

});


//load item details to place order form
/*set item code to combo box*/
function loadItemDetails() {

    //clear combo box
    $("#itemCode").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].itemCode;
        $("#itemCode").append(`<option>${code}</option>`);
    }
}


/*set item detail when combo box click*/
$("#itemCode").click(function () {

    let itemCode = $("#itemCode").val();

    for (let i = 0; i < itemDB.length; i++) {
        if (itemCode === itemDB[i].itemCode) {
            let name = itemDB[i].itemName;
            let price = itemDB[i].itemPrice;
            let qty = itemDB[i].itemQty;

            //set values
            $("#itemCode").val(itemCode);
            $("#itemName").val(name);
            $("#unitPrice").val(price);
            $("#qtyOnHand").val(qty);
        }
    }
});


function getAllItems() {
    $("#tblItem").empty();

    for (let i = 0; i < itemDB.length; i++) {
        let code = itemDB[i].itemCode;
        let name = itemDB[i].itemName;
        let price = itemDB[i].itemPrice;
        let qty = itemDB[i].itemQty;

        /*create new row*/
        let tRow = ` <tr>
        <td>${code}</td>
        <td>${name}</td>
        <td>${price}</td>
        <td>${qty}</td>
        </tr>`;

        $("#tblItem").append(tRow);

        bindEventToItem();

    }
}


/*add event to getAll Items Btn*/
$("#btnGetAllItems").click(function () {
    getAllItems();
});


/*bind events to table*/
function bindEventToItem() {
    /*get customer detail from table*/
    $("#tblItem>tr").click(function () {

        let col1 = $(this).children().eq(0).text();
        let col2 = $(this).children().eq(1).text();
        let col3 = $(this).children().eq(2).text();
        let col4 = $(this).children().eq(3).text();

        /*set values to input fields*/
        $("#itemCode1").val(col1);
        $("#itemName1").val(col2);
        $("#price").val(col3);
        $("#qty").val(col4);

    });
}



