/**
 * Diese Datei fasst einige Hilfsfunktionen zusammen, die es
 * gestatten, eine Dokument in einem separaten Browserfenster
 * anzuzeigen.
 */


/**
 * Diese Funktion erzeugt ein neues Fenster, das anschliessend
 * einen statischen Content lädt.
 *
 * @param showUrl
 * @param showTitle
 */
function spawnStaticPdfWindow(showUrl,showTitle)
{
	if ("" == showUrl)
	{
		return ;
	}
	else
	{
		//window.open('http://www.dialog-leben.de/internet/dialog-leben/dialog-leben.nsf/contentByKey/HRIK-6FZGQR-DE-p', 'Formular-Downloads','dependent=yes, menubar=no, toolbar=no');
		window.open(showUrl, showTitle, 'dependent=yes, resizable=yes, menubar=no, toolbar=no');
	}
}

function printWindow()
{
	window.print();
}

function goToAustrianRechner(zk)
{
		// Contextroot mit vollstaendiger Pfadangabe ohne erstes '/'
		var path = window.location.pathname.substring(1,window.location.pathname.length);
		// Contextroot bestimmen ohne beendendes '/'
		var contextRoot = path.substring(0, path.indexOf("/"));
				
		var zkParam = '09' + zk.substr(2, zk.length - 1);
			
		var startSeiteUrl = window.location.protocol+'//'+window.location.hostname+':'+window.location.port+'/'+ contextRoot+'/?ZK=' + zkParam; 
		
		window.open(startSeiteUrl,'_self');
}

function getURLParameter(name) {
	  var value = decodeURIComponent((RegExp(name + '=' + '(.+?)(&|$)','i').exec(location.search) || [, ""])[1]);
	  return (value !== 'null') ? value : false;
}


function spawnGenericWindow(baseUrl, sessId, showTitle, cmdPrint, parm1, parm2, parm3, parm4, parm5)
{
	// Zuerst komplettieren wir die URL
	var urlAndParms	= baseUrl

	if (0 < cmdPrint.length)
	{
		urlAndParms = urlAndParms.concat("/" + cmdPrint) ;

		if (0 < parm1.length)
		{
			urlAndParms = urlAndParms.concat("/" + parm1) ;

			if (0 < parm2.length)
			{
				urlAndParms = urlAndParms.concat("/" + parm2) ;

				if (0 < parm3.length)
				{
					urlAndParms = urlAndParms.concat("/" + parm3) ;

					if (0 < parm4.length)
					{
						urlAndParms = urlAndParms.concat("/" + parm4) ;

						if (0 < parm5.length)
						{
							urlAndParms = urlAndParms.concat("/" + parm5) ;
						}
					}
				}
			}
		}

		var jsfAndSessId	=  "/genPrintPage.jsf;jsessionid=" + sessId ;
		var urlAccSess		= urlAndParms + jsfAndSessId ;

		// Zur Gegenkontrolle
		// alert( "call->" + accUrl + parmFolge) ;


		window.open(urlAccSess, showTitle, 'dependent=yes, menubar=no, toolbar=no');
	}
	else
	{
		// Zur Gegenkontrolle
		alert( "fail->" /*+ accUrl + parmFolge*/) ;
	}
}
