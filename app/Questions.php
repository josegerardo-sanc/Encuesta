<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Questions extends Model
{
    protected $fillable = [
        'input',
        'type',
        'question',
        'selectionAnswer',
        'answer'
    ];
}
