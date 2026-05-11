import { api } from "@/shared/lib/axios";

import type {
  Service,
} from "../types/service.types";

import type {
  CreateServiceDTO,
} from "../dtos/create-service.dto";

import type {
  UpdateServiceDTO,
} from "../dtos/update-service.dto";

export const getServicesRequest =
  async (): Promise<
    Service[]
  > => {
    const response =
      await api.get(
        "/services"
      );

    return response.data;
  };

  export const getServiceByIdRequest = async (id: string): Promise<Service> => {
  const response = await api.get(`/services/${id}`);
  return response.data;
};

export const createServiceRequest =
  async (
    data: CreateServiceDTO
  ): Promise<Service> => {
    const response =
      await api.post(
        "/services",
        data
      );

    return response.data;
  };

export const updateServiceRequest =
  async (
    serviceId: string,
    data: UpdateServiceDTO
  ): Promise<Service> => {
    const response =
      await api.patch(
        `/services/${serviceId}`,
        data
      );

    return response.data;
  };

  

export const deleteServiceRequest =
  async (
    serviceId: string
  ): Promise<void> => {
    await api.delete(
      `/services/${serviceId}`
    );
  };