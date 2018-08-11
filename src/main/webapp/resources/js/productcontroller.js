function ProductController() {

}

/** ******** CATEGORY ********** */
ProductController.fetchCategory = function() {
	var fetchAllcategory = adminPanelButtonAction.fecthAllCat;
	var object = {};
	object.url = fetchAllcategory;
	object.methodtype = methodType.GET;
	object.data = null;
	object.container = null;
	object.contenttype = contenttype.url_encoding;
	object.callbackFunction = ProductController.listCategory;
	object.callbackFuntionParameter = null;
	AjaxHandler.makeAjaxCall(object)

}

ProductController.listCategory = function(responseData) {
	var options = "<option value='-1'>Select</option>";
	for (var i = 0; i < responseData.data.length; i++) {
		var catName = responseData.data[i].catName;
		var catId = responseData.data[i].catId;
		options += "<option value=" + catId + ">" + catName + "</option>";
	}
	$(".productform #catId").empty();
	$(".productform #catId").append(options);
}

/** ******** Brand ********** */

ProductController.fetchBrand = function() {
	var fetchAllBrand = adminPanelButtonAction.fecthAllBrands;
	var object = {};
	object.url = fetchAllBrand;
	object.methodtype = methodType.GET;
	object.data = null;
	object.container = null;
	object.contenttype = contenttype.url_encoding;
	object.callbackFunction = ProductController.listBrand;
	object.callbackFuntionParameter = null;
	AjaxHandler.makeAjaxCall(object)

}

ProductController.listBrand = function(responseData) {
	var options = "<option value='-1'>Select</option>";
	for (var i = 0; i < responseData.data.length; i++) {
		var brandName = responseData.data[i].brandName;
		var brandId = responseData.data[i].brandId;
		options += "<option value=" + brandId + ">" + brandName + "</option>";
	}
	$(".productform #brandId").empty();
	$(".productform #brandId").append(options);
}

/** ******** Color ********** */

ProductController.fetchColor = function() {
	var fetchAllColor = adminPanelButtonAction.fecthAllColors;
	var object = {};
	object.url = fetchAllColor;
	object.methodtype = methodType.GET;
	object.data = null;
	object.container = null;
	object.contenttype = contenttype.url_encoding;
	object.callbackFunction = ProductController.listColor;
	object.callbackFuntionParameter = null;
	AjaxHandler.makeAjaxCall(object)

}

ProductController.listColor = function(responseData) {
	var options = "<option value='-1'>Select</option>";
	for (var i = 0; i < responseData.data.length; i++) {
		var colorName = responseData.data[i].colorName;
		var colorId = responseData.data[i].colorId;
		var colorCode = responseData.data[i].colorCode;
		options += "<option value=" + colorId + " style='background-color:#"
				+ colorCode + "' >" + colorName + "</option>";
	}
	$(".productform #colorId").empty();
	$(".productform #colorId").append(options);
}

/** ******** Occasion ********** */

ProductController.fetchOccasion = function() {
	var fetchAllOccasion = adminPanelButtonAction.fecthAllOccasion;
	var object = {};
	object.url = fetchAllOccasion;
	object.methodtype = methodType.GET;
	object.data = null;
	object.container = null;
	object.contenttype = contenttype.url_encoding;
	object.callbackFunction = ProductController.listOccasion;
	object.callbackFuntionParameter = null;
	AjaxHandler.makeAjaxCall(object)

}

ProductController.listOccasion = function(responseData) {
	var options = "<option value='-1'>Select</option>";
	for (var i = 0; i < responseData.data.length; i++) {
		var occasionName = responseData.data[i].occasionName;
		var occasionId = responseData.data[i].occasionId;
		options += "<option value=" + occasionId + ">" + occasionName
				+ "</option>";
	}
	$(".productform #occasionId").empty();
	$(".productform #occasionId").append(options);
}

ProductController.refresh = function() {
	ProductController.fetchCategory();
	ProductController.fetchBrand();
	ProductController.fetchColor();
	ProductController.fetchOccasion();
}

