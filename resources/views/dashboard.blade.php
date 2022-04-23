<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link href="{{ URL::asset('css/bootstrap-dark.min.css') }}" id="bootstrap-dark" rel="stylesheet"
        type="text/css" />
    <link href="{{ URL::asset('css/bootstrap.min.css') }}" id="bootstrap-light" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app-rtl.min.css') }}" id="app-rtl" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app-dark.min.css') }}" id="app-dark" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app.min.css') }}" id="app-light" rel="stylesheet" type="text/css" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" rel="stylesheet">
</head>

<body data-layout="detached" data-topbar="colored">
    <div id="root"></div>
    <script src="{{ URL::asset('js/app.js') }}"></script>
    <script src="{{ URL::asset('libs/jquery/jquery.min.js') }}"></script>
    <script src="{{ URL::asset('libs/bootstrap/bootstrap.min.js') }}"></script>
    <script src="{{ URL::asset('libs/metismenu/metismenu.min.js') }}"></script>
    <script src="{{ URL::asset('libs/simplebar/simplebar.min.js') }}"></script>
    <script src="{{ URL::asset('libs/node-waves/node-waves.min.js') }}"></script>
    <script src="{{ URL::asset('libs/app.min.js') }}"></script>

    <?php
    session_start();
    ?>
    @isset($_SESSION['status'])
        <div class="modal fade show" tabindex="-1" id="myModalStatus">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <h3>{{ $_SESSION['status'] }}</h3>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    @endisset
    <?php
    unset($_SESSION['status']);
    ?>
    <script>
        $(function() {
            $('#myModalStatus').modal('show')
        })
    </script>
</body>




</html>
