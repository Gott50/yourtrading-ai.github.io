//Stein
tarifAuswahl = 'TARA';
berufsAuswahl = 'BERA';
risk = 'RISIKO';
sbu = 'SBU';
seu = 'SEU';


actTab = '';


function setActTab(aT){
	actTab = aT;
}

function tabuDauer(){
	if(actTab==risk){
		tabuRisikoDauer();
	}
	if(actTab==seu){
		tabuSeuDauer();
	}
	if(actTab==sbu){
		tabuSbuDauer();
	}
}

function tabuEndalter(){
	if(actTab==risk){
		tabuRisikoEndalter();
	}
	if(actTab==seu){
		tabuSeuEndalter();
	}
	if(actTab==sbu){
		tabuSbuEndalter();
	}
}

function tabuRisikoEndalter() {
	tabu3('VSDEndalt', 'BZDEndalt', 'vorgabeValue', 2000);
}


function tabuSeuDauer() {
	tabu4Dauer();
	tabu4('VSDvalue', 'BZDvalue', 'LSDvalue','vorgabeValue', 1000);
}

function tabuSeuEndalter() {
	tabu4Endalter();
}

function tabuSbuDauer() {
	tabu4Dauer();
}

function tabuSbuEndalter() {
	tabu4Endalter();
}

function tabu4Dauer() {
	tabu4('VSDvalue', 'BZDvalue', 'LSDvalue','vorgabeValue', 1000);
}

function tabu4Endalter() {
	tabu4('VSDEndalt', 'BZDEndalt', 'LSDEndalt','vorgabeValue', 2000);
};

