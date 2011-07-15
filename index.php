<html>
	<head>

		<title>Suivi de la consommation de l'eau du jardin Santerre</title>
		<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
			<link rel="stylesheet" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/themes/south-street/jquery-ui.css"></link>
			<link rel="stylesheet" href="css/style.css"></link>
	</head>
	<body id="body" class="ui-widget-content">

		<div id="add-dialog" title="Ajout un relever">
			<form id="form-add">
				<fieldset>
					<label for="dateRevele">Date du relevé</label>
					<input type="text" id="dateRevele" pattern="[0-9]{2}/[0-9]{2}/[0-9]{4}" name="dateReleve" required=""/>
					<label for="valeurRevele">Volume relevé (en litre, avec les 3 chiffres rouges)</label>
					<input id="valeurRevele" class="numeric" name="valeurRevele" pattern="[0-9]+" required=""/>
				</fieldset>
			</form>
		</div>
		<h1>Le suivi de l'eau du jardin Santerre</h1>
			<ul>
				<li>Si nous continuons à ce rythme de consommation, elle sera à la fin de l'année de  <span id="v_to_end"></span> litres</sup></li>
				<li id="li_nb_jours_last">Il s'est déjà écoulé <span id="nb_jours_last"></span> jours depuis le dernier relevé, nourrissez moi svp</li>
			</ul>
			<p>S’il ne pleut pas, un à deux arrosages par semaine d’un arrosoir pourrait faire l’affaire si on bine et si on paille.</p>
		<h1>Liste des relevés 
		<button id="add">Saisie d'un nouveau relevé</button>
		</h1>
		<table border="1" width="90%" align="center">
			<thead>
				<th>Date</th>
				<th>Volume</th>
				<th>Ecart depuis le dernier relevé <br>(en litres)</th>
				<th>Consommation<br>(en litres/sem)</th>
				<th>Par co-jardinier <br>(en litres/sem/parcelle)</th>
				<th>En arrosoir <br>(4.5l/sem/parcelle)</th>
			</thead>
			<tbody id="table_content">
				
			</tbody>
		</table>
		
		<div id="gtotal" style="float:left">
		
		</div>
		
		<div id="gweek" style="float:left">
		
		</div>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js" type="text/javascript"></script>
			<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.12/jquery-ui.min.js" type="text/javascript" ></script>
			<script src="raphael-min.js" type="text/javascript" charset="utf-8"></script>
			<script src="g.raphael-min.js" type="text/javascript" charset="utf-8"></script>
      <script src="g.line-min.js" type="text/javascript" charset="utf-8"></script>
			<script src="g.bar-min.js" type="text/javascript" charset="utf-8"></script>
			<script src="date.js"  type="text/javascript" charset="utf-8"></script>
			<script src="jshashtable-2.1.js" type="text/javascript" charset="utf-8"></script>
			<script src="jquery.numberformatter-1.2.2.js"  type="text/javascript" charset="utf-8"></script>
      <script src="jquery.ui.datepicker-fr.js" type="text/javascript"></script>
			<script src="santerre.js" type="text/javascript"></script>
	</body>
</html>
