var showLoading = function (selector) {
	var html = "<div id='loadingIcon'>";
		html += "<img src = '../Dannys-Dolls/images/other/load.gif'></div>";
		document.querySelector(selector).innerHTML = html;
	}

var insertProperty = function (string, propName, propValue) {
	var propToReplace = "{{" + propName + "}}";
	string = string.replace(new RegExp(propToReplace, "g"), propValue);
	return string;
}

// CATEGORIES/HOME PAGE // 
var categoriesOpener = function (callback) {
	$ajaxUtils
		.sendGetRequest("../Dannys-Dolls/snippets/categoriesSnippet.html",
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
	document.getElementById("barbieCategory").addEventListener("click", () => displaySearch("Barbie","","","","",clickableDolls));
	document.getElementById("americanCategory").addEventListener("click", () => displaySearch("American Girl","","","","",clickableDolls));
	document.getElementById("bratzCategory").addEventListener("click", () => displaySearch("Bratz","","","","",clickableDolls));
	document.getElementById("disneyCategory").addEventListener("click", () => displaySearch("Disney","","","","",clickableDolls));
	document.getElementById("eahCategory").addEventListener("click", () => displaySearch("Ever After High","","","","",clickableDolls));
	document.getElementById("lolCategory").addEventListener("click", () => displaySearch("LOL Surprise (entire franchise)","","","","",clickableDolls));
	document.getElementById("monsterCategory").addEventListener("click", () => displaySearch("Monster High","","","","",clickableDolls));
	document.getElementById("rainbowCategory").addEventListener("click", () => displaySearch("Rainbow High","","","","",clickableDolls));
	document.getElementById("macCategory").addEventListener("click", () => displaySearch("McDonald\'s Toys","","","","",clickableDolls));
	document.getElementById("miscCategory").addEventListener("click", () => displaySearch("Miscellaneous","","","","",clickableDolls));

}

// SEARCH FUNCTION //
var searchButtonOpener = function (callback) {
	document.getElementById("searchButton")
			.addEventListener("click",function() {
				$ajaxUtils
					.sendGetRequest("../Dannys-Dolls/snippets/searchSnippet.html",
						function(request) {
							var searchHtml = request.responseText;
							document.getElementById("search")
								.innerHTML = searchHtml;
							callback();
						});
			});

		document.addEventListener("click",function(event) {
			if (event.target.className != "search" && event.target.className != "searchInput" && event.target.className != "searchName" && event.target.className != "searchLabel" && event.target.id != "submitSearch")  {
				document.getElementById("search").innerHTML = "";
			}
			else {
				console.log("clicked in the box");
			}
		});

}
var onDisplay = new Array();
var searchingLabel;
var searchCategory;
var searchName;
var searchYear;
var searchCondition;
var searchManufacturer;
var displaySearch = function(searchCategoryInput, searchNameInput,searchYearInput, searchConditionInput,searchManufacturerInput, callback) {
	var toBody = "";
	var html;
	searchCategory = searchCategoryInput;
	searchName = searchNameInput;
	searchYear = searchYearInput;
	searchCondition = searchConditionInput;
	searchManufacturer = searchManufacturerInput;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/searchResultsSnippet.html",
		function(res) {
			html = res.responseText;
		
		//console.log(html);
		$ajaxUtils.sendGetRequest("../Dannys-Dolls/data.json",
				function(res) {
					
					var data = res.responseText;
					//console.log(data);
					var dataArr = JSON.parse(data);
					dataArr = dataArr.sort((a, b) => {
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
					console.log(dataArr);
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

					for (var i=0; i<dataArr.length; i++) {
						console.log(dataArr[i]);
						if (dataArr[i].year.toString().includes("present")) {
							dollYear = dataArr[i].year.toString().replace("present","3000");
						}
						else {
							dollYear = dataArr[i].year.toString();
						}
						if ((searchCategory == "" || dataArr[i].category == searchCategory) && (searchName == "" || dataArr[i].name == searchName) && (searchYear == "" || dollYear == searchYear || (parseInt(dollYear.substr(0,4)) < searchYear && parseInt(dollYear.substr(5,9)) > searchYear)) && (searchCondition == "" || dataArr[i].conditionpurchased == searchCondition) && (searchManufacturer == "" || searchManufacturer == dataArr[i].manufacturer)) {
							onDisplay.push(dataArr[i].id);
							var prepareToBody = insertProperty(html,"categoryshort",dataArr[i].categoryshort);
							var prepareToBody1 = insertProperty(prepareToBody,"id",dataArr[i].id);
							var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArr[i].name);
							toBody += prepareToBody2;
						}
					}
					console.log(onDisplay);

					document.getElementById("body")
					.innerHTML = searchingLabel + toBody;
					callback();
					});

				});
	}
var runSearchInput = function() {
	document.getElementById("submitSearch").addEventListener("click", () => {
		searchBrand = document.getElementById("inputBrand").value;
		searchName = document.getElementById("inputName").value;
		searchYear = document.getElementById("inputYear").value;
		searchCondition = document.getElementById("inputCondition").value;
		searchManufacturer = document.getElementById("inputManufacturer").value;

		displaySearch(searchBrand, searchName,searchYear,searchCondition,searchManufacturer,clickableDolls);
		document.getElementById("search").innerHTML = "";
	});
	
}
// DISPLAYING DOLLS //
var clickableDolls = function() {
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/data.json",
		function(res) {
			var data = res.responseText;
			var dataArr = JSON.parse(data);
			for (var i=0; i<dataArr.length; i++) {
				if (onDisplay.includes(dataArr[i].id)) {
					idToSend = dataArr[i].id;
					document.getElementById(dataArr[i].id.toString()).addEventListener("click",(hit)=>displayIdPage(hit.target.id));
				}
			};
	});
}
var displayIdPage = function(dollId) {
	var toBody = "";
	var html;
	$ajaxUtils.sendGetRequest("../Dannys-Dolls/snippets/idSnippet.html",
		function(res) {
			html = res.responseText;
			$ajaxUtils.sendGetRequest("../Dannys-Dolls/data.json",
				function(res) {
					data = res.responseText;
					var dataArr = JSON.parse(data);
					for (var i=0; i<dataArr.length; i++) {
						if (dataArr[i].id == dollId) {
							var doll = dataArr[i];
							console.log(dollId);
							console.log(doll);
							break;
						}
					}
					var data = res.responseText;
					var prepareToBody = insertProperty(html,"categoryshort",doll.categoryshort);
					var prepareToBody1 = insertProperty(prepareToBody,"id",doll.id);
					var prepareToBody2 = insertProperty(prepareToBody1,"name",doll.name);
					var prepareToBody3 = insertProperty(prepareToBody2,"year",doll.year);
					var prepareToBody4 = insertProperty(prepareToBody3,"conditionpurchased",doll.conditionpurchased);
					var prepareToBody5 = insertProperty(prepareToBody4,"quantity",doll.quantity);
					var prepareToBody6 = insertProperty(prepareToBody5,"manufacturer",doll.manufacturer);
					if (doll.hasOwnProperty("notes")) {
						var prepareToBody7 = insertProperty(prepareToBody6,"notes",doll.notes);
					}
					else {
						var prepareToBody7 = prepareToBody6.replace("<div id = \"idNotes\" class=\"idInfoLine\">Notes: {{notes}}</div>","");
					}
			
					toBody += prepareToBody7;
					searchingLabel = searchingLabel.replace("Search", "Return to search");
					searchingLabel = searchingLabel.replace("1", "2");
					document.getElementById("body")
					.innerHTML = searchingLabel + toBody;

					document.getElementById("searchingLabelBox2").addEventListener("click",() =>
						displaySearch(searchCategory, searchName,searchYear,searchCondition,searchManufacturer,clickableDolls));
			});
		});
}

