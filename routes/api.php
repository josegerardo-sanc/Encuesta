<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::group(['middleware' => ['jwt.verify'], 'prefix' => 'v1'], function () {
    /**
     * app/Http/Controllers/AuthController.php
     */
    Route::get('/refreshToken', 'AuthController@refresh');
    Route::get('/logout', 'AuthController@logout');
    #app/Http/Controllers/User/UserController.php
    Route::post('/updateProfile', 'User\UserController@updateProfile');
    Route::post('/updateImageProfile', 'User\UserController@updateImageProfile');
    /*
    Route::get('/getRoles', 'User\UserController@getRoles');
    Route::post('/getUsers', 'User\UserController@getUsers');
    Route::get('/deleteUser/{id}', 'User\UserController@deleteUser');
    Route::post('/updateAccount', 'User\UserController@updateAccount');
    */

    /**exports */
    Route::post('/exportUsers', 'User\UserController@exportUsers');
});
Route::prefix('v1')->group(function () {
    Route::post('/authenticate', 'AuthController@authenticate');
    Route::get('/verifyAccount/{codigoConfirmacion}', 'AuthController@verifyAccount');
    #app/Http/Controllers/User/UserController.php
    Route::post('/recoveryPassword', 'User\UserController@recoveryPassword');
    Route::post('/saveUser', 'User\UserController@saveUser');
    #app/Http/Controllers/universityCareersController.php
    Route::get('getCareers', 'universityCareersController@getCareers');
});
