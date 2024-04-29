var snippets = require('./snippets')

function script(clothes, dolls) {

    var dataArrClothes = clothes;
    var dataArrDolls = dolls;

    for (i in dataArrClothes) {
        if (dataArrClothes[i].description.includes("\\")) {
            console.log(dataArrClothes[i].name);
        }
    }
    for (i in dataArrDolls) {
        if (dataArrDolls[i].description.includes("\\")) {
            console.log(dataArrDolls[i].name);
        }
    }

    console.log(clothes.length);
    console.log(dolls.length);

    var removeSpaces = function(stringBefore) {
        return stringBefore.replace(/ /g, "");
    }

    var insertProperty = function (oldString, propName, propValue) {
        var propToReplace = "{{" + propName + "}}";
        var string = oldString.replace(new RegExp(propToReplace, "g"), propValue);
        return string;
    }

    // CATEGORIES/HOME PAGE // 
    var categoriesOpener = function() {
        window.scrollTo(0,0);
        document.getElementById("body")
            .innerHTML = snippets[0];
        clickableCategories();
    }

    var homeButton = function() {
        document.getElementById("shortHeader")
        .addEventListener("click",() => categoriesOpener());
        document.getElementById("fullHeader")
        .addEventListener("click",() => categoriesOpener());
    }

    var clickableCategories = function() {
        document.getElementById("barbieCategory").addEventListener("click", () => displayDollSearch("Barbie"));
        document.getElementById("americanCategory").addEventListener("click", () => displayDollSearch("American Girl"));
        document.getElementById("bratzCategory").addEventListener("click", () => displayDollSearch("Bratz"));
        document.getElementById("disneyCategory").addEventListener("click", () => displayDollSearch("Disney"));
        document.getElementById("eahCategory").addEventListener("click", () => displayDollSearch("Ever After High"));
        document.getElementById("lolCategory").addEventListener("click", () => displayDollSearch("LOL Surprise (entire franchise)"));
        document.getElementById("monsterCategory").addEventListener("click", () => displayDollSearch("Monster High"));
        document.getElementById("rainbowCategory").addEventListener("click", () => displayDollSearch("Rainbow High"));
        document.getElementById("macCategory").addEventListener("click", () => displayDollSearch("McDonald\'s"));
        document.getElementById("miscCategory").addEventListener("click", () => displayDollSearch("Miscellaneous"));
        document.getElementById("clothesCategory").addEventListener("click", () => displayClothesSearch());
    }

    var displayDollSearch = function(searchCategoryInput) {
        var toBody = "";
        var html = snippets[3];
        searchCategory = searchCategoryInput;
        
        onDisplay = [];
        searchingLabel = "<div id=\"searchingLabelBox1\"> Search for:";
        searchingLabel += "<span class=\"searchingLabel\">" + searchCategory + "</span>";
        searchingLabel += "</div>";

        

        for (var i=0; i<dataArrDolls.length; i++) {
            if (dataArrDolls[i].brand == searchCategory) {
                onDisplay.push("a" + removeSpaces(dataArrDolls[i].name));
                var prepareToBody1 = insertProperty(html,"imageURL",dataArrDolls[i].image[0].fields.file.url);
                var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArrDolls[i].name);
                var prepareToBody3 = insertProperty(prepareToBody2,"id","a" + removeSpaces(dataArrDolls[i].name));
                toBody += prepareToBody3;
            }
        }
        document.getElementById("body").innerHTML = searchingLabel + toBody;
        clickableDolls();
    }

    var displayClothesSearch = function() {
        var toBody = "";
        var html = snippets[3];
        
        onDisplay = [];
        searchingLabel = "<div id=\"searchingLabelBox1\"> Search for:";
        searchingLabel += "<span class=\"searchingLabel\">Clothes</span>";
        searchingLabel += "</div>";

        for (var i=0; i<dataArrClothes.length; i++) {
            onDisplay.push("a" + removeSpaces(dataArrClothes[i].name));
            var prepareToBody1 = insertProperty(html,"imageURL",dataArrClothes[i].image[0].fields.file.url);
            var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArrClothes[i].name);
            var prepareToBody3 = insertProperty(prepareToBody2,"id","a" + removeSpaces(dataArrClothes[i].name));
            toBody += prepareToBody3;
            
        }
        document.getElementById("body").innerHTML = searchingLabel + toBody;
        clickableClothes();
    }

    var clickableDolls = function() {
        for (var i=0; i<dataArrDolls.length; i++) {
            if (onDisplay.includes("a" + removeSpaces(dataArrDolls[i].name))) {
                idToSend = dataArrDolls[i];
                document.getElementById("a" + removeSpaces(dataArrDolls[i].name)).addEventListener("click",(hit)=>displayDollIdPage(hit.target.id));
            }
        };
        window.scrollTo(0,0);
    }

    var clickableClothes = function() {
        for (var i=0; i<dataArrClothes.length; i++) {
            if (onDisplay.includes("a" + removeSpaces(dataArrClothes[i].name))) {
                document.getElementById("a" + removeSpaces(dataArrClothes[i].name)).addEventListener("click",(hit)=>displayClothesIdPage(hit.target.id));
            }
        };
        window.scrollTo(0,0);
    }


    var displayDollIdPage = function(dollId) {
        window.scrollTo(0,0);
        var toBody = "";
        var html = snippets[2];
        for (var i=0; i<dataArrDolls.length; i++) {
            if ("a" + removeSpaces(dataArrDolls[i].name) == dollId) {
                var doll = dataArrDolls[i];
                break;
            }
        }
        var widthClass = "col-lg-12 col-md-12 col-sm-12 col-xs-12";

        var img = "<img class=\"idImg\" src = \"" + doll.image[0].fields.file.url + "\"></img>"
        
        var prepareToBody = insertProperty(html,"img",img);

        // if (/* THERE ARE TWO PICTURES */) {
        //     img += "<img class=\"idImg\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        // }
        // if (/* THERE ARE THREE PICTURES */) {
        //     img = "<img class=\"idImg2\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
        // }
        var prepareToBody1 = insertProperty(prepareToBody,"width",widthClass);
        var prepareToBody2 = insertProperty(prepareToBody1,"name",doll.name);
        var prepareToBody3 = insertProperty(prepareToBody2,"year",doll.year);
        var prepareToBody4 = insertProperty(prepareToBody3,"conditionpurchased",doll.condition);
        var prepareToBody5 = insertProperty(prepareToBody4,"quantity",doll.quantity);
        var prepareToBody6 = insertProperty(prepareToBody5,"manufacturer",doll.manufacturer);
        if (doll.hasOwnProperty("notes")) {
            var prepareToBody7 = insertProperty(prepareToBody6,"notes",doll.notes);
        }
        else {
            var prepareToBody7 = prepareToBody6.replace("<div id = \"idNotes\" class=\"idInfoLine\">- Notes: {{notes}}</div>","");
        }
        var prepareToBody8 = insertProperty(prepareToBody7,"descr",doll.description);


        toBody += prepareToBody8;
        searchingLabel = searchingLabel.replace("Search", "Return to search");
        searchingLabel = searchingLabel.replace("1", "2");
        document.getElementById("body")
        .innerHTML = searchingLabel + toBody;

        //document.getElementsByClassName("idImg").style.setProperty('--width', width + "%");

        document.getElementById("searchingLabelBox2").addEventListener("click",() =>
            displayDollSearch(searchCategory));
    } 

    var displayClothesIdPage = function(clothesId) {
        window.scrollTo(0,0);
        var toBody = "";
        var html = snippets[1];
        for (var i=0; i<dataArrClothes.length; i++) {
            if ("a" + removeSpaces(dataArrClothes[i].name) == clothesId) {
                var clothes = dataArrClothes[i];
                break;
            }
        }

        var img = "<img class=\"idImg\" src = \"" + clothes.image[0].fields.file.url + "\"></img>"
        
        var prepareToBody = insertProperty(html,"img",img);

        // if (/* THERE ARE TWO PICTURES */) {
        //     img += "<img class=\"idImg\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        // }
        // if (/* THERE ARE THREE PICTURES */) {
        //     img = "<img class=\"idImg2\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
        // }


        var prepareToBody1 = insertProperty(prepareToBody,"name",clothes.name);
        var prepareToBody2 = insertProperty(prepareToBody1,"year",clothes.year);
        var prepareToBody3 = insertProperty(prepareToBody2,"line",clothes.line);
        var prepareToBody4 = insertProperty(prepareToBody3,"character",clothes.character);
        var prepareToBody5 = insertProperty(prepareToBody4,"quantity",clothes.quantity);
        var prepareToBody6 = insertProperty(prepareToBody5,"complete",clothes.complete);

        if (clothes.hasOwnProperty("notes")) {
            var prepareToBody7 = insertProperty(prepareToBody6,"notes",clothes.notes);
        }
        else {
            var prepareToBody7 = prepareToBody6.replace("<div id = \"idNotes\" class=\"idInfoLine\">- Notes: {{notes}}</div>","");
        }
        var prepareToBody8 = insertProperty(prepareToBody7,"descr",clothes.description);

        toBody += prepareToBody8;
        searchingLabel = searchingLabel.replace("Search", "Return to search");
        searchingLabel = searchingLabel.replace("1", "2");
        document.getElementById("body")
        .innerHTML = searchingLabel + toBody;

        //document.getElementsByClassName("idImg").style.setProperty('--width', width + "%");

        document.getElementById("searchingLabelBox2").addEventListener("click",() =>
            displayClothesSearch());
        
    } 

    var toRun = function() {
        homeButton();
        categoriesOpener();
    }
    toRun();
}

module.exports = script;