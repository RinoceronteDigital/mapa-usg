<?php
include ("../includes/funciones.php");

$busca = mysqli_query($linkconx, "SELECT id, direccion, horario, familias, nombre_sucursal, telefono FROM sucursales ORDER BY id ASC LIMIT 2 OFFSET 0 ");
 $json = array(
       'type' => 'FeatureCollection',
       'features' => array(),
   );
$i=1;
while ($info = mysqli_fetch_array($busca)) {
    $idcoordenadas = $info['id'];
   $buscaCoordenadas = mysqli_query($linkconx, "SELECT latitude, longitude FROM coordenadas WHERE id='$idcoordenadas' ");
   $infoCoordenadas = mysqli_fetch_array($buscaCoordenadas);

    $json['features'][] = array(
       'geometry' => array(
        'type' => 'Point',
        'coordinates' => [$infoCoordenadas['latitude'].','.$infoCoordenadas['longitude']],
       ),
       'type' => 'Feature',
       'properties' => array(
        'direccion' => $info['direccion'],
        'category' => 'patisserie',
        'hours' => $info['horario'],
        'description' => $info['familias'],
        'name' => $info['nombre_sucursal'],
        'phone' => $info['telefono'],
        'storeid' => $info['id'],
       ),
   );
   $i++;
}

/*$jsonencoded = json_encode($json,JSON_UNESCAPED_UNICODE);

$fh = fopen('sucursales-usg'.".json", 'w');
fwrite($fh, $jsonencoded);
fclose($fh);*/

//Creamos el JSON
$json_string = json_encode($json);
$file = 'sucursales-usg-dic.json';
file_put_contents($file, $json_string);


?>