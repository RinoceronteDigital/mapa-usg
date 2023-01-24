<?php
include ("../includes/funciones.php");

$busca = mysqli_query($linkconx, "SELECT * FROM sucursales_thehomedepot ORDER BY id ASC ");
//$busca = mysqli_query($linkconx, "SELECT * FROM sucursales ORDER BY id ASC LIMIT 20 OFFSET 40  ");
echo '{"type": "FeatureCollection","features": [';
while ($info = mysqli_fetch_array($busca)) {

   $nombresucursal = $info['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'SUCURSAL') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $info['nombre_sucursal'];}

   $latitud=$info['latitude'];
   $longitud=$info['longitude'];
   if ($latitud == 0 || $longitud == 0) {
      // code...
   }else{
      //echo '{"geometry": {"type": "Point","coordinates": ['.$longitud.','.$latitud.']},"type": "Feature","properties": {"storeid": "'.$info['id'].'"}},';
      echo '{"geometry": {"type": "Point","coordinates": ['.$longitud.','.$latitud.']},"type": "Feature","properties": {"distribuidor": "'.$info['distribuidor'].'","direccion": "'.$info['direccion'].'","category": "patisserie","hours": "'.$info['horario'].'","description": "'.$info['familias'].'","name": "'.$nombresucursal.'","phone": "'.$info['telefono'].'","cp": "'.$info['municipio'].'","storeid": "'.$info['id'].'"}},';
   }
   
}
echo ']}';
?>