<jsp:include page="header.jsp"></jsp:include>

<style>
.thead-dark {
	background-color: black;
	color: #fff;
}

.thead-dark tr th, tbody tr td {
	text-align: center;
}

.btn {
	margin-top: 5px;
	margin-left: 2px;
	margin-right: 2px;
}

.active {
	background-color: red !important;
	border-color: red !important;
}
</style>

<div class="container">
	<h3>Basic pagination</h3>
	<div class="row">
		<div class="form-group col-sm-6">
			<label for="sel1">Select Name:</label> <select class="form-control"
				id="personName">
			</select>
		</div>
		<div class="form-group col-sm-6">
			<label for="sel1">Select Mobile:</label> <select class="form-control"
				id="personMobile">

			</select>
		</div>
	</div>
	<div class="person_table">

	
		<table class="table table-bordered">
			<thead class="thead-dark">
				<tr>
					<th scope="col">Id</th>
					<th scope="col">Name</th>
					<th scope="col">Mobile</th>
				</tr>
			</thead>
			<tbody class="persontable_body">
				
			</tbody>
			<tfoot>
				<tr class="hide nodata"><td colspan="3"><h3 class="text-center">No Data Found</h3></td> </tr>	
			</tfoot>
		</table>
	</div>

	<div class="pagination_container"></div>
</div>

<jsp:include page="footer.jsp"></jsp:include>
<script>

	$(document).ready(function() {
		loadNameList("#personName");
		loadMobile("#personMobile");
		var data = {};
		getPersonData(1, data);
	});

	function loadNameList(personName) {
		var object = {};
		object.url = loadPersonName;
		object.methodtype = methodType.GET;
		object.data = null;
		object.datatype = datatype.json;
		object.container = personName;
		object.contenttype = contenttype.url_encoding;
		object.callbackFunction = loadNameListCallback;
		object.callbackFuntionParameter = null;
		AjaxHandler.makeAjaxCall(object)
	}

	function loadNameListCallback(response) {
		console.log(response);
		var select_tag = $(response.container);
		select_tag.empty();
		select_tag.append("<option value=''>--Select--</option>");
		$.each(response.data, function(index) {
			select_tag.append("<option value='" + response.data[index] + "'>" + response.data[index] + "</option>");
		});


	}


	$("#personName").on("change", function() {
		var data = {};
		if ($(this).val() != "") {
			data.personName = $(this).val();

			if ($("#personMobile").val() != "") {
				data.mobile = $("#personMobile").val();
			}

			getPersonData(1, data);
		} else {
			if ($("#personMobile").val() != "") {
				data.mobile = $("#personMobile").val();
			}


			getPersonData(1, data);

		}
	});

	
	
	$("#personMobile").on("change", function() {
		var data = {};
		if ($(this).val() != "") {
			data.mobile = $(this).val();

			if ($("#personName").val() != "") {
				data.personName = $("#personName").val();
			}

			getPersonData(1, data);
		} else {
			if ($("#personName").val() != "") {
				data.personName = $("#personName").val();
			}


			getPersonData(1, data);

		}
	});

	function loadMobile(personMobile) {
		var object = {};
		object.url = loadPersonMobile;
		object.methodtype = methodType.GET;
		object.data = null;
		object.datatype = datatype.json;
		object.container = personMobile;
		object.contenttype = contenttype.url_encoding;
		object.callbackFunction = loadMobileListCallback;
		object.callbackFuntionParameter = null;
		AjaxHandler.makeAjaxCall(object)
	}

	function loadMobileListCallback(response) {
		console.log(response);
		var select_tag = $(response.container);
		select_tag.empty();
		select_tag.append("<option value=''>--Select--</option>");
		$.each(response.data, function(index) {
			select_tag.append("<option value='" + response.data[index] + "'>" + response.data[index] + "</option>");
		});
	}

	function getPersonData(currentPage, data) {
		data.currentPageNo = currentPage;
		data.pageSize = "5";

		var object = {};
		object.url = baseUrlAdmin;
		object.methodtype = methodType.POST;
		object.data = JSON.stringify(data);
		object.datatype = datatype.json;
		object.container = null;
		object.contenttype = contenttype.application_json;
		object.callbackFunction = fetchList;
		object.callbackFuntionParameter = null;
		AjaxHandler.makeAjaxCall(object);

	}

	function fetchList(response) {
		console.log(response);
		if (response.data.content != null && response.data.content.length > 0) {
			$(".nodata").addClass("hide");
			
			var tbody = $(".person_table").find(".persontable_body");
			tbody.empty();

			var tr = [];
			$.each(response.data.content, function(index) {
				var tr_data = response.data.content[index];


				var tds = [];
				var td = $("<td></td>")
				td.html("<a>" + tr_data["personId"] + "</a>");
				tds.push(td)

				var td = $("<td></td>")
				td.html("<a>" + tr_data["personName"] + "</a>");
				tds.push(td)

				var td = $("<td></td>")
				td.html("<a>" + tr_data["mobile"] + "</a>");
				tds.push(td)


				var tr_html = $("<tr></tr>");
				tr_html.append(tds);

				tr.push(tr_html);

			});

			tbody.html(tr);

			if (response.data.totalPages != null) {
				paginationHandler.basicPaginationSetUp(".pagination_container", response.data.totalPages, 5, doAjaxCallToFetchNextSetOfDat);

			}
		}
		else
		{
			$(".pagination_container").empty();
			$(".person_table").find("table").find("tbody").empty();
			$(".nodata").removeClass("hide");
		}


	}

	function doAjaxCallToFetchNextSetOfDat(event) {
		$(event.target).addClass("active");
		$(event.target).siblings().removeClass("active");
		console.log($(event.target).text());
		var data = {};

		if ($("#personMobile").val() != "")
			data.mobile = $("#personMobile").val();

		if ($("#personName").val() != "")
			data.personName = $("#personName").val();

		getPersonData($(event.target).text(), data);

	}
</script>