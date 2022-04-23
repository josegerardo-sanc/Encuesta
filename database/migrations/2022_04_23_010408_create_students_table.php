<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateStudentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('students', function (Blueprint $table) {
            $table->bigIncrements('id_students');
            $table->string('matricula', 10);
            $table->unsignedBigInteger('id_users')->comment('id users');
            $table->foreign('id_users')->references('id_users')->on('users');
            $table->unsignedBigInteger('id_university_careers')->comment('id carrera');
            $table->foreign('id_university_careers')->references('id_university_careers')->on('university_careers');
            $table->string('semester');
            $table->string('school_shift');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('students');
    }
}
