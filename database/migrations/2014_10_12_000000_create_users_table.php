<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id_users');
            $table->string('name', 50);
            $table->string('last_name', 50);
            $table->string('second_last_name', 50)->nullable();
            $table->string('gender', 20)->nullable();
            $table->string('email', 100)->unique();
            $table->string('phone', 15)->nullable();
            $table->string('photo')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->text('verification_link')->nullable();
            $table->string('password')->nullable();
            $table->integer('account_status')->default(3)->comment("1=activo 2=bloqueado  3=verificarCuentaCorreo 4=eliminado");
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
