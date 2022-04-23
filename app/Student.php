<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    public $timestamps = false;

    protected $primaryKey = 'id_students';
    protected $fillable = [
        'matricula',
        'id_users',
        'id_university_careers',
        'semester',
        'school_shift',
    ];
}
