<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SystemNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $details;

    public function __construct($details)
    {
        $this->details = $details;
    }

    public function build()
{
    return $this->subject($this->details['subject'])
                ->html("
                    <h2>Hello, {$this->details['name']}!</h2>
                    <p>Welcome to our application.</p>
                    <p>Your IP: {$this->details['ip']}</p>
                    <p>ID Number: {$this->details['idNumber']}</p>
                ");
}
}
