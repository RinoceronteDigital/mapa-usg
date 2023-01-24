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

$selectSucursales = mysqli_query($linkconx, "SELECT id, latitude, longitude FROM coordenadas WHERE latitude<'$lat1' AND latitude>'$lat2' AND longitude<'$lon1' AND longitude>'$lon2' ORDER BY id ASC ");

  
    # code...

    $i=1;
    while ($resultSucursales = mysqli_fetch_array($selectSucursales)) {
      $idSucursal = $resultSucursales['id'];

      $infosucursal = mysqli_query($linkconx, "SELECT * FROM sucursales WHERE id='$idSucursal' ");
      $result = mysqli_fetch_array($infosucursal);

      //$infocodigos = mysqli_query($linkconx, "SELECT * FROM codigos_postal WHERE id='$idSucursal' ");
      //$resultcodigo = mysqli_fetch_array($infocodigos);

      $infodirecciones = mysqli_query($linkconx, "SELECT * FROM direcciones WHERE id='$idSucursal' ");
      $resultdirecciones = mysqli_fetch_array($infodirecciones);

      $nombresucursal = $result['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $result['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'">
                                <span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$resultSucursales['latitude'].', '.$resultSucursales['longitude'].', \''.$nombresucursal.'\', \'' . $result['familias'] . '\', \'' . $resultdirecciones['direccion'] . '\', \'' . $resultdirecciones['municipio'] . '\', \'' . $result['horario'] . '\', \'' . $result['telefono'] . '\', \'' . $result['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $result['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $resultdirecciones['direccion'] . '<br>
                                    Municipio: ' . $resultdirecciones['municipio'] . '<br>
                                    Horario: ' . $result['horario'] . '<br>
                                    Teléfono: <a href="tel:' . $result['telefono'] . '">' . $result['telefono'] . '</a>
                                </p>
                            </li>';
                            $i++;
    }
}else{

  $infosucursal = mysqli_query($linkconx, "SELECT * FROM sucursales WHERE codigo_iso='$codigoiso' ORDER BY id ASC ");
    # code...

    $i=1;
    while ($result = mysqli_fetch_array($infosucursal)) {
      $idSucursal = $result['id'];
      //$infocodigos = mysqli_query($linkconx, "SELECT * FROM codigos_postal WHERE id='$idSucursal' ");
      //$resultcodigo = mysqli_fetch_array($infocodigos);

      $infocoordenadas = mysqli_query($linkconx, "SELECT latitude, longitude FROM coordenadas WHERE id='$idSucursal' ");
      $resultcoordenadas = mysqli_fetch_array($infocoordenadas);

      $infodirecciones = mysqli_query($linkconx, "SELECT * FROM direcciones WHERE id='$idSucursal' ");
      $resultdirecciones = mysqli_fetch_array($infodirecciones);

      $nombresucursal = $result['nombre_sucursal'];
      $porcionesSucursal = explode(" ", $nombresucursal, 2);
      if ($porcionesSucursal[0] == 'Sucursal') {$nombresucursal = $porcionesSucursal[1];
      }else{$nombresucursal = $result['nombre_sucursal'];}

      $listaSucursales .= '<li id="'.$idSucursal.'">
                                <span class="btnLista" id="btn_'.$idSucursal.'" onclick="mostrarenMapa('.$idSucursal.', '.$resultcoordenadas['latitude'].', '.$resultcoordenadas['longitude'].', \''.$nombresucursal.'\', \'' . $result['familias'] . '\', \'' . $resultdirecciones['direccion'] . '\', \'' . $resultdirecciones['municipio'] . '\', \'' . $result['horario'] . '\', \'' . $result['telefono'] . '\', \'' . $result['distribuidor'] . '\')"><span class="numLista">Distribuidor </span> ' . $result['distribuidor'] . '</span>
                                <p>Sucursal: ' . $nombresucursal . '<br>
                                    ' . $resultdirecciones['direccion'] . '<br>
                                    Municipio: ' . $resultdirecciones['municipio'] . '<br>
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