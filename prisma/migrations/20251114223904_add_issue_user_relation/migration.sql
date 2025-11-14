-- AddForeignKey
ALTER TABLE `issue` ADD CONSTRAINT `issue_assignedToUserId_fkey` FOREIGN KEY (`assignedToUserId`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
