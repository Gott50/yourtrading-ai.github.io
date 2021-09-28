//Stein
var navWeiterClicked;
var isInputProcessing;
var isNavigationDisabled;

function tabu(field, index) {
  try {
    findElem(field).setAttribute('tabIndex', index);
  } catch (exception_var) {
    // myLog('CATCH : '+exception_var);
  }
}

function tabu2(field1, field2, index) {
  tabu(field1, index);
  tabu(field2, index++);
}

function tabu3(field1, field2, field3, index) {
  tabu(field1, index);
  tabu(field2, index++);
  tabu(field3, index++);
}

function tabu4(field1, field2, field3, field4, index) {
  tabu(field1, index);
  tabu(field2, index++);
  tabu(field3, index++);
  tabu(field4, index++);
}

function focu(id) {
  foc(id);
}
function foc(id) {
  var el = findElemForFoc(id);
  if (el != undefined) {
    el.focus();
    if(el.tagName==="INPUT"){
      el.select();
    }
  } else {
    console.log('foc(\'' + id + '\'): element not found');
  }
}

function findElemForFoc(id) {
  var allInputs = document.getElementsByTagName('input');
  var len = allInputs.length;

  for (var i = 0; i != len; i++) {
    var input = allInputs[i];
    var inputId = input.getAttribute('id');
    if (inputId && inputId.indexOf(id) != -1) {
      if (input.type === 'radio' && !input.checked) {
        continue;
      }
      return input;
    }
  }
  var allSelects = document.getElementsByTagName('select');
  len = allSelects.length;
  for(var i = 0; i <len; i++){
    var select = allSelects[i];
    var selectId = select.getAttribute('id');
    if (selectId && selectId.indexOf(id) != -1) {
      return select;
    }
  }
}

function hideEnableElementsWithClassBasedOnCheckbox(checkbox, className) {
  var elements = document.getElementsByClassName(className);
  var isChecked = checkbox.checked;
  for (var i = 0; i < elements.length; i++) {
    if (isChecked) {
      elements[i].className = elements[i].className.replace(
          "display_none", "");
    } else {
      elements[i].className += " display_none";
    }
  }
}

// Stein

function ajaxStart() {
}

function ajaxComplete() {
  enableSubmit();
  changeCompleted()
}

function changeCompleted(){
  isInputProcessing = false;
  if(navWeiterClicked){
    clickWeiterButton();
  }
}

function pageInitialisation() {

  getLocationInformation();
  navWeiterClicked = false;
  isInputProcessing = false;
  isNavigationDisabled = false;
  setTabindices();
  focusFirstElement();
  if (isIE()) {
    setIELabels();
  } else {
    setPlaceholders();
  }
  $.extend( $.ui.keyCode, { //workaround fuer Chrome Bug (Bei Auswahl eines von Chrome erstellten Vorschlags, wurde automatisch das Primeface DefaultCommand ausgefuehrt)
	  NUMPAD_ENTER: 108
	});
}

function setInputHandler(){
	$(':text').on("input", inputProcessing);
//	$('.ui-autocomplete-input').on('keydown', checkAutocomplete);
}

function inputProcessing(event){
	isInputProcessing = true;
}


//PrimeFaces Calendar loest kein input Event aus, wenn eine Eingabemaske genutzt wird. Deshalb muss geprueft werden, ob die gedrueckte Taste eine Ziffer ist.
function calenderKeyDownEvent(event){
	if(event.key.match("[0-9]")){
		isInputProcessing=true;
	}
}

// hack since jsf 1.2 does not support placeholder
function setPlaceholders() {
  var elementsFound = getElementsByClassName('placeholderfehlsichtigkeit1');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.placeholder = "li";
  }

  elementsFound = getElementsByClassName('placeholderfehlsichtigkeit2');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.placeholder = "re";
  }

  elementsFound = getElementsByClassName('placeholdergroesse');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.placeholder = "cm";
  }

  elementsFound = getElementsByClassName('placeholdergewicht');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.placeholder = "kg";
  }
}

function setIELabels() {
  var elementsFound = getElementsByClassName('groesseLabel');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.style.display = "inline";

  }

  var elementsFound = getElementsByClassName('gewichtLabel');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.style.display = "inline";

  }

  var elementsFound = getElementsByClassName('liLabel');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.style.display = "inline";

  }

  var elementsFound = getElementsByClassName('reLabel');
  for (var i = 0; i < elementsFound.length; i++) {
    var elementFound = elementsFound[i];
    elementFound.style.display = "inline";

  }
}

function isIE() {
  // Internet Explorer 6-11
  return /* @cc_on!@ */false || !!document.documentMode;
}

