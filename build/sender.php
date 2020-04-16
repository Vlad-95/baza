<?php

if(isset($_POST["name"]))
{
    $name = $_POST["name"];
}
if(isset($_POST["phone"]))
{
    $phone= $_POST["phone"];
}
if(isset($_POST["vin"]))
{
    $vin= $_POST["vin"];
}


$to = "vovaefanov@yandex.ru"; /* Адрес, куда отправляем письма*/
$subject = "Письмо c сайта"; /*Тема письма*/
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-type: text/html; charset=utf-8\r\n";


/*ВО ВНУТРЬ ПЕРЕМЕННОЙ $message ЗАПИСЫВАЕМ ДАННЫЕ ИЗ ПОЛЕЙ */
$message = '<h3>Сообщение</h3>';
$message .= '<strong>Имя:</strong> ' . $name . '.<br />';
$message .= '<strong>Телефон:</strong> ' . $phone . '.<br />';
$message .= '<strong>VIN номер:</strong> ' . $vin . '.<br />';

if ($_POST){
    if ( empty($name) || empty($phone) ) {
        echo "Заполните поля";
    }

    else if ($_POST['catch']){
        die('Пошел на хер, бот!');
    }
    mail($to, $subject, $message, $headers);
}




