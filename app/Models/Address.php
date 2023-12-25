<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $primaryKey = 'address_id';
    protected $fillable = ['name', 'phone_number', 'subdistrict',  'street', 'city', 'postal_code'];

    public function user() {
        return $this->belongsTo(User::class, 'user_id');
    }
}
