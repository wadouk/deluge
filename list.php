<?
include 'inc/cnx.inc';
require_once 'inc/JSON.php';

$queries = parse_ini_file(dirname($_SERVER["SCRIPT_FILENAME"])."/inc/query.sql");

$query = $queries["list"];

$resultat = mysql_query($query) or die(mysql_error());

$json = new Services_JSON();
$datas = array();
while($ligne = mysql_fetch_array($resultat)) {
		array_push($datas, $ligne);
}

header('Content-Type: application/json');
print($json->encode($datas));
?>