/******************Delete A product*****************/



ProductController.deleteProduct=function(productId)
{
	var id=$('#deleteProduct .productId').val();
	var product={"productId":id}
	var requestObject = {};
	requestObject.container = "deleteProduct";
	requestObject.data =product ;
	ServiceController.deleteProduct(requestObject);

}


ProductController.deleteProductCallBack=function(responseData)
{
	ProductController.loadProductList.getInstance().ajax.reload();
	UIutiles.handleReponse(responseData);

}











/** *************** CREATE PRODUCT************** */
ProductController.create = function() {

	var required = false;
	if ($(".products .createProduct").text() === "Create Product") {
		required = true;
	}

	if (ProductController.Validate(required)) {
		$(".productform .message").attr("style", true);
		$(".productform .message").addClass("hide");
		$(".productform .message").removeClass("alert-danger");
		var data = ProductController.createData();

		var form = $("#productform")[0];
		var dataToSend = new FormData(form);
		dataToSend.append("data", data);

		var requestObject = {};
		requestObject.container = "productform";
		requestObject.data = dataToSend;

		ServiceController.addProduct(requestObject);
	} else {
		$(".productform .message").attr("style", false);
		$(".productform .message").removeClass("hide");
		$(".productform .message").addClass("alert-danger");
		$(".productform .message .text").text("Provide all the fields details");
		$('#productCreate').animate({
			scrollTop : 0
		}, 'slow');
	}
}

ProductController.addProductCallBack = function(responseData) {
	ProductController.loadProductList.getInstance().ajax.reload();
	UIutiles.handleReponse(responseData);
	$('#productCreate').animate({
		scrollTop : 0
	}, 'slow');
	
	setTimeout(function() { $('#productCreate').modal('hide'); }, 3000);
}

ProductController.createData = function() {
	var data = {};
	data.product = ProductController.fetchProduct();

	
	
	
	
	
	
	if ($(".productform #male").is(":checked"))
		data.productDetailsMale = ProductController.fetchMaleAttr();
	else
		data.productDetailFemaleAttr = ProductController.fetchFeMaleAttr();
	var ret = JSON.stringify(data);
	return ret;

}

ProductController.fetchMaleAttr = function() {
	var male = {};
	if (!new RegExp(UIutiles.getRegex("emptystring")).test($(".productform .attrId").val())) {
		male.attrId = $(".productform .attrId").val();
	}
	male.topSize = $(".productform .topSize").val();
	male.bottomSize = $(".productform .bottomSize").val();
	return male;
}

ProductController.fetchFeMaleAttr = function() {
	var female = {};
	
	if (!new RegExp(UIutiles.getRegex("emptystring")).test($(".productform .attrId").val())) {
		female.attrId = $(".productform .attrId").val();
	}
	female.size = $(".productform .size").val();
	female.bust = $(".productform .bust").val();
	female.waist = $(".productform .waist").val();
	female.hip = $(".productform .hip").val();
	female.height = $(".productform .height").val();

	return female;
}

ProductController.fetchProduct = function() {
	var product = {};
	var brand = {};
	brand.brandId = $(".productform .brandId").val();

	var category = {};
	category.catId = $(".productform .catId").val();

	var occasion = {};
	occasion.occasionId = $(".productform .occasionId").val();

	var color = {};
	color.colorId = $(".productform .colorId").val();

	product.brand = brand;
	product.category = category;
	product.color = color;
	product.occasion = occasion;
	product.availableInstock = 1;

	if (!new RegExp(UIutiles.getRegex("emptystring")).test($(
			".productform .productId").val())) {
		product.productId = $(".productform .productId").val();
	}



	product.productDetails = ProductController.fetchProductDtls();

	return product;
}

