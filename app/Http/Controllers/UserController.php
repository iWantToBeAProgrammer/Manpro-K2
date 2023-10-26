<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $products = new ProductCollection(Product::orderBy('id', 'desc')->take(4)->get());
        return Inertia::render('Index', [
            'products' => $products,
        ]);
    }

    public function show()
    {
        $products = new ProductCollection(Product::orderBy('id', 'desc')->get());
        return Inertia::render('Products', ['products' => $products]);
    }

    public function profile(Request $request, string $id)
    {
        $user = User::where('id', $id)->first();
        if ($request->file('image')) {
            if ($user->profile != null) {
                Storage::disk('public')->delete($user->profile);
            }

            $user->profile = $request->file('image')->store('profile-images', 'public');
        }
        $user->save();
        return redirect()->back()->with('message', 'Profile Changed Completely');
    }

    public function addToCart(Request $request, Product $product)
    {
     
            $product_id = $request->id;
            $product_qty = $request->quantity;
            $user_id = auth()->user()->id;
            $productCheck = Product::where('id', $product_id)->first();
            if($productCheck) {
                $cartItem = new Cart();
                $cartItem->user_id = $user_id;
                $cartItem->product_id = $product_id;
                $cartItem->product_qty = $product_qty;
                $cartItem->save();
                return redirect()->back()->with('message', 'Ur item added to cart');
            }
    }
}

        // $cart = session()->get('cart', []);
        // if (isset($cart[$id])) {
        //     $cart[$id]['quantity']++;
        // } else {

        //     $cart[$id] = [
        //         'product_name' => $product->product_name,
        //         'image' => $product->image,
        //         'price' => $product->price,
