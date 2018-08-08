var password = "Bez pracy nie ma kołczy";
password = password.toUpperCase();
var p_length = password.length;

var password_seen = "";

var yes = new Audio("yes.wav");
var bad = new Audio("no.wav");

for (i = 0; i < p_length; i++) {
    if (password.charAt(i) == " ") password_seen = password_seen + " ";
    else password_seen = password_seen + "-";
}

function show_password() {
    document.getElementById("board").innerHTML = password_seen;
}

window.onload = start;

//sposob z tablica zamias string ( w div wtedy letter(i):
var letter = new Array(35);

letter[0] = "A";
letter[1] = "Ą";
letter[2] = "B";
letter[3] = "C";
letter[4] = "Ć";
letter[5] = "D";
letter[6] = "E";
letter[7] = "Ę";
letter[8] = "F";
letter[9] = "G";
letter[10] = "H";
letter[11] = "I";
letter[12] = "J";
letter[13] = "K";
letter[14] = "L";
letter[15] = "Ł";
letter[16] = "M";
letter[17] = "N";
letter[18] = "Ń";
letter[19] = "O";
letter[20] = "Ó";
letter[21] = "P";
letter[22] = "Q";
letter[23] = "R";
letter[24] = "S";
letter[25] = "Ś";
letter[26] = "T";
letter[27] = "U";
letter[28] = "V";
letter[29] = "W";
letter[30] = "X";
letter[31] = "Y";
letter[32] = "Z";
letter[33] = "Ż";
letter[34] = "Ź";

/*var letter = "aąbcćdeęfghijklłmnńoópqrsśtuvwxyzźż";
letter = letter.toUpperCase()*/

function start() {
    var letter_div = " ";

    for (i = 0; i < 35; i++) {
        var element = "l" + i;

        letter_div = letter_div + '<div class="letters" onclick="check(' + i + ')" id="' + element + '">' + letter[i] + '</div>';

        if ((i + 1) % 7 == 0) letter_div = letter_div + '<div style="clear:both"></div>';
    }

    document.getElementById("alphabet").innerHTML = letter_div;
    show_password();
}

String.prototype.setChar = function (place, character) {
    if (place > this.length - 1) return this.toString();
    else return this.substr(0, place) + character + this.substr(place + 1)

}

var mistake=0;
function check(no) {

    var hit = false;
    for (i = 0; i < p_length; i++) {
        if (password.charAt(i) === letter[no]) {
            password_seen = password_seen.setChar(i, letter[no]);
            hit = true;
        }
    }

    if (hit === true) {
        yes.play();
        var element="l"+no;
        show_password();
        document.getElementById(element).style.backgroundColor="#003300";
        document.getElementById(element).style.color="#00C000";
        document.getElementById(element).style.border=" 3px solid #00C000";
        document.getElementById(element).style.cursor="default";

        if(password_seen===password && mistake<9)
        {
            document.getElementById("board").innerHTML =password+ '<br/></br/>  Odgadłeś hasło. Brawo!';
            document.getElementById("alphabet").innerHTML ='<span class="reset" onclick="location.reload()">JESZCZE RAZ? </span>';

        }

    }
    else {
        bad.play();
        var element="l"+no;
        mistake++;
        document.getElementById(element).style.backgroundColor="#330000";
        document.getElementById(element).style.color="#ee3f3f";
        document.getElementById(element).style.border=" 3px solid #8b0000";
        document.getElementById(element).style.cursor="default";
        document.getElementById(element).setAttribute("onclick", ";")

        document.getElementById("gallows").innerHTML= '<img src="img/s'+mistake+'.jpg" alt=" ">';
        if(mistake>=9)
        {
            document.getElementById("board").innerHTML =password+'<p>"Koniec gry. Przegrałeś"</p>';
            document.getElementById("alphabet").innerHTML ='<span class="reset" onclick="location.reload()">JESZCZE RAZ? </span>';
        }


    }
}