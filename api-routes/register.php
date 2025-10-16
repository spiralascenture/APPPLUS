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

// Função para hashear a senha
function hashPassword($password)
{
    return password_hash($password, PASSWORD_BCRYPT);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Verifica se os campos obrigatórios existem
    $requiredFields = ['nome', 'sobrenome', 'email', 'telefone', 'pronomes', 'senha', 'confirmarSenha'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            http_response_code(400);
            echo json_encode(['message' => "Campo obrigatório ausente: $field"]);
            exit;
        }
    }

    // Verifica se as senhas coincidem
    if ($data['senha'] !== $data['confirmarSenha']) {
        http_response_code(400);
        echo json_encode(['message' => "As senhas não coincidem."]);
        exit;
    }

    // Atribui os valores
    $nome = $data['nome'];
    $sobrenome = $data['sobrenome'];
    $email = $data['email'];
    $telefone = $data['telefone'];
    $pronomes = $data['pronomes'];
    $senha = hashPassword($data['senha']);
    $createdAt = date('Y-m-d H:i:s');

    try {
        // Verifica se e-mail já está cadastrado
        $stmt = $pdo->prepare("SELECT COUNT(*) FROM users WHERE email = :email");
        $stmt->bindParam(':email', $email);
        $stmt->execute();
        if ($stmt->fetchColumn() > 0) {
            http_response_code(409);
            echo json_encode(['message' => 'E-mail já cadastrado']);
            exit;
        }

        // Insere no banco
        $stmt = $pdo->prepare("INSERT INTO users (name, last_name, email, phone, pronouns, password, created_at) 
                               VALUES (:name, :last_name, :email, :phone, :pronouns, :password, :created_at)");

        $stmt->bindParam(':name', $nome);
        $stmt->bindParam(':last_name', $sobrenome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $telefone);
        $stmt->bindParam(':pronouns', $pronomes);
        $stmt->bindParam(':password', $senha);
        $stmt->bindParam(':created_at', $createdAt);

        $stmt->execute();

        echo json_encode(['message' => 'Usuário cadastrado com sucesso', 'email' => $email]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro no banco: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido']);
}
