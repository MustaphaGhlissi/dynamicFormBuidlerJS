<!DOCTYPE HTML>
<html lang="fr">
    <meta charset="UTF-8">
    <head>
        <title>
            Form builder
        </title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="public/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="public/bootstrap-datepicker/css/bootstrap-datepicker3.min.css">
        <link rel="stylesheet" href="public/bootstrap-timepicker/css/bootstrap-timepicker.min.css">
        <link rel="stylesheet" href="public/css/intlTelInput.min.css">
        <link  href="public/cropper/css/cropper.min.css" rel="stylesheet">
        <link rel="stylesheet" href="public/css/form-style.css">
    </head>
    <body>
    <div class="container">
        <div class="row">
            <div class="col-lg-10 offset-lg-1">
                <div class="form">
                    <form action="" data-rumm="" >
                    <div class="card form-content">
                        <!-- <div class="loader">
                            <i class="fa fa-spinner fa-spin text-white"></i>
                            Traitement en cours ...
                        </div>-->
                        <div class="card-header">
                            <h2 class="form-title"></h2>
                        </div>
                        <div class="card-body">
                            <div class="steps-indicator"></div>
                            <ul class="nav nav-tabs form-steps"></ul>
                            <div class="tab-content form-steps-content"></div>
                        </div>
                        <div class="card-footer">
                            <div class="form-buttons">
                                <div class="row">
                                    <div class="form-group col-12 text-right">
                                        <button type="button" data-id="0" data-index="0" class="btn btn-outline-success btn-intialize-next btn-next" data-print="false">Suivant
                                            <i class="fa fa-chevron-circle-right"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </form>

                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="modalRecap">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">

                <!-- Modal Header -->
                <div class="modal-header">
                    <h4 class="modal-title">Récapitulatif</h4>
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">
                    <div class="container">
                        <div class="row">
                            <div class="col-12">
                                <table class="table table-striped table-responsive table-bordered" id="tabRecap">
                                    <thead id="theadRecap">
                                        <tr></tr>
                                    </thead>
                                    <tbody id="tbodyRecap">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal footer -->
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">Modifier</button>
                    <button type="button" class="btn btn-outline-success btn-modal-next" data-dismiss="modal">Fermer & Continuer</button>
                </div>

            </div>
        </div>
    </div>


    <div class="modal fade" id="modalPhotoPreview">
        <div class="modal-dialog">
            <div class="modal-content">
                <!-- Modal Header -->
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                </div>

                <!-- Modal body -->
                <div class="modal-body">

                </div>
            </div>
        </div>
    </div>

    <script src="public/js/jquery.min.js"></script>
    <script src="public/bootstrap/js/bootstrap.min.js"></script>
    <script src="public/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="public/bootstrap-datepicker/locales/bootstrap-datepicker.fr.min.js"></script>
    <script src="public/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>
    <script src="public/js/intlTelInput-jquery.min.js"></script>
    <script src="public/js/intlTelInput.min.js"></script>
    <script src="public/cropper/js/cropper.min.js"></script><!-- Cropper.js is required -->
    <script src="public/cropper/js/jquery-cropper.min.js"></script>
    <script src="public/js/jquery.mask.min.js"></script>
    <script src="public/js/html2pdf.bundle.min.js"></script>
    <script src="public/js/utils.js"></script>
    <script src="public/js/countries.js"></script>
    <script src="public/js/script.js"></script>
    </body>
</html>