<?php
include ("../includes/funciones.php");

$busca = mysqli_query($linkconx, "SELECT * FROM sucursales ORDER BY id ASC ");
//$busca = mysqli_query($linkconx, "SELECT * FROM sucursales ORDER BY id ASC LIMIT 20 OFFSET 40  ");
echo '{"type": "FeatureCollection","features": [';
while ($info = mysqli_fetch_array($busca)) {
   $idcoordenadas = $info['id'];
   
   $buscaCoordenadas = mysqli_query($linkconx, "SELECT latitude, longitude FROM coordenadas WHERE id='$idcoordenadas' ");
   $infoCoordenadas = mysqli_fetch_array($buscaCoordenadas);
   
   //$infocodigos = mysqli_query($linkconx, "SELECT * FROM codigos_postal WHERE id='$idcoordenadas' ");
   //$resultcodigo = mysqli_fetch_array($infocodigos);

   $infodirecciones = mysqli_query($linkconx, "SELECT * FROM direcciones WHERE id='$idcoordenadas' ");
   $resultdirecciones = mysqli_fetch_array($infodirecciones);

   $nombresucursal = $info['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'SUCURSAL') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $info['nombre_sucursal'];}

   $latitud=$infoCoordenadas['latitude'];
   $longitud=$infoCoordenadas['longitude'];
   if ($latitud == 0 || $longitud == 0) {
      // code...
   }else{
      //echo '{"geometry": {"type": "Point","coordinates": ['.$longitud.','.$latitud.']},"type": "Feature","properties": {"storeid": "'.$info['id'].'"}},';
      echo '{"geometry": {"type": "Point","coordinates": ['.$longitud.','.$latitud.']},"type": "Feature","properties": {"distribuidor": "'.$info['distribuidor'].'","direccion": "'.$resultdirecciones['direccion'].'","category": "patisserie","hours": "'.$info['horario'].'","description": "'.$info['familias'].'","name": "'.$nombresucursal.'","phone": "'.$info['telefono'].'","cp": "'.$resultdirecciones['municipio'].'","storeid": "'.$info['id'].'"}},';
   }
   
}
echo ']}';
//https://www.google.com.mx/maps/search/AV.+ALVARO+OBREGON+146+A+ROMA+CUAUHTEMOC+CDMX+0+6700/@19.4181334,-99.1611814,18z/data=!3m1!4b1
?>