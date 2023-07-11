var insertProperty = function (string, propName, propValue) {
	var propToReplace = "{{" + propName + "}}";
	string = string.replace(new RegExp(propToReplace, "g"), propValue);
	return string;
}

// CATEGORIES/HOME PAGE // 
var categoriesOpener = function (callback) {
	window.scrollTo(0,0);
	$ajaxUtils
		.sendGetRequest("../Dannys-Dolls/snippets/categoriesSnippet.html", true,
			function(request) {
				var categoriesSnippet = request.responseText;
				//console.log(categoriesSnippet);
				document.getElementById("body")
					.innerHTML = categoriesSnippet;
				callback();
		});
}
var homeButton = function(callback) {
	document.getElementById("shortHeader")
	.addEventListener("click",() => categoriesOpener(clickableCategories));
	document.getElementById("fullHeader")
	.addEventListener("click",() => categoriesOpener(clickableCategories));
}
var clickableCategories = function() {
	document.getElementById("barbieCategory").addEventListener("click", () => displayDollSearch("Barbie","","","","",clickableDolls));
	document.getElementById("americanCategory").addEventListener("click", () => displayDollSearch("American Girl","","","","",clickableDolls));
	document.getElementById("bratzCategory").addEventListener("click", () => displayDollSearch("Bratz","","","","",clickableDolls));
	document.getElementById("disneyCategory").addEventListener("click", () => displayDollSearch("Disney","","","","",clickableDolls));
	document.getElementById("eahCategory").addEventListener("click", () => displayDollSearch("Ever After High","","","","",clickableDolls));
	document.getElementById("lolCategory").addEventListener("click", () => displayDollSearch("LOL Surprise (entire franchise)","","","","",clickableDolls));
	document.getElementById("monsterCategory").addEventListener("click", () => displayDollSearch("Monster High","","","","",clickableDolls));
	document.getElementById("rainbowCategory").addEventListener("click", () => displayDollSearch("Rainbow High","","","","",clickableDolls));
	document.getElementById("macCategory").addEventListener("click", () => displayDollSearch("McDonald\'s Toys","","","","",clickableDolls));
	document.getElementById("miscCategory").addEventListener("click", () => displayDollSearch("Miscellaneous","","","","",clickableDolls));
	document.getElementById("clothesCategory").addEventListener("click", () => displayClothesSearch("","","","",clickableClothes));
}

// SEARCH FUNCTION //
var searchButtonOpener = function (callback1,callback2) {
	document.getElementById("searchButton")
			.addEventListener("click",function() {
				$ajaxUtils
					.sendGetRequest("../Dannys-Dolls/snippets/searchSnippet.html", true,
						function(request) {
							var searchHtml = request.responseText;
							document.getElementById("search")
								.innerHTML = searchHtml;
							callback1();
							callback2();
						});
			});

		document.addEventListener("click",function(event) {
			if (event.target.className != "search" && event.target.className != "searchInput" && event.target.className != "searchName" && event.target.className != "searchLabel" && (!event.target.className.includes("search") || event.target.className == "searchButtons") && event.target.id != "submitDollSearch" && event.target.id != "submitClothesSearch")  {
				document.getElementById("search").innerHTML = "";
			}
			else {
				console.log("clicked in the box");
			}
		});

}
var onDisplay = new Array();
var searchingLabel;
var searchCategory="";
var searchName="";
var searchYear="";
var searchCondition="";
var searchManufacturer="";
var dataArrDolls;
$ajaxUtils.sendGetRequest("../Dannys-Dolls/dolls.json",false, function(res) {
	var data = res.responseText;
	// console.log(data);
	dataArrDolls = JSON.parse(data);
	dataArrDolls = dataArrDolls.sort((a, b) => {
		if (a.year == b.year) {
			if (a.name>b.name) {
				return 1;
			}
			else if (a.name<b.name) {
				return -1;
			}
			else {
				return 0;
			}
		}
		else {
			return a.year-b.year;
		}
				
	});
});

