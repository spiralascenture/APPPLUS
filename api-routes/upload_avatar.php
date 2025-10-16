<?php
require_once 'db_connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (!isset($_FILES['avatar']) || !isset($_POST['userId'])) {
        http_response_code(400);
        echo json_encode(["message" => "Arquivo ou ID de usuário ausente"]);
        exit;
    }

    $userId = intval($_POST['userId']);
    $uploadDir = __DIR__ . "/uploads/";
    $fileName = "avatar_" . $userId . ".jpg";
    $targetFile = $uploadDir . $fileName;

    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    // Apaga imagem anterior se já existir
    if (file_exists($targetFile)) {
        unlink($targetFile);
    }

    if (move_uploaded_file($_FILES["avatar"]["tmp_name"], $targetFile)) {
        $url = "https://api-pridecare.com/api-appplus/uploads/" . $fileName;

        // Atualiza o banco
        $stmt = $pdo->prepare("UPDATE users SET avatar_url = :url WHERE id = :id");
        $stmt->bindParam(':url', $url);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        echo json_encode(["message" => "Upload feito", "avatar_url" => $url]);
    } else {
        http_response_code(500);
        echo json_encode(["message" => "Erro ao mover arquivo"]);
    }
} else {
    http_response_code(405);
    echo json_encode(["message" => "Método não permitido"]);
}
