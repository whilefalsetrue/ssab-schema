const monthsObj = {
    January: "31",
    February: "28",
    March: "31",
    April: "30",
    May: "31",
    June: "30",
    July: "31",
    August: "31",
    September: "30",
    October: "31",
    November: "30",
    December: "31"
};
const months = Object.keys(monthsObj);
var week = 0;
var xAxis = 6;
const team1DIV = ".team1";
const team2DIV = ".team2";
const team3DIV = ".team3";
const team4DIV = ".team4";
const team5DIV = ".team5";

const shiftPattern = [
    "F","F","F","E","E","N","N","","","","","",
    "F","F","E","E","E","N","N","","","","","",
    "F","F","E","E","N","N","N","","","",""
];
/*------------------------------------------
F   F   F   E   E   N   N   #   #   #
0   1   2   3   4   5   6   7   8   9

#   #   F   F   E   E   E   N   N   #
10  11  12  13  14  15  16  17  18  19

#   #   #   #   F   F   E   E   N   N
20  21  22  23  24  25  26  27  28  29

N   #   #   #   #
30  31  32  33  34
------------------------------------------*/



function setCellCoords(y, x) { table = $("table")[0]; cell = table.rows[y].cells[x];}
function setupTable() {
    var $table = $("table");
    $table.append(
        '<tr id="week0"> \
            <td>52</td> \
            <td></td> \
            <td></td> \
            <td></td> \
            <td></td> \
            <td></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
        </tr>'
    );

    for (i = 1; i <= 52; i++) {
        $table.append(
        `<tr id="week${i}"> \
            <td>${i}</td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
            <td><div class="shift team1"></div><div class="shift team2"></div><div class="shift team3"></div><div class="shift team4"></div><div class="shift team5"></div></td> \
        </tr>`
        );
    };

    dayOfYear = -1;
    for (i=0; i < months.length; i++) {
        days = monthsObj[months[i]];

        for (z=1; z <= Number(days); z++) {
            if (xAxis === 8) { /* Next week */
                week++;
                xAxis = 1;
            }
            setCellCoords(week, xAxis);

            $(cell).prepend('<div class="date-day">' + z + '</div>');
            $(cell).attr("id", "cell" + dayOfYear)

            xAxis++;
            dayOfYear++;
        }        
    }

    function addShifts(index, teamDIV) {
        if (teamDIV === team1DIV) {superscript = "&#185;"}
        else if (teamDIV === team2DIV) {superscript = "&#178;"}
        else if (teamDIV === team3DIV) {superscript = "&#179;"}
        else if (teamDIV === team4DIV) {superscript = "&#8308;"}
        else if (teamDIV === team5DIV) {superscript = "&#8309;"}

        for (i = -1; i <= 365; i++) {

            if (shiftPattern[index] === undefined) { index = 0; }

            if (shiftPattern[index] === "F") {
                $("#cell"+i).find(teamDIV).addClass("shift-first");
                $("#cell"+i).find(teamDIV).append(superscript + shiftPattern[index])

            } else if (shiftPattern[index] === "E") {
                $("#cell"+i).find(teamDIV).addClass("shift-second");
                $("#cell"+i).find(teamDIV).append(superscript + shiftPattern[index])

            } else if (shiftPattern[index] === "N") {
                $("#cell"+i).find(teamDIV).addClass("shift-third");
                $("#cell"+i).find(teamDIV).append(superscript + shiftPattern[index])
            }
            index++;
        }
    }
    addShifts(22, team1DIV);
    addShifts(8, team2DIV);
    addShifts(29, team3DIV);
    addShifts(15, team4DIV);
    addShifts(1, team5DIV);
};



function showTeamShifts(teamDIV, checkboxLabel) {
    $teamDIV = $(teamDIV);
    if ($teamDIV.css("display") === "flex") {
        $teamDIV.css("display", "none");
        checkboxLabel.children().closest("span").html("check_box_outline_blank");
    } else {
        $teamDIV.css("display", "flex");
        checkboxLabel.children().closest("span").html("check_box");
    };
    
    scrollToCurrentWeek(50);
};


function saveSettings() {
    for (i = 0; i < $checkbox.length; i++) {
        if ($checkbox.eq(i).html() === "check_box") {
            localStorage.setItem(`sss_showTeam${i+1}`, "true");
            console.log(i, 'Boolean( localStorage.getItem(`sss_showTeam${i+1}`)) :', String(localStorage.getItem(`sss_showTeam${i+1}`)));
        } else {
            localStorage.setItem(`sss_showTeam${i+1}`, "false");
            console.log(i, 'Boolean( localStorage.getItem(`sss_showTeam${i+1}`)) :', String(localStorage.getItem(`sss_showTeam${i+1}`)));
        }
    };
}
function loadSettings() {
    for (i = 0; i < $checkbox.length; i++) {
        currentTeamDIV = $(`.team${String(i+1)}`);
        if (String(localStorage.getItem(`sss_showTeam${i+1}`)) === "true") {
            $checkbox.eq(i).html("check_box");
            currentTeamDIV.css("display", "flex");
        } else if (String(localStorage.getItem(`sss_showTeam${i+1}`)) === "false") {
            $checkbox.eq(i).html("check_box_outline_blank");
            currentTeamDIV.css("display", "none");
        }
    };
}


function scrollToCurrentWeek(speed) {

    $('html, body').animate({
        scrollTop: $(weekID).offset().top
    }, speed);
}



$(document).ready(function() {
    setupTable();

    $checkbox = $("span");
    loadSettings();

    weekID = "#week" + (moment().week() - 1);
    $(weekID).prepend('<div class="overlay"></div>')
    scrollToCurrentWeek(400);

    $("label").on("mouseup", function() {
        thisID = $(this).children().closest("input").attr("id");
        teamNumber = thisID.replace(/[^0-9.]/g, "");
        showTeamShifts(".team" + teamNumber, $(this));
    });

});



$(window).bind('beforeunload', function() {
    saveSettings();
});