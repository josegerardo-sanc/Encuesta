<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSurveyRecordsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('survey_records', function (Blueprint $table) {
            $table->bigIncrements('id_survey_records');
            $table->unsignedBigInteger('id_users')->comment('id users');
            $table->foreign('id_users')->references('id_users')->on('users');
            $table->string('percentage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('survey_records');
    }
}
