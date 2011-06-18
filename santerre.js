
$(function() {
	$("button").button();
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
		return Math.floor(val*10)/10;
	}
	
	function nvl(val, newval) {
		return (val == null? newval: val);
	}
	var list_releves = [];
	function prix() {
		$.ajax({
			url: 'prix.php',
			success: function (data) {
				data = data[0];
/*				$("#vrai_releve").text(data.end);
			$("#nb_jours_to_vrai_releve").text(round(data.toend));
				$("#prix_m3").text(data.price);
				$("#last_v_par_time").text(round(list_releves[0].v_par_time / 1000)); */
				var v_to_end = 	list_releves[0].v_par_time*data.toend / 1000;
//				$("#v_to_end").text(round(v_to_end));
				var prix_to_end = data.price*((list_releves[0].vafter / 1000 +v_to_end));
				$("#prix_total").text(round(prix_to_end));
/*				$("#co_jardinier").text(data.co_jardinier);
				$("#v_to_end_chacun").text(round(v_to_end/data.co_jardinier));
				$("#prix_chacun").text(round(prix_to_end / data.co_jardinier));*/
				$("#li_nb_jours_last").hide();
				if (list_releves[0].nb_jours_last>7)
					$("#li_nb_jours_last").show();
//				$("#nb_jours_last").text(list_releves[0].nb_jours_last);
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
					$("#table_content").append(
					"<tr>"+
					//"<td>"+data[line].dbefore+"</td>"+
					//"<td class='numeric'>"+data[line].vbefore+"</td>"+
					"<td>"+nvl(data[line].dafter,"&nbsp;")+"</td>"+
					"<td class='numeric'>"+nvl(data[line].vafter,"&nbsp;")+"</td>"+
					//"<td class='numeric'>"+round(data[line].ddiff)+"</td>"+
					"<td class='numeric'>"+data[line].vdiff+"</td>"+
					"<td class='numeric'>"+(typeof(v_par_time) == "undefined" ? "&nbsp;": round(v_par_time))+"</td>"+
					"<td class='numeric'>"+(typeof(v_par_time) == "undefined" ? "&nbsp;" : round(v_par_time/46))+"</td>"+
						"<td class='numeric'>"+(typeof(v_par_time) == "undefined" ? "&nbsp;": round(v_par_time/46/4.5))+"</td>"+
					"</tr>");
				}
				prix();
			}
		});
	}
	$("#refresh").click(function() {
		refresh();
	});
	
	refresh();
});
