<?php
require_once 'db_connection.php';

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $email = $data['email'] ?? null;
    $password = $data['password'] ?? null;

    if (!$email || !$password) {
        http_response_code(400);
        echo json_encode(['message' => 'E-mail e senha são obrigatórios.']);
        exit;
    }

    try {
        // Busca o usuário
        $stmt = $pdo->prepare("SELECT id, name, last_name, phone, pronouns, password FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user) {
            http_response_code(401);
            echo json_encode(['message' => 'Usuário não encontrado.']);
            exit;
        }

        // Verifica a senha
        if (!password_verify($password, $user['password'])) {
            http_response_code(401);
            echo json_encode(['message' => 'Senha incorreta.']);
            exit;
        }

        // Sucesso
        echo json_encode([
            'message' => 'Login realizado com sucesso.',
            'user' => [
                'id' => $user['id'],
                'nome' => $user['name'],
                'sobrenome' => $user['last_name'],
                'email' => $email,
                'phone' => $user['phone'],
                'pronouns' => $user['pronouns'],
                'loginAt' => date('Y-m-d H:i:s'),
            ],
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro ao consultar o banco de dados.']);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido']);
}