// ie7
function getElementsByClassName(classname) {
  var a = [];
  var re = new RegExp('(^| )' + classname + '( |$)');
  var els = document.getElementsByTagName("*");
  for (var i = 0, j = els.length; i < j; i++)
    if (re.test(els[i].className))
      a.push(els[i]);
  return a;
}

function findElem(id) {
  var allInputs = document.getElementsByTagName('input');
  var len = allInputs.length;

  for (var i = 0; i != len; i++) {
    var input = allInputs[i];
    var inputId = input.getAttribute('id');

    if (inputId && inputId.match(id)+"\z") {
      if (input.type === 'radio' && !input.checked) {
        continue;
      }
      return input;
    }
  }
} // function end

function focusFirstElement() {
  var firstElementIndex = 1;
  findfocusElementWithtabIndex(firstElementIndex);
}

function findfocusElementWithtabIndex(index) {
  var elems = document.getElementById(formId).elements;
  for (var i = 0; i != elems.length; i++) {
    var elem = elems[i];

    if (index === elem.getAttribute('tabIndex')) {
      if (!elem.hidden && !elem.disabled && !elem.readOnly) {
        elem.focus();
        if (!(elem.tagName === 'SELECT'))
          elem.select();
        break;
      } else {
        index++;
      }
    }
  }
}

function setTabindices() {

  // Für die aufgelisteten activen Tabs wird der Tabindex als Teil der Seite
  // selbst über den Aufruf der "tabu*-Methoden aus dialogSites.js gesteuert.
  // Diese Indizierung darf an dieser Stelle nicht überschrieben werden, da
  // andernfalls das initialie Tabbingverhalten nicht den Anforderungen
  // entspricht.
  if (window.actTab === risk || window.actTab === seu
      || window.actTab === sbu || window.actTab === tarifAuswahl || berufsAuswahl) {
    return;
  }

  var index = 1;
  var elems = document.getElementById(formId).elements;
  for (var i = 0; i != elems.length; i++) {
    var elem = elems[i];
    if (elem.tagName === 'INPUT' || elem.tagName === 'BUTTON'
        || elem.tagName === 'SELECT') {
      if (!elem.hidden && !elem.disabled && !elem.readOnly) {
        elem.setAttribute('tabIndex', index);
        index++;
      }
    }
  }
}

function setNewFocusById(id) {
  // var input = findElem(id);
  var flag = 1;
  var elems = document.getElementById(formId).elements;
  for (var i = 0; i != elems.length; i++) {
    var elem = elems[i];
    var elemId = elem.getAttribute('id');

    if (flag === 2) {
      if (!elem.hidden && !elem.disabled && !elem.readOnly) {
        // if(elemId && elemId.indexOf(id) == -1){
        try {
          elem.focus();
          elem.select();
          break;
        } catch (e) {
          return false;
        } finally {
        }
        // }
      }
    }

    if (elemId && elemId.indexOf(id) != -1) {
      /*
       * if (elem.type === 'radio') { if(elem.checked) { flag++; } }else {
       */
      flag++;
      // }
    }

  }
  return true;
}

function focusold(id) {
  var input = findElem(id);
  alert(input.getAttribute('tabIndex'));
  if (input) {
    input.focus();
    input.select();
  }
}

function digitsOnly(event) {
  var IE = window.event;
  if (!event)
    var event = window.event;
  var target = (IE) ? event.srcElement : event.target;
  var keycode = (IE) ? event.keyCode : event.charCode;
  if (keycode == 0 || keycode == 8 || keycode == 9 || keycode == 39) {
    return true;
  }
  return /^[0-9]$/.test(String.fromCharCode(keycode));
}

function digitsOnlyWithKomma(event) {
  var IE = window.event;
  if (!event)
    var event = window.event;
  var target = (IE) ? event.srcElement : event.target;
  var keycode = (IE) ? event.keyCode : event.charCode;
  if (keycode == 0 || keycode == 8 || keycode == 9 || keycode == 39) {
    return true;
  }

  return /^[0-9]|,$/.test(String.fromCharCode(keycode));
}

function hideModalPanels() {
  var popupDiaDokumentenWahl = PF('popupDiaDokumentenWahl');
  if (typeof popupDiaDokumentenWahl !== 'undefined') {
    popupDiaDokumentenWahl.hide();
  }

  var popupDiaParameterlink = PF('popupDiaParameterlink');
  if (typeof popupDiaParameterlink !== 'undefined') {
    popupDiaParameterlink.hide();
  }
}

function alphaNumericOnly(event) {
  var IE = window.event;
  if (!event)
    var event = window.event;
  var target = (IE) ? event.srcElement : event.target;
  var keycode = (IE) ? event.keyCode : event.charCode;
  if (keycode == 0 || keycode == 8 || keycode == 9 || keycode == 39) {
    return true;
  }

  return /^[a-z0-9]+$/i.test(String.fromCharCode(keycode));
}

