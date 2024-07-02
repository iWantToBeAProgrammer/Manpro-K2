<?php

namespace App\Http\Controllers;

use App\Http\Resources\OrderCollection;
use App\Http\Resources\ProductCollection;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Routing\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $products = new ProductCollection(Product::orderBy('id', 'desc')->take(4)->get());

        if (auth()->user() != null) {
            $id = auth()->user()->id;
            $cart = DB::table("carts")
                ->join("products", "products.id", "=", "carts.product_id")->where('carts.user_id', '=', $id)
                ->get();


            return Inertia::render('Index', [
                'products' => $products,
                'cart' => $cart
            ]);
        }

        return Inertia::render('Index', [
            'products' => $products,
        ]);
    }


    public function show()
    {
        $products = new ProductCollection(Product::orderBy('id', 'desc')->get());

        if (auth()->user() != null) {
            $id = auth()->user()->id;
            $cart = DB::table("carts")
                ->join("products", "products.id", "=", "carts.product_id")->where('carts.user_id', '=', $id)
                ->get();

            return Inertia::render('Products', ['products' => $products, 'cart' => $cart]);
        }
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
        $cartCheck = Cart::where('product_id', $product_id)->where('user_id', $user_id)->first();

        if ($cartCheck) {

            $cartCheck->update([
                'product_qty' => $request->quantity + $cartCheck->product_qty
            ]);

            return redirect()->back()->with('message', 'Ur item added to cart');
        }

        $productCheck = Product::where('id', $product_id)->first();
        if ($productCheck) {
            $cartItem = new Cart();
            $cartItem->user_id = $user_id;
            $cartItem->product_id = $product_id;
            $cartItem->product_qty = $product_qty;
            $cartItem->save();
            return redirect()->back()->with('message', 'Ur item added to cart');
        }
    }

    public function cart()
    {
        $id = auth()->user()->id;
        $cart = DB::table("products")
            ->join("carts", "carts.product_id", "=", "products.id")->where('carts.user_id', '=', $id)
            ->get();

        return Inertia::render('Cart', ['cart' => $cart]);
    }


    public function shipping(string $price)
    {

        $id = auth()->user()->id;
        $cart = DB::table("products")
            ->join("carts", "carts.product_id", "=", "products.id")->where('carts.user_id', '=', $id)
            ->get();
        return Inertia::render('Shipping', ['price' => $price, 'cart' => $cart]);
    }


    public function checkout(Request $request)
    {
        // Set your Merchant Server Key
        \Midtrans\Config::$serverKey = config('midtrans.server_key');
        // Set to Development/Sandbox Environment (default). Set to true for Production Environment (accept real transaction).
        \Midtrans\Config::$isProduction = false;
        // Set sanitization on (default)
        \Midtrans\Config::$isSanitized = true;
        // Set 3DS transaction for credit card to true
        \Midtrans\Config::$is3ds = true;

        $params = array(
            'transaction_details' => array(
                'order_id' => rand(),
                'gross_amount' => $request->price,
            ),
            'customer_details' => array(
                'first_name' => $request->username,
                'email' => $request->email,
            ),
        );

        $snapToken = \Midtrans\Snap::getSnapToken($params);
        return response()->json([
            'token' => $snapToken
        ]);
    }

    public function provinsi()
    {

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.rajaongkir.com/starter/province",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "key: 4cd2407800b641caf82041da7739d88d"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            return $response;
        }
    }

    public function kota(string $id)
    {



        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.rajaongkir.com/starter/city?province={$id}",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "GET",
            CURLOPT_HTTPHEADER => array(
                "key: 4cd2407800b641caf82041da7739d88d"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }

    public function getFee(Request $request)
    {

        Address::create([

            'name' => $request->name,
            'phone_number' => $request->phone,
            'street' => $request->street,
            'city' => $request->city,
            'subdistrict' => $request->subdistrict,
            'postal_code' => $request->postalCode,
        ]);


        $destination = $request->city;
        $weight = $request->weight;

        $curl = curl_init();

        curl_setopt_array($curl, array(
            CURLOPT_URL => "https://api.rajaongkir.com/starter/cost",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_ENCODING => "",
            CURLOPT_MAXREDIRS => 10,
            CURLOPT_TIMEOUT => 30,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => "POST",
            CURLOPT_POSTFIELDS => "origin=399&destination={$destination}&weight={$weight}&courier=jne",
            CURLOPT_HTTPHEADER => array(
                "content-type: application/x-www-form-urlencoded",
                "key: 4cd2407800b641caf82041da7739d88d"
            ),
        ));

        $response = curl_exec($curl);
        $err = curl_error($curl);

        curl_close($curl);

        if ($err) {
            echo "cURL Error #:" . $err;
        } else {
            echo $response;
        }
    }

    public function cartUpdate(string $id, Request $request)
    {
        Cart::where('id', $id)->update([
            'product_qty' => $request->quantity
        ]);
    }


    public function cartDelete(string $id)
    {
        $cart = Cart::all()->where('id', $id);

        $cart->firstOrFail()->delete();
        return redirect()->back()->with('message', 'berhasil dihapus');
    }

    public function endpoint()
    {
        return Inertia::render('Endpoint');
    }

    public function paymentSuccess()
    {
        return to_route('index')->with('message', 'payment successful');
    }
}
