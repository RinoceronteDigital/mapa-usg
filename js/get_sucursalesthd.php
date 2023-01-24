<?php
session_start();
include("../includes/funciones.php");
$latitud = $_POST["latitud"];
$longitud = $_POST["longitud"];


$lat1 = $latitud + 0.075;
$lat2 = $latitud - 0.075;
$lon1 = $longitud + 0.075;
$lon2 = $longitud - 0.075;

  $selectSucursales = mysqli_query($linkconx, "SELECT * FROM sucursales_thehomedepot WHERE latitude<'$lat1' AND latitude>'$lat2' AND longitude<'$lon1' AND longitude>'$lon2' ORDER BY id ASC ");
    # code...
    $i=1;
    while ($result = mysqli_fetch_array($selectSucursales)) {
      $idSucursal = $result['id'];

      $nombresucursal = $result['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $result['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'"><span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$result['latitude'].', '.$result['longitude'].', \''.$nombresucursal.'\', \'' . $result['familias'] . '\', \'' . $result['direccion'] . '\', \'' . $result['municipio'] . '\', \'' . $result['horario'] . '\', \'' . $result['telefono'] . '\', \'' . $result['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $result['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $result['direccion'] . '<br>
                                    Municipio: ' . $result['municipio'] . '<br>Horario: ' . $result['horario'] . '<br>
                                    Teléfono: <a href="tel:' . $result['telefono'] . '">' . $result['telefono'] . '</a>
                                </p>
                            </li>';
                            $i++;
    }
    // ###########################

$status = true;

$respuesta = array(
  "status" => $status,
  "listaSucursales" => $listaSucursales

);
echo json_encode($respuesta);
?>