<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Barryvdh\DomPDF\Facade\Pdf;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
use App\Traits\Helper;
use App\Questions;
use App\AnswersUser;
use App\SurveyRecords;

class SurveyRecordsController extends Controller
{
    public $ERROR_SERVER_MSG = 'Ha ocurrido un error, intenta de nuevo más tarde.';

    use Helper;
    public $idUser;
    public $nameUser;
    public $configPercentaje = null;
    const TITULOS = ['1' => "Antecedentes", '2' => "Diagnostico", '3' => "Contacto Social", '4' => "Factores de riesgo"];
    public function __construct()
    {
        $this->idUser = null;
        if (auth()->user()) {
            $this->idUser = auth()->user()->id_users;
            $this->nameUser = auth()->user()->name;
        }

        $this->configPercentaje = 80;
        $this->answerUserArray = [];
    }


    /**
     * answerQuestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function  answerQuestion(Request $request)
    {
        try {
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

                $continue = true;
            }

            $passingPercentage = $this->getResultQuestion($request);

            if (isset($passingPercentage['status'])) {
                return \response()->json($passingPercentage);
            }

            $passingPercentage = \round($passingPercentage);

            //return \response()->json($passingPercentage);

            if ($continue) {
                DB::beginTransaction();
                $surveyRecords = new SurveyRecords();
                $surveyRecords->id_users = $idUser;
                $surveyRecords->percentage = $passingPercentage;
                $surveyRecords->save();


                $idRecords = $surveyRecords->{'id_survey_records'};

                foreach ($this->answerUserArray as $key => $item) {
                    $answersUser = new AnswersUser;
                    $answersUser->id_survey_records = $idRecords;
                    $answersUser->id_question = $item['id'];
                    $answersUser->answers = $item['answer'];
                    $answersUser->save();
                }

                DB::commit();
                $message = "En este momento su situación no requiere asistencia sanitaria.
                            Recuerde seguir manteniendo las recomendaciones generales de distanciamiento social,
                            higiene y protección recomendadas.";

                if ($passingPercentage < $this->configPercentaje) {

                    $message = "La COVID-19 se presenta como una enfermedade aguda,
                                por lo tanto los síntomas que presenta en este momento podrían deberse a otra causa diferente del nuevo coronavirus.
                                Solicite cita en su centro de salud para que valoren sus síntomas.
                                Por favor,
                                recuerde que cualquier persona con síntomas compatibles con la Covid debe quedarse en su domicilio y
                                limitar los contactos con otras personas";

                    return response()->json(['message' => $message, 'status' => 400]);
                }
            } else {
                $datetime2 = date("Y-m-d H:i:s");
                $getTime = $this->getTime($datetime2, $surveyRecords->created_at);

                $message = "Lo sentimos pero la encuesta solo se puede llevar acabo cada {$dayConfig} días, su ultima fecha  :{$getTime}";
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
                    'survey_records.percentage',
                    'survey_records.created_at'
                )
                ->where('survey_records.id_users', $idUser)
                ->where('survey_records.id_survey_records', $id)
                ->get();

            if (count($surveyRecords) > 0) {
                $surveyRecords = $surveyRecords[0];
                if ($surveyRecords['percentage'] < $this->configPercentaje) {
                    return response()->json([
                        'message' => "Lo sentimos, el resultado obtenido no fue suficiente.",
                        'status' => 400
                    ]);
                }

                $qrcode = base64_encode(QrCode::format('svg')->size(200)->errorCorrection('H')->generate($id));

                $data = [
                    'full_name' => ucwords($surveyRecords['name']) . " " . ucwords($surveyRecords['last_name']) . " " . ucwords($surveyRecords['second_last_name']),
                    'matricula' => $surveyRecords['matricula'],
                    'carrera' => $surveyRecords['carrera'],
                    'school_shift' => $surveyRecords['school_shift'], //turno
                    'semester' => $surveyRecords['semester'],
                    'id_students' => $surveyRecords['id_students'],
                    'fecha_creacion' => $surveyRecords['created_at']
                ];
                $pdf = PDF::loadView('QR/success', compact('data', 'qrcode'));
                return $pdf->download('qr.pdf');
            } else {
                return response()->json([
                    'message' => "No se encontraron registros asociados con este ID ({$id})",
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

    /**
     * answerQuestion
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQuestionHistory(Request $request)
    {
        $numberPage = abs($request->get('numberPage') ?? 1);
        $endRow =     abs($request->get('endRow') ?? 10);
        $startRow = (($numberPage * $endRow) - $endRow);
        $totalRows = 0;

        try {
            $idUser = $this->idUser;
            $queryRecords = SurveyRecords::query();

            $totalRows = $queryRecords->count();

            if ($startRow > $totalRows) {
                /**reinicia la paginacion */
                $startRow = 0;
                $numberPage = 1;
            }

            $_surveyRecords = $queryRecords->where('id_users', $idUser)
                ->orderBy('id_survey_records', 'desc')
                ->offset($startRow)
                ->limit($endRow)
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Lista de resultados.',
                'data' => $_surveyRecords,
                'numberPage' => $numberPage,
                'startRow' => $startRow,
                'endRow' => $endRow,
                'totalRows' => $totalRows,
                'configPercentaje' => $this->configPercentaje
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }

    /**
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getQuestionHistoryStudent(Request $request)
    {
        $numberPage = abs($request->get('numberPage') ?? 1);
        $endRow =     abs($request->get('endRow') ?? 10);
        $startRow = (($numberPage * $endRow) - $endRow);
        $totalRows = 0;

        try {
            $idUser = $this->idUser;
            $totalRows = SurveyRecords::groupBy('id_users')
                ->select('id_users')
                ->get();

            $totalRows = count($totalRows);

            if ($startRow > $totalRows) {
                /**reinicia la paginacion */
                $startRow = 0;
                $numberPage = 1;
            }

            $queryRecords = SurveyRecords::query();
            $_surveyRecords = $queryRecords
                ->leftJoin('users', 'survey_records.id_users', '=', 'users.id_users')
                ->leftJoin('students', 'users.id_users', '=', 'students.id_users')
                ->leftJoin('university_careers', 'university_careers.id_university_careers', '=', 'students.id_university_careers')
                ->select(
                    'users.name',
                    'users.last_name',
                    'users.second_last_name',
                    DB::raw('CONCAT(users.name," ",users.last_name," ",users.second_last_name) AS full_name'),
                    'university_careers.name as carrera',
                    'students.matricula',
                    'students.semester',
                    'students.school_shift',
                    'students.id_students',
                    'survey_records.percentage',
                    'survey_records.id_users',
                    DB::raw('COUNT(survey_records.id_users) AS totalRows'),
                    DB::raw('MAX(survey_records.created_at) AS last_registration_date')
                )
                ->groupBy('survey_records.id_users')
                ->offset($startRow)
                ->limit($endRow)
                ->get();

            return response()->json([
                'status' => 200,
                'message' => 'Lista de resultados.',
                'data' => $_surveyRecords,
                'numberPage' => $numberPage,
                'startRow' => $startRow,
                'endRow' => $endRow,
                'totalRows' => $totalRows,
                'configPercentaje' => $this->configPercentaje
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }


    public function getHistoryStudent(Request $request)
    {
        $numberPage = abs($request->get('numberPage') ?? 1);
        $endRow =     abs($request->get('endRow') ?? 10);
        $startRow = (($numberPage * $endRow) - $endRow);
        $totalRows = 0;

        try {
            $idUser = $request->get('id_users');

            $totalRows = SurveyRecords::where('survey_records.id_users', $idUser)->count();

            if ($startRow > $totalRows) {
                /**reinicia la paginacion */
                $startRow = 0;
                $numberPage = 1;
            }

            $_surveyRecords = SurveyRecords::where('id_users', $idUser)
                ->orderBy('id_survey_records', 'desc')
                ->offset($startRow)
                ->limit($endRow)
                ->get();

            $dataUser = SurveyRecords::leftJoin('users', 'survey_records.id_users', '=', 'users.id_users')
                ->leftJoin('students', 'users.id_users', '=', 'students.id_users')
                ->leftJoin('university_careers', 'university_careers.id_university_careers', '=', 'students.id_university_careers')
                ->select(
                    'users.name',
                    'users.last_name',
                    'users.second_last_name',
                    DB::raw('CONCAT(users.name," ",users.last_name," ",users.second_last_name) AS full_name'),
                    'university_careers.name as carrera',
                    'students.matricula',
                    'students.semester',
                    'students.school_shift',
                    'students.id_students',
                    'survey_records.percentage',
                    'survey_records.id_users',
                )
                ->where('survey_records.id_users', $idUser)
                ->groupBy('survey_records.id_users')
                ->get();

            if (count($dataUser) > 0) {
                $dataUser = $dataUser[0];
            }

            return response()->json([
                'status' => 200,
                'message' => 'Lista de resultados.',
                'data' => $_surveyRecords,
                'dataUser' => $dataUser,
                'numberPage' => $numberPage,
                'startRow' => $startRow,
                'endRow' => $endRow,
                'totalRows' => $totalRows,
                'configPercentaje' => $this->configPercentaje
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }


    public function getResultQuestion($request)
    {
        $title = self::TITULOS;
        $questions = Questions::orderBy('id', 'asc')->get();

        if (!count($questions) > 0) {
            return [
                'status' => 400,
                'message' => "Lo sentimos pero no hay preguntas cargadas al sistema, comunicate con el administrador."
            ];
        }

        $numberQuestions = count($questions);
        $valueAnswer = (100 / $numberQuestions);
        $answerResult = [];
        $totalResult = 0;

        foreach ($questions as $item) {

            $id = $item['id'];

            $inputBd = "selected";
            $titleSection = "";
            $questionDB = "";

            $answersUser = $request->get($id);
            $selected_date = null;
            $answerDB = $item['answer'];

            if ($request->has($id)) {
                $inputBd = $item['input'];
                $index = $item['type'];
                $titleSection = $title[$index] . ":";
                $questionDB = $item['question'];
                $selected_date = $item['selected_date'];
            }

            if (!empty($selected_date)) {
                if ($answersUser == "si") {
                    $date = $request->get('selected_date');
                    if (empty($date)) {
                        return [
                            'status' => 400,
                            'message' => "{$titleSection} {$questionDB} (Favor de selecionar la fecha)"
                        ];
                    }
                }
            }


            $error = false;
            if ($inputBd == "selected" && $answersUser == "0") {
                $error = true;
            }
            if ($error) {
                return [
                    'status' => 400,
                    'message' => "Te falta responder una pregunta del apartado :{$titleSection}"
                ];
            }


            if ($inputBd == "selected") {

                $lowerCase = [];
                $answersArray = json_decode($answerDB, true);
                foreach ($answersArray as $value) {
                    $lowerCase[] = strtolower($value);
                }

                if (\in_array(strtolower($answersUser), $lowerCase)) {
                    $totalResult += $valueAnswer;
                }
            } else {
                $totalResult += $valueAnswer;
            }

            $answerResult[] = [
                'id' => $id,
                'answer' => $answersUser
            ];
        }

        $this->answerUserArray = $answerResult;

        return $totalResult;
    }


    public function getAnswersUser(Request $request)
    {
        try {
            $title = self::TITULOS;
            $id = $request->get('id_survey_records');
            $questions = SurveyRecords::query();

            $answersUser = $questions->join('answers_users', 'answers_users.id_survey_records', '=', 'survey_records.id_survey_records')
                ->join('questions', 'answers_users.id_question', '=', 'questions.id')
                ->where('survey_records.id_survey_records', $id)
                ->select('answers_users.answers', 'questions.question', 'questions.input', 'questions.type', 'questions.id')
                ->get();

            if (!count($answersUser) > 0) {
                return [
                    'status' => 400,
                    'message' => "Lo sentimos pero no encontramos la encuesta solcitada, comunicate con el administrador."
                ];
            }

            //dd($answersUser);
            return  \response()->json([
                'status' => 200,
                'data' => $answersUser
            ]);

            /*--------------------------- */
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ,Exception:" . $e->getMessage(),
                'status' => 400
            ]);
        }
    }
}
