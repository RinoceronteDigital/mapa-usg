<?php
session_start();
include("../includes/funciones.php");
$codigoiso = $_POST["codigoiso"];

//UPDATE `sucursales` SET `codigo_iso`='bt' WHERE `pais`='BAHAMAS'

if($codigoiso=='mx'){
  $latitud = 19.3906797;
$longitud = -99.1789844;

$lat1 = $latitud + 0.075;
$lat2 = $latitud - 0.075;
$lon1 = $longitud + 0.075;
$lon2 = $longitud - 0.075;

$selectSucursales = mysqli_query($linkconx, "SELECT * FROM sucursales_thehomedepot WHERE latitude<'$lat1' AND latitude>'$lat2' AND longitude<'$lon1' AND longitude>'$lon2' ORDER BY id ASC ");

  
    # code...

    $i=1;
    while ($resultSucursales = mysqli_fetch_array($selectSucursales)) {
      $idSucursal = $resultSucursales['id'];

      $nombresucursal = $resultSucursales['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {
        $nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $resultSucursales['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'">
                                <span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$resultSucursales['latitude'].', '.$resultSucursales['longitude'].', \''.$nombresucursal.'\', \'' . $resultSucursales['familias'] . '\', \'' . $resultSucursales['direccion'] . '\', \'' . $resultSucursales['municipio'] . '\', \'' . $resultSucursales['horario'] . '\', \'' . $resultSucursales['telefono'] . '\', \'' . $resultSucursales['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $resultSucursales['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $resultSucursales['direccion'] . '<br>
                                    Municipio: ' . $resultSucursales['municipio'] . '<br>
                                    Horario: ' . $resultSucursales['horario'] . '<br>
                                    Teléfono: <a href="tel:' . $resultSucursales['telefono'] . '">' . $resultSucursales['telefono'] . '</a>
                                </p>
                            </li>';
                            $i++;
    }
}else{

  $infosucursal = mysqli_query($linkconx, "SELECT * FROM sucursales_thehomedepot WHERE codigo_iso='$codigoiso' ORDER BY id ASC ");
    # code...

    $i=1;
    while ($result = mysqli_fetch_array($infosucursal)) {
      $idSucursal = $result['id'];

      $nombresucursal = $result['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $result['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'">
                                <span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$result['latitude'].', '.$result['longitude'].', \''.$nombresucursal.'\', \'' . $result['familias'] . '\', \'' . $result['direccion'] . '\', \'' . $result['municipio'] . '\', \'' . $result['horario'] . '\', \'' . $result['telefono'] . '\', \'' . $result['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $result['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $result['direccion'] . '<br>
                                    Municipio: ' . $result['municipio'] . '<br>
                                    Horario: ' . $result['horario'] . '<br>
                                    Teléfono: <a href="tel:' . $result['telefono'] . '">' . $result['telefono'] . '</a>
                                </p>
                            </li>';
                            $i++;
    }
}

    // ###########################

$status = true;

$respuesta = array(
  "status" => $status,
  "listaSucursales" => $listaSucursales

);
echo json_encode($respuesta);
?>