$(function() {
	$("button").button();
	$("#li_nb_jours_last").hide();
	$("#dateRevele").datepicker({
			showButtonPanel: true,
			defaultDate: 0
		});
	$("#add-dialog").dialog( {
		autoOpen: false,
		modal: true,
		title: 'Ajouter un relevé',
		buttons: {
			"Enregistrer" : function () {
				var fields = $(":input").serializeArray();
				$.ajax({
					url: 'save.php',
					data: fields,
					success: function () {
						$( "#add-dialog" ).dialog( "close" );
						refresh();
					}
				});
			},
			cancel: function () {
				$( this ).dialog( "close" );
			}
		}
	});
	
	$("#add").click(function() {
		$("#add-dialog").dialog('open');
	});
	$("#panel-add-submit").click(function() {
		$("#add-dialog").dialog('close');
	});
	
	function round(val) {
		return (typeof(val) == "undefined" || val == null ? "&nbsp;": $.formatNumber(val,{locale:"fr"}));
	}
	
	function nvl(val, newval) {
		return (val == null? newval: val);
	}
	var list_releves = [];
	var points_week = [], points_total= [], points_jardinier = [];
	
	function prix() {
		$.ajax({
			url: 'prix.php',
			success: function (data) {
				data = data[0];
				
				var v_to_end = 	list_releves[0].v_par_time*data.toend;
		
				points_total.push([Date.parseString(nvl(data.end,"&nbsp;"),'yyyy-MM-dd').getTime(), v_to_end]);
				var gtotal = $("#gtotal");
				var plot = $.plot(gtotal, [{label:"Volume",data:points_total}], { xaxis: { mode: "time", 
						monthNames: months } });
				o = plot.pointOffset({ x: Date.parseString(nvl(list_releves[list_releves.length-1].dafter,"&nbsp;"),'yyyy-MM-dd').getTime(), y: v_to_end});
				gtotal.append('<div style="position:absolute;left:' + (o.left + 4) + 'px;top:' + o.top + 'px;color:#666;font-size:smaller">Mesuré</div>');
				
				o = plot.pointOffset({ x: Date.parseString(nvl(list_releves[0].dafter,"&nbsp;"),'yyyy-MM-dd').getTime(), y: v_to_end});
				gtotal.append('<div style="position:absolute;left:' + (o.left + 4) + 'px;top:' + o.top + 'px;color:#666;font-size:smaller">Prévisions</div>');
				var ctx = plot.getCanvas().getContext("2d");
				ctx.beginPath();
				o.left += 4;
				ctx.moveTo(o.left, o.top);
				ctx.lineTo(o.left, o.top - 10);
				ctx.lineTo(o.left + 10, o.top - 5);
				ctx.lineTo(o.left, o.top);
				ctx.fillStyle = "#000";
				ctx.fill();

				v_to_end = $.formatNumber(v_to_end,{locale:"fr"});
				$("#v_to_end").text( v_to_end);
				if (list_releves[0].nb_jours_last<-7) {
					$("#nb_jours_last").text(-list_releves[0].nb_jours_last);
					$("#li_nb_jours_last").show();
				}
			}
		});
	}
	var months = ["Jan","Fev","Mar","Avr","Mai","Juin", "Juil", "Aout", "Sept", "Oct", "Nov", "Dec"];
	function refresh() {
		$.ajax({
			url: 'list.php',
			success: function (data) {
				list_releves = data;
				$("#table_content").empty();
				for(line in data) {
					data[line].ddiff = nvl(data[line].ddiff,0);
					data[line].vdiff = nvl(data[line].vdiff,0);
					if (data[line].ddiff != 0) {
						var v_par_time = data[line].vdiff / data[line].ddiff;
						data[line].v_par_time =v_par_time;
					}
					points_total.unshift([Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').getTime(), Math.round(data[line].vafter)]);
					points_week.unshift([Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').getTime(), Math.round(data[line].v_par_time)]);
					points_jardinier.unshift([Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').getTime(), Math.round(data[line].v_par_time/46)]);
					$("#table_content").append(
					"<tr>"+
					"<td>"+Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').format('dd/MM/yy')+"</td>"+
					"<td class='numeric'>"+round(data[line].vafter)+"</td>"+
					"<td class='numeric'>"+round(v_par_time)+"</td>"+
					"<td class='numeric'>"+ round(v_par_time/46)+"</td>"+
						"<td class='numeric'>"+round(v_par_time/46/4.5)+"</td>"+
					"</tr>");
					
				}
				$.plot($("#gweek"), [{label:"Consommation",data:points_week}], 
					{ 
					xaxis: { 
						mode: "time" ,
						monthNames: months,
						timeformat: "%d %b"
					}, 
					yaxis: {min: 0} 
					});
				$.plot($("#gjardinier"), [{label:"Par co-jardinier",data:points_jardinier}], { xaxis: { mode: "time", 
						monthNames: months,
						timeformat: "%d %b"}, yaxis: {min: 0} });
				prix();
			}
		});
	}
	$("#refresh").click(function() {
		refresh();
	});
	
	refresh();
});
