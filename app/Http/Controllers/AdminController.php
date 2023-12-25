<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductCollection;
use App\Http\Resources\UserCollection;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminController extends Controller
{
    private $users;
    private $products;

    public function __construct()
    {
        $this->users = new UserCollection(User::where("is_admin", 0)->get());
        $this->products = new ProductCollection(Product::all());
    }


    public function delete(string $id) {
        $user = User::all()->Where('id', $id);
        $user->firstOrFail()->delete();
        return redirect()->back()->with('message', 'Data berhasil dihapus');
    }

    public function index()
    {
        $total = $this->users->count();
        $totalProduk = $this->products->count();
        return Inertia::render('Admin', [
            'total' => $total,
            'total_produk' => $totalProduk
        ]);
    }

    public function details()
    {
        $paginate = new UserCollection(User::where("is_admin", 0)->paginate(10));
        return Inertia::render('UserDetails', ['users' => $paginate]);
    }

    public function productDetails()
    {
        $paginate = new ProductCollection(Product::orderBy('id', 'desc')->paginate(10));
        $images = Product::latest()->get();
        return Inertia::render('ProductDetails', ['products' => $paginate, 'images' => $images]);
    }

    public function productPost(Request $request)
    {
        $product = new Product();

        $product->product_name = $request->name;
        $product->product_desc = $request->desc;
        $product->category = $request->category;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->weight = $request->weight;
        if ($request->file('image')) {
            $product->image = $request->file('image')->store('product-images', 'public');
        } else {
            $product->image = '';
        }
        $product->save();
        return redirect()->back()->with('message', 'Product Submitted');
    }

    public function productEdit(Product $product, string $id)
    {
        return response()->json(array('product' => $product->find($id)), 200);
    }

    public function productUpdate(Request $request, string $id)
    {
        $product = Product::where('id', $id)->first();
        if($request->file('image')) {
            Storage::disk('public')->delete($product->image);
        }

        Product::where("id", $id)->update([
            'product_name' => $request->name,
            'product_desc' => $request->desc,
            'category' => $request->category,
            'price' => $request->price,
            'stock' => $request->stock,
            'weight' => $request->weight,
            'image' => $request->file('image')->store('product-images', 'public')
        ]);

        return to_route('product-details')->with('message', 'Product Updated Successfully');
    }

    public function productDelete(string $id)
    {
        $product = Product::all()->where('id', $id);
        $product->firstOrFail()->delete();
        return redirect()->route('product-details');
    }

    

    public function makeAdmin(string $id)
    {
        $user = User::all()->where('id', $id);
        $user->firstOrFail()->update(['is_admin' => 1]);
        return redirect()->route('user-details');
    }
}
