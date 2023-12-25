<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]); 
// });

Route::middleware('auth', 'isAdmin')->group(function () {
    Route::get('/admin', [AdminController::class, 'index'])->name('home');
    Route::get('/admin/user', [AdminController::class, 'details'])->name('user-details');
    Route::get('/admin/user/delete/{id}', [AdminController::class, 'delete'])->name('delete');
    Route::get('/admin/user/make-admin/{id}', [AdminController::class, 'makeAdmin'])->name('make-admin');
    Route::get('/admin/product', [AdminController::class, 'productDetails'])->name('product-details');
    Route::get('/admin/product/delete/{id}', [AdminController::class, 'productDelete'])->name('product-delete');
    Route::post('/admin/product/product-post', [AdminController::class, 'productPost'])->name('product-post');
    Route::post('/admin/product/product-update/{id}', [AdminController::class, 'productUpdate'])->name('product-update');
    Route::get('/admin/product/edit/{id}', [AdminController::class, 'productEdit'])->name('edit');
});

Route::get('/', [UserController::class, 'index'])->name('index');
Route::get('/products', [UserController::class, 'show'])->name('index.products');

Route::get('/thanks', [UserController::class, 'endpoint'])->name('endpoint');
Route::get('/endpoint', [UserController::class, 'paymentSuccess'])->name('payment.success');

Route::middleware('auth')->group(function () {
    Route::post('/profile-pic/{id}', [UserController::class, 'profile'])->name('profile.image');
    Route::get('/add-to-cart', [UserController::class, 'addToCart'])->name('add-to-cart');
    Route::get('/cart', [UserController::class, 'cart'])->name('cart');
    Route::get('/cart/delete/{id}', [UserController::class, 'cartDelete'])->name('cart.delete');
    Route::post('/cart/update/{id}', [UserController::class, 'cartUpdate'])->name('cart.update');
    Route::post('/cart/checkout', [UserController::class, 'checkout'])->name('checkout');
    Route::post('/cart/insert-address', [UserController::class, 'insertAddress'])->name('insert.address');
    Route::get('/shipping/provinsi', [UserController::class, 'provinsi'])->name('provinsi');
    Route::get('/shipping/kota{id}', [UserController::class, 'kota'])->name('kota');
    Route::post('/shipping/get-fee', [UserController::class, 'getFee'])->name('get.fee');

    Route::any('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/shipping/{price}', [UserController::class, 'shipping'])->name('shipping');
});

require __DIR__ . '/auth.php';
