<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        table {
            border-collapse: collapse;
        }

        th {
            text-align: inherit;
            text-align: -webkit-match-parent;
        }

        .table {
            width: 100%;
            margin-bottom: 1rem;
            color: #212529;
        }

        .table th,
        .table td {
            padding: 0.75rem;
            vertical-align: top;
            border-top: 1px solid #dee2e6;
        }

        .table thead th {
            vertical-align: bottom;
            border-bottom: 2px solid #dee2e6;
        }

        .table tbody+tbody {
            border-top: 2px solid #dee2e6;
        }

        .table-sm th,
        .table-sm td {
            padding: 0.3rem;
        }

        .table-bordered {
            border: 1px solid #dee2e6;
        }

        .table-bordered th,
        .table-bordered td {
            border: 1px solid #dee2e6;
        }

        .table-bordered thead th,
        .table-bordered thead td {
            border-bottom-width: 2px;
        }

        .table-borderless th,
        .table-borderless td,
        .table-borderless thead th,
        .table-borderless tbody+tbody {
            border: 0;
        }

    </style>
</head>

<body>
    <div style="margin-bottom:30px;margin-top:10px">

        <img src="{{ public_path('/itss.jpg') }}" style="height:70px;object-fit: cover;float: left;" alt="logo">
        <center>
            <strong style="heigth:70px;line-height:70px;font-size:20px;margin-left:10px;">Instituto Tecnológico Superior
                de la Región Sierra.</strong>
        </center>
    </div>
    <table class="table">
        <tbody>
            <tr>
                <td colspan="2">
                    <strong> Nombre:</strong> {{ $data['full_name'] }}
                </td>
            </tr>
            @if (!empty($data['id_students']))
                <tr>
                    <td>
                        <strong> Carrera:</strong> {{ $data['carrera'] }}
                    </td>
                    <td>
                        <strong> Semestre:</strong> {{ $data['semester'] }}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <strong> Matricula:</strong> {{ $data['matricula'] }}
                    </td>
                </tr>
                <tr>
                    <td colspan="2">
                        <strong> Turno:</strong> {{ $data['school_shift'] }}
                    </td>
                </tr>
            @endif
            <tr>
                <img style="margin-top: 30" src="data:image/png;base64, {!! $qrcode !!}">
            </tr>
        </tbody>
    </table>
</body>

</html>
