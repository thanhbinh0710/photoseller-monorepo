-- Initial database setup for PhotoSeller
-- This file is automatically executed when MariaDB container starts

SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Create database if not exists
CREATE DATABASE IF NOT EXISTS photoseller CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE photoseller;

-- Grant all privileges including database creation for shadow database
GRANT ALL PRIVILEGES ON *.* TO 'photoseller'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;
