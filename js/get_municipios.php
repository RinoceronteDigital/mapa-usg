<?php
session_start();
include("../includes/funciones.php");
$valEstado = $_POST["valEstado"];

  $selectMunicipios = mysqli_query($linkconx, "SELECT dto, cve_mpio, mpio FROM secciones_electorales WHERE cve_edo='$valEstado' ORDER BY mpio ASC ");
    # code...
		$listaMunicipios = '<option value="0">Seleccionar</option>';

    $nombreMunicipio = '';
    while ($result_e = mysqli_fetch_array($selectMunicipios)) {
      if ($nombreMunicipio == $result_e['mpio']) {
        // code...
      } else {$listaMunicipios .= '<option value="' . $result_e['cve_mpio'] . '">' . $result_e['mpio'] . '</option>';}
			$nombreMunicipio = $result_e['mpio'];
    }
    // ###########################

$status = true;

$respuesta = array(
  "status" => $status,
  "listaMunicipios" => $listaMunicipios

);
echo json_encode($respuesta);
?>