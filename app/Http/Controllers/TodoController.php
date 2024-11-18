<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
   public function index(Request $request) : Response
   {

       $todos = Todo::where('user_id',$request->user()->id)->get();

       return Inertia::render('Todos/Index', [
          'todosList' => $todos
       ]);
   }

   public function store(Request $request) : RedirectResponse
   {
       $priorities = 'low'| 'medium' | 'high';
       $validated = $request->validate([
           'title' => 'required','string','max:50',
           'description' => 'required','string','max:200',
           'priority' => 'required','low','medium','high'
       ]);
       Todo::create(['user_id' => $request->user()->id, 'title' => $request->title, 'description' => $request->description, 'completed' => false, 'priority' => $request->priority ]);
       return redirect()->route('todos.index');
   }
}
