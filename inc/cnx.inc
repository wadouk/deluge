<?

$ini_array = parse_ini_file(dirname($_SERVER["SCRIPT_FILENAME"])."/inc/cnx.ini");
$cnx = mysql_pconnect  ($ini_array['host'],$ini_array['login'],$ini_array['pass'] );

  if (!$cnx)
  {
    die('Connexion impossible : ' . mysql_error());
  }
  mysql_select_db($ini_array['db'], $cnx);
  ?>
