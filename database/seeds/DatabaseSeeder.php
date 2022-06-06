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

        /**historial */
        App\Questions::insert([
            [
                'input' => "selected",
                'question' => "Has padecido COVID-19 anteriormente",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 1
            ],
            [
                'input' => "text",
                'question' => "Hace cuanto tiempo padesiste COVID-19",
                'selectionAnswer' => null,
                'answer' => null,
                "type" => 1
            ], [
                'input' => "selected",
                'question' => "Te hiciste la prueba del COVID-19",
                'selectionAnswer' => json_encode(["si", "no", "no aplica"]),
                'answer' =>  json_encode(["no aplica"]),
                "type" => 1
            ], [
                'input' => "selected",
                'question' => "que tipo de prueba de COVID-19 te hiciste",
                'selectionAnswer' => json_encode(["sangre", "nasofaringeo", "no aplica"]),
                'answer' => json_encode(["no aplica"]),
                "type" => 1
            ], [
                'input' => "selected",
                'question' => "cuando padeciste la enfermedad COVID-19 acudiste al medico",
                'selectionAnswer' => json_encode(["si", "no", "no aplica"]),
                'answer' => json_encode(["no aplica"]),
                "type" => 1
            ], [
                'input' => "text",
                'question' => "que tratamiento tuviste",
                'selectionAnswer' => null,
                'answer' => null,
                "type" => 1
            ], [
                'input' => "selected",
                'question' => "Has tenido algún familiar grave por COVID-19",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["si", "no"]),
                "type" => 1
            ], [
                'input' => "selected",
                'question' => "Perdiste algún familiar por COVID-19",
                'selectionAnswer' => json_encode(["si", "no", "no aplica"]),
                'answer' => json_encode(["si", "no", "no aplica"]),
                "type" => 1
            ], [
                'input' => "text",
                'question' => "Has padecido COVID-19 anteriormente",
                'selectionAnswer' => null,
                'answer' => null,
                "type" => 1
            ],
        ]);

        /**diagnostico */
        App\Questions::insert([
            [
                'input' => "selected",
                'question' => "presentaste tos durante esta semana",
                'selectionAnswer' => json_encode(["Si,tos seca", "Si, tos con flema", "No, presente tos"]),
                'answer' => json_encode(["No, presente tos"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "Tu padecimiento inicio  sibitadamente",
                'selectionAnswer' => json_encode(["si", "no", "no aplica"]),
                'answer' =>  json_encode(["no aplica"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "tuviste fiebre",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "presentaste dolor de cabeza",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "Modo de presentación de dolor de cabeza",
                'selectionAnswer' => json_encode(["Contaste", "Intermedio", "No aplica"]),
                'answer' => json_encode(["No aplica"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "Presentaste dificultad para respirar",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "presentaste perdida del sentido del gusto",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ], [
                'input' => "selected",
                'question' => "presentaste perdida del olfato",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste dolor de garganta",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste dolor muscular",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste dolor articular",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste escurrimiento nasal",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste diarrea",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste conjuntivitis",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste vomito",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ],
            [
                'input' => "selected",
                'question' => "presentaste dolor en el pecho",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2
            ]
        ]);

        App\Questions::insert([
            [
                'input' => "selected",
                'question' => "En caso de haber presentado síntomas, en que fecha iniciaron",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 2,
                'selected_date' => "yes"
            ]
        ]);

        /**contacto social */
        App\Questions::insert([
            [
                'input' => "selected",
                'question' => "en los últimos 7 días estuviste en contacto con alguna persona sospechosa o confirmado con la enfermedad COVID-19",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 3
            ],
            [
                'input' => "selected",
                'question' => "conviviste mas de 15 minutos con esa persona",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "usaste cubre bocas mientras convivías con otras personas",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["si"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "utilizaste el distanciamiento social",
                'selectionAnswer' => json_encode(["si", "no",]),
                'answer' => json_encode(["si"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "La convivencia con otras personas fue al aire libre",
                'selectionAnswer' => json_encode(["si", "no",]),
                'answer' => json_encode(["si"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "Saliste de viaje en los últimos 7 días",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "Has acudido a alguna fiesta o reunión social",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 3
            ], [
                'input' => "selected",
                'question' => "cual es el medio de transporte que utiliza para llegar comúnmente o para llegar a la institución",
                'selectionAnswer' => json_encode(["a pie o bicicleta", "motocicleta", "combi o minivan", "autobús o camión", "ambos (combi y autobús)", "automóvil propio"]),
                'answer' => json_encode(["a pie o bicicleta", "motocicleta", "combi o minivan", "autobús o camión", "ambos (combi y autobús)", "automóvil propio"]),
                "type" => 3
            ],
            [
                'input' => "selected",
                'question' => "Has acudido a algún hospital",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 3
            ],
            [
                'input' => "selected",
                'question' => "Con que frecuencia te lavas las manos",
                'selectionAnswer' => json_encode(["frecuentemente", "poco frecuente", "casi nunca"]),
                'answer' => json_encode(["frecuentemente"]),
                "type" => 3
            ]
        ]);

        /**factores de riesgo */

        App\Questions::insert([
            [
                'input' => "selected",
                'question' => "Eres diabetcico",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 4
            ],
            [
                'input' => "selected",
                'question' => "Eres hipertenso",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 4
            ], [
                'input' => "selected",
                'question' => "Padeces cancer",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 4
            ], [
                'input' => "selected",
                'question' => "Esta embarazada",
                'selectionAnswer' => json_encode(["no", "si", "No aplica, soy hombre"]),
                'answer' => json_encode(["no", "si", "No aplica, soy hombre"]),
                "type" => 4
            ], [
                'input' => "selected",
                'question' => "Padeciste o padeces asma",
                'selectionAnswer' => json_encode(["si", "no",]),
                'answer' => json_encode(["si"]),
                "type" => 4
            ], [
                'input' => "selected",
                'question' => "Padeciste o padeces alguna enfermedad renal",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' =>  json_encode(["no"]),
                "type" => 4
            ], [
                'input' => "selected",
                'question' => "Fuiste fumador o eres fumador",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 4
            ],
            [
                'input' => "selected",
                'question' => "Ingieres bebidas alcohólicas ",
                'selectionAnswer' => json_encode(["si", "no"]),
                'answer' => json_encode(["no"]),
                "type" => 4
            ]
        ]);
    }
}
