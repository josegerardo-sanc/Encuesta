<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ChekInTime extends Model
{
    public $timestamps = false;
    protected $fillable = [
        "id_user",
        "date_start",
        "date_end",
    ];
}
