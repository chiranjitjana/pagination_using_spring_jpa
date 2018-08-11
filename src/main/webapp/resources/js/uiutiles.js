function UIutiles() {
}

UIutiles.getRegex = function(type) {
	switch (type) {
	case "emptystring":
		return /^\s*$/;
		break;

	case "email":
		return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		break;
	case "phone":
		return /^[0]?[789]\d{9}$/;
		break;
	}
}

UIutiles.rquiredValidator = function(object) {
	var clz = object.attr("id");
	console.log(clz);
	var ret = true;
	$("#" + clz).children("div").each(
			function() {
				$(this).find("input").each(
						function() {

							if (($(this).attr("hidden_id")) != undefined)
								console.log("hidden_id "
										+ $(this).attr("hidden_id"));

							var id = $(this).attr("id");
							var value = $("#" + clz+" #" + id).val();

							if (new RegExp(UIutiles.getRegex("emptystring"))
									.test(value)
									&& !$("#" + clz+" #" + id).hasClass("hide")) {
								$("#" + clz+" #" + id).addClass("error");
								$("#" + clz+" #" + id).attr("placeholder",
										"Please provide " + id);
								ret = false;
							} else if (UIutiles.hasAttr("#" + clz,id, "email")
									&& !new RegExp(UIutiles.getRegex("email"))
											.test(value)) {
								$("#" + clz+" #" + id).addClass("error");
								$("#" + clz+" #" + id).attr("placeholder",
										"Email is not correct " + id);
								ret = false;
							} else if (UIutiles.hasAttr("#" + clz,id, "phone")
									&& !new RegExp(UIutiles.getRegex("phone"))
											.test(value)) {
								$("#" + clz+" #" + id).addClass("error");
								$("#" + clz+" #" + id).attr("placeholder",
										"Phone Number is not correct " + id);
								ret = false;

							} else {
								$("#" + clz+" #" + id).removeClass("error");
							}
						});

				$(this).find("select")
						.each(
								function() {

									var id = $(this).attr("id");
									var value = $("#" + clz+" #" + id).val();
									console.log("selected value :" + value);
									if (value === "-1"
											&& !$("#" + clz+" #" + id).hasClass("hide")) {
										$("#" + clz+" #" + id).addClass("error");
										$("#" + clz+" #" + id).attr("placeholder",
												"Please provide " + id);
										ret = false;
									} else {
										$("#" + clz+" #" + id).removeClass("error");
									}
								});
			});

	return ret;
}

UIutiles.makeJsonObject = function(rootClass) {
	var data = new Object();
	$(rootClass).find(".controle").each(function(index) {

		var id = $(this).attr("id");

		console.log("makejson object " + id);

		if (UIutiles.hasAttr(rootClass,id, "child")) {
			var child = new Object();
			var value = $(rootClass+" #" + id).attr("child");
			$(rootClass).find("[child ='" + value + "']").each(function() {
				child[$(this).attr("id")] = $(this).val();
			});

			data[$(this).attr("child")] = child;
		} else {

			data[id] = $(rootClass + " #" + id).val();
		}
	});

	return JSON.stringify(data);
}

UIutiles.bindReponseToUi = function(response, uiRoot) {

	for ( var key in response) {
		if (response.hasOwnProperty(key)) {
			if (response[key] != null) {
				if ($(uiRoot).find('.' + key).length !== 0) {

					// checking is this control type like input type

					if ($(uiRoot).find(" ." + key).hasClass("controle"))
						$(uiRoot).find(" ." + key).val(response[key]);
					else
						$(uiRoot).find(" ." + key).text(response[key]);
				}
			}
		}
	}
}

UIutiles.hasAttr = function(root,controler, attribute) {
	var attr = $(root+" #" + controler).attr(attribute);

	if (typeof attr !== typeof undefined && attr !== false) {
		// Element has this attribute
		return true;
	}
	return false;

}

UIutiles.handleReponse = function(responseData) {
	if (responseData.data != null) {
		UIutiles.bindReponseToUi(responseData.data, "."
				+ responseData.container);
		$("." + responseData.container + " .message").removeClass("hide");
		$("." + responseData.container + " .message").removeClass(
				"alert-danger");
		$("." + responseData.container + "  .message")
				.addClass("alert-success");

	} else {
		$("." + responseData.container + "  .message").removeClass("hide");
		$("." + responseData.container + "  .message").removeClass(
				"alert-success");
		$("." + responseData.container + "  .message").addClass("alert-danger");

	}
	$("." + responseData.container + "  .message .text").text(
			responseData.message);
	$("." + responseData.container + "  .message").show().delay(5000).fadeOut();

}

