<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

use Illuminate\Http\Request;
use App\universityCareers;
use App\Questions;
use App\SurveyRecords;

class universityCareersController extends Controller
{
    public $ERROR_SERVER_MSG = 'Ha ocurrido un error, intenta de nuevo más tarde.';

    /**
     * getCareers
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function  getCareers()
    {
        try {
            //process
            $data = universityCareers::orderBy('id_university_careers', 'desc')->get();
            return response()->json(['data' => $data, 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ," . $e->getMessage(),
                'status' => 400
            ]);
        }
    }


    public function getQuestion()
    {
        try {
            //process
            $data = Questions::orderBy('id', 'asc')->get();
            return response()->json(['data' => $data, 'status' => 200]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $this->ERROR_SERVER_MSG . " ," . $e->getMessage(),
                'status' => 400
            ]);
        }
    }


    public function getAccess($id)
    {
        $data = SurveyRecords::where('id_survey_records', $id)->first();

        if (empty($data)) {
            return \response()->json([
                'status' => 400,
                'message' => "Lo sentimos no encontramos información relacionada con este Qr"
            ]);
        }

        $studentCareers = DB::table('survey_records')
            ->join('students', 'survey_records.id_users', '=', 'students.id_users')
            ->join('users', 'students.id_users', '=', 'users.id_users')
            ->join('university_careers', 'students.id_university_careers', '=', 'university_careers.id_university_careers')
            ->where('survey_records.id_survey_records', "=", $id)
            ->select(
                DB::raw('CONCAT(users.name," ",users.last_name," ",users.second_last_name) AS full_name'),
                'university_careers.name',
                'students.matricula',
                'survey_records.created_at'
            )
            ->get();


        return \response()->json([
            'status' => 200,
            'data' => $studentCareers[0]
        ]);
    }
}
