import { PermissionMiddlewave } from './middleware/PermissionMiddlewave';
import { Chart, Export, GetListOrder } from './controller/OrderController';
import { UploadImage } from './controller/ImageController';
import { GetListProduct, GetDetailProduct, CreateProduct, UpdateProduct, DeleteProduct } from './controller/ProductController';
import { GetListRole, GetDetailRole, CreateRole, UpdateRole, DeleteRole } from './controller/RoleController';
import { GetListUser, GetDetailUser, CreateUser, UpdateUser, DeleteUser } from './controller/UserController';
import { AuthMiddlewave } from './middleware/AuthMiddlewave';
import { Router } from "express";
import { AuthenticatedUser, Login, Logout, Register, UpdateInfo, UpdatePassword } from "./controller/AuthController";

export const routes = (router: Router) => {
    router.post('/api/register', Register);
    router.post('/api/login', Login);
    router.get('/api/user', AuthMiddlewave, AuthenticatedUser);
    router.post('/api/logout', AuthMiddlewave, Logout);
    router.put('/api/user/info', AuthMiddlewave, UpdateInfo);
    router.put('/api/user/password', AuthMiddlewave, UpdatePassword);

    //manage user
    router.get('/api/user/getList', AuthMiddlewave, GetListUser);
    router.get('/api/user/getDetail/:id', AuthMiddlewave, GetDetailUser);
    router.post('/api/user/create', AuthMiddlewave, CreateUser);
    router.put('/api/user/update/:id', AuthMiddlewave, UpdateUser);
    router.delete('/api/user/delete/:id', AuthMiddlewave, DeleteUser);

    //manage role
    router.get('/api/role/getList', AuthMiddlewave, GetListRole);
    router.get('/api/role/getDetail/:id', AuthMiddlewave, GetDetailRole);
    router.post('/api/role/create', AuthMiddlewave, CreateRole);
    router.put('/api/role/update/:id', AuthMiddlewave, UpdateRole);
    router.delete('/api/role/delete/:id', AuthMiddlewave, DeleteRole);

    //manage product
    router.get('/api/product/getList', AuthMiddlewave, PermissionMiddlewave('product'), GetListProduct);
    router.get('/api/product/getDetail/:id', AuthMiddlewave, PermissionMiddlewave('product'), GetDetailProduct);
    router.post('/api/product/create', AuthMiddlewave, PermissionMiddlewave('product'), CreateProduct);
    router.put('/api/product/update/:id', AuthMiddlewave, PermissionMiddlewave('product'), UpdateProduct);
    router.delete('/api/product/delete/:id', AuthMiddlewave, PermissionMiddlewave('product'), DeleteProduct);

    //upload image
    router.post('/api/upload', AuthMiddlewave, UploadImage);
    //router.use('/api/uploads', express.static('./uploads'));

    //manage order
    router.get('/api/order/getList', AuthMiddlewave, GetListOrder);
    router.post ('/api/order/export', AuthMiddlewave, Export);
    router.get('/api/order/chart', AuthMiddlewave, Chart);
}