
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
	var x_total = [], y_total = [], y_week = [];
	
	function prix() {
		$.ajax({
			url: 'prix.php',
			success: function (data) {
				
		try {
			data = data[0];
			
			var v_to_end = 	list_releves[0].v_par_time*data.toend;
	
			y_total.push(v_to_end);
			v_to_end = $.formatNumber(v_to_end,{locale:"fr"});
			$("#v_to_end").text( v_to_end);
			if (list_releves[0].nb_jours_last<-7) {
				$("#nb_jours_last").text(-list_releves[0].nb_jours_last);
				$("#li_nb_jours_last").show();
			}
			x_total.push(Date.parseString(nvl(data.end,"&nbsp;"),'yyyy-MM-dd').getTime());
	
			console.log(x_total);
			
			console.log(y_total);
			var r = Raphael("gtotal");
			r.g.text(160, 10, "Voulmes actuels et prévisions");
			var lines = r.g.linechart(10,10,300,220, [x_total],[y_total]);
			lines.axis[0].text = "ici";
			lines.axis[1].text = "la";
		}	catch (e) {
			console.error(e);
		}
			}
		});
	}
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
					x_total.unshift(Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').getTime());
					y_total.unshift(Math.round(data[line].vafter));
					y_week.unshift(Math.round(data[line].v_par_time));
					try {
						$("#table_content").append(
						"<tr>"+
						"<td>"+Date.parseString(nvl(data[line].dafter,"&nbsp;"),'yyyy-MM-dd').format('dd/MM/yy')+"</td>"+
						"<td class='numeric'>"+round(data[line].vafter)+"</td>"+
						"<td class='numeric'>"+round(data[line].vdiff)+"</td>"+
						"<td class='numeric'>"+round(v_par_time)+"</td>"+
						"<td class='numeric'>"+ round(v_par_time/46)+"</td>"+
							"<td class='numeric'>"+round(v_par_time/46/4.5)+"</td>"+
						"</tr>");
					} catch (e) {
						console.error(e);
					}
				}
				
				
			var w = Raphael("gweek");
			w.g.text(160, 10, "Consommation (en litres/sem)");
			console.log(x_total);
			console.log(y_week);
			var lines = w.g.barchart(10,10,300,220,[y_week]);
				prix();
			}
		});
	}
	$("#refresh").click(function() {
		refresh();
	});
	
	refresh();
});