function clickNextChangeTarifButton() {

  var allInputs = document.getElementsByTagName('input');
  var len = allInputs.length;
  for (var i = 0; i != len; i++) {

    if (allInputs[i].id != null
        && allInputs[i].id.indexOf("ifCmdBottomButtNextChangeTarif") !== -1) {
      allInputs[i].click();
      return false;
    }
  }
}

function removePanel() {
  var panelElemDE = document.getElementById("dialog_de_dias:subDialogPanel");
  var panelElemAT = document.getElementById("dialog_at_dias:subDialogPanel");
  if (panelElemDE !== null) {
    panelElemDE.outerHTML = "";
  }
  if (panelElemAT !== null) {
    panelElemAT.outerHTML = "";
  }
}

/**
 * Diese Funktion kann im "onblur" von Eingabefeldern verwendet werden, um ein
 * Submit zu verhindern, bevor das Change-Event gefeuert wurde.
 */
function disableSubmitUntilChangeEventHasBeenFired() {
//  // sofort Submit verbieten:
//  disableSubmit();
//
//  // Watchdog mit Hilfe von setTimeout setzen:
//  var enableSubmitAfterTimeout = function() {
//    enableSubmit();
//  };
//  setTimeout(enableSubmitAfterTimeout, 300);
//  // d.h. spätestens nach 300ms wird Submit wieder erlaubt, wenn nicht
//  // bereits vorher von irgendwoher enableSubmit() aufgrufen wird.
//  //
//  // Begründung für die Verwendung eines Watchdogs anstelle z.B.
//  // von einem Change-Event-Handler: Wenn der Feldwert nicht geändert
//  // wurde, wird nie ein Change-Event gefeuert, und Submit würde
//  // deaktiviert bleiben. Außerdem ist es zu spät, im onblur-Handler
//  // einen onchange-Handler zu registrieren.
}


/* Prüft ob es Vorschläge für die Eingabe des Nutzers gibt und die Eingabe per Enter Taste bestätigt wurde.*/
function autoCompleteChildrenExistOnEnterPressed(event, autoComplete){
  return (event.keyCode == 13 && autoComplete.panel.children().children().length==0);
}

function autoCompleteErkrankungChildrenExistOnEnterPressed(event, autoComplete){
  return (event.keyCode == 13 && autoComplete.panel.children().children().children().length==0);
}

function focNextButton(event){
	if(event.keyCode== 13){
	    var btDe = document
	        .getElementById('dialog_de_dias:ifCmdBottomButtNext');
	    if (btDe != null) {
		    btDe.focus();
	  	  return;
	  	}
	  	var btAt = document
	  	    .getElementById('dialog_at_dias:ifCmdBottomButtNext');
	  	if (btAt != null) {
	  	  btAt.focus();
	  	  return false;
	  	}
	}
}

//function checkAutocomplete(event){
//	if(event.keyCode == 13){
//
//		var pfElement = PrimeFaces.widgets[document.activeElement.alt];  //Bei geoeffneten autocomplete dropdown darf keine Navigation ausgefuehrt werden
//		var isVisible = pfElement.panel.is(':visible');
//		if(pfElement && pfElement.panel.is(':visible')){
//			isNavigationDisabled = true;
//			return;
//		}
//	}
//}

function clickWeiterButton(){
	if(isNavigationDisabled){
		isNavigationDisabled = false;
		return false;
	}
	if(isInputProcessing){ //Change wird aktuell noch durchgeführt
	  navWeiterClicked = true;
	  return false;
	}
    var btDe = document
	    .getElementById('dialog_de_dias:ifCmdBottomButtNext');
	if (btDe != null) {
	  btDe.click();
	  return false;
	}
	var btAt = document
	    .getElementById('dialog_at_dias:ifCmdBottomButtNext');
	if (btAt != null) {
	  btAt.click();
	  return false;
	}
}

//TODO Funktionen in Zusammenhang mit den autocomplete Feldern in extra js Datei auslagern


function autoCompleteChangeStart(widget){

    if(widget.panel.is(':visible')){
        return false;
    }
    else{
        autoCompleteItemSelectedStart(widget);
    }
}

function autoCompleteItemSelectedStart(widget){
  widget.disable();
}

