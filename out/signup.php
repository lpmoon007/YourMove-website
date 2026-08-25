<?php
// Early access signups, collected by the web server the site already runs on.
//
// The site itself is static files. This is the one dynamic piece, and it exists so the
// signup form has somewhere real to post — the form must never show a confirmation for a
// signup that went nowhere.
//
// Each signup is appended as one JSON line to early-access.jsonl. That file is written
// OUTSIDE the document root, because it holds email addresses: anything under the document
// root is a URL somebody can fetch. If the file cannot be placed somewhere private, this
// script refuses to store anything rather than write addresses where they can be read.
//
// To read the signups: download early-access.jsonl over SFTP, or open it in Plesk's File
// Manager one directory above the document root.

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

const MAX_BODY_BYTES = 4096;
const MAX_EMAIL_LENGTH = 254;
const MAX_TAGS = 20;
const MAX_TAG_LENGTH = 40;
const MAX_STORE_BYTES = 20 * 1024 * 1024; // stop before a runaway file fills the disk

function fail(int $status, string $message): never
{
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message], JSON_UNESCAPED_SLASHES);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    fail(405, 'Method not allowed.');
}

$raw = file_get_contents('php://input', false, null, 0, MAX_BODY_BYTES + 1);
if ($raw === false || strlen($raw) > MAX_BODY_BYTES) {
    fail(413, 'That request was too large.');
}

$payload = json_decode($raw, true);
if (!is_array($payload)) {
    fail(400, 'Could not read that request.');
}

$email = is_string($payload['email'] ?? null) ? trim($payload['email']) : '';
if ($email === '' || strlen($email) > MAX_EMAIL_LENGTH || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    fail(400, 'Enter a valid email address to join.');
}

/** Keep the chip selections to short, plain strings — they are cosmetic, not trusted input. */
function tags(mixed $value): array
{
    if (!is_array($value)) {
        return [];
    }
    $out = [];
    foreach ($value as $item) {
        if (!is_string($item)) {
            continue;
        }
        $item = trim($item);
        if ($item === '') {
            continue;
        }
        $out[] = mb_substr($item, 0, MAX_TAG_LENGTH);
        if (count($out) >= MAX_TAGS) {
            break;
        }
    }
    return $out;
}

// Somewhere private: one level above whatever the server is serving.
$docRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? '') ?: __DIR__;
$store = dirname($docRoot) . DIRECTORY_SEPARATOR . 'yourmove-signups';

if (!is_dir($store) && !@mkdir($store, 0700, true) && !is_dir($store)) {
    error_log('[signup] cannot create the signup directory at ' . $store);
    fail(503, 'Signup storage is not set up yet. Nothing was saved — please try again soon.');
}

// Refuse to write inside the document root, whatever the layout turned out to be.
$storeReal = realpath($store);
if ($storeReal === false || str_starts_with($storeReal . DIRECTORY_SEPARATOR, $docRoot . DIRECTORY_SEPARATOR)) {
    error_log('[signup] refusing to store addresses inside the document root: ' . $store);
    fail(503, 'Signup storage is not set up yet. Nothing was saved — please try again soon.');
}

$file = $storeReal . DIRECTORY_SEPARATOR . 'early-access.jsonl';

if (is_file($file) && filesize($file) > MAX_STORE_BYTES) {
    error_log('[signup] the signup file has grown past its limit: ' . $file);
    fail(503, 'Signup storage is full. Nothing was saved — please try again soon.');
}

$line = json_encode(
    [
        'email' => $email,
        'genres' => tags($payload['genres'] ?? null),
        'interests' => tags($payload['interests'] ?? null),
        'at' => gmdate('c'),
    ],
    JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE,
);

if ($line === false) {
    fail(400, 'Could not read that request.');
}

// LOCK_EX so two people signing up at the same moment cannot interleave a line.
if (@file_put_contents($file, $line . "\n", FILE_APPEND | LOCK_EX) === false) {
    error_log('[signup] could not append to ' . $file);
    fail(503, 'Signup storage is not writable. Nothing was saved — please try again soon.');
}

@chmod($file, 0600);

echo json_encode(['ok' => true]);
