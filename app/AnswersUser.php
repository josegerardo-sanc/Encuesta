<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnswersUser extends Model
{
    protected $fillable = [
        'id_survey_records',
        'id_question',
        'answers',
    ];
}
