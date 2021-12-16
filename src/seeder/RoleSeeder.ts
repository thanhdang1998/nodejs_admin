import { Role } from './../entity/RoleEntity';
import { Permission } from './../entity/PermissionEntity';
import { createConnection, getManager } from 'typeorm';


createConnection().then(async connection => {
    const permissionRepository = getManager().getRepository(Permission);
    const roleRepository = getManager().getRepository(Role);

    const perms = ['view_users', 'edit_user', 'view_role', 'edit_role', 'view_product', 'edit_product', 'view_order', 'edit_order'];

    let permission = [];

    for (let i = 0; i < perms.length; i++) {
        permission.push(await permissionRepository.save({
            name: perms[i]
        }))
    }

    await roleRepository.save({
        name: 'Admin',
        permission
    })

    delete permission[3];
    await roleRepository.save({
        name: 'Editor',
        permission
    })

    delete permission[1];
    delete permission[5];
    delete permission[7];
    await roleRepository.save({
        name: 'Viewer',
        permission
    })

    process.exit(0);

})