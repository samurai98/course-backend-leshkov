import { MigrationInterface, QueryRunner, Repository } from 'typeorm';
import { Admin } from '../../entities/admin.entity';
import * as bcrypt from 'bcrypt';

export class CreateFirstAdmin1610391109901 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);

    if (await adminRepository.findOne({ where: { login: 'admin' } })) {
      return;
    }

    const admin: Admin = adminRepository.create({
      login: 'your_admin_login',
      passwordHash: await bcrypt.hash('admin_password', 10),
      nickName: 'your_admin_nickname',
    });

    await adminRepository.insert(admin);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const adminRepository: Repository<Admin> = queryRunner.connection.getRepository(Admin);
    const admin: Admin = await adminRepository.findOne({ where: { login: 'admin' } });
    if (!admin) {
      return;
    }

    await adminRepository.remove(admin);
  }

}
