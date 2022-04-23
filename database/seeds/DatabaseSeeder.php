<?php

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\DB;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        DB::table('university_careers')->insert([
            ['name' => 'Ing.Informática'],
            ['name' => 'Ing.Administración'],
            ['name' => 'Ing.Energías Renovable'],
            ['name' => 'Ing.Bioquímica'],
            ['name' => 'Ing.Industrial'],
            ['name' => 'Ing.Electromecánica'],
            ['name' => 'Ing.Agronomía'],
        ]);

        $user = App\User::insert([
            [
                'account_status' => 1,
                'name' => 'maria del carmen',
                'last_name' => 'zamudio',
                'second_last_name' => 'herrera',
                'email' => 'carmen@gmail.com',
                'phone' => '9321052615',
                'verification_link' => '',
                'password' => bcrypt('password')
            ],
            [
                'account_status' => 1, //1=activo 2=bloqueado  3=verificarCuentaCorreo
                'name' => 'sophia',
                'last_name' => 'sanchez',
                'second_last_name' => 'zamudio',
                'email' => 'sophia@gmail.com',
                'phone' => '9321078920',
                'verification_link' => '',
                'password' => bcrypt('password')
            ],
        ]);

        Role::create(['name' => 'Administrador']);
        Role::create(['name' => 'Alumno']);

        $user_1 = App\User::find(1);
        $user_2 = App\User::find(2);

        $user_1->syncRoles(['Administrador']);
        $user_2->syncRoles(['Alumno']);
    }
}
