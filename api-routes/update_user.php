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

    // Espera-se que o `id` do usuário esteja presente
    $requiredFields = ['id', 'nome', 'sobrenome', 'email', 'telefone', 'pronomes'];
    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || $data[$field] === '') {
            http_response_code(400);
            echo json_encode(['message' => "Campo obrigatório ausente: $field"]);
            exit;
        }
    }

    $id = $data['id'];
    $nome = $data['nome'];
    $sobrenome = $data['sobrenome'];
    $email = $data['email'];
    $telefone = $data['telefone'];
    $pronomes = $data['pronomes'];

    $updatePassword = false;
    $senhaHashed = null;

    if (!empty($data['senha']) && !empty($data['confirmarSenha'])) {
        if ($data['senha'] !== $data['confirmarSenha']) {
            http_response_code(400);
            echo json_encode(['message' => "As senhas não coincidem."]);
            exit;
        }
        $senhaHashed = hashPassword($data['senha']);
        $updatePassword = true;
    }

    try {
        // Verifica se o e-mail já está em uso por outro usuário
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = :email AND id != :id");
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':id', $id);
        $stmt->execute();
        if ($stmt->fetch()) {
            http_response_code(409);
            echo json_encode(['message' => 'Este e-mail já está em uso por outro usuário.']);
            exit;
        }

        // Monta a query de update
        if ($updatePassword) {
            $stmt = $pdo->prepare("
                UPDATE users 
                SET name = :name, last_name = :last_name, email = :email, phone = :phone, pronouns = :pronouns, password = :password 
                WHERE id = :id
            ");
            $stmt->bindParam(':password', $senhaHashed);
        } else {
            $stmt = $pdo->prepare("
                UPDATE users 
                SET name = :name, last_name = :last_name, email = :email, phone = :phone, pronouns = :pronouns 
                WHERE id = :id
            ");
        }

        // Parâmetros comuns
        $stmt->bindParam(':name', $nome);
        $stmt->bindParam(':last_name', $sobrenome);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $telefone);
        $stmt->bindParam(':pronouns', $pronomes);
        $stmt->bindParam(':id', $id);

        $stmt->execute();

        echo json_encode(['message' => 'Dados atualizados com sucesso']);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Erro no banco: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido']);
}