ProductController.fetchProductDtls = function() {
	var productDetails = {};
	productDetails.productTitle = $(".productform .productTitle").val();
	productDetails.productDescription = $(".productform .productDescription")
			.val();
	productDetails.customFitting = $(".productform .customFitting").val();
	if ($(".productform #female").is(":checked"))
		productDetails.gender = "F";
	if ($(".productform #male").is(":checked"))
		productDetails.gender = "M";
	productDetails.rentPrice = $(".productform .rentPrice").val();
	productDetails.depositePercentage = $(".productform .depositePercentage")
			.val();

	if ($(".productform #duration4").is(":checked"))
		productDetails.duration4 = "Y";
	else
		productDetails.duration4 = "N";

	if ($(".productform #duration6").is(":checked"))
		productDetails.duration6 = "Y";
	else
		productDetails.duration6 = "N";

	if ($(".productform #duration8").is(":checked"))
		productDetails.duration8 = "Y";
	else
		productDetails.duration8 = "N";
	
	if (!new RegExp(UIutiles.getRegex("emptystring")).test($(
	".productform .productDetailsId").val())) {
		productDetails.productDetailsId = $(".productform .productDetailsId").val();
	}

	return productDetails;
}

/** * Dirty validation done*** */

ProductController.Validate = function(required) {
	var rturn = true;

	rturn = ProductController.CustomValidatorLogic($("#productform"), required);

	if ($("#productform").find("input:checkbox[name=duration]:checked").length == 0) {
		$(".duration").addClass("error");
		ret = false;
	} else {
		$(".duration").removeClass("error");
	}

	if ($("#productform").find("input:radio[name=gender]:checked").length == 0) {
		$(".gendertype").addClass("error");
		ret = false;
	} else {
		$(".gendertype").removeClass("error");
	}

	// female attribute
	if ($("#female").is(":checked")) {

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform  .size").val())) {
			$(".productform .size").addClass("error");
			rturn = false;
		} else {
			$(".productform  .size").removeClass("error");

		}
		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .bust").val())) {
			$(".productform .bust").addClass("error");
			rturn = false;
		} else {
			$(".productform  .bust").removeClass("error");
		}
		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform  .waist").val())) {
			$(".productform .waist").addClass("error");
			rturn = false;
		} else {
			$(".productform  .waist").removeClass("error");
		}

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .hip").val())) {
			$(".productform .hip").addClass("error");
			rturn = false;
		} else {
			$(".productform  .hip").removeClass("error");
		}
		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform  .height").val())) {
			$(".productform .height").addClass("error");
			rturn = false;
		} else {
			$(".productform  .height").removeClass("error");
		}

	}

	if ($("#male").is(":checked")) {

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .topSize").val())) {
			$(".productform .topSize").addClass("error");
			rturn = false;
		} else {
			$(".productform  .topSize").removeClass("error");
		}

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .bottomSize").val())) {
			$(".productform .bottomSize").addClass("error");
			rturn = false;
		} else {
			$(".productform  .bottomSize").removeClass("error");
		}
	}

	if (required) {
		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .avt1").val())) {
			rturn = false;
			$(".productform .avt1").addClass("error");
		} else {
			$(".productform .avt1").removeClass("error");
		}

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .avt2").val())) {
			rturn = false;
			$(".productform .avt2").addClass("error");
		} else {
			$(".productform .avt2").removeClass("error");
		}

		if (new RegExp(UIutiles.getRegex("emptystring")).test($(
				".productform .avt3").val())) {
			rturn = false;
			$(".productform .avt3").addClass("error");
		} else {
			$(".productform .avt3").removeClass("error");
		}

	}

	return rturn;
}

