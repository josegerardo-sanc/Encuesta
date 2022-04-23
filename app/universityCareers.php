<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class universityCareers extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_university_careers';
    protected $fillable = [
        'name'
    ];
}
