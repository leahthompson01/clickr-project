<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Reminder extends Model
{
    protected $fillable = [
        'title',
        'description',
        'completed',
        'due_date',
        'user_id'
    ];
}
