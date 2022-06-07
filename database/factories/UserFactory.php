<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\User;
use Faker\Generator as Faker;
use Illuminate\Support\Str;

/*
|--------------------------------------------------------------------------
| Model Factories
|--------------------------------------------------------------------------
|
| This directory should contain each of the model factory definitions for
| your application. Factories provide a convenient way to generate new
| model instances for testing / seeding your application's database.
|
*/

$factory->define(User::class, function (Faker $faker) {
    return [
        'account_status' => 1, //1=activo 2=bloqueado  3=verificarCuentaCorreo
        'name' => $faker->name,
        'last_name' => $faker->firstNameFemale,
        'second_last_name' => $faker->lastName,
        'email' => $faker->unique()->safeEmail,
        'phone' => $faker->unique()->tollFreePhoneNumber,
        'verification_link' => '',
        'password' => bcrypt('password')
    ];
});
