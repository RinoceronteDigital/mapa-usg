<?php
session_start();
require("includes/funciones.php");
$pagina='home';
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Dónde comprar USG Latinoamérica - The Home Depot</title>

    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/fuentes.css">
    <link rel="stylesheet" href="css/styles.css?v=3.9">


    <script src="js/modernizr-custom.js"></script>

    <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>

</head>
<body>
    <section class="contenedor_principal">
            <div class="ancho">
                <div class="contenedor_titulo">
                    <h3 class="titulo">
                        LOCALIZA TU <span>DISTRIBUIDOR AUTORIZADO</span>
                    </h3>
                    <figure class="logo">
                        <a href="https://www.usglatamblog.com"><img src="img/logo_usg.png" alt=""></a>
                    </figure>
                </div>

                <div class="contenedor_form1 mb-4">
                    <h4 class="estadoh4">Selecciona el tipo de tienda</h4>
                    <a href="index.php"><button type="button" class="btn btn-usg me-2">Distribuidor USG</button></a>
                    <a href="the-home-depot.php"><button type="button" class="btn btn-usg me-2">The Home Depot</button></a>
                </div>

                <form action="" class="formulario" id="formulario">
                    <div class="contenedor_form1">
                        <h4 class="estadoh4">Encuentra sucursales de USG en:</h4>
                    </div>
                    <div class="contenedor_form2">
                        <div class="select">
                            <select class="form-select __select" aria-label="Default select example" name="country" id="country">
                                <option value="mx">México</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="contenedor_form3">
                        <div class="busqueda" id="locationField">
                          <input id="autocomplete" placeholder="Escribe tu localidad" type="text" />
                        </div>
                    </div>

                    <div class="contenedor_form4" style="display: none;">
                        <div class="boton">
                            <input type="submit" value="Buscar">
                        </div>
                    </div>
                </form>

                <div class="contenedor_ubicacion" id="btn_aceptarUbicacion">
                    <figure class="icono_ubicacion">
                        <img src="img/icono_ubicacion.png" alt="">
                    </figure>
                    <p>Utilizar mi ubicación</p>
                </div>

                <div class="contenedor_mapa">
                    <div class="resultado">
                        <p>Resultados</p>
                    </div>
                    <aside class="lugares">
                        <ul class="lista-lugares" id="listalugares"></ul>
                    </aside>
                    <div id="listaJs"></div>
                    <div class="mapa" id="map" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></div>
                    <div class="mapa" style="display: none;">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d145059.9137931953!2d-99.13531799805078!3d19.41218826074059!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sconstruccion%20usg!5e0!3m2!1ses-419!2smx!4v1623996418439!5m2!1ses-419!2smx" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>

                    </div>
                </div>
                <footer>
                    <div class="contenedor_footer">
                        <figcaption>
                            <a href="https://www.facebook.com/USGLatam/" target="_blank"><img src="img/facebook.png" alt=""></a>
                        </figcaption>
                        <figcaption>
                            <a href="https://www.youtube.com/user/mercadotecniausgmex" target="_blank"><img src="img/youtube.png" alt=""></a>
                        </figcaption>
                        <figcaption>
                            <a href="https://www.instagram.com/usglatam/?ref=badge" target="_blank"><img src="img/instagram.png" alt=""></a>
                        </figcaption>
                        <figcaption>
                            <a href="https://www.linkedin.com/company/usg-mexico/" target="_blank"><img src="img/linkedin.png" alt=""></a>
                        </figcaption>
                        <figcaption>
                            <a href="https://twitter.com/USGLatam" target="_blank"><img src="img/twitter.png" alt=""></a>
                        </figcaption>
                    </div>
                    <div class="parrafos_footer">
                        <p>
                            Para más información contáctanos en 800 USG.4YOU y usglatamblog.com <span>800 (874-4968)</span>
                        </p>
                        <p>
                            © 2021 Corporación USG. Todos los derechos reservados
                        </p>
                        <p>
                            *Consulte nuestro aviso de privacidad <a href="#" target="_blank">Aquí</a>
                        </p>
                    </div>
                </footer>
            </div>
    </section>

<script src="js/popper.min.js"></script>
<script src="js/bootstrap.min.js"></script>
    
<script src="js/jquery-3.6.0.min.js"></script>
<script src="js/custom.js"></script>
<script src="js/app_thd.js?v=1.6"></script>
<script type="text/javascript">
    
</script>
    <!-- Async script executes immediately and must be after any DOM elements used in callback. -->
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAlCQwGWkDu5MY1QoqwAHi3diQbPNhKkfU&libraries=places&callback=initMap">
    </script>
</body>
</html>