var searchClothesName="";
var searchClothesLine="";
var searchClothesCharacter="";
var searchClothesYear="";
var dataArrClothes;
$ajaxUtils.sendGetRequest("../Dannys-Dolls/clothes.json",false, function(res) {
	var data = res.responseText;
	// console.log(data);
	dataArrClothes = JSON.parse(data);
	dataArrClothes = dataArrClothes.sort((a, b) => {
		if (a.year == b.year) {
			if (a.name>b.name) {
				return 1;
			}
			else if (a.name<b.name) {
				return -1;
			}
			else {
				return 0;
			}
		}
		else {
			return a.year-b.year;
		}
				
	});
});

var displayDollSearch = function(searchCategoryInput, searchNameInput,searchYearInput, searchConditionInput,searchManufacturerInput, callback) {
	var toBody = "";
	var html;
	searchCategory = searchCategoryInput;
	searchName = searchNameInput;
	searchYear = searchYearInput;
	searchCondition = searchConditionInput;
	searchManufacturer = searchManufacturerInput;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/searchResultsSnippet.html", true,
		function(res) {
			html = res.responseText;
			
			console.log(dataArrDolls);
			onDisplay = [];
			searchingLabel = "<div id=\"searchingLabelBox1\"> Search for:";
			if (searchCategory != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchCategory + "</span>";
			}
			if (searchName != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchName + "</span>";
			}
			if (searchYear != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchYear + "</span>";
			}
			if (searchCondition != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchCondition + "</span>";
			}
			if (searchManufacturer != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchManufacturer + "</span>";
			}
			searchingLabel += "</div>";

			for (var i=0; i<dataArrDolls.length; i++) {
				if (dataArrDolls[i].year.toString().includes("present")) {
					dollYear = dataArrDolls[i].year.toString().replace("present","3000");
				}
				else {
					dollYear = dataArrDolls[i].year.toString();
				}
				if ((searchCategory == "" || dataArrDolls[i].category.includes(searchCategory)) && (searchName == "" || dataArrDolls[i].name.includes(searchName)) && (searchYear == "" || dollYear.includes(searchYear) || (parseInt(dollYear.substr(0,4)) < searchYear && parseInt(dollYear.substr(5,9)) > searchYear)) && (searchCondition == "" || dataArrDolls[i].conditionpurchased.includes(searchCondition)) && (searchManufacturer == "" || dataArrDolls[i].manufacturer.includes(searchManufacturer))) {
					onDisplay.push(dataArrDolls[i].id);
					var prepareToBody = insertProperty(html,"categoryshort",dataArrDolls[i].categoryshort);
					var prepareToBody1 = insertProperty(prepareToBody,"id",dataArrDolls[i].id);
					var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArrDolls[i].name);
					toBody += prepareToBody2;
				}
			}
			console.log(onDisplay);

			document.getElementById("body")
			.innerHTML = searchingLabel + toBody;
			callback();
		});
	}

