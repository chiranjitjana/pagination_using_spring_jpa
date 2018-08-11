var paginationHandler = {};

paginationHandler.paginationContainer;
paginationHandler.currentGroup = 1;
paginationHandler.pgntionNumberListSize;
paginationHandler.totalPages;

paginationHandler.basicPaginationSetUp = function(paginationContainer, totalPages, pgntionNumberListSize, callbackFunction) {

	paginationHandler.paginationContainer = paginationContainer;
	paginationHandler.pgntionNumberListSize = pgntionNumberListSize;
	paginationHandler.totalPages = totalPages;

	var btns = [];
	btns.push("<Button type='button' class='previous_btn btn btn-info' disabled>Previous</Button>");
	var counter = 1;
	for (var index = 1; index <= Math.ceil(totalPages / pgntionNumberListSize); index++) {

		for (var x = 1; x <= pgntionNumberListSize; x++) {
			var btn = $("<button></button>");
			btn.attr("type", 'button');
			btn.addClass("btn-count btn btn-info");
			btn.addClass("group" + index);
			btn.attr("groupNumber", index);
			btn.text(counter);
			btn.on("click", callbackFunction);


			/*hiding other pagination groups*/
			if (index != 1) {
				btn.hide();
			} else {
				/*initially only showing the first pagination group*/
				btn.addClass("activeGroup");
			}


			if (counter == 1) {
				btn.addClass("active");
			}
			btns.push(btn);



			if (index == Math.ceil(totalPages / pgntionNumberListSize) && totalPages == counter) {
				break;
			}



			counter++;
		}
	}
	btns.push("<Button type='button' class='next_btn btn btn-info'>Next</Button>");
	$(paginationContainer).empty();
	$(paginationContainer).append(btns);

	if (totalPages < pgntionNumberListSize) {
		$(paginationContainer).find(".next_btn").attr("disabled", true);
	}
}

/*$(paginationContainer).find(".previous_btn").click(function(){*/
$(document).on("click", ".previous_btn", function() {
	/* if we able to click the pervious button then there should be next button enable*/
	$(paginationHandler.paginationContainer).find(".next_btn").attr("disabled", false);


	/* checking we reached*/
	if (paginationHandler.currentGroup == 2) {
		$(this).attr("disabled", true);
	}

	/*here we loop through all the pagination button and showing the buttons which are belongs to pagination previous
	group and disabling all other button 
	here we are using (currentGroup)-1 because we want to show previous pagination button group 
	with respect to current activeGroup group
	
	*/
	$(paginationHandler.paginationContainer).children(".btn-count").each(
		function() {

			showAndHidePagiButton($(this), (parseInt(paginationHandler.currentGroup) - 1));
		}
	);

	/*after showing and hiding the desired pagination button group we will updating currentGroup value 
		to activated button attribute*/

	paginationHandler.currentGroup = $(paginationHandler.paginationContainer).find(".activeGroup").attr("groupNumber");

});

/* Below code is for handling next button click*/

/*	$(paginationContainer).find(".next_btn").click(function(){*/
$(document).on('click', '.next_btn', function() {

	/* if next button clicked then there should be some item present previously so we should enable
	previous button*/

	$(paginationHandler.paginationContainer).find(".previous_btn").attr("disabled", false);


	/*checking if our next click will show the last pagination Group so we should disabled next button*/
	if (paginationHandler.currentGroup == Math.ceil(paginationHandler.totalPages / paginationHandler.pgntionNumberListSize) - 1) {
		$(this).attr("disabled", true);
	}


	/*here we loop through all the pagination button and showing the buttons which are belongs to pagination next group
	and disabling all other button 
	here we are using (currentGroup)+1 because we want to show next pagination button group 
	with respect to current activeGroup group
	
	*/
	$(paginationHandler.paginationContainer).children(".btn-count").each(
		function() {

			showAndHidePagiButton($(this), (parseInt(paginationHandler.currentGroup) + 1));
		}
	);


	/*after showing and hiding the desired pagination button group we will updating currentGroup value 
	to activated button attribute*/
	paginationHandler.currentGroup = $(paginationHandler.paginationContainer).find(".activeGroup").attr("groupNumber");

});

/*
	showAndHidePagiButton(currentBtn,currentBtnGroupToShow)
	=======================================================
	This method use to hide or show the button and assign or remove 'activeGroup' class
	depending on the current button attribute 'groupNumber' and variable 'buttonGroupToShow' value.
	
	
	if next button clicked then currentBtnGroupToShow value will be currentGroup+1
	and if previous button clicked then currentBtnGroupToShow value will be currentGroup-1
*/

function showAndHidePagiButton(currentBtn, currentBtnGroupToShow) {
	if (parseInt(currentBtn.attr("groupNumber")) != currentBtnGroupToShow) {
		currentBtn.hide();
		currentBtn.removeClass("activeGroup");
	} else {
		currentBtn.show();
		currentBtn.addClass("activeGroup");
	}
}