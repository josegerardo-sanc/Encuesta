<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:m="http://schemas.microsoft.com/office/2004/12/omml">

<head>
    <meta http-equiv="Content-Language" content="es">
    <meta http-equiv="Content-Type" content="text/html; charset=windows-1252">
    <title>Verifica tu cuenta</title>
</head>

<body>
    <table>
        <tbody>
            <tr>
                <center>
                    <h3>
                        <strong>Hola! {{ $user['name'] }}</strong>
                    </h3>
                    <strong>Para activar su cuenta haga click en el vinculo</strong>
                    <br>
                    <a href="{{ url('/api/v1/verifyAccount', [$user['verification_link']]) }}">
                        {{ $user['verification_link'] }}
                    </a>
                </center>
            </tr>
        </tbody>
    </table>
</body>

</html>