ProductController.CustomValidatorLogic = function(object, required) {
	var clz = object.attr("id");
	console.log(clz);
	var ret = true;
	$("#" + clz).children("div").each(
			function() {
				$(this).find("input[type='text'],input[type='number']").each(
						function() {

							if (($(this).attr("hidden_id")) != undefined)
								console.log("hidden_id "
										+ $(this).attr("hidden_id"));

							var id = $(this).attr("id");
							var value = $("#" + clz + " #" + id).val();

							if (new RegExp(UIutiles.getRegex("emptystring"))
									.test(value)
									&& !$("#" + clz + " #" + id).hasClass(
											"hide")) {
								$("#" + clz + " #" + id).addClass("error");
								$("#" + clz + " #" + id).attr("placeholder",
										"Please provide " + id);
								ret = false;
							} else {
								$("#" + clz + " #" + id).removeClass("error");
							}
						});

				$(this).find("select").each(
						function() {

							var id = $(this).attr("id");
							var value = $("#" + clz + " #" + id).val();
							console.log("selected value :" + value);
							if (value === "-1"
									&& !$("#" + clz + " #" + id).hasClass(
											"hide")) {
								$("#" + clz + " #" + id).addClass("error");
								$("#" + clz + " #" + id).attr("placeholder",
										"Please provide " + id);
								ret = false;
							} else {
								$("#" + clz + " #" + id).removeClass("error");
							}
						});

				$(this).find("textarea").each(
						function() {
							var id = $(this).attr("id");
							var value = $("#" + clz + " #" + id).val();
							if (new RegExp(UIutiles.getRegex("emptystring"))
									.test(value)
									&& !$("#" + clz + " #" + id).hasClass(
											"hide")) {
								$("#" + clz + " #" + id).addClass("error");
								$("#" + clz + " #" + id).attr("placeholder",
										"Please provide " + id);
								ret = false;
							} else {
								$("#" + clz + " #" + id).removeClass("error");
							}
						});

			});
	return ret;

}

/** load product list* */
ProductController.loadProductList = (function() {
	var instance;
	function createInstance() {
		var object = $('.products  #productsTable')
				.DataTable(
						{
							"ajax" : {
								"url" : adminPanelButtonAction.fecthAllProduct,
								"dataSrc" : ""
							},
							"columns" : [
									{
										"data" : "pId"
									},
									{
										"data" : "title"
									},
									{
										"data" : "gender"
									},
									{
										"data" : "inStock"
									},
									{
										"data" : "createDateFormated"
									},
									{
										"data" : "createBy"
									},

									{
										"targets" : -1,
										"data" : null,
										"defaultContent" : "<button class='btn btn-info update-btn'>View </button>"
									},
									{
										"targets" : -1,
										"data" : null,
										"defaultContent" : "<button class='btn btn-danger delete-btn' >Delete </button>"
									} ],
							"columnDefs" : [ {
								"targets" : [ 0 ],
								"visible" : false
							} ],
							'info' : true,
							"fnDrawCallback" : function() {

								ProductController.refresh();
								$(".products .proListCount")
										.text(
												"("
														+ this
																.fnSettings()
																.fnRecordsTotal()
														+ ")");
							}

						});
		return object;
	}

	return {
		getInstance : function() {
			if (!instance) {
				instance = createInstance();
			}
			return instance;
		}
	};
})();

ProductController.fetchSingleProduct = function(productId) {
	var requestObject = {};
	var product = {};
	product.productId = productId;
	requestObject.container = "productform";
	requestObject.data = product;
	ServiceController.fetchProduct(requestObject);

}

