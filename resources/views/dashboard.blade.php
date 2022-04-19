<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}" />

    <link href="{{ URL::asset('css/bootstrap-dark.min.css') }}" id="bootstrap-dark" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/bootstrap.min.css') }}" id="bootstrap-light" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/icons.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app-rtl.min.css') }}" id="app-rtl" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app-dark.min.css') }}" id="app-dark" rel="stylesheet" type="text/css" />
    <link href="{{ URL::asset('css/app.min.css') }}" id="app-light" rel="stylesheet" type="text/css" />

</head>

<body data-layout="detached" data-topbar="colored">
    <div id="root"></div>
    <script src="{{ URL::asset('js/app.js') }}"></script>
    <script src="{{ URL::asset('libs/jquery/jquery.min.js') }}"></script>
    <script src="{{ URL::asset('libs/bootstrap/bootstrap.min.js') }}"></script>
    <script src="{{ URL::asset('libs/metismenu/metismenu.min.js') }}"></script>
    <script src="{{ URL::asset('libs/simplebar/simplebar.min.js') }}"></script>
    <script src="{{ URL::asset('libs/node-waves/node-waves.min.js') }}"></script>
    <script src="{{ URL::asset('js/app.min.js') }}"></script>


</body>




</html>
