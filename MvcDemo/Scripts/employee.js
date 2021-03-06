//Load Data in Table when documents is ready  
$(document).ready(function ()
{
    var sum = 0;
    $("#price").each(function () {
        sum += parseFloat($(this).text());
    });
    $("#gtot").html(sum)

	$("#drp").change(function () {
		
		$("#ad").empty();
		var nm = $("#drp :selected").text();
		$.ajax({

			type: "GET",
			url:"/Employee/GetName/",
			data: { name: nm },
			dataType: "json",
			success: function (data) {
				
				$.each(data, function (key, item) {

					$("#ad").val(item.address);
					$("#cid").val(item.cid);
				});

			},
		});
	});

	$("#drp2").change(function () {
		
		$("#rt").empty();
		var rt = $("#drp2 :selected").text();
		$.ajax({

			type: "POST",
			url: "/Employee/GetRate/",
			data: { cname: rt },
			dataType: "json",
			success: function (data) {
				
				$.each(data, function (key, item) {

					$("#rt").val(item.mrp);
					$("#pid").val(item.pid);
				});
			},
		});
	});
	$("#qty").change(function () {

		var qty = $("#qty").val();
		var rt = $("#rt").val();
		var tot = qty * rt;
		$("#tot").val(tot);
	});
	loadData();
});

	

//Load Data function 
function loadData() {
	
	$.ajax
	   ({
		url: "/Employee/ListAll",
		type: "GET",
		//data: JSON.stringify(setdata),//{ searchBy: searchBy, searchValue: searchValue },
		contentType: "application/json;",
		dataType: "json",
		success: function (result) {
			console.log(result);
			var html = '';
			$.each(result, function (key, item) {
				html += '<tr>';

				html += '<td>' + item.pname + '</td>';
				html += '<td>' + item.det.qty + '</td>';
				html += '<td>' + item.det.rate + '</td>';
				html += '<td id="price">' + item.det.total + '</td>';
			
				html += '<td><a href="#" onclick="return GetbyID(' + item.det.stid + ')">Edit</a> | <a href="#" onclick="return Delete(' + item.det.stid + ')">Delete</a></td>';
				html += '</tr>';
			});
			var sum = 0;
			$("#price").each(function () {
			    sum += parseInt($(this).text());

			});
			$("#gtot").html("<p>"+sum+"</p>");
			$('.tbody').html(html);

		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}

	   });
	//});
}

//Add Data Function   
function Add() {

	//$("#btnUpdate").hide();
	
	//var res = validate();
	//if (res == false) {
	//	return false;
    //}
    $("#myModalLabel").html("Add Product..");
	var pro =
	{

		pid: $('#pid').val(),
		rate: $('#rt').val(),
		qty: $('#qty').val(),
		total: $('#tot').val(),
		cid: $('#cid').val(),
	};
	$.ajax
	({
		url: "/Employee/InsertEmp",
		data: JSON.stringify(pro),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "text",
		success: function (result) {
		    alert(result);
		    window.location.href = "/Employee/Index";
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});
}

//Function for getting the Data Based upon Employee ID  
function GetbyID(ID) {
    $("#btnAdd").hide();
    $("#btnUpdate").show();
	$('#Name').css('border-color', 'lightgrey');
	$('#Age').css('border-color', 'lightgrey');
	$('#Country').css('border-color', 'lightgrey');
	$('#State').css('border-color', 'lightgrey');
	$('#City').css('border-color', 'lightgrey');
	var p = ID;
	$.ajax
	({
		url: "/Employee/GetbyID",
		type: "GET",
		data: { ID: p },
		contentType: "application/json;sscharset=UTF-8",
		dataType: "json",
		success: function (result) {
		    $('#myModal').modal('show');
		    $("#myModalLabel").html("Update Product");
		    var obj = JSON.parse(result);
		    console.log(obj);
		    var cname = String(obj.cust.cid);
		    var pron = String(obj.product.pid);
		    
		    var add = obj.cust.address;
		    var qty = obj.qty;
		    var rate = obj.rate;
		    var id = obj.stid;
		    var tot = obj.total;
		    $("#drp").val(cname);
		    $("#ad").val(add);
		    $("#drp2").val(pron);
		    $("#qty").val(qty);
		    $("#rt").val(rate);
		    $("#tot").val(tot);
		    $("#stid").val(id);
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});
	return false;
}

//function for updating employee's record  
function Update() {
    $("#btnAdd").hide();
    var pro =
	{
	    stid:$("#stid").val(),
	    pid: $('#pid').val(),
	    rate: $('#rt').val(),
	    qty: $('#qty').val(),
	    total: $('#tot').val(),
	    cid: $('#cid').val(),
	};
	$.ajax
	({
		url: "/Employee/Update",
		data: JSON.stringify(pro),
		type: "POST",
		contentType: "application/json;charset=utf-8",
		dataType: "json",
		success: function (result) {
			loadData();
			$('#myModal').modal('hide');
			$('#EmployeeId').val("");
			$('#Name').val("");
			$('#Age').val("");
			$('#profile_pic').data("src");
			$('#City').val("");
			$('#Country').val("");
			$('#State').val("");
			$('#btnUpdate').hide();
			$('#btnAdd').show();
		},
		error: function (errormessage) {
			alert(errormessage.responseText);
		}
	});
}

//function for deleting employee's record  
function Delete(ID) {
	var ans = confirm("Are you sure you want to delete this Record?");
	if (ans) {
		$.ajax
		({
			url: "/Employee/DeleteEmp/" + ID,
			type: "POST",
			contentType: "application/json;charset=UTF-8",
			dataType: "json",
			success: function (result) {
				loadData();
			},
			error: function (errormessage) {
				alert(errormessage.responseText);
			}
		});
	}
}

//Function for clearing the textboxes  
function clearTextBox() {
	$('#EmployeeId').val("");
	$('#Name').val("");
	$('#Age').val("");
	$('#City').val("");
	$('#Country').val("");
	$('#State').val("");
	$('#profile_pic').attr(' ');
	$('#btnUpdate').hide();
	$('#btnAdd').show();

	$('#Name').css('border-color', 'lightgrey');
	$('#Age').css('border-color', 'lightgrey');
	$('#Country').css('border-color', 'lightgrey');
	$('#State').css('border-color', 'lightgrey');
	$('#City').css('border-color', 'lightgrey');
}
//Valdidation using jquery  
function validate() {
	var isValid = true;
	if ($('#Name').val().trim() == "") {
		$('#Name').css('border-color', 'Red');
		isValid = false;
	}
	else {
		$('#Name').css('border-color', 'lightgrey');
	}
	if ($('#Age').val().trim() == "") {
		$('#Age').css('border-color', 'Red');
		isValid = false;
	}
	else {
		$('#Age').css('border-color', 'lightgrey');
	}
	if ($('#City').val().trim() == "") {
		$('#City').css('border-color', 'Red');
		isValid = false;
	}
	else {
		$('#City').css('border-color', 'lightgrey');
	}
	if ($('#Country').val().trim() == "") {
		$('#Country').css('border-color', 'Red');
		isValid = false;
	}
	else {
		$('#Country').css('border-color', 'lightgrey');
	}
	if ($('#State').val().trim() == "") {
		$('#State').css('border-color', 'Red');
		isValid = false;
	}
	else {
		$('#State').css('border-color', 'lightgrey');
	}

	return isValid;
}