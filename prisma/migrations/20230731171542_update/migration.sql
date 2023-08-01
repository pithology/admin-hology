-- CreateTable
CREATE TABLE `admins` (
    `admin_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `admin_uuid` CHAR(36) NOT NULL,
    `admin_email` VARCHAR(60) NOT NULL,
    `admin_name` VARCHAR(45) NOT NULL,
    `admin_password` TEXT NOT NULL,
    `admin_role` ENUM('SEKBEN', 'INTI', 'GOD', 'EXHIBITOR', 'INSTRUCTOR') NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `admins_admin_uuid_key`(`admin_uuid`),
    UNIQUE INDEX `admins_admin_email_key`(`admin_email`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `user_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_uuid` CHAR(36) NOT NULL,
    `user_fullname` VARCHAR(60) NOT NULL,
    `user_email` VARCHAR(60) NOT NULL,
    `user_birthdate` DATE NOT NULL,
    `user_gender` CHAR(1) NOT NULL,
    `user_password` TEXT NOT NULL,
    `provinsi_id` SMALLINT UNSIGNED NOT NULL,
    `forgot_password_token` VARCHAR(20) NOT NULL DEFAULT 'no_token',
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `institution` VARCHAR(60) NOT NULL,
    `email_verified_token` VARCHAR(20) NOT NULL DEFAULT 'no_token',
    `no_handphone` VARCHAR(60) NOT NULL,

    UNIQUE INDEX `users_user_uuid_key`(`user_uuid`),
    UNIQUE INDEX `user_email`(`user_email`),
    INDEX `users_provinsi_id_foreign`(`provinsi_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `provinsi` (
    `provinsi_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `provinsi_name` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `provinsi_provinsi_id_key`(`provinsi_id`),
    UNIQUE INDEX `provinsi_provinsi_name_key`(`provinsi_name`),
    PRIMARY KEY (`provinsi_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_seminars` (
    `user_id` SMALLINT UNSIGNED NOT NULL,
    `ticket_uuid` CHAR(36) NOT NULL,
    `created_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `present` BOOLEAN NOT NULL DEFAULT false,
    `ig_story` VARCHAR(200) NOT NULL,

    UNIQUE INDEX `user_seminars_user_id_key`(`user_id`),
    UNIQUE INDEX `user_seminars_ticket_uuid_key`(`ticket_uuid`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teams` (
    `team_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `competition_id` SMALLINT UNSIGNED NOT NULL,
    `team_name` VARCHAR(45) NOT NULL,
    `team_biodata` VARCHAR(45) NULL,
    `team_lead_id` SMALLINT UNSIGNED NOT NULL,
    `team_status` ENUM('WAITING', 'ACCEPTED', 'REJECTED') NOT NULL DEFAULT 'WAITING',
    `join_token` CHAR(36) NOT NULL,
    `institution` VARCHAR(60) NOT NULL,
    `phase` ENUM('PENYISIHAN', 'SEMIFINAL', 'FINAL', 'DISKUALIFIKASI') NULL,

    UNIQUE INDEX `team_name`(`team_name`),
    UNIQUE INDEX `teams_team_lead_id_key`(`team_lead_id`),
    UNIQUE INDEX `teams_join_token_key`(`join_token`),
    INDEX `teams_competition_id_foreign`(`competition_id`),
    INDEX `teams_team_lead_foreign`(`team_lead_id`),
    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `team_payment_proof` (
    `team_id` SMALLINT UNSIGNED NOT NULL,
    `nama_rekening` VARCHAR(225) NULL,
    `no_rekening` VARCHAR(225) NULL,
    `payment_proof` VARCHAR(225) NULL,

    UNIQUE INDEX `team_payment_proof_team_id_key`(`team_id`),
    INDEX `team_payment_proof_team_id_foreign`(`team_id`),
    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pengumuman` (
    `team_id` SMALLINT UNSIGNED NOT NULL,
    `judul` VARCHAR(45) NULL,
    `deskripsi` VARCHAR(45) NULL,

    UNIQUE INDEX `pengumuman_team_id_key`(`team_id`),
    INDEX `pengumuman_team_id_foreign`(`team_id`),
    PRIMARY KEY (`team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detail_teams` (
    `detail_team_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` SMALLINT UNSIGNED NOT NULL,
    `team_id` SMALLINT UNSIGNED NOT NULL,

    INDEX `detail_teams_team_id_foreign`(`team_id`),
    INDEX `detail_teams_user_id_foreign`(`user_id`),
    UNIQUE INDEX `detail_teams_user_id_team_id_key`(`user_id`, `team_id`),
    PRIMARY KEY (`detail_team_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `competitions` (
    `competition_id` SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `competition_name` VARCHAR(45) NOT NULL,
    `competition_description` TEXT NOT NULL,

    UNIQUE INDEX `competitions_competition_name_key`(`competition_name`),
    PRIMARY KEY (`competition_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_provinsi_foreign` FOREIGN KEY (`provinsi_id`) REFERENCES `provinsi`(`provinsi_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `user_seminars` ADD CONSTRAINT `seminar_attendance_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_competition_id_foreign` FOREIGN KEY (`competition_id`) REFERENCES `competitions`(`competition_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `teams` ADD CONSTRAINT `teams_team_lead_foreign` FOREIGN KEY (`team_lead_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `team_payment_proof` ADD CONSTRAINT `team_payment_proof_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `pengumuman` ADD CONSTRAINT `pengumuman_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `detail_teams` ADD CONSTRAINT `detail_teams_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `teams`(`team_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `detail_teams` ADD CONSTRAINT `detail_teams_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
