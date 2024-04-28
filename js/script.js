var snippets = require('./snippets')

function script(clothes, dolls) {

    var dataArrClothes = clothes;
    var dataArrDolls = dolls;

    console.log(dataArrDolls[0].image[0].fields);
    console.log(dataArrDolls[0].image[0].fields.file.url);

    var toShortCategory = function (longCategory) {
        if (longCategory == "American Girl") {
            return "ag";
        }
        if (longCategory == "Barbie") {
            return "barbie";
        }
        if (longCategory == "Bratz") {
            return "bratz";
        }
        if (longCategory == "Disney") {
            return "disney";
        }
        if (longCategory == "Ever After High") {
            return "eah";
        }
        if (longCategory == "LOL Surprise (entire franchise)") {
            return "lol";
        }
        if (longCategory == "Monster High") {
            return "mh";
        }
        if (longCategory == "Rainbow High") {
            return "rh";
        }
        if (longCategory == "McDonald's") {
            return "mac";
        }
        if (longCategory == "Miscellaneous") {
            return "misc";
        }
    }

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
        document.getElementById("macCategory").addEventListener("click", () => displayDollSearch("McDonald\'s Toys"));
        document.getElementById("miscCategory").addEventListener("click", () => displayDollSearch("Miscellaneous"));
        document.getElementById("clothesCategory").addEventListener("click", () => displayClothesSearch());
    }

    var displayDollSearch = function(searchCategoryInput) {
        var toBody = "";
        var html;
        searchCategory = searchCategoryInput;
        
        onDisplay = [];
        searchingLabel = "<div id=\"searchingLabelBox1\"> Search for:";
        searchingLabel += "<span class=\"searchingLabel\">" + searchCategory + "</span>";
        searchingLabel += "</div>";

        html = snippets[3];

        for (var i=0; i<dataArrDolls.length; i++) {
            if (dataArrDolls[i].brand == searchCategory) {
                onDisplay.push("a" + removeSpaces(dataArrDolls[i].name));
                var prepareToBody = insertProperty(html,"categoryshort", toShortCategory(dataArrDolls[i].brand));                
                var prepareToBody1 = insertProperty(prepareToBody,"imageURL",dataArrDolls[i].image[0].fields.file.url);
                var prepareToBody2 = insertProperty(prepareToBody1,"name",dataArrDolls[i].name);
                var prepareToBody3 = insertProperty(prepareToBody2,"id","a" + removeSpaces(dataArrDolls[i].name));
                toBody += prepareToBody3;
            }
        }
        // console.log(toBody);
        document.getElementById("body").innerHTML = toBody;
        clickableDolls();
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
            if (onDisplay.includes("a" + dataArrClothes[i].id)) {
                idToSend = dataArrClothes[i].id;
                document.getElementById("a" + dataArrClothes[i]).addEventListener("click",(hit)=>displayClothesIdPage(hit.target.id));
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
        
        var addImage = insertProperty(html,"img",img);

        // if (/* THERE ARE TWO PICTURES */) {
        //     img += "<img class=\"idImg\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-6 col-md-6 col-sm-12 col-xs-12";
        // }
        // if (/* THERE ARE THREE PICTURES */) {
        //     img = "<img class=\"idImg2\" src=\"doll.image\"></img>"; //NOT SURE IF THIS WILL GET THE IMAGE
        //     widthClass = "col-lg-4 col-md-4 col-sm-12 col-xs-12";
        // }
        var prepareToBody = insertProperty(addImage,"width",widthClass);
        var prepareToBody1 = insertProperty(prepareToBody,"categoryshort",toShortCategory(doll.brand));
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

        // console.log(prepareToBody8);

        toBody += prepareToBody8;
        searchingLabel = searchingLabel.replace("Search", "Return to search");
        searchingLabel = searchingLabel.replace("1", "2");
        document.getElementById("body")
        .innerHTML = searchingLabel + toBody;

        //document.getElementsByClassName("idImg").style.setProperty('--width', width + "%");

        document.getElementById("searchingLabelBox2").addEventListener("click",() =>
            displayDollSearch(searchCategory));
        
    } 
    var toRun = function() {
        homeButton();
        categoriesOpener();
    }
    toRun();
}

module.exports = script;