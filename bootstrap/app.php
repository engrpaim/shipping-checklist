<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Inertia\Inertia;
use Psr\Container\NotFoundExceptionInterface;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        // Add this line:
        $middleware->trustProxies(at: '*');
    })
    ->withExceptions(function (Exceptions $exceptions) {

        $exceptions->render(function (MethodNotAllowedHttpException $e, $request) {
            if($e instanceof NotFoundHttpException){
                dd('hello');
            }
            $currentPath = $request ->path();
            if($e instanceof MethodNotAllowedHttpException){
                if(str_contains($currentPath , 'shipping-checklist/queue')){
                    return redirect()->to('/shipping-checklist/queue')->setStatusCode(302);
                }else if(str_contains($currentPath , '/shipping-checklist/booking')){
                    return redirect()->to('/shipping-checklist/booking')->setStatusCode(302);
                }
            };

        });

        $exceptions->render(function (NotFoundHttpException $e, $request) {
            if($e instanceof NotFoundHttpException){
                 return redirect()->to('/shipping-checklist/home')->setStatusCode(302);
            }
        });

    })->create();



