# Ejecutar el proyecto

[documentation de laravel](https://laravel.com/docs/6.x)

```
    importante 
    paso #1 
    el archivo (.env) esta situado en raiz del proyecto deberán colocar sus credenciales.
     
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=encuesta
    DB_USERNAME=root
    DB_PASSWORD=@Password12345

    composer install
    php artisan key:generate
    php artisan jwt:secret
     
    php artisan migrate:fresh --seed
    php artisan config:clear
    php artisan config:cache
    composer dump-autoload
    
    php artisan serve

```