var displayClothesSearch = function(searchNameInput, searchLineInput,searchCharacterInput, searchYearInput, callback) {
	var toBody = "";
	var html;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/searchResultsSnippet.html", true,
		function(res) {
			html = res.responseText;
			
			searchClothesName = searchNameInput;
			searchClothesLine = searchLineInput;
			searchClothesCharacter = searchCharacterInput;
			searchClothesYear = searchYearInput;

			onDisplay = [];
			searchingLabel = "<div id=\"searchingLabelBox1\"> Search for: <span class=\"searchingLabel\">Clothes</span>";
			if (searchNameInput != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchClothesName + "</span>";
			}
			if (searchLineInput != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchClothesLine + "</span>";
			}
			if (searchCharacterInput != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchClothesCharacter + "</span>";
			}
			if (searchYearInput != "") {
				searchingLabel += "<span class=\"searchingLabel\">" + searchClothesYear + "</span>";
			}
			searchingLabel += "</div>";

			for (var i=0; i<dataArrClothes.length; i++) {
				if (dataArrClothes[i].year.toString().includes("present")) {
					dollYear = dataArrClothes[i].year.toString().replace("present","3000");
				}
				else {
					dollYear = dataArrClothes[i].year.toString();
				}
				console.log(dataArrClothes[i].name);
				if ((searchClothesName == "" || dataArrClothes[i].name.includes(searchClothesName)) && (searchClothesYear == "" || dollYear.includes(searchClothesYear) || (parseInt(dollYear.substr(0,4)) < searchClothesYear && parseInt(dollYear.substr(5,9)) > searchClothesYear)) && (searchCondition == "" || dataArrClothes[i].line.includes(searchClothesLine)) && (searchClothesCharacter == "" || dataArrClothes[i].character.includes(searchClothesCharacter))) {
					onDisplay.push(dataArrDolls[i].id);
					var prepareToBody = insertProperty(html,"categoryshort","clothes");
					var prepareToBody1 = insertProperty(prepareToBody,"id",dataArrClothes[i].id);
					var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArrClothes[i].name);
					toBody += prepareToBody2;
				}
			}
			console.log(onDisplay);

			document.getElementById("body")
			.innerHTML = searchingLabel + toBody;
			callback();

		});
	}

var runDollSearchInput = function() {
	document.getElementById("submitDollSearch").addEventListener("click", () => {
		searchBrand = document.getElementById("inputBrand").value;
		searchName = document.getElementById("inputName").value;
		searchYear = document.getElementById("inputYear").value;
		searchCondition = document.getElementById("inputCondition").value;
		searchManufacturer = document.getElementById("inputManufacturer").value;

		displayDollSearch(searchBrand, searchName,searchYear,searchCondition,searchManufacturer,clickableDolls);
		document.getElementById("search").innerHTML = "";
	});
}

var runClothesSearchInput = function() {
	document.getElementById("submitClothesSearch").addEventListener("click", () => {
		searchClothesName = document.getElementById("inputClothesName").value;
		searchClothesLine = document.getElementById("inputLine").value;
		searchClothesCharacter = document.getElementById("inputAssociatedCharacter").value;
		searchClothesYear = document.getElementById("inputClothesYear").value;

		displayClothesSearch(searchClothesName, searchClothesLine,searchClothesCharacter,searchClothesYear,clickableClothes);
		document.getElementById("search").innerHTML = "";
	});
}
// DISPLAYING DOLLS //
var clickableDolls = function() {
	console.log(onDisplay);
	for (var i=0; i<dataArrDolls.length; i++) {
		if (onDisplay.includes(dataArrDolls[i].id)) {
			idToSend = dataArrDolls[i].id;

			document.getElementById(dataArrDolls[i].id.toString()).addEventListener("click",(hit)=>displayDollIdPage(hit.target.id));
		}
	};
	window.scrollTo(0,0);
}
var clickableClothes = function() {
	for (var i=0; i<dataArrClothes.length; i++) {
		if (onDisplay.includes(dataArrClothes[i].id)) {
			idToSend = dataArrClothes[i].id;
			document.getElementById(dataArrClothes[i].id.toString()).addEventListener("click",(hit)=>displayClothesIdPage(hit.target.id));
		}
	};
	window.scrollTo(0,0);
}

//import descriptions
var descr = [];
var getDescription = function(categoryshort) {
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/descr/" + categoryshort + "descr.json",false, function(res) {
		var newDescr = res.responseText;
		newDescr = JSON.parse(newDescr);
		console.log(newDescr);
		descr.push(...newDescr);
		console.log(descr);
	}
)};
getDescription("ag");
getDescription("barbie");
getDescription("bratz");
getDescription("disney");
getDescription("eah");
getDescription("lol");
getDescription("mac");
getDescription("mh");
getDescription("misc");
getDescription("rh");

descr = Object.assign({}, ...descr);

// var clothesdescr;
// getDescription(clothesdescr, "clothes");