function autoCompleteItemSelectedComplete(oldWidget, isAustria, fragenNummer, erkrankung, vpIndex){
  oldWidget.enable();
  //$('#dialog_de_dias\\:idVpTabPanel\\:ghdkurz0\\:zusatzDatenF5E0VP0').is(":visible")
  var vpPanelID = oldWidget.id.substring(0, oldWidget.id.lastIndexOf(':')).replace(/:/g, "\\:");
  var frage1ID =vpPanelID+"\\:zusatzFrage1JaCbF"+fragenNummer+"E"+erkrankung+"VP"+vpIndex;
  var frage1 = $('#'+frage1ID);
  if(frage1.is(':visible')){
    frage1.focus();
    return;
  }
  var zusatzDatenID =vpPanelID+'\\:zusatzDatenF'+fragenNummer+'E'+erkrankung+'VP'+vpIndex;
  var zusatzDaten = $('#'+zusatzDatenID);
  if(zusatzDaten.is(':visible')){
    zusatzDaten.focus();
    return;
  }
  var neueErkrankung = PF('autoCompleteF'+fragenNummer+'VP'+vpIndex);
  neueErkrankung.input.focus();
}

//prüft alle Pflichtfelder auf Inhalt
function checkRequiredInput(){
	
	var error = false;
	
	if(jQuery("img[pflichtfeldimage='true']").not('.display_none').length > 0){
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		$('body').addClass('display-validation-errors');
		
//		$('.checkbox-is-invalid input[type="checkbox"]').one('click', function(event)
//				{ event.target.parentElement.classList.remove('checkbox-is-invalid'); }
//
//				);
		
		$("[error='msg']").removeClass('display_none');
		$("[error='msg'] tr").empty();
		
		var imgHtml = '<td><img src="/dias-online-calculator/images/checkNotOk.png" class="msgImage"/></td>';
		var msgHtml = '<td><span class="pflichtfeld">Bitte füllen Sie alle fehlenden Felder aus</span></td>';
		
		$(document).ready(function() {
			$("[error='msg'] tr").append(imgHtml);
			$("[error='msg'] tr").append(msgHtml);
		
		});
		error = true;
	}
	
	return error;
}

function getLocationInformation()
{
    
	var host = document.getElementById('dialog_de_dias:location_host');
    if(host == null)
    {
    	host = document.getElementById('dialog_at_dias:location_host');
    }
    
    host.value = window.location.host;
}

//prüft alle Pflichtfelder auf Inhalt
function checkRequiredInputEinwilligung(){
	
	var error = false;
	
	if(jQuery("img[pflichtfeldimage='true']").not('.display_none').length > 0){
		$('html, body').animate({ scrollTop: 0 }, 'fast');
		$('body').addClass('display-validation-errors');
		
//		$('.checkbox-is-invalid input[type="checkbox"]').one('click', function(event)
//				{ event.target.parentElement.classList.remove('checkbox-is-invalid'); }
//
//				);
		
		$("[error='msg']").removeClass('display_none');
		$("[error='msg'] tr").empty();
		
		var imgHtml = '<td><img src="/dias-online-calculator/images/icon/dialog-error.png" class="msgImage"/></td>';
		var msgHtml = '<td><span class="pflichtfeld">Zur Durchführung der elektronischen Unterschrift stimmen Sie bitte der unten aufgeführten Erklärung zu.</span></td>';
		
		$(document).ready(function() {
			$("[error='msg'] tr").append(imgHtml);
			$("[error='msg'] tr").append(msgHtml);
		
		});
		error = true;
	}
	
	return error;
}

// Deutsche Textbausteine für Primefaces Kalender:
PrimeFaces.locales['de'] = {
  closeText : 'Schließen',
  prevText : 'Zurück',
  nextText : 'Weiter',
  monthNames : [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli',
      'August', 'September', 'Oktober', 'November', 'Dezember' ],
  monthNamesShort : [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
      'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ],
  dayNames : [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag',
      'Freitag', 'Samstag' ],
  dayNamesShort : [ 'Son', 'Mon', 'Die', 'Mit', 'Don', 'Fre', 'Sam' ],
  dayNamesMin : [ 'So', 'Mo', 'Di', 'Mi ', 'Do', 'Fr ', 'Sa' ],
  weekHeader : 'Woche',
  firstDay : 1,
  isRTL : false,
  showMonthAfterYear : false,
  yearSuffix : '',
  timeOnlyTitle : 'Nur Zeit',
  timeText : 'Zeit',
  hourText : 'Stunde',
  minuteText : 'Minute',
  secondText : 'Sekunde',
  currentText : 'Aktuelles Datum',
  ampm : false,
  month : 'Monat',
  week : 'Woche',
  day : 'Tag',
  allDayText : 'Ganzer Tag'
}
// Hier werden alle pfelder mit required auf true gesetzt
function setAllFieldRequiredToRequired() {
	$('.field-required:not([required])').prop('required', true);
}
$(function() {
	setInterval(setAllFieldRequiredToRequired, 2000);
});

