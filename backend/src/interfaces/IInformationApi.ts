import { Credential, InformationApi, Service } from '@prisma/client';

export interface IInformationApiInput extends InformationApi {
  services: Service[];
  credentials: Credential;
}
