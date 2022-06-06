<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\universityCareers;
use App\Questions;

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
}
