<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\SurveyRecords;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class SurveyRecordsController extends Controller
{
    public $ERROR_SERVER_MSG = 'Ha ocurrido un error, intenta de nuevo más tarde.';


    public $idUser;
    public $nameUser;

    public function __construct()
    {
        $this->idUser = null;
        if (auth()->user()) {
            $this->idUser = auth()->user()->id_users;
            $this->nameUser = auth()->user()->name;
        }
    }


    /**
     * answerQuestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function  answerQuestion(Request $request)
    {
        try {

            $passingPercentage = $request->get('percentaje');

            $idUser = $this->idUser;
            $continue = true;

            $surveyRecords = SurveyRecords::where('id_users', $idUser)
                ->orderBy('id_survey_records', 'desc')
                ->first();

            if (!empty($surveyRecords)) {
                $datetime1 = date_create($surveyRecords->created_at);
                $datetime2 = date_create(date("Y-m-d H:i:s"));
                //The date_diff() function returns the difference between two DateTime objects.
                $interval = date_diff($datetime1, $datetime2);
                $days = $interval->format('%d');
                $dayConfig = intval(7);
                $continue = $days > $dayConfig ? true : false;
            }


            if ($continue) {
                DB::beginTransaction();
                $surveyRecords = new SurveyRecords();
                $surveyRecords->id_users = $idUser;
                $surveyRecords->percentage = $passingPercentage;
                $surveyRecords->save();
                DB::commit();
                $message = "En este momento su situación no requiere asistencia sanitaria. 
                            Recuerde seguir manteniendo las recomendaciones generales de distanciamiento social, 
                            higiene y protección recomendadas.";

                if ($passingPercentage < 80) {

                    $message = "La COVID-19 se presenta como una enfermedade aguda, 
                                por lo tanto los síntomas que presenta en este momento podrían deberse a otra causa diferente del nuevo coronavirus. 
                                Solicite cita en su centro de salud para que valoren sus síntomas. 
                                Por favor,
                                recuerde que cualquier persona con síntomas compatibles con la Covid debe quedarse en su domicilio y 
                                limitar los contactos con otras personas";

                    return response()->json(['message' => $message, 'status' => 400]);
                }
            } else {
                $message = "Lo sentimos pero la encuesta solo se puede llevar acabo cada {$dayConfig} días, su ultima fecha de encuesta fue :{$surveyRecords->created_at}";
                return response()->json(['data' => $surveyRecords, 'status' => 400, 'insert' => $continue, 'message' => $message]);
            }
            return response()->json(['data' => $surveyRecords, 'status' => 200, 'insert' => $continue, 'message' => $message]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }

    public function printQr($id)
    {
        try {
            $idUser = $this->idUser;

            $surveyRecords = SurveyRecords::leftJoin('users', 'survey_records.id_users', '=', 'users.id_users')
                ->leftJoin('students', 'users.id_users', '=', 'students.id_users')
                ->leftJoin('university_careers', 'university_careers.id_university_careers', '=', 'students.id_university_careers')
                ->select(
                    'users.name',
                    'users.last_name',
                    'users.second_last_name',
                    'university_careers.name as carrera',
                    'students.matricula',
                    'students.semester',
                    'students.school_shift',
                    'students.id_students',
                )
                ->where('survey_records.id_users', $idUser)
                ->where('survey_records.id_survey_records', $id)
                ->get();

            if (count($surveyRecords) > 0) {
                $qrcode = base64_encode(QrCode::format('svg')->size(200)->errorCorrection('H')->generate("maria del carmen"));
                $surveyRecords = $surveyRecords[0];
                $data = [
                    'full_name' => ucwords($surveyRecords['name']) . " " . ucwords($surveyRecords['last_name']) . " " . ucwords($surveyRecords['second_last_name']),
                    'matricula' => $surveyRecords['matricula'],
                    'carrera' => $surveyRecords['carrera'],
                    'school_shift' => $surveyRecords['school_shift'], //turno
                    'semester' => $surveyRecords['semester'],
                    'id_students' => $surveyRecords['id_students']
                ];
                $pdf = PDF::loadView('QR/success', compact('data', 'qrcode'));
                return $pdf->download('qr.pdf');
            } else {
                return response()->json([
                    'message' => $this->ERROR_SERVER_MSG,
                    'status' => 400
                ]);
            }
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }
}
