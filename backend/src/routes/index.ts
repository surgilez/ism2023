import { verifyAccessToken } from '@middlewares/verifyToken';
import accountRoutes from '@routes/account';
import apiQueryRoutes from '@routes/apiQuery';
import authRoutes from '@routes/auth';
import cartRoutes from '@routes/cart';
import configRoutes from '@routes/config';
import hotelRoutes from '@routes/hotel';
import informationRoutes from '@routes/informationApi';
import membershipRoutes from '@routes/membership';
import messageRoutes from '@routes/message';
import paymentRoutes from '@routes/payment';
import promotionRoutes from '@routes/promotion';
import roleRoutes from '@routes/role';
import salesHistoryRoutes from '@routes/salesHistory';
import sendEmailRoutes from '@routes/sendEmail';
import servicesRoutes from '@routes/services';
import uploadFileRoutes from '@routes/uploadFile';
import { Application } from 'express';

export default (app: Application): void => {
  app.use('/api/v1/auth', authRoutes);
  app.use(
    '/api/v1',
    paymentRoutes,
    sendEmailRoutes,
    accountRoutes,
    apiQueryRoutes,
    informationRoutes,
    membershipRoutes,
    roleRoutes,
    uploadFileRoutes,
    hotelRoutes,
    cartRoutes,
    messageRoutes,
    salesHistoryRoutes,
    promotionRoutes,
    servicesRoutes,
    configRoutes,
  );
};
