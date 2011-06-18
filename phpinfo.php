<?      
require_once 'inc/JSON.php';
$json = new Services_JSON();
     
      // convert a complexe value to JSON notation, and send it to the browser
      $value = array('foo', 'bar', array(1, 2, 'baz'), array(3, array(4)));
      $output = $json->encode($value);
     
      print($output);
      ?>
