<?
include 'inc/cnx.inc';

function getRealIpAddr()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP']))   //check ip from share internet
    {
      $ip=$_SERVER['HTTP_CLIENT_IP'];
    }
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR']))   //to check ip is pass from proxy
    {
      $ip=$_SERVER['HTTP_X_FORWARDED_FOR'];
    }
    else
    {
      $ip=$_SERVER['REMOTE_ADDR'];
    }
    return $ip;
}

$query = "insert into releves (`date`, `volume`, `ip_created`) values (STR_TO_DATE('%s', '%%d/%%m/%%Y'), %u, '%s')";
$query = sprintf($query,$_GET['dateReleve'], $_GET['valeurRevele'], getRealIpAddr());

mysql_query($query) or header('HTTP/1.1 500 Internal Server Error');
?>