var displayDollIdPage = function(dollId) {
	window.scrollTo(0,0);
	var toBody = "";
	var html;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/idDollSnippet.html", true,
		function(res) {
			html = res.responseText;
			for (var i=0; i<dataArrDolls.length; i++) {
				if (dataArrDolls[i].id == dollId) {
					var doll = dataArrDolls[i];
					console.log(dollId);
					console.log(doll);
					break;
				}
			}
			var widthClass = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
			var img = "<img class=\"idImg\" src=\"../Dannys-Dolls/images/{{categoryshort}}/" + doll.id.toString() + ".jpeg\"></img>";
			console.log($ajaxUtils.doesFileExist("../Dannys-Dolls/images/" + doll.categoryshort + "/" + doll.id.toString()+"a.jpeg"));
			if ($ajaxUtils.doesFileExist("../Dannys-Dolls/images/" + doll.categoryshort + "/" + doll.id.toString()+"b.jpeg")) {
				img += "<img class=\"idImg\" src=\"../Dannys-Dolls/images/{{categoryshort}}/" + doll.id.toString() + "b" + ".jpeg\"></img>";
				widthClass = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
			}
			if ($ajaxUtils.doesFileExist("../Dannys-Dolls/images/" + doll.categoryshort + "/" + doll.id.toString()+"c.jpeg")) {
				img = "<img class=\"idImg2\" src=\"../Dannys-Dolls/images/{{categoryshort}}/" + doll.id.toString() + ".jpeg\"></img><img class=\"idImg2\" src=\"../Dannys-Dolls/images/{{categoryshort}}/" + doll.id.toString() + "b" + ".jpeg\"></img><img class=\"idImg2\" src=\"../Dannys-Dolls/images/{{categoryshort}}/" + doll.id.toString() + "c" + ".jpeg\"></img>";
				widthClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
			}
			getDescription("barbie");
			var prepareToBody = insertProperty(html,"img",img);
			var prepareToBody = insertProperty(prepareToBody,"width",widthClass);
			var prepareToBody1 = insertProperty(prepareToBody,"categoryshort",doll.categoryshort);
			var prepareToBody2 = insertProperty(prepareToBody1,"name",doll.name);
			var prepareToBody3 = insertProperty(prepareToBody2,"year",doll.year);
			var prepareToBody4 = insertProperty(prepareToBody3,"conditionpurchased",doll.conditionpurchased);
			var prepareToBody5 = insertProperty(prepareToBody4,"quantity",doll.quantity);
			var prepareToBody6 = insertProperty(prepareToBody5,"manufacturer",doll.manufacturer);
			if (doll.hasOwnProperty("notes")) {
				var prepareToBody7 = insertProperty(prepareToBody6,"notes",doll.notes);
			}
			else {
				var prepareToBody7 = prepareToBody6.replace("<div id = \"idNotes\" class=\"idInfoLine\">- Notes: {{notes}}</div>","");
			}

			//NEED TO BE ABLE TO CALL, FOR EXAMPLE: agdescr[303], RIGHT NOW ITS INPUTTING THE STRING
			var prepareToBody8 = insertProperty(prepareToBody7,"descr",descr[doll.id.toString()]);

			toBody += prepareToBody8;
			searchingLabel = searchingLabel.replace("Search", "Return to search");
			searchingLabel = searchingLabel.replace("1", "2");
			document.getElementById("body")
			.innerHTML = searchingLabel + toBody;

			//document.getElementsByClassName("idImg").style.setProperty('--width', width + "%");


			document.getElementById("searchingLabelBox2").addEventListener("click",() =>
				displayDollSearch(searchCategory, searchName,searchYear,searchCondition,searchManufacturer,clickableDolls));
		});
}
var displayClothesIdPage = function(clothesId) {
	window.scrollTo(0,0);
	var toBody = "";
	var html;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/idClothesSnippet.html", true,
		function(res) {
			html = res.responseText;
			for (var i=0; i<dataArrClothes.length; i++) {
				if (dataArrClothes[i].id == clothesId) {
					var clothes = dataArrClothes[i];
					console.log(clothesId);
					console.log(clothesId);
					break;
				}
			}


			var widthClass = "col-lg-12 col-md-12 col-sm-12 col-xs-12";
			var img = "<img class=\"idImg\" src=\"../Dannys-Dolls/images/clothes/" + clothes.id.toString() + ".jpeg\"></img>";
			console.log($ajaxUtils.doesFileExist("../Dannys-Dolls/images/" + clothes.categoryshort + "/" + clothes.id.toString()+"a.jpeg"));
			if ($ajaxUtils.doesFileExist("../Dannys-Dolls/images/clothes/" + clothes.id.toString()+"b.jpeg")) {
				img += "<img class=\"idImg\" src=\"../Dannys-Dolls/images/clothes/" + clothes.id.toString() + "b" + ".jpeg\"></img>";
				widthClass = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
			}
			if ($ajaxUtils.doesFileExist("../Dannys-Dolls/images/clothes/" + clothes.id.toString()+"c.jpeg")) {
				img = "<img class=\"idImg2\" src=\"../Dannys-Dolls/images/clothes/" + clothes.id.toString() + ".jpeg\"></img><img class=\"idImg2\" src=\"../Dannys-Dolls/images/clothes/" + clothes.id.toString() + "b" + ".jpeg\"></img><img class=\"idImg2\" src=\"../Dannys-Dolls/images/clothes/" + clothes.id.toString() + "c" + ".jpeg\"></img>";
				widthClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
			}

			var prepareToBody = insertProperty(html,"img",img);
			var prepareToBody = insertProperty(prepareToBody,"width",widthClass);
			var prepareToBody1 = insertProperty(prepareToBody,"name",clothes.name);
			var prepareToBody2 = insertProperty(prepareToBody1,"line",clothes.line);
			var prepareToBody3 = insertProperty(prepareToBody2,"character",clothes.character);
			var prepareToBody4 = insertProperty(prepareToBody3,"year",clothes.year);
			var prepareToBody5 = insertProperty(prepareToBody4,"quantity",clothes.quantity);
			var prepareToBody6 = insertProperty(prepareToBody5,"complete",clothes.complete);
			if (clothes.hasOwnProperty("notes")) {
				var prepareToBody7 = insertProperty(prepareToBody6,"notes",clothes.notes);
			}
			else {
				var prepareToBody7 = prepareToBody6.replace("<div class=\"idInfoLine\">Notes: {{notes}}</div>","");
			}
	
			toBody += prepareToBody7;
			searchingLabel = searchingLabel.replace("Search", "Return to search");
			searchingLabel = searchingLabel.replace("1", "2");
			document.getElementById("body")
			.innerHTML = searchingLabel + toBody;

			document.getElementById("searchingLabelBox2").addEventListener("click",() =>
				displayClothesSearch(searchClothesName, searchClothesLine,searchClothesCharacter,searchClothesYear,clickableClothes));
		});
}

// EDITING CONTENT //
var signInButtonOpener = function (callback) {
	document.getElementById("signInButton")
		.addEventListener("click",function() {
			$ajaxUtils
				.sendGetRequest("../Dannys-Dolls/snippets/signInSnippet.html", true,
					function(request) {
						var signInHtml = request.responseText;
						document.getElementById("signInPage")
							.innerHTML = signInHtml;
						callback(submitNewDoll, submitNewClothes);
				});
		});
		document.addEventListener("click",function(event) {
			if (event.target.className != "signIn" && event.target.className != "signInInstructions" && event.target.className != "signInPage" && event.target.id != "submitSignIn")  {
				document.getElementById("signInPage").innerHTML = "";
			}
			
		});
}
//document.addEventListener("click",(hit)=>console.log(hit.target.id));

document.addEventListener("DOMContentLoaded",  
	function(event) {
		window.scrollTo(0,0);
		categoriesOpener(clickableCategories);
		homeButton(clickableCategories);

		//OPENING SEARCH BOX
		searchButtonOpener(runDollSearchInput, runClothesSearchInput);
		//EDIT CONTENT BUTTON
		signInButtonOpener(signInButton);
		
		//console.log(document.getElementById("barbieCategory"));
});