// EDITING CONTENT //
var signInButtonOpener = function (callback) {
	document.getElementById("signInButton")
		.addEventListener("click",function() {
			$ajaxUtils
				.sendGetRequest("../Dannys-Dolls/snippets/signInSnippet.html",
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
var signInButton = function(callback1, callback2) {
	document.getElementById("submitSignIn").addEventListener("click", function() {
		console.log(document.getElementById("signInInput").value);
		if (document.getElementById("signInInput").value == "abc") {
			document.getElementById("wrongSignIn").innerHTML = "";
			document.getElementById("signInPage").innerHTML = "";
			$ajaxUtils
				.sendGetRequest("../Dannys-Dolls/snippets/editSnippet.html",
					function(request) {
						var editPageHtml = request.responseText;
						document.getElementById("body")
							.innerHTML = editPageHtml;
						callback1();
						callback2();
				});
		}
		else {
			document.getElementById("wrongSignIn").innerHTML = "You entered the wrong password. Try again.";
		}
	});
}
var submitNewDoll = function() {
	//make file adders show the name of the files
	document.getElementById("inputEditDollImage").addEventListener("input",() => {
		var imageInput = document.getElementById("inputEditDollImage").value;
		var imageInputName = imageInput.substr(12);
		document.getElementById("dollImageInputName").innerHTML = imageInputName;
	});
	document.getElementById("inputEditClothesImage").addEventListener("input",() => {
		var imageInput = document.getElementById("inputEditClothesImage").value;
		var imageInputName = imageInput.substr(12);
		document.getElementById("clothesImageInputName").innerHTML = imageInputName;
	});

	document.getElementById("editDollSubmit").addEventListener("click", function() {
		document.getElementById("submitDollError").innerHTML = "";
		var canSubmit = true;
		var moveButtonDown = 0;
		var categoryInput = document.getElementById("inputEditCategory").value;
		if (categoryInput == null || categoryInput == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a category";
		}
		else if (categoryInput!="American Girl"&&categoryInput!="American Girl Mini"&&categoryInput!="Barbie"&&categoryInput!="Bratz"&&categoryInput!="Disney"&&categoryInput!="Ever After High"&&categoryInput!="LOL Surprise (entire franchise)"&&categoryInput!="McDonald's Toys"&&categoryInput!="Monster High"&&categoryInput!="Rainbow High"&&categoryInput!="Miscellaneous") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the category correctly";
		}
		if (document.getElementById("inputEditName").value == null || document.getElementById("inputEditName").value == ""){
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a name";
		}
		if (document.getElementById("inputEditYear").value == null || document.getElementById("inputEditYear").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered a year";
		}
		if (document.getElementById("inputEditCondition").value == null || document.getElementById("inputEditCondition").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the condition";
		}
		if (document.getElementById("inputEditQuantity").value == null || document.getElementById("inputEditQuantity").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the quantity";
		}
		if (document.getElementById("inputEditManufacturer").value == null || document.getElementById("inputEditManufacturer").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the manufacturer";
		}
		if (document.getElementById("inputEditDollImage").value == null || document.getElementById("inputEditDollImage").value == "") {
			canSubmit = false;
			moveButtonDown -= 17;
			document.getElementById("submitDollError").innerHTML += "<br>You haven't entered the image";
		}
		if (document.getElementById("inputEditQuantity").value == 100) {
			canSubmit = true;
		}
		//if (canSubmit == true) {
		if (true) {
			$ajaxUtils.sendGetRequest("../Dannys-Dolls/data.json",
				function(res) {
					var data = res.responseText;
					var dataArr = JSON.parse(data);
					var correctRepeatInput;
					if (document.getElementById("inputEditQuantity").value == 100) {
						for (i in dataArr) {
							if (dataArr[i].name == document.getElementById("inputEditName").value) {
								correctRepeatInput = true;
							}
						}
					}
					var ids = new Array();
					for (i in dataArr) {
						ids.push(dataArr[i].id);
					}
					var newId = 1;
					var newIdFound = false;
					while (!newIdFound) {
						if (ids.includes(newId)) {
							newId += 1;
						}
						else {
							newIdFound = true;
						}
					}
					if (correctRepeatInput == true) {
						for (i in dataArr) {
							if (document.getElementById("inputEditName").value == dataArr[i].name) {
								dataArr[i].quantity += 1;
								break;
							}
						}
					}
					else if (correctRepeatInput == false) {
						moveButtonDown -= 17;
						document.getElementById("submitDollError").innerHTML += "<br>The name that you entered is not in the data. Check that you copied the name of the doll EXACTLY as it appears on the id page";
					}
					//if the doll is not a repeat
					else if (correctRepeatInput == null) {
						var newCategory = document.getElementById("inputEditCategory").value;
						var newName = document.getElementById("inputEditName").value;
						var newYear = document.getElementById("inputEditYear").value;
						var newCondition = document.getElementById("inputEditCondition").value;
						var newQuantity = document.getElementById("inputEditCondition").value;
						var newShortCategory;
						if (newCategory == "Barbie") {
							newShortCategory = "barbie";
						}
						else if (newCategory == "Bratz") {
							newShortCategory = "bratz";
						}
						else if (newCategory == "Ever After High") {
							newShortCategory = "eah";
						}
						else if (newCategory == "Monster High") {
							newShortCategory = "mh";
						}
						else if (newCategory == "American Girl") {
							newShortCategory = "ag";
						}
						else if (newCategory == "Rainbow High") {
							newShortCategory = "rh";
						}
						else if (newCategory == "LOL Surprise (entire franchise)") {
							newShortCategory = "lol";
						}
						else if (newCategory == "Miscellaneous") {
							newShortCategory = "misc";
						}
						else if (newCategory == "McDonald's Toys") {
							newShortCategory = "mac";
						}
						var newImage = document.getElementById("inputEditDollImage").value;
						console.log(newImage);


						//figure out how to write to folder to save image and write to json file to save new doll
						//looks like i need nodejs. figure out what that is
						//HOW THE FUCK DO I SAVE IMAGESSSSS
						//TBH JUST MAKE THE SEARCH FUNCTION WORK AND CARRY ON




						//document.getElementById("inputEditDollImage").value
					}
				});
		}
		


		
		document.getElementById("submitDollError").style.setProperty('--submitDollError', moveButtonDown + "px");
		document.getElementById("editDollSubmit").style.setProperty('--editDollSubmit', moveButtonDown + "px");
		document.getElementById("addDoll").style.setProperty('--addDoll', moveButtonDown*(-1) + "px");
		});
}
var submitNewClothes = function() {}
document.addEventListener("click",(hit)=>console.log(hit.target.id));

document.addEventListener("DOMContentLoaded",  
	function(event) {
		categoriesOpener(clickableCategories);
		homeButton(clickableCategories);

		//OPENING SEARCH BOX
		searchButtonOpener(runSearchInput);
		//EDIT CONTENT BUTTON
		signInButtonOpener(signInButton);
		
		//console.log(document.getElementById("barbieCategory"));
});