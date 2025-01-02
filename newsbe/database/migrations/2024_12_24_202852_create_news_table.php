<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->text('content')->nullable();
            $table->text('description')->nullable();
            $table->string('image')->nullable();
            $table->text('meta_data')->nullable();!
            $table->string('url_hash')->unique();
            $table->string('url');
            $table->dateTime('published_at')->nullable();
            $table->bigInteger('author_id')->optional();
            $table->bigInteger('category_id')->optional();
            $table->bigInteger('source_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