ProductController.fetchSingleProductCallbackFunc = function(responseData) {
	var data = responseData.data;
	var path = "FileServlet?path=";

	$(".productform .imgavt1").removeClass("hide");
	$(".productform .imgavt1").attr("src", path + data.productDetails.avt1);
	$(".productform .imgavt2").removeClass("hide");
	$(".productform .imgavt2").attr("src", path + data.productDetails.avt2);
	$(".productform .imgavt3").removeClass("hide");
	$(".productform .imgavt3").attr("src", path + data.productDetails.avt3);

	$(".productform .productId").val(data.productId);
	$(".productform .productDetailsId").val(
			data.productDetails.productDetailsId);
	
	$(".productform .productTitle").val(data.productDetails.productTitle);
	$(".productform .brandId").val(data.brand.brandId);
	$(".productform .catId").val(data.category.catId);
	$(".productform .occasionId").val(data.occasion.occasionId);
	$(".productform .colorId").val(data.color.colorId);
	$(".productform .productDescription").val(
			data.productDetails.productDescription);
	$(".productform .customFitting").val(data.productDetails.customFitting);
	$(".productform .rentPrice").val(data.productDetails.rentPrice);
	$(".productform .depositePercentage").val(
			data.productDetails.depositePercentage);

	if (data.productDetails.duration4 === "Y") {
		$(".productform #duration4").prop('checked', true);
	} else {
		$(".productform #duration4").prop('checked', false);
	}

	if (data.productDetails.duration6 === "Y") {
		$(".productform #duration6").prop('checked', true);
	} else {
		$(".productform #duration6").prop('checked', false);
	}

	if (data.productDetails.duration8 === "Y") {
		$(".productform #duration8").prop('checked', true);
	} else {
		$(".productform #duration8").prop('checked', false);
	}

	if (data.productDetails.gender === "M") {

		$(".productform #female").prop('checked', false);
		$(".productform #male").prop('checked', true);

		$(".productform .women").addClass("hide")
		$(".productform .men").removeClass("hide");
		$(".productform  .topSize").removeClass("hide");
		$(".productform  .bottomSize").removeClass("hide");

	} else {
		$(".productform #female").prop('checked', true);
		$(".productform #male").prop('checked', false);

		$(".productform .men").addClass("hide");
		$(".productform .women").removeClass("hide");
		$(".productform  .size").removeClass("hide");
		$(".productform  .bust").removeClass("hide");
		$(".productform  .waist").removeClass("hide");
		$(".productform  .hip").removeClass("hide");
		$(".productform  .height").removeClass("hide");
	}

	ProductController.fetchProductAttr(data.productDetails.productDetailsId,
			data.productDetails.gender);

}

ProductController.fetchProductAttr = function(productDetailsId, gender) {
	var requestObject = {};
	var productDtls = {};
	productDtls.productDetailsId = productDetailsId;
	productDtls.gender = gender;

	requestObject.container = "productform";
	requestObject.data = productDtls;
	ServiceController.fetchProductAttr(requestObject);
}

ProductController.fetchProductAttrCallBack = function(responseData) {
	var data = responseData.data;

	$(".productform  .attrId").val(data.attrId);
	if (typeof data.bust === "undefined") {
		// male
		$(".productform  .topSize").val(data.topSize);
		$(".productform  .bottomSize").val(data.bottomSize);
	} else {
		// female
		$(".productform  .size").val(data.size);
		$(".productform  .bust").val(data.bust);
		$(".productform  .waist").val(data.waist);
		$(".productform  .hip").val(data.hip);
		$(".productform  .height").val(data.height);
	}

	console.log(data);
	$('#productCreate').modal('show');

}

ProductController.resetForm = function() {
	var clz="productform";
	$(".productform .men").addClass("hide");
	$(".productform .women").addClass("hide");
	$(".productform .message").addClass("hide");
	$(".productform .message").removeClass("alert-danger");
	$(".productform .message").val("");
	$("#" + clz+" .gendertype").removeClass("error");
	$("#" + clz+" .duration").removeClass("error");
	
	$(".productform #female").prop('checked', false);
	$(".productform #male").prop('checked', false);
	
	
	$(".productform #duration4").prop('checked', false);
	$(".productform #duration6").prop('checked', false);
	$(".productform #duration8").prop('checked', false);
	
	
	$("#" + clz).children("div").each(function() {
		$(this).find("input").each(function() {

			var id = $(this).attr("id");
			$("#" + clz + " #" + id).removeClass("error");
			$("#" + clz + " #" + id).val("");

		});

		$(this).find("select").each(function() {

			var id = $(this).attr("id");
			$("#" + clz + " #" + id).removeClass("error");
			$("#" + clz + " #" + id).val(-1);

		});

		$(this).find("textarea").each(function() {
			var id = $(this).attr("id");
			$("#" + clz + " #" + id).removeClass("error");
			$("#" + clz + " #" + id).val("");

		});

	});

}