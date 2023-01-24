<?php
session_start();
include("../includes/funciones.php");
$latitud = $_POST["latitud"];
$longitud = $_POST["longitud"];


$lat1 = $latitud + 0.075;
$lat2 = $latitud - 0.075;
$lon1 = $longitud + 0.075;
$lon2 = $longitud - 0.075;

  $selectSucursales = mysqli_query($linkconx, "SELECT id, latitude, longitude FROM coordenadas WHERE latitude<'$lat1' AND latitude>'$lat2' AND longitude<'$lon1' AND longitude>'$lon2' ORDER BY id ASC ");
    # code...
    $i=1;
    while ($result = mysqli_fetch_array($selectSucursales)) {
      $idSucursal = $result['id'];

      $infosucursal = mysqli_query($linkconx, "SELECT * FROM sucursales WHERE id='$idSucursal' ");
      $resultSucursal = mysqli_fetch_array($infosucursal);

      $infodirecciones = mysqli_query($linkconx, "SELECT * FROM direcciones WHERE id='$idSucursal' ");
      $resultdirecciones = mysqli_fetch_array($infodirecciones);

      $nombresucursal = $resultSucursal['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $resultSucursal['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'"><span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$result['latitude'].', '.$result['longitude'].', \''.$nombresucursal.'\', \'' . $resultSucursal['familias'] . '\', \'' . $resultdirecciones['direccion'] . '\', \'' . $resultdirecciones['municipio'] . '\', \'' . $resultSucursal['horario'] . '\', \'' . $resultSucursal['telefono'] . '\', \'' . $resultSucursal['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $resultSucursal['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $resultdirecciones['direccion'] . '<br>
                                    Municipio: ' . $resultdirecciones['municipio'] . '<br>
                                    Horario: ' . $resultSucursal['horario'] . '<br>
                                    Teléfono: <a href="tel:' . $resultSucursal['telefono'] . '">' . $resultSucursal['telefono'] . '</a>
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