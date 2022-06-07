<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class SurveyRecords extends Model
{

    protected $primaryKey = 'id_survey_records';
    protected $fillable = [
        'id_users',
        'percentage',
        'id_university_careers'
    ];

    protected $casts = [
        'created_at'  => 'date:Y-m-d H:i:s'
    ];
}
