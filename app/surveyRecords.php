<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class surveyRecords extends Model
{

    protected $primaryKey = 'id_survey_records';
    protected $fillable = [
        'id_users',
        'percentage'
    ];
}
