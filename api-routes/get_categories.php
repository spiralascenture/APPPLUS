<?php
require_once 'db_connection.php';

// CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

date_default_timezone_set('America/Sao_Paulo');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        $stmt = $pdo->query("SELECT id, name, slug, color, observation, created_at FROM categories");
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        // Converte os campos para camelCase
        $categories = array_map(function ($row) {
            return [
                'id' => $row['id'],
                'name' => $row['name'],
                'slug' => $row['slug'],
                'color' => $row['color'],
                'observation' => $row['observation'],
                'createdAt' => $row['created_at']
            ];
        }, $results);

        echo json_encode([
            'status' => 'success',
            'data' => $categories
        ]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode([
            'status' => 'error',
            'message' => 'Erro ao buscar categorias: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(405);
    echo json_encode(['message' => 'Método não permitido']);
}