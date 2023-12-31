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
        Schema::create('products', function (Blueprint $table) {
            $table->id()->startingValue(1000);
            $table->string('product_name');
            $table->string('product_desc');
            $table->string('category');
            $table->integer('price');
            $table->integer('stock');
            $table->string('image')->nullable();
            $table->decimal('weight', 10, 2)->nullable()->default(null);